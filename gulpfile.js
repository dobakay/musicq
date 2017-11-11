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

var paths = {
    input: 'src/**/*',
    // NOTE: to set-up the source files for the tsProject variable,
    // add "files": ["src/ts/**/*"] to the tsconfig.json
    output: 'dist/',
    clear: 'dist/*',
    html: {
        input: ["src/public/*", "src/views/*"],
        output: "dist/www/"
    },
    youtube_dl: {
        input: "src/youtube_dl/*",
        output: "dist/youtube_dl/"
    },
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

gulp.task('clean', () => {
    return gulp.src(paths.clear, {read: false})
    .pipe(clean());
});

gulp.task('scripts', () => {
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

gulp.task('html', () => {
    return gulp.src(paths.html.input)
        .pipe(gulp.dest(paths.html.output));
});

gulp.task('youtube_dl-copy', () => {
    return gulp.src(paths.youtube_dl.input)
        .pipe(gulp.dest(paths.youtube_dl.output));
});

// NOTE: order is essential
gulp.task('watch', gulp.series('clean', 'scripts', 'html', 'youtube_dl-copy', () => {
    gulp.watch(paths.input, gulp.series('clean', 'scripts', 'html', 'youtube_dl-copy'));
}));

gulp.task('server', gulp.series('watch', (cb) => {
    // return run('node dist/js/index.js').exec();
    exec('node dist/js/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}));

gulp.task('default', gulp.series('server'));