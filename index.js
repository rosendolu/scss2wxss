const sass = require('node-sass');
const chokidar = require('chokidar');
const PATH = require('path');
const fs = require('fs');
const log = console.log.bind(console);

chokidar
  .watch('.', {
    ignored: /(node_modules)/ // ignore node_modules
  })
  .on('all', (event, path) => {
    if (/.scss$/.test(path)) {
      log(`====> `, event, path);
      log(`path.resovle`, PATH.resolve(__dirname, path));
      sass.render(
        {
          file: PATH.resolve(__dirname, path),
          // includePaths: ['lib/', 'mod/'],
          outputStyle: 'expanded',
          outFile: PATH.resolve(
            __dirname,
            `${path.match(/^[\w|-|/]+/)[0]}.wxss`
          )
        },
        function (error, result) {
          if (error) {
            log(error);
          } else {
            log(`=====> result `, result);
            const { entry = '' } = result.stats || {};
            log(result.css.toString());
            fs.writeFile(
              `${entry.match(/^[\w|-|/]+/)[0]}.wxss`,
              result.css,
              function (err) {
                if (!err) {
                  log(err);
                }
              }
            );
          }
        }
      );
    }
  });
