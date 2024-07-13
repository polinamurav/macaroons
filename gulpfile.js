'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

function defaultTask() {
    return gulp.src('./css/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
}

exports.default = defaultTask;

exports.watch = function () {
    gulp.watch('./css/*.less', gulp.series('default'));
};

const {src, task}= require('gulp');
const ghPages = require('gulp-gh-pages');

task('deploy', () => src('./dist/**/*', '.html').pipe(ghPages()));

//gulp deploy и публикуется