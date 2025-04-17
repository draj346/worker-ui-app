const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const terser = require('gulp-terser');
const rimraf = require('rimraf');
const { watch, series } = require('gulp');

function clean(done) {
  rimraf.sync('dist');
  done();
}

function build() {
  return browserify('scripts/UI/index.js') // Entry point
    .transform('babelify', {
      extensions: ['.js'],
      presets: ['@babel/preset-env'], // Inherits from .babelrc
      plugins: ['transform-remove-console'] // Inherits from .babelrc
    })
    .bundle()
    .on('error', function(err) {
      console.error('Browserify error:', err.message);
      this.emit('end');
    })
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(terser({
      compress: { ecma: 5 },
      mangle: { toplevel: true },
      format: { comments: false }
    }))
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      console.log('Build completed at', new Date().toLocaleTimeString());
    });
}


exports.clean = clean;
exports.build = gulp.series(clean, build);
exports.watch = function() {
  console.log('Watching for changes...');
  return watch('scripts/UI/**/*.js', { ignoreInitial: false }, series(clean, build));
};