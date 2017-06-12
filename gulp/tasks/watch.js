let gulp = require('gulp');
let watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function() {
        browserSync.reload();

    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsReload');
    })
});

gulp.task('cssInject', ['styles'], function() { //['styles'] е dependuncy na cssInkect - pyrvo trqbva da zavyrshi styles i togava se izpylnqva cssInject
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsReload', ['scripts'], function() {
    browserSync.reload();
});