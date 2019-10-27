const ig = require('./instagram');

// this is a IFFE, Imedietely Invoked Function Expression
(async () => {

  await ig.initialize();

  await ig.login('username', 'password');

  await ig.likeTagsProcess(['javascript', 'nodejs', 'reactjs', 'angularjs', 'vuejs', 'reactnative', 'html', 'css', 'desenvolvedorweb', 'programador', 'desenvolvimentoweb', 'webdevelopment',  'mongodb', 'coding', 'php', 'pythonprogramming', 'coding', 'sql', 'nosql', 'mysql']);

})();

