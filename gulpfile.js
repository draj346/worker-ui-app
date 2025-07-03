const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rimraf = require('rimraf');
const { watch, series } = require('gulp');

function clean(done) {
  rimraf.sync('dist');
  done();
}

function build() {
  return browserify('scripts/UI/index.js', {
    debug: true, // Generate source maps
    plugin: [
      // ES6 module support plugin
      require('esmify') 
    ]
  })
  .bundle()
  .on('error', function(err) {
    console.error('Bundling error:', err.message);
    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
  .on('end', () => {
    console.log('ES6 bundle created at', new Date().toLocaleTimeString());
  });
}

exports.clean = clean;
exports.build = gulp.series(clean, build);
exports.watch = function() {
  console.log('Watching for ES6 changes...');
  return watch('scripts/UI/**/*.js', { ignoreInitial: false }, series(clean, build));
};