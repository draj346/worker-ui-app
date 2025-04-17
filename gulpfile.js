const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const rimraf = require('rimraf');

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
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(terser({
      compress: { ecma: 5 },
      mangle: { toplevel: true },
      format: { comments: false }
    }))
    .pipe(gulp.dest('dist'));
}

exports.clean = clean;
exports.build = gulp.series(clean, build);