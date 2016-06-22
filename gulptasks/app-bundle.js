module.exports = function (gulp, isRelease) {
    var uglify = require('gulp-uglify');

    gulp.task('bundle-app', function () {
        var chain = gulp.src(['!app/**/*.spec.js', 'app/dist/**/*.js']);
        if (isRelease) chain = chain.pipe(uglify({mangle: { keep_fnames: true}, compress: {keep_fnames: true} }));
        return chain.pipe(gulp.dest('./www/build/app'));
    });

}