'use strict';

var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  gulp_concat = require('gulp-concat'),
  gulp_uglify = require('gulp-uglify'),
  babel = require("gulp-babel"),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  fileinclude = require('gulp-file-include'),
  browserSync = require('browser-sync');

var bs = browserSync.create("_server");
bs.init({
    port: 3000,
    baseDir: 'public'
});

var libs = {
  css: [
    'node_modeuls/normalize.css/normalize.css',
    'node_modules/font-awesome/css/font-awesome.min.css'
  ],
  js: [
    'node_modules/axios/dist/axios.min.js',
    'node_modules/snapsvg/dist/snap.svg-min.js',
    'node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.min.js'
  ]
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
    .pipe(babel({
      sourceMap: false,
      modules: "common"
    }))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['htdocs/*.html'], { base: 'htdocs' })
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'htdocs/includes/'
    }))
    .pipe(gulp.dest('public/'));
});

/* execute */
gulp.task('default', ['setup-lib', 'css', 'js', 'fileinclude', 'watch'], function (){});

gulp.task('watch', function() {
  gulp.watch(['htdocs/styles/*.scss'], ['css', bs.reload]);
  gulp.watch(['htdocs/scripts/*.js', 'htdocs/scripts/*/*.js'], ['js', bs.reload]);
  gulp.watch(['htdocs/*.html', 'htdocs/*/*.html'], ['fileinclude', bs.reload]);
});
