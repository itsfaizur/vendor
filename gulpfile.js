/******************************************
Require
*******************************************/
var gulp              = require('gulp'),
    browserSync       = require('browser-sync'),
    reload            = browserSync.reload,
    // jade              = require('gulp-jade'),
    autoprefixer      = require('autoprefixer'),
    postcss           = require('gulp-postcss'),
    csswring          = require('csswring'),
    cssnano           = require('cssnano'),
    opacity           = require('postcss-opacity'),

    sass              = require('gulp-sass'),
    uglify            = require('gulp-uglify'),
    rename            = require('gulp-rename'),
    del               = require('del'),
    imagemin          = require('gulp-imagemin'),

    // Error function npm
    plumber           = require('gulp-plumber'),
    gutil             = require('gulp-util');


/******************************************
 Error function
*******************************************/
function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}

/******************************************
 Postcss + Sass task
*******************************************/
gulp.task('sass', function () {
      var processors = [
        autoprefixer({ browsers: ['> 0%', 'last 2 versions'] }),
        csswring,
        cssnano({zindex : false}),
        opacity,
      ];

      return gulp.src(['assets/scss/*.scss', '!assets/scss/*.min.js'])
      .pipe(plumber({ errorHandler: onError }))
      .pipe(sass({
        includePaths: ['css']
      }))
      .pipe(rename({suffix:'.min'}))
      .pipe(postcss(processors))
      .pipe(gulp.dest('./css'))
      .pipe(reload({stream:true}));
});

/******************************************
/* Script task
*******************************************/
gulp.task('scripts', function(){
  return gulp.src(['assets/js/*.js', '!assets/js/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('./js'))
  .pipe(reload({stream:true}));
});

/******************************************
/* jade task
*******************************************/
// gulp.task('jade', function(){
//   return gulp.src('assets/jade/*.jade')
//   .pipe(plumber({ errorHandler: onError }))
//   .pipe(jade({pretty: true}))
//   .pipe(gulp.dest('./'));
// });

/******************************************
/* html task
*******************************************/
gulp.task('html', function(){
  return gulp.src('*.html')
  .pipe(reload({stream:true}));
});

/******************************************
browserSync task
*******************************************/
gulp.task('browserSync', function(){
  browserSync({
    server:{
      baseDir: ''
    },
      notify: false
  });
});


/******************************************
Watch task
*******************************************/
gulp.task('watch', function(){
  gulp.watch('assets/scss/**', ['sass']);
  gulp.watch('assets/js/*.js', ['scripts']);
  // gulp.watch('assets/jade/*.jade', ['jade']);
  gulp.watch('*.html', ['html']);
});


/******************************************
images compress task
*******************************************/
gulp.task('imgcom', function(){
  return gulp.src('assets/img/*')
    .pipe(imagemin({
       progressive: true,
    }))
    .pipe(gulp.dest('./img'));
});


/******************************************
Default task
*******************************************/
gulp.task('default', ['browserSync', 'watch', 'sass', 'scripts']);
