"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
browserSync = require('browser-sync').create();

gulp.task("concatScripts", function() {
    return gulp.src([
        'jquery.js',
        'app.js'
        ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watchFiles', function() {
  // Watching all sass files and only runs the compileSass task
  gulp.watch('*.css', browserSync.reload);
  // Only runs main.js file and runs the concatScripts task
  gulp.watch('js/*.js', browserSync.reload);
  gulp.watch('*.css', browserSync.reload);
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
  return gulp.src(["css/main.css", "js/app.min.js", 'index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('prod'));
});

gulp.task('serve', ['browser-sync','watchFiles', 'build'], function() {
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task("default", ["build"]);
