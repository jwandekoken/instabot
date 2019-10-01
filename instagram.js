const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  
  browser: null,
  page: null,

  initialize: async () => {

    instagram.browser = await puppeteer.launch({
      headless: false,
      args: ['--lang=en-US']
    });

    instagram.page = await instagram.browser.newPage();

  },

  login: async (username, password) => {

    // wait till the page is finished
    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000);

    // ou: selecionando pelo conteudo da tag a, vamos selecionar a tag 'a' q tem conteudo 'Conecte-se' (na real ele vai funcionar apenas com o "Log in")
    let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]');

    // Click on the login url button
    await loginButton[0].click();

    // wait for the navigation
    //await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    // wait 1sec
    await instagram.page.waitFor(4000);

    // Writing username and password
    await instagram.page.type('input[name="username"]', username, { delay: 50 });

    await instagram.page.type('input[name="password"]', password, { delay: 50 });

    // clicking on the login button
    loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
    await loginButton[0].click();

    // wait for the profile icon be ready
    await instagram.page.waitFor(5000);
    await instagram.page.waitFor('a > span[aria-label="Profile"]');
  
  },

  likeTagsProcess: async (tags = []) => {

    for (let i = 0; i < 3; i++) {
     
      for(let tag of tags) {

        // Go to the tag page
        await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
        await instagram.page.waitFor(1000);
  
        // recuperado os posts mais recentes, vai ser um array
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageselector-1
        let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');
  
        //console.log(posts);
  
        // queremos pegar os 3 primeiros apenas
        for(let i = 0; i < 3; i++) {
  
          // cada post vai ser um element handler
          let post = posts[i];
  
          // clicar no post
          await post.click();
  
          // wait for modal appear
          await instagram.page.waitFor('body[style="overflow: hidden;"]');

          let test = await instagram.page.$('body[style="overflow: hidden;"]');
          console.log(test);

          await instagram.page.waitFor(2000);
  
          // check if is likable (if we not already liked it)
          let isLikable = await instagram.page.$('span[aria-label="Like"]');

          console.log('isLikable outside if', isLikable);
          
          if(isLikable) {

            console.log('isLikable inside if', isLikable);
            await instagram.page.click('span[aria-label="Like"]');
  
          }
  
          // wait 3 segs
          await instagram.page.waitFor(3000);
  
          // Close modal
          let closeModalButton = await instagram.page.$x('//button[contains(text(), "Close")]');
  
          //console.log('closeModalButton', closeModalButton);
  
          await closeModalButton[0].click();
  
          // wait 1 segs
          await instagram.page.waitFor(1000);
        }
  
        // wait 50 segs
        await instagram.page.waitFor(10000);
      }

    }

  }

};

module.exports = instagram;