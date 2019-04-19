var gulp = require("gulp");
var gulpInline = require("gulp-inline-css");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");


//Image compression
gulp.task("imagemin", function() {
  gulp
    .src("Master-Template/src/assets/*")
    .pipe(imagemin())
    .pipe(gulp.dest('Master-Template/dist/assets'));
});


// Automatic Inlining
gulp.task("gulpInline", function() {
  gulp
    .src("Master-Template/src/build.html")
    .pipe(gulpInline({ preserveMediaQueries: true, applyWidthAttributes: true, removeLinkTags: false }))
    .pipe(gulp.dest("Master-Template/dist/build-inline"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});


//Browser-syncing 
gulp.task("browserSync", runSync);

function runSync() {
  setTimeout(function() {
    browserSync.init({
      server: {
        baseDir: "Master-Template/src",
        index: "build.html"
      }
    });
  }, 500);
}

// Watchers
gulp.task("watch", ["gulpInline", "browserSync", "imagemin"], function() {
  gulp.watch(["Master-Template/src/build.html"], ["gulpInline"]);
  gulp.watch(["Master-Template/src/css/*.css"], ["gulpInline"]);
  gulp.watch(["Master-Template/src/assets/*"], ["imagemin"]);
});

gulp.task("default", ["watch"]);
