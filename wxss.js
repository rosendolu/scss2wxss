const chokidar = require('chokidar');
const log = console.log.bind(console);
// One-liner for current directory
chokidar
  .watch('.', {
    ignored: /(node_modules)/, // ignore dotfiles
    persistent: true,
  })
  .on('all', (event, path) => {
    log(`====> `, event, path);
  });
