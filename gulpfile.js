var gulp = require("gulp");
var gulpInline = require("gulp-inline-css");
var nunjucksRender = require("gulp-nunjucks-render");
var browserSync = require("browser-sync").create();


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
        baseDir: "Master-Template/dist",
        index: "index.html"
      }
    });
  }, 500);
}

// Watchers
gulp.task("watch", ["gulpInline", "browserSync", "nunjucks"], function() {
  gulp.watch(["Master-Template/src/css/*.css"], ["nunjucks"]);
  gulp.watch(["Master-Template/src/**/*.+(html|nunjucks|njk)"], ["nunjucks"]);
});

gulp.task("default", ["watch"]);
