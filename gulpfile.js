(function (isRelease, shouldWatch) {
    var gulp = require('gulp');
    var gulpWatch = require('gulp-watch');
    var del = require('del');
    var runSequence = require('run-sequence');

    // Require tasks in 'gulptasks' folder
    ['systemjs-build', 'static-bundle', 'compile-tsc', 'app-bundle', 'build-js']
        .forEach(function (task) {
            require('./gulptasks/'+task+'.js')(gulp, isRelease);
        });

    // Default ionic hooks
    gulp.task('serve:before', ['watch']);
    gulp.task('emulate:before', ['build']);
    gulp.task('deploy:before', ['build']);
    gulp.task('build:before', ['build']);
    gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

    // Default ionic tasks
    var buildSass = require('ionic-gulp-sass-build');
    var copyFonts = require('ionic-gulp-fonts-copy');
    gulp.task('sass', buildSass);
    gulp.task('fonts', copyFonts);
    gulp.task('clean', function () {
        return del('www/build');
    });

    // Watch task
    gulp.task('watch', ['clean'], function (done) {
        runSequence(
            ['sass', 'fonts', 'build-js'],
            function () {
                gulpWatch('app/**/*.scss', function () {
                    gulp.start('sass');
                });
                gulpWatch(['app/**/*.html', 'app/**/*.ts'], function () {
                    gulp.start('build-js')
                });
                done();
            }
        );
    });

    // Build task
    gulp.task('build', ['clean'], function (done) {
        runSequence(
            ['sass', 'fonts', 'build-js'],
            function () { done(); }
        );
    });
})(
    process.argv.indexOf('--release') > -1,
    process.argv.indexOf('-l') > -1 || process.argv.indexOf('--livereload') > -1
);