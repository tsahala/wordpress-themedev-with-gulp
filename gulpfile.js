var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Sass

gulp.task('sass', function () {
    gulp.src('./develop/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError)) // Keep running gulp even though occurred compile error
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
				.pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./'))
        .pipe(reload({stream:true}));
});

// Js-browserify-babelify-concat-uglify

gulp.task('js', function () {
		return browserify('./develop/es6/scripts-core.js', { debug: true })
				.transform(babelify)
				.bundle()
				.on("error", function (err) { console.log("Error : " + err.message); })
				.pipe(source('scripts-core.js'))
				.pipe(gulp.dest('./develop/js'))
				.pipe(buffer())
				.pipe(plumber({errorHandler: notify.onError('<%= error %>')}))
	      .pipe(concat('scripts.js'))
	      .pipe(uglify({preserveComments: 'some'})) // Keep some comments
	      .pipe(gulp.dest('./js'))
	      .pipe(reload({stream:true}));
});

// Imagemin

gulp.task('imagemin', function() {
    gulp.src(['./develop/images/**/*.{png,jpg,gif,svg}'])
		/*
        .pipe(imagemin({
            optimizationLevel: 7,
            use: [pngquant({
                quality: '60-80',
                speed: 1
            })]
        }))
				*/
        .pipe(gulp.dest('images'));
});


// Static server

gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'http://localhost:8888/',
    });
});

// Reload all browsers

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Task for `gulp` command

gulp.task('default',['browser-sync'], function() {
    gulp.watch('develop/sass/**/*.scss',['sass']);
    gulp.watch('develop/es6/*.js',['js']);
    gulp.watch('develop/images/**',['imagemin']);
    gulp.watch("./**/*.php", ['bs-reload']);
});
