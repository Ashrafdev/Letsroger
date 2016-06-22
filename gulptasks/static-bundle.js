module.exports = function (gulp, isRelease) {
    var files = require('../static-bundle.config.json');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    gulp.task('bundle-static', function () {
        var chain = gulp.src(files).pipe(sourcemaps.init());

        // Compress if building for release
        if (isRelease) chain = chain.pipe(uglify({mangle: { keep_fnames: true}, compress: {keep_fnames: true} }));

        return chain.pipe(concat('static.js')).pipe(sourcemaps.write()).pipe(gulp.dest('./www/build'));
    });
};