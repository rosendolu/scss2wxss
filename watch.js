const sass = require('node-sass');
const chokidar = require('chokidar');
const PATH = require('path');
const fs = require('fs');

const log = console.log.bind(console);

chokidar
  .watch('*.scss', {
    ignored: /(node_modules)/, // ignore dotfiles
  })
  .on('all', (event, path) => {
    log(`====> `, event, path);
    log(`path.resovle`, PATH.resolve(__dirname, path));
    sass.render(
      {
        file: PATH.resolve(__dirname, path),
        // importer: function (url, prev, done) {
        //   // url is the path in import as is, which LibSass encountered.
        //   // prev is the previously resolved path.
        //   // done is an optional callback, either consume it or return value synchronously.
        //   // this.options contains this options hash, this.callback contains the node-style callback
        //   someAsyncFunction(url, prev, function (result) {
        //     done({
        //       file: result.path, // only one of them is required, see section Special Behaviours.
        //       contents: result.data,
        //     });
        //   });
        //   // OR
        //   var result = someSyncFunction(url, prev);
        //   return { file: result.path, contents: result.data };
        // },
        // includePaths: ['lib/', 'mod/'],
        outputStyle: 'expanded',
        outFile: PATH.resolve(__dirname, `${path.match(/^\w+/)[0]}.wxss`),
      },
      function (error, result) {
        // node-style callback from v3.0.0 onwards
        if (error) {
          log(error); // used to be "code" in v2x and below
        } else {
          log(`=====> result `, result);
          const { entry = '' } = result.stats || {};
          log(result.css.toString());
          fs.writeFile(
            `${entry.match(/^[\w|\/]+/)[0]}.wxss`,
            result.css,
            function (err) {
              if (!err) {
                //file written on disk
              }
            },
          );
          // console.log(result.stats);
          // console.log(result.map.toString());
          // // or better
          // console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
        }
      },
    );
  });
