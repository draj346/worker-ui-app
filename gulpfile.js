const gulp = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const rimraf = require('rimraf');

// Clean output directory
function clean(done) {
  rimraf.sync('dist');
  done();
}

// Transpile, polyfill, and bundle using .babelrc config
function build() {
  return gulp.src('scripts/UI/**/*.js')
    .pipe(babel()) // Automatic .babelrc detection
    .pipe(concat('bundle.min.js'))
    .pipe(terser({
      compress: {
        drop_console: true,
        ecma: 5
      },
      mangle: {
        toplevel: true
      }
    }))
    .pipe(gulp.dest('dist'));
}

exports.clean = clean;
exports.build = gulp.series(clean, build);