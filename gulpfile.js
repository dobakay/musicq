'use strict';

const exec = require('child_process').exec;
const path = require("path");
const gulp = require("gulp");
const merge = require('merge2');
const concat = require("gulp-concat");
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const recursiveFolder = require('gulp-recursive-folder');

const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject("tsconfig.json");
const nodemon = require('gulp-nodemon');

const paths = require("./paths.json");

gulp.task('clean', () => {
    return gulp.src(paths.clear, { read: false })
        .pipe(clean());
});

function cleanTask(cleanTask, cleanPath) {
    gulp.task(cleanTask, () => {
        return gulp.src(cleanPath, { read: false })
            .pipe(clean());
    });
}

gulp.task('scripts', () => {
    let tsResult = tsProject
        .src()
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(tsProject());

    return merge([  // Merge the two output streams, so this task is finished
                    // when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest(paths.scripts.output_definitions)),
        tsResult.js.pipe(sourcemaps.write(paths.scripts.source_maps, {
            includeContent:false,
            mapSources: (path) => path,
            sourceRoot: (file) => {
                path.relative(file.relative, path.join(file.cwd, 'src'))
            }
        })).pipe(gulp.dest(paths.scripts.output))
    ]);

    // return merge([  // Merge the two output streams, so this task is finished
    //     // when the IO of both operations are done.
    //     tsResult.dts.pipe(gulp.dest(paths.scripts.output_definitions)),
    //     tsResult.js.pipe(sourcemaps.write({
    //         mapSources: (path) => path, // This affects the "sources" attribute even if it is a no-op. I don't know why.
    //         sourceRoot: (file) => {
    //             return path.relative(file.relative, path.join(file.cwd, 'js/'));
    //         }
    //     }))
    //         .pipe(gulp.dest(paths.scripts.output))
    // ]);

    // tsResult.dts.pipe(gulp.dest(paths.scripts.output_definitions));
    // return tsResult.js.pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest(paths.scripts.output));
});

cleanTask('clean:scripts', paths.scripts.clear);

gulp.task('html', () => {
    return gulp.src(paths.html.input)
        .pipe(gulp.dest(paths.html.output));
});

cleanTask('clean:html', paths.html.clear);

gulp.task('youtube_dl-copy', () => {
    return gulp.src(paths.youtube_dl.input)
        .pipe(gulp.dest(paths.youtube_dl.output));
});

// NOTE: order is essential
gulp.task('build', gulp.series('clean:scripts', 'scripts'));

gulp.task('server', () => {
    nodemon({
        'script': paths.server_entry_point,
    });
});

let serverStarted = false;
gulp.task('watch', () => {
    gulp.emit('startServer');
    return watch(paths.input,() => gulp.start('build'));
});

gulp.once('startServer', () => {
    gulp.start('serve');
});

gulp.task('serve', gulp.series('server'));
gulp.task('default', gulp.series('server'));