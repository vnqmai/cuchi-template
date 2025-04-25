// gulpfile.mjs
import gulp from 'gulp';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';

const sass = gulpSass(dartSass);
const server = browserSync.create();

const paths = {
  html: './src/**/*.html',
  scss: './src/scss/**/*.scss',
  js: './src/js/**/*.js',
  img: './src/img/**/*',
  dist: './dist',
};

// HTML
export const html = () => gulp.src(paths.html).pipe(gulp.dest(paths.dist));

// Pug → HTML
export const compilePug = () =>
  gulp.src('./src/templates/*.pug') // source file pug chính
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.dist));


// SCSS
const sassCompiler = gulpSass(dartSass);
export const styles = () =>
  gulp
    .src(paths.scss)
    .pipe(sassCompiler({
      includePaths: ['node_modules'],  // Đảm bảo đường dẫn tới node_modules
    }).on('error', sassCompiler.logError))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(server.stream());

// Images
export const images = () =>
  gulp.src(paths.img).pipe(imagemin()).pipe(gulp.dest(`${paths.dist}/img`));

// JS
export const scripts = () => gulp.src(paths.js).pipe(gulp.dest(`${paths.dist}/js`));

// Clean
export const cleanDist = () => gulp.src(paths.dist, { read: false, allowEmpty: true }).pipe(clean());

// Serve
export const serve = () => {
  server.init({
    server: {
      baseDir: paths.dist,
      index: 'home.html',
    },
    port: 3000,
  });

  gulp.watch(paths.html, html).on('change', server.reload);
  gulp.watch('src/templates/**/*.pug', compilePug).on('change', server.reload);
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts).on('change', server.reload);
  gulp.watch(paths.img, images).on('change', server.reload);
};

export const build = gulp.series(cleanDist, gulp.parallel(html, compilePug, styles, scripts, images));

export default gulp.series(build, serve);
