const {
  series,
  src,
  dest,
  watch,
  parallel
} = require("gulp");
const gulpInline = require("gulp-inline-css");
const sass = require('gulp-sass');
const nunjucksRender = require("gulp-nunjucks-render");
const htmlmin = require('gulp-html-minifier');
const dom = require('gulp-dom');
const browserSync = require("browser-sync");
const server = browserSync.create();

sass.compiler = require('node-sass');



function copy() {
  return src('./Master-Template/src/assets/*.+(png|jpg|gif|jpeg)')
    .pipe(dest('./Master-Template/dist/assets/'))
}

/* 

 * Standard Nunjucks script:
  * - Run when the default `gulp` script is run
    - Looks for files in the 'Master-Template/src/pages/' folder
    - Runs it thorough the nunjucks function
    - Inlines css
    - and outputs the results here 'Master-Template/dist/'
    - streams changes to browser-sync instance invoked by the `gulp` script
*/

function nunjucks() {
  return src('Master-Template/src/pages/*.+(html|nunjucks|njk)')
    .pipe(
      nunjucksRender({
        path: ["Master-Template/src/templates"]
      }))
    .pipe(
      gulpInline({
        preserveMediaQueries: true,
        applyWidthAttributes: true,
        removeLinkTags: false
      }))
    .pipe(dest('Master-Template/dist'))
    .pipe(browserSync.stream());
}

/* 

 * Code Perfect Specific Nunjucks script:
  - Looks for files in the 'Master-Template/src/pages/modules/' folder
  - Runs it thorough the nunjucks function
  - Minifies the html
  - and outputs the results here 'Master-Template/dist/modules' 

*/

/* 
  ! This is pretty much complete!
  ! The only improvement that could
  ! be made would be to remove the tags that 
  !  'gulp-dom' wraps around the module */ 

function getDataAttributes() {
  let number = -1;
    this.querySelectorAll('[data-type]').forEach(cell => {
      const attr = this.querySelector('span').getAttribute('data');
      cell.setAttribute('data', `${attr}${number += 1}`);
    });
  return this;
}


function nunjucks_cp() {
  return src('Master-Template/src/pages/modules/*.+(html|nunjucks|njk)')
  .pipe(
    nunjucksRender({
      path: ["Master-Template/src/templates"]
    }))
      .pipe(dom(getDataAttributes))
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
    .pipe(dest('Master-Template/dist/modules-test'))
}

function sassFn() {
  return src('Master-Template/src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('Master-Template/src/css'))
    .pipe(browserSync.stream());
}

function browser_sync(done) {
  browserSync.init({
    server: {
      baseDir: "Master-Template/dist",
      index: "index.html"
    }
  });
  done();
}

// ? Not sure if I'll need this
/* function reload(done) {
  server.reload();
  done();
} */

function watchFiles() {
  watch(
    [
      'Master-Template/src/scss/**/*.scss',
      'Master-Template/src/**/*.+(html|nunjucks|njk)'
    ], series(sassFn, nunjucks))
  watch('Master-Template/src/assets/*.+(png|jpg|gif|jpeg)', copy)
}

const watchFn = parallel(watchFiles, browser_sync);

exports.default = watchFn;

exports.cp_njk = nunjucks_cp;
