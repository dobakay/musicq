var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require('merge2');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});


gulp.task('scripts', function() {
    var tsResult = gulp.src('src/*')
                    .pipe(ts(tsProject));

    return merge([ // Merge the two output streams, so this task is finished         when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js.pipe(gulp.dest('dist/js'))
    ]);
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/*', ['scripts']);
});

gulp.task('default', ['watch']);