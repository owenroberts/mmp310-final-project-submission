/*jslint node: true, for */

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    cssCompressor = require('gulp-csso'),
    browserSpecificPrefixer = require('gulp-autoprefixer'),
    htmlMinifier = require('gulp-htmlmin'),
    htmlValidator = require('gulp-html'),
    jsConcatenator = require('gulp-concat'),
    jsLinter = require('gulp-eslint'),
    jsCompressor = require('gulp-uglify'),
    imageCompressor = require('gulp-imagemin'),
    tempCache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    browserChoice = 'default';

/**
 * CHOOSE A BROWSER OTHER THAN THE DEFAULT
 *
 * Each of the following tasks sets the browser preference variable (browserChoice)
 * in the browserSync preferences read by the serve task. To preview your project in
 * either or all of your browsers, invoke Gulp as follows:
 *
 *    gulp safari serve
 *    gulp firefox serve
 *    gulp chrome serve
 *    gulp opera serve
 *    gulp edge serve
 *    gulp allBrowsers serve
 */

gulp.task('safari', function () {
    'use strict';

    browserChoice = 'safari';
});

gulp.task('firefox', function () {
    'use strict';

    browserChoice = 'firefox';
});

gulp.task('chrome', function () {
    'use strict';

    browserChoice = 'google chrome';
});

gulp.task('opera', function () {
    'use strict';

    browserChoice = 'opera';
});

gulp.task('edge', function () {
    'use strict';

    browserChoice = 'microsoft-edge';
});

gulp.task('allBrowsers', function () {
    'use strict';

    browserChoice = ['safari', 'firefox', 'google chrome', 'opera', 'microsoft-edge'];
});

/**
 * VALIDATE HTML
 *
 * This task sources all the HTML files in the dev/html folder, then validates them.
 *
 * On error, the validator will generate one or more messages to the console with
 * line and column co-ordinates indicating where in your file the error was
 * generated.
 *
 * Note: Regardless of whether your HTML validates or not, no files are copied to a
 * destination folder.
 */
gulp.task('validateHTML', function () {
    'use strict';

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlValidator());
});

/**
 * COMPRESS HTML
 *
 * This task sources all the HTML files in the dev/html folder, strips comments and
 * whitespace from them, then writes the compressed files to the production folder.
 */
gulp.task('compressHTML', function () {
    'use strict';

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('prod'));
});

/**
 * COMPILE CSS FOR DEVELOPMENT WORK
 *
 * This task looks for a single Sass file, compiles the CSS from it, and writes the
 * resulting CSS file to the temporary folder temp/styles. The file will be
 * formatted with 2-space indentations. Any floating-point calculations will be
 * carried out 10 places, and browser-specific prefixes will be added to support 2
 * browser versions behind all current browsers’ versions.
 */
