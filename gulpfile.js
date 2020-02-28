"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var refresh = require("gulp-livereload");
var client = require("tiny-lr")();
var nodemon = require("gulp-nodemon");
var sass = require("gulp-sass");
var del = require("del");
var concat = require("gulp-concat");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-minify-css");
var bower = require("main-bower-files");
var runSequence = require("run-sequence");
var templateCache = require("gulp-angular-templatecache");

var lrPort = 35728; // Livereload port

// Paths to source files/folders to be used in tasks
var paths = {
  scripts: ["!src/client/lib/**/*.js", "src/client/app/**/*.js"],
  vendorScripts: ["src/client/lib/**/*.js"],
  views: [
    "!src/client/lib/*.html",
    "src/client/**/*.html",
    "src/client/index.html"
  ],
  styles: {
    css: ["!src/client/lib/**/*.css", "src/client/styles/css/*.css"],
    sass: ["src/client/styles/sass/*.sass", "src/client/**/*.sass"],
    dest: "src/client/styles",
    vendor: "src/client/lib/**/*.css"
  },
  fonts: [
    "src/client/styles/fonts/*.*",
    "src/client/lib/font-awesome/fonts/*.*"
  ],
  html: "src/client/index.html",
  templates: "src/client/app/**/*.html",
  images: "src/client/images/**.*",
  favicon: "src/client/favicon.ico"
};

// Paths to destination files/folders which will be updated during tasks
var dist = {
  path: "dist",
  scripts: "dist/js",
  styles: "dist/css",
  images: "dist/images",
  fonts: "dist/css/fonts"
};

gulp.task("serve", function() {
  nodemon({ script: "app.js", ignore: ["node_modules/**/*.js"] });
});

gulp.task("live", function() {
  client.listen(lrPort, function(err) {
    if (err) return console.error(err);
  });
});

gulp.task("watch", function() {
  gulp.watch(paths.styles.sass, ["styles"]);
  gulp.watch(paths.templates, ["templates"]);
  gulp.watch(paths.scripts, ["scripts"]);
});

gulp.task("refresh", function() {
  refresh(client);
});

gulp.task("clean", function(cb) {
  return del(dist.path, cb);
});

gulp.task("html", function() {
  return gulp
    .src(paths.html)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(dist.path))
    .pipe(refresh(client));
});

gulp.task("scripts", function() {
  return gulp
    .src([
      // NOTE: be aware of dependencies between files when setting load order
      "src/client/app/app.js",
      "src/client/app/shared/index.js",
      "src/client/app/shared/**/*.js",
      "src/client/app/profile/index.js",
      "src/client/app/profile/**/*.js",
      "src/client/app/admin/index.js",
      "src/client/app/admin/**/*.js"
    ])
    .pipe(uglify({ mangle: false }))
    .pipe(concat("app.js"))
    .pipe(gulp.dest(dist.scripts))
    .pipe(refresh(client));
});

gulp.task("scripts:vendor", function() {
  return gulp
    .src(bower({ filter: /\.js$/ }))
    .pipe(concat("vendor.js"))
    .pipe(uglify())
    .pipe(gulp.dest(dist.scripts))
    .pipe(refresh(client));
});

gulp.task("styles", function() {
  return gulp
    .src(paths.styles.sass)
    .pipe(sass())
    .pipe(cssmin())
    .pipe(concat("styles.css"))
    .pipe(gulp.dest(dist.styles))
    .pipe(refresh(client));
});

gulp.task("styles:vendor", function() {
  return gulp
    .src(bower({ filter: /\.css$/ }))
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest(dist.styles))
    .pipe(refresh(client));
});

// AngularJS-specific task for compiling templates into angular modules
gulp.task("templates", function() {
  return gulp
    .src(paths.templates)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(
      templateCache({
        module: "app.templates", // Set module name. Import usage: angular.module('my-app', ['app.templates'])
        standalone: true,
        transformUrl: function(url) {
          return "app/" + url; // Set path to template
        }
      })
    )
    .pipe(gulp.dest(dist.scripts))
    .pipe(refresh(client));
});

gulp.task("images", function() {
  return gulp.src(paths.images).pipe(gulp.dest(dist.images));
});

gulp.task("fonts", function() {
  return gulp.src(paths.fonts).pipe(gulp.dest(dist.fonts));
});

gulp.task("favicon", function() {
  return gulp.src(paths.favicon).pipe(gulp.dest(dist.path));
});

gulp.task("build", [
  "html",
  "scripts",
  "scripts:vendor",
  "styles",
  "styles:vendor",
  "templates",
  "images",
  "fonts",
  "favicon"
]);

gulp.task("default", function() {
  runSequence("clean", "build", "live", "serve", "watch");
});

process.once("SIGINT", function() {
  process.exit(0);
});
