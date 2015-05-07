var fs = require('fs');
var version = 'v' + JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

var del = require('del');

var gulp = require('gulp');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

var sass = require('gulp-sass');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var minifyCSS= require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');

/* ========= */
/* VARIABLES */
/* ========= */

var paths = {
    app: 'app',
    css: {
        dist: 'public/assets/css'
    },
    dist: 'public',
    images: {
        src: ['app/assets/images/*.png', 'app/assets/images/*.gif'],
        dist: 'public/assets/images'
    },
    js: {
        src: [
            'app/**/app.js',
            'app/**/*.module.js',
            'app/**/*.js'
        ],
        dist: 'public'
    },
    sass: {
        src: 'app/assets/scss'
    },
    templates: {
        src: 'templates',
        dist: 'public'
    }
};

/* ================== */
/* ONLY FOR DEVELOPER */
/* ================== */

gulp.task('serve', function(next) {
    runSequence('build', 'browser-sync', 'nodemon', next);
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: [paths.dist + '/**/*.*'],
        port: 7000,
        open: false
    });

    gulp.watch(paths.sass.src + '/*.scss', ['build:scss']);
    gulp.watch(paths.images.src + '/*.scss', ['build:images']);
    gulp.watch(paths.js.src, ['build:js']);
    gulp.watch(paths.templates.src + '/**/*.html').on('change', browserSync.reload);
});

gulp.task('nodemon', function () {
    return nodemon({
        script: 'server.js',
        watch: 'server.js'
    });
});

/* ========== */
/* PRODUCTION */
/* ========== */

gulp.task('build', function(next) {
    runSequence('build:clean', 'build:js', 'build:images', 'build:scss', next);
});

gulp.task('build:scss', function() {
    return gulp.src(paths.sass.src + '/*.scss')
        .pipe(sourcemaps.init())
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dist));
});

gulp.task('build:images', function() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task('build:js', function() {
    return gulp.src(paths.js.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(replace(/GULP_APP_VERSION/g, version))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(babel())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.min.js'))
            .pipe(ngAnnotate())
            // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dist));
});

gulp.task('build:clean', function(next) {
    del([
        paths.dist
    ], next);
});


/*========*/
/* OTHERS */
/*========*/

// Gulp plumber error handler
var onError = function(err) {
    console.error(err.message);
    this.emit('end');
};
