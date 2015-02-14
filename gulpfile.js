var gulp = require('gulp');

var del = require('del');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var reactify = require('reactify');

var paths = {
    js: {
        src: './js/main.js',
        all: './js/**/*.*',
        dest: 'bundle.js'
    },
    sass: {
        all: './scss/**/*.scss',
        src: './scss/app.scss'
    },
    dist: './dist'
};

gulp.task('default', ['build']);

gulp.task('build', function(cb) {
    runSequence('clean', ['build-sass', 'build-js'], cb);
});

gulp.task('watch', function(cb) {
    livereload.listen();
    runSequence('clean', ['watch-sass', 'watch-js'], cb);
});

gulp.task('watch-js', ['build-js'], function() {
    gulp.watch(paths.js.all, ['build-js']);
});

gulp.task('watch-sass', ['build-sass'], function() {
    gulp.watch(paths.sass.all, ['build-sass']);
});

gulp.task('build-js', function() {
    browserify(paths.js.src)
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('build-sass', function () {
    gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('clean', function(cb) {
    del([paths.dist], cb);
});






