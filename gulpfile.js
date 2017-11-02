var path = require("path");
var gulp = require("gulp");
var merge = require('merge2');
var clean = require('gulp-clean');
var run = require('gulp-run');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', ['watch']);

gulp.task('clean-scripts', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});


gulp.task('scripts', ['clean-scripts'], function() {
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([  // Merge the two output streams, so this task is finished
                    // when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js.pipe(sourcemaps.write({
            // Return relative source map root directories per file.
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            }
        })).pipe(gulp.dest('dist/js'))
    ]);
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/*', ['scripts']);
    return run('node dist/js/index.js').exec();
});