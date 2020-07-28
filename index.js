const sass = require('node-sass');
const chokidar = require('chokidar');
const nodePath = require('path');
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

function build() {
  chokidar
    .watch('.', {
      ignored: /(node_modules)/ // ignore node_modules
    })
    .on('all', (event, path) => {
      if (/.scss$/.test(path)) {
        log(chalk.bold(event), chalk.green(path));
        log(
          chalk.bold('path'),
          chalk.yellow(nodePath.resolve(__dirname, path))
        );
        sass.render(
          {
            file: nodePath.resolve(__dirname, path),
            // includePaths: ['lib/', 'mod/'],
            outputStyle: 'expanded'
            // outFile: nodePath.resolve(
            //   __dirname,
            //  `${entry.replace(/\.scss/, '.wxss')}`
            // )
          },
          function (error, result) {
            if (error) {
              log(chalk.red(error));
            } else {
              const { entry = '' } = result.stats || {};
              // log(result.css.toString());
              log(entry);
              fs.writeFile(
                `${entry.replace(/\.scss/, '.wxss')}`,
                result.css,
                function (err) {
                  if (err) {
                    log(chalk.red(err));
                  }
                }
              );
            }
          }
        );
      }
    });
}
module.exports = { build };
