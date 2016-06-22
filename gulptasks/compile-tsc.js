module.exports = function (gulp) {
    var typescript = require('gulp-typescript');
    var inlineNg2Template = require('gulp-inline-ng2-template');
    var tsProject = typescript.createProject('./tsconfig.json');
    
    gulp.task('compile-tsc', function() {
        return tsProject.src()
            .pipe(typescript(tsProject))
            .pipe(inlineNg2Template({ 
                base: '/', 
                target: 'es5', 
                useRelativePaths: true, 
                removeLineBreaks:true 
            }))
            .pipe(gulp.dest('app/dist'));
    });
}