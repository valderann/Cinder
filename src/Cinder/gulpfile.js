/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

gulp.task('ts-core', function () {
    return gulp.src(['scripts/Typescript/Core/**/*.ts', 'scripts/Typescript/Typings/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts({
            out: 'core.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('wwwroot/scripts/'));
});

gulp.task('ts-pages', function () {
    return gulp.src(['scripts/Typescript/Pages/**/*.ts', 'scripts/Typescript/Typings/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts({
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('wwwroot/scripts/pages'));
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('scripts/Typescript/Core/**/*.ts', ['ts-core']);
    gulp.watch('scripts/Typescript/Components/**/*.ts', ['ts-components']);
    gulp.watch('scripts/Typescript/Components/**/*.ts', ['ts-pages']);
    gulp.watch('./Design/Css/**/*.less', ['less']);
});