const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('core.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    gulp.src(scripts)
        .pipe(concat('bundle.js'))
        .pipe(gulpif(!devMode, uglify()))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function () {
    gulp.src('./src/images/**/*.{png,gif,jpg,jpeg,svg,ico}')
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('icons', function () {
    gulp.src('./src/css/vendor/base/fonts/**/*')
        .pipe(gulp.dest('./dist/css/fonts/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', function () {
    gulp.start(['css', 'js', 'html', 'icons']);
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        },
        port: 8080
    });
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/css/vendor/base/fonts/**/*'], ['icons']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/images/**/*.{png,gif,jpg,jpeg,svg,ico}'], ['images']);
    gulp.watch(['./src/templates/**/*.html'], ['html']);
});

gulp.task('clean', function () {
    return gulp.src('build', { read: false })
        .pipe(clean());
});
