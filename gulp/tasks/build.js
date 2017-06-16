let gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
})


gulp.task('deleteDistFolder', function() { // when building everytime first delete old project and then write the new one
    return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() { // not needed for this project, but useful if we have additional files and folders
    let pathsToCopy = [
        './app/**/*', // take all files in app folder
        '!./app/index.html', // with ! we are excluding files
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp'

    ]
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
})

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src(['./app/assets/images/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() { return rev() }, function() { return cssnano() }],
            js: [function() { return rev() }, function() { return uglify() }]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin'])