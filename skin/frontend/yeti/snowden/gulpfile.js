var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');

// Compile Sass
gulp.task('sass', function() {
    gulp.src('assets/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['scss', 'bower_components/foundation/scss'],
            outputStyle: 'compressed',
            imagePath: '../images'
        }))
        .pipe(sourcemaps.write({
            includeContent: false
        }))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'));
});

// Concat and Min Lib JS
gulp.task('lib-js', function() {
  gulp.src([
    'bower_components/modernizr/modernizr.js',
    'bower_components/foundation/js/foundation.min.js',
    'bower_components/enquire/dist/enquire.js',
    'bower_components/imagesloaded/imagesloaded.pkgd.js'
  ])
    .pipe(concat('lib.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('assets/js'));
});

// Concat and Min Product View JS
gulp.task('prodview-js', function() {
  gulp.src([
    'bower_components/elevatezoom/jquery.elevateZoom.js',
  ])
    .pipe(concat('prodview.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('assets/js'));
});

// Watch files
gulp.task('watch', function() {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'lib-js', 'prodview-js', 'watch']);
