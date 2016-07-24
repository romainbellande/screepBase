var gulp   = require('gulp'),
browserify = require('browserify'),
livescript = require('gulp-livescript'),
watch      = require('gulp-watch'),
source     = require('vinyl-source-stream'),
path       = require('path');
var entryName = 'main.js';
var paths = {
  ls: [path.join(__dirname, 'src/**/*.ls')],
  build: path.join(__dirname, 'build'),
  buildEntry: path.join(__dirname, 'build', 'main.js'),
  dest: __dirname
};

gulp.task('ls', function() {
  return gulp.src(paths.ls)
  .pipe(livescript())
  .pipe(gulp.dest(paths.build));
});

gulp.task('browserify', ['ls'], function () {
  browserify(paths.buildEntry)
    .bundle()
    .pipe(source(entryName))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['browserify'], function () {
  gulp.watch(paths.ls, ['browserify']);
});
gulp.task('default', ['watch']);
