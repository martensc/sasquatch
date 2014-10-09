var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// Compile Sass
gulp.task('sass', function() {
    gulp.src(['scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sass({
            includePaths: [require('node-bourbon').includePaths, 'scss', 'bower_components/foundation/scss'],
            outputStyle: 'expanded',
            imagePath: '../images'
        }))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(gulp.dest('css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

// Watch files
gulp.task('watch', function(event) {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