gulp.task('compileCSSForDev', function () {
    'use strict';

    return gulp.src('dev/styles/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('temp/styles'));
});

/**
 * COMPILE CSS FOR PRODUCTION
 *
 * This task looks for a single Sass file, compiles the CSS from it, and writes the
 * resulting single CSS file to the production folder. Any floating-point
 * calculations will be carried out 10 places, and browser-specific prefixes will be
 * added to support 2 browser versions behind all current browsers’ versions.
 * Lastly, the final CSS file is passed through two levels of compression:
 * “outputStyle” from Sass and compressCSS().
 */
gulp.task('compileCSSForProd', function () {
    'use strict';

    return gulp.src('dev/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cssCompressor())
        .pipe(gulp.dest('prod/styles'));
});

/**
 * COMPILE ALL JAVASCRIPT FILES INTO ONE FILE FOR DEVELOPMENT WORK
 *
 * This task sources all the JavaScript files in dev/scripts, concatenates them,
 * names the compiled file app.js, then writes the result to the temp/scripts folder.
 */
gulp.task('compileJSForDev', function () {
    'use strict';

    return gulp.src('dev/scripts/*.js')
        .pipe(jsConcatenator('app.js'))
        .pipe(gulp.dest('temp/scripts'));
});

/**
 * COMPILE ALL JAVASCRIPT FILES INTO A SINGLE FILE FOR PRODUCTION
 *
 * This task compiles one or more JavaScript files into a single file, app.js. The
 * resulting file is compressed then written to the production folder.
 */
gulp.task('compileJSForProd', function () {
    'use strict';

    return gulp.src('dev/scripts/*.js')
        .pipe(jsConcatenator('app.js'))
        .pipe(jsCompressor())
        .pipe(gulp.dest('prod/scripts'));
});

/**
 * LINT JAVASCRIPT
 *
 * This task concatenates all the JS files in the dev/scripts folder into a single
 * file called app.js, then lints the file according to options listed in the object
 * passed to the linter. (ESLint is the linter in this file.)
 *
 * Note: The concatenated file app.js is *not* written to a destination folder.
 */
gulp.task('lintJS', function () {
    'use strict';

    return gulp.src('dev/scripts/*.js')
        .pipe(jsConcatenator('app.js'))
        .pipe(jsLinter({
            rules: {
                indent: [2, 4, {SwitchCase: 1}],
                quotes: [2, 'single'],
                semi: [2, 'always'],
                'linebreak-style': [2, 'unix'],
                'max-len': [2, 85, 4]
            },
            env: {
                node: true,
                browser: true
            },
            extends: 'eslint:recommended'
        }))
        .pipe(jsLinter.formatEach('compact', process.stderr))
        //
        // “To have the process exit with an error code (1) on lint error, return
        // the stream and pipe to failAfterError last.”
        //
        //     — https://github.com/adametry/gulp-eslint
        //
        .pipe(jsLinter.failAfterError());
});

/**
 * COMPRESS THEN COPY IMAGES TO THE PRODUCTION FOLDER
 *
 * This task sources all the images in the dev/img folder, compresses them based on
 * the settings in the object passed to imageCompressor, then copies the final
 * compressed images to the prod/img folder.
 */
gulp.task('compressThenCopyImagesToProdFolder', function () {
    'use strict';

    return gulp.src('dev/img/**/*')
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest('prod/img'));
});

/**
 * COPY UNPROCESSED ASSETS TO THE PRODUCTION FOLDER
 *
 * This task copies all unprocessed assets that aren’t images, JavaScript,
 * Sass/CSS to the production folder, because those files are processed by other
 * tasks, specifically:
 *
 * — Images are compressed then copied by the compressThenCopyImagesToProdFolder task
 * — JavaScript is concatenated and compressed by the compileJSForProd task
 * — Sass/CSS is concatenated and compressed by the compileCSSForProd task
 */
gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    'use strict';

    return gulp.src([
        'dev/*.*',       // Source all files,
        'dev/**',        // and all folders,
        '!dev/html/',    // but not the HTML folder
        '!dev/html/*.*', // or any files in it
        '!dev/html/**',  // or any sub folders
        '!dev/img/',     // ignore images;
        '!dev/**/*.js',  // ignore JS;
        '!dev/styles/**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest('prod'));
});

/**
 * BUILD
 *
 * This task simply invokes other pre-defined tasks.
 */
gulp.task('build', [
    'validateHTML',
    'compressHTML',
    'compileCSSForProd',
    'lintJS',
    'compileJSForProd',
    'compressThenCopyImagesToProdFolder',
    'copyUnprocessedAssetsToProdFolder'
]);

/**
 * SERVE
 *
 * Used for development only, this task…
 *
 *    — compiles CSS via Sass,
 *    — concatenates one or more JavaScript files into a single file,
 *    — lints JavaScript, and
 *    — validates HTML.
 *
 * Your localhost server looks for index.html as the first page to load from either
 * the temporary folder (temp), the development folder (dev), or the folder
 * containing HTML (html).
 *
 * Files that require pre-processing must be written to a folder before being served.
 * Thus, CSS and JS are served from a temp folder (temp), while un-processed files,
 * such as fonts and images, are served from the development source folder (dev).
 *
 * If a JavaScript file is changed, all JavaScript files are rebuilt, the resulting
 * file is linted, and the browser reloads.
 *
 * If a Sass file is changed, a re-compilation of the primary CSS file is generated,
 * and the browser reloads.
 *
 * Finally, changes to images also trigger a browser reload.
 */
gulp.task('serve', ['compileCSSForDev', 'compileJSForDev', 'compileCSSForProd', 'compileJSForProd', 'compressHTML'], function () {
    'use strict';

    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: [
                'temp',
                'dev',
                'dev/html'
            ]
        }
    });

    gulp.watch('dev/scripts/*.js', ['compileJSForDev', 'compileJSForProd'])
        .on('change', reload);

    gulp.watch('dev/styles/**/*.scss', ['compileCSSForDev', 'compileCSSForProd'])
        .on('change', reload);

    gulp.watch(['dev/html/**/*.html'], ['validateHTML'])
        .on('change', reload);

    gulp.watch('dev/img/**/*')
        .on('change', reload);
});

/**
 * CLEAN
 *
 * This task deletes the temp and prod folders, both of which are expendable, since
 * Gulp creates them as temporary folders during the serve process and via the build
 * task.
 */
gulp.task('clean', function () {
    'use strict';

    var fs = require('fs'),
        i,
        expendableFolders = ['temp', 'prod'];

    for (i = 0; i < expendableFolders.length; i += 1) {
        try {
            fs.accessSync(expendableFolders[i], fs.F_OK);
            process.stdout.write('\n\tThe ' + colors.green + expendableFolders[i] +
                    colors.default + ' directory was found and ' + colors.green +
                    'will' + colors.default + ' be deleted.\n');
            del(expendableFolders[i]);
        } catch (error) {
            if (error) {
                process.stdout.write('\n\tThe ' + colors.red +
                        expendableFolders[i] + colors.default +
                        ' directory does ' + colors.red + 'not' + colors.default +
                        ' exist or is ' + colors.red + 'not' + colors.default +
                        ' accessible.\n');
            }
        }
    }

    process.stdout.write('\n');
});

/**
 * DEFAULT
 *
 * This task does nothing but list the available tasks in this file.
 */
gulp.task('default', function () {
    'use strict';

    var exec = require('child_process').exec;

    exec('gulp --tasks', function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write('An error was likely generated when invoking ' +
                    'the `exec` program in the default task.');
        }

        if ('' !== stderr) {
            process.stdout.write('Content has been written to the stderr stream ' +
                    'when invoking the `exec` program in the default task.');
        }

        process.stdout.write('\n\tThis default task does ' + colors.red +
                'nothing' + colors.default + ' but generate this message. The ' +
                'available tasks are:\n\n' + stdout);
    });
});