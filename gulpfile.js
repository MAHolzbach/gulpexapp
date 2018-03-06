const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

/*
  -- TOP LEVEL GULP FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

//Logs a message
gulp.task("message", () => {
  return console.log("Gulp is running...");
});

//Copy all HTML files
gulp.task("copyHtml", () => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//Optimizie images
gulp.task("imagemin", () =>
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

//Minify files
gulp.task("minify", () => {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//Compile Sass
gulp.task("sass", () => {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

//Concat JS files
gulp.task("concat", () => {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//Default task. Run with just "gulp" command.
gulp.task("default", ["message", "copyHtml", "imagemin", "sass", "concat"]);

//Enable Gulp to watch files for cahnges so that the above commands don't have to be run manually over and over again.
gulp.task("watch", () => {
  gulp.watch("src/js/*.js", ["concat"]);
  gulp.watch("src/images/*", ["imagemin"]);
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["copyHtml"]);
});
