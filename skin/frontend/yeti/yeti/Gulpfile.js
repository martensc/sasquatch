var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// Compile Sass
gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                require('node-bourbon').includePaths,
                'scss', 'bower_components/foundation/scss'
            ],
            outputStyle: 'compressed',
            imagePath: '../images'
        }))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('css'));
});

// Watch files
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
