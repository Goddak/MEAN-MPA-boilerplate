const gulp       = require('gulp');
const pug        = require('gulp-pug');
const stylus     = require('gulp-stylus');
const clean      = require('gulp-clean');
const merge      = require('merge-stream');
const livereload = require('gulp-livereload');
const dirs   = {
  root: 'public/'
};
dirs.js      = dirs.root + 'js/';
dirs.css     = dirs.root + 'css/';
dirs.assets  = dirs.root + 'assets/';

gulp.task('default', function (done) {
  console.log('Gulp is working, but you didn\'t give it a task stupid!');
  done();
});

/* --------------- */
/*   CLEAN TASKS   */
/* --------------- */
gulp.task('clean-public', function () {
  let js = gulp.src(dirs.js + '*')
  .pipe(clean());
  let css = gulp.src(dirs.css + '*')
  .pipe(clean());
  let root = gulp.src(dirs.root + '*')
  .pipe(clean());
  let assets = gulp.src(dirs.assets + '*')
  .pipe(clean({ force: true }));

  return merge(js, css, root, assets);
});

/* --------------- */
/*   BUILD TASKS   */
/* --------------- */
gulp.task('build-pug', function () {
  return gulp.src('client/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest(dirs.root));
});

gulp.task('build-stylus', function () {
  return gulp.src('client/stylus/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest(dirs.css));
});

gulp.task('build-js', function () {
  return gulp.src('client/js/*.js')
  .pipe(gulp.dest(dirs.js));
});

gulp.task('copy-assets', function (done) {
  return gulp.src('client/assets/**/*.*')
  .pipe(gulp.dest(dirs.assets))
  .pipe(livereload());
});

/* -------------------- */
/*   EXECUTABLE TASKS   */
/* -------------------- */
gulp.task(
  'build',
  gulp.series(
    'build-pug',
    'build-stylus',
    'build-js',
    'copy-assets'
  )
);

gulp.task(
  'watch',
  function () {
    livereload.listen();
    var watch = gulp.watch(
      'client/**/*.*',
      gulp.series('build')
    );
  }
);
