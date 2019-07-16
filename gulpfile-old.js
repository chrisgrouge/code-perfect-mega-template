var gulp = require("gulp");
var gulpInline = require("gulp-inline-css");
var sass = require('gulp-sass');
var nunjucksRender = require("gulp-nunjucks-render");
var browserSync = require("browser-sync").create();

sass.compiler = require('node-sass');

// Rendering Nunjucks template components
gulp.task("nunjucks", function () {
  gulp
    .src("Master-Template/src/pages/*.+(html|nunjucks|njk)")
    .pipe(nunjucksRender(
      {
        path: ["Master-Template/src/templates"]
      }
    ))
    .pipe(gulpInline({ preserveMediaQueries: true, applyWidthAttributes: true, removeLinkTags: false }))
    .pipe(gulp.dest('Master-Template/dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Nunjucks Wrapper

gulp.task('nunjucks-module', function () {
  gulp
    .src("Master-Template/src/pages/**/*.+(html|nunjucks|njk)")
    .pipe(nunjucksRender(
      {
        path: ["Master-Template/src/templates"]
      }
    ))
    .pipe(gulpInline({ preserveMediaQueries: true, applyWidthAttributes: true, removeLinkTags: false }))
    .pipe(gulp.dest('Master-Template/dist/modules-test'))
})

gulp.task('cp-wrapper', gulp.series('nunjucks-module'))

// Sass 
gulp.task("sass", function() {
  return gulp.src('Master-Template/src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('Master-Template/src/css'))
})

// Browser-syncing
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "Master-Template/dist",
      index: "index.html"
    }
  });
})

// Watchers
gulp.task("watch", ["sass", "nunjucks"], function() {
  gulp.watch(["Master-Template/src/css/*.css"], ["nunjucks"]);
  gulp.watch(["Master-Template/src/scss/**/*.scss"], ["sass"]);
  gulp.watch(["Master-Template/src/**/*.+(html|nunjucks|njk)"], ["nunjucks"]);
});

gulp.task("default", ["watch"]);
