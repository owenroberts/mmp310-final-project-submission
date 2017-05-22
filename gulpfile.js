"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
 connect = require('gulp-connect'),
browserSync = require('browser-sync').create();

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery-1.11.2.min.js',
        'js/sticky/jquery.sticky.js',
        'js/animsition/jquery.animsition.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  // Watching all sass files and only runs the compileSass task
  gulp.watch('css/*.css', browserSync.reload);
  // Only runs main.js file and runs the concatScripts task
  gulp.watch('js/*.js', ['concatScripts']);
  gulp.watch('*.html', browserSync.reload);


})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts'], function() {
  return gulp.src(["css/main.css", "js/app.min.js", '*.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('prod'));
});

gulp.task('serve', ['browser-sync','watchFiles', 'build'], function() {
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task("default", ["build"]);
