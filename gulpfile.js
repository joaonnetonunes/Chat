const changed = require('gulp-changed');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const gUtil = require('gulp-util');
const imageMin = require('gulp-imagemin');
const liveReload = require('gulp-livereload');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-minify-html');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const paths = {
    fontsSrc: 'public/fonts/',
    htmlSrc: 'src/views/',
    imgSrc: 'public/images/',
    jsSrc: 'public/js/',
    sassSrc: 'public/scss/',
    vendorSrc: 'public/vendor/',
    iconsSrc: 'public/icons/',
    stylesSrc: 'public/styles/',
    favIconSrc: 'public/',

    buildDir: 'build/',
    distDir: 'dist/',
    revDir: 'build/rev/'
};

let onError = (err) => {
    gUtil.beep();
    gUtil.log(gUtil.colors.red(err));
};

let initServer = () => {
    liveReload.listen();
    nodemon({
        script: 'app.js',
        ext: 'js'
    })
        .on('restart', () => {
            gulp.src('app.js')
                .pipe(liveReload())
                .pipe(notify('Reloading...'))
        });
};

/*
    tasks
 */
gulp.task('build-html', () => {
    return gulp
        .src(paths.htmlSrc.concat('**/*.hbs'))
        .pipe(changed(paths.buildDir.concat('/views')))
        .pipe(gulp.dest(paths.buildDir.concat('/views')))
        .pipe(liveReload());
});

gulp.task('build-css', () => {
    return gulp
        .src(paths.sassSrc.concat('**/*.scss'))
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: () => {
                console.log('SASS ERROR!')
            }
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(paths.buildDir.concat('/css')))
        .pipe(liveReload());
});

gulp.task('build-js', () => {
    return gulp
        .src(paths.jsSrc.concat('**/*.js'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(paths.buildDir.concat('/js')))
        .pipe(gulp.dest(paths.buildDir.concat('/js')))
        .pipe(liveReload());
});

gulp.task('build-images', () => {
    return gulp
        .src(paths.imgSrc.concat('**/*.+(png|jpeg|gif|jpg|svg)'))
        .pipe(changed(paths.buildDir.concat('/images')))
        .pipe(gulp.dest(paths.buildDir.concat('/images')))
        .pipe(liveReload());
});

gulp.task('build-fonts', () => {
    return gulp
        .src(paths.fontsSrc.concat('**/*.*'))
        .pipe(gulp.dest(paths.buildDir.concat('/fonts')))
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

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts', 'build-vendor', 'build-icons', 'build-styles', 'build-fav-icon'], (done) => {
    return initServer();
});

gulp.task('watch', () => {
    gulp.watch(['src/views/**/*.hbs'], ['build-html']);
    gulp.watch('public/scss/**', ['build-css']);
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