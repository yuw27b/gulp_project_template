'use strict';

var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  gulp_concat = require('gulp-concat'),
  gulp_uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  fileinclude = require('gulp-file-include'),
  browserSync = require('browser-sync');

var libs = {
  css: [
    'node_modules/font-awesome/css/font-awesome.min.css'
  ],
  js: []
};

gulp.task('js-lib', function () {
  return gulp.src(libs.js)
    .pipe(gulp_concat('vendor.js'))
    .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('css-lib', function () {
  return gulp.src(libs.css)
    .pipe(gulp_concat('vendor.css'))
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('font-lib', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/assets/fonts/'));
});

gulp.task('setup-lib', function () {
  runSequence(
    ['css-lib', 'js-lib', 'font-lib']
  );
});

gulp.task('css', function () {
  return sass('htdocs/styles/style.scss', { style: 'expanded' })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 10'],
      cascade: true
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('js', function () {
  return gulp.src(['htdocs/scripts/*.js'])
    .pipe(gulp_concat('app.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['htdocs/*.html', 'htdocs/*/*.html', '-htdocs/includes/*.html'], { base: 'htdocs' })
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'htdocs/includes/'
    }))
    .pipe(gulp.dest('public/'));
});


gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

/* execute */
gulp.task('default', ['setup-lib', 'css', 'js', 'img-min', 'fileinclude', 'watch', 'server'], function (){});

gulp.task('watch', function() {
  gulp.watch(['htdocs/styles/*.scss'], ['css']);
  gulp.watch(['htdocs/scripts/*.js', 'htdocs/scripts/*/*.js'], ['js']);
  gulp.watch(['htdocs/images/*'], ['img-min']);
  gulp.watch(['htdocs/*.html', 'htdocs/*/*.html'], ['fileinclude']);
});
