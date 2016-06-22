module.exports = function (gulp) {
    var runSequence = require('run-sequence');

    gulp.task('build-js', function () {
        runSequence(
            'compile-tsc',
            ['bundle-static', 'bundle-vendor', 'bundle-app'],
            function () {}
        );
    });
}