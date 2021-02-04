const { src, dest, watch, series } = require("gulp");
const ngAnnotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const templateCache = require("gulp-angular-templatecache");
const replace = require("gulp-replace");
const uglify = require("gulp-uglify");

sass.compiler = require("node-sass");

function vendor() {
  const files = ["./node_modules/angular/angular.min.js", "./node_modules/angular-route/angular-route.min.js"];
  return src(files).pipe(concat("vendor.js")).pipe(dest("vendor/"));
}

function css() {
  return src("./src/pages/**/*.scss").pipe(sass()).pipe(cssnano()).pipe(concat("app.css")).pipe(dest("dist/"));
}

function configScripts() {
  const files = ["./src/config/app.js", "./src/config/routes.js", "./src/config/templates.js", "./src/pages/**/*.js"];
  return src(files).pipe(ngAnnotate()).pipe(concat("core.js")).pipe(uglify()).pipe(dest("dist"));
}

function html() {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"))
    .pipe(templateCache({ module: "app", filename: "templates.js", base: __dirname + "/dist" }))
    .pipe(dest("src/config"));
}

function nocache() {
  return src(["index.html"]).pipe(replace("core.js", "core.js?v=2aa")).pipe(dest("./"));
}

exports.html = html;
exports.css = css;
exports.vendor = vendor;
exports.config = configScripts;
exports.replace = nocache;
exports.build = series(css, html, configScripts, nocache);
