const changed = require('gulp-changed');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const gUtil = require('gulp-util');
const imageMin = require('gulp-imagemin');
const liveReload = require('gulp-livereload');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-minify-html');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const paths = {
    fontsSrc: 'src/fonts/',
    htmlSrc:  'src/',
    sassSrc:  'src/scss/',
    jsSrc:    'src/js/',
    imgSrc:   'src/images/',
    vendorSrc: 'src/vendor/',
    iconsSrc: 'src/icons/',
    stylesSrc: 'src/styles/',
    favIconSrc: 'src/',

    buildDir: 'build/',
    distDir:  'dist/',
    revDir:   'build/rev/'
};

let onError = (err) => {
    gutil.beep();
    gutil.log(gutil.colors.red(err));
};

gulp.task('build-html', () => {
    return gulp
        .src(paths.htmlSrc.concat('**/*.html'))
        .pipe(gulp.dest(paths.buildDir.concat('/')))
        .pipe(liveReload());
});

gulp.task('build-css', () => {
    return gulp
        .src(paths.sassSrc.concat('**/*.scss'))
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: function(){
                console.log('SASS ERROR!')
            }
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(paths.buildDir.concat('/css')))
        .pipe(liveReload());
});

gulp.task('build-js', () => {
    return gulp
        .src(paths.jsSrc.concat('*.js'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(paths.buildDir.concat('/js')))
        .pipe(gulp.dest(paths.buildDir.concat('/js')))
        .pipe(liveReload());
});

gulp.task('build-fonts', () => {
    return gulp
        .src(paths.fontsSrc.concat('**/*.*'))
        .pipe(gulp.dest(paths.buildDir.concat('/fonts')))
        .pipe(liveReload());
});

gulp.task('build-images', () => {
    return gulp
        .src(paths.imgSrc.concat('**/*.+(png|jpeg|gif|jpg|svg)'))
        .pipe(changed(paths.buildDir.concat('/images')))
        .pipe(gulp.dest(paths.buildDir.concat('/images')))
        .pipe(liveReload());
});

gulp.task('build-vendor', () => {
    return gulp
        .src(paths.vendorSrc.concat('**/*.*'))
        .pipe(gulp.dest(paths.buildDir.concat('/vendor')))
        .pipe(liveReload());
});

gulp.task('build-icons', () => {
    return gulp
        .src(paths.iconsSrc.concat('**/*.*'))
        .pipe(gulp.dest(paths.buildDir.concat('/icons')))
        .pipe(liveReload());
});

gulp.task('build-styles', () => {
    return gulp
        .src(paths.stylesSrc.concat('**/*.*'))
        .pipe(gulp.dest(paths.buildDir.concat('/styles')))
        .pipe(liveReload());
});

gulp.task('build-fav-icon', () => {
    return gulp
        .src(paths.favIconSrc.concat('favicon.ico'))
        .pipe(gulp.dest(paths.buildDir.concat('/')))
        .pipe(liveReload());
});

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts', 'build-vendor', 'build-icons', 'build-styles', 'build-fav-icon'], () => {
    return connect.server({
        root: 'src',
        liveReload: true
    });
});

gulp.task('watch', () => {
    gulp.watch(['src/*.html'], ['build-html']);
    gulp.watch('src/scss/**', ['build-css']);
    gulp.watch('public/fonts/**', ['build-fonts']);
    gulp.watch('public/vendor/**', ['build-vendor']);
    gulp.watch('public/icons/**', ['build-icons']);
    gulp.watch('public/styles/**', ['build-styles']);
    gulp.watch('public/**', ['build-fav-icon']);
    gulp.watch(paths.jsSrc + '**/*.js', ['build-js']);
    gulp.watch(paths.imgSrc + '**/*.+(png|jpeg|jpg|svg)', ['build-images']);
});

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    return gulp.task('default', ['build', 'watch']);
}