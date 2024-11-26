import concat from 'gulp-concat';
import gulp from 'gulp';

gulp.task('scripts', function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dest/files'));
});