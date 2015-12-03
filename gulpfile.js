var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var preprocess = require('gulp-preprocess');


gulp.task('templates', function () {
  gulp.src('app/src/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('app/src/js'));
});

gulp.task('default', ['templates'], function () {
    gulp.src('app/src/js/modules/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('app/src/js'));
});

gulp.task('watch', function(){
    gulp.watch('app/src/js/modules/**/*.js', ['default']);
});

gulp.task('vendors', function() {
    gulp.src([
        'app/src/js/vendors/angular.min.js',
        'app/src/js/vendors/angular-ui-router.min.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('app/src/js'));
});

gulp.task('css', function() {
  gulp.src('app/src/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('dist',['default', 'vendors', 'templates', 'css'], function() {
    gulp.src('app/src/index.html')
        .pipe(preprocess({context: { NODE_ENV: 'dist'}}))
        .pipe(gulp.dest('app/dist'));
    gulp.src(['app/src/js/vendors.js', 'app/src/js/app.js', 'app/src/js/templates.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('app/dist/js'));
    gulp.src('app/src/css/fonts/**/*').pipe(gulp.dest('app/dist/css/fonts'));
    gulp.src('app/src/css/img/**/*').pipe(gulp.dest('app/dist/css/img'));
});
