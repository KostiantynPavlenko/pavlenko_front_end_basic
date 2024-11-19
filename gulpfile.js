import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import gulpSharp from 'gulp-sharp-responsive';
import {deleteSync} from 'del';
import sassCompiler from 'sass';

const sassCompiled = sass(sassCompiler);

gulp.task('clean', function(done) {
    deleteSync(['dist']);
    done();
});

gulp.task('styles' , function() {
    return gulp.src('src/scss/styles.scss')
    .pipe(sassCompiled().on('error', sassCompiled.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    return gulp.src('dist/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy-svg', function(){
    return gulp.src('src/images/**/*.svg', {encoding: false})
    .pipe(gulp.dest('dist/images'));
});

gulp.task('img-webp', function(){
    return gulp.src('src/images/**/*.{jpeg,jpg,png}', {encoding: false})
        .pipe(gulpSharp({formats: [{
                format: 'webp',
                webOptions: {
                    quality: 80,
                    effort: 6,
                },
            }
        ],
    })
    )
    .pipe(gulp.dest('dist/images'))
});

gulp.task('build-images', gulp.series('copy-svg', 'img-webp'));

gulp.task('build', gulp.series('clean', 'build-images', 'styles'));

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/images/**/*.{jpeg,jpg,png}', gulp.series('img-webp'));
    gulp.watch('src/images/**/*.svg', gulp.series('copy-svg'));
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('src/pages/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build'));
