import gulp from 'gulp';
import concat from 'gulp-concat';

gulp.task('default', function() {
    return gulp.src('./src/files/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dest/files'));
});