const ig = require('./instagram');

// this is a IFFE, Imedietely Invoked Function Expression
(async () => {

  await ig.initialize();

  await ig.login('jwandekoken', 'wndk#999_masstry');

  await ig.likeTagsProcess(['desenvolvedorweb', 'desenvolvimentoweb', 'javascript', 'nodejs', 'reactjs', 'angularjs', 'html', 'css', 'webdevelopment',  'coding', 'php', 'python', 'coding', 'php', 'sql', 'nosql', 'mysql', 'mongodb']);

})();

