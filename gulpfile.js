var path = require("path");
var gulp = require("gulp");
var merge = require('merge2');
var concat = require("gulp-concat");
var clean = require('gulp-clean');
var recursiveFolder = require('gulp-recursive-folder');
// var run = require('gulp-run');
var exec = require('child_process').exec;
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");

// var paths = {
//     target: {
//         main: "./dist",
//         clear: "dist/*",
//         definitions: "dist/definitions",
//         allJS: "dist/js/**/*"
//     },
//     source: {
//         main: "src",
//         all: "src/**/*",
//     }
// }

var paths = {
    input: 'src/**/*',
    // NOTE: to set-up the source files for the tsProject variable,
    // add "files": ["src/ts/**/*"] to the tsconfig.json
    output: 'dist/',
    clear: 'dist/*',
    scripts: {
        input: 'src/ts/*',
        output_definitions: "dist/js/definitions/",
        output: 'dist/js/'
    },
    // docs: {
    //     input: 'src/docs/*.{html,md,markdown}',
    //     output: 'docs/',
    //     templates: 'src/docs/_templates/',
    //     assets: 'src/docs/assets/**'
    // }
};

gulp.task('clean-scripts', function () {
    return gulp.src(paths.clear, {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function() {
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([  // Merge the two output streams, so this task is finished
                    // when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest(paths.scripts.output_definitions)),
        tsResult.js.pipe(sourcemaps.write({
            // Return relative source map root directories per file.
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            }
        })).pipe(gulp.dest(paths.scripts.output))
    ]);
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch(paths.input, ['scripts']);
});

gulp.task('server', ['watch'], function(cb) {
    // return run('node dist/js/index.js').exec();
    exec('node dist/js/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('default', ['server']);