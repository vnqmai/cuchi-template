// gulpfile.mjs
import gulp from 'gulp';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import cleanCSS from 'gulp-clean-css';


import fse from 'fs-extra';
import * as glob from 'glob';
import path from 'path';


const sass = gulpSass(dartSass);
const server = browserSync.create();

const paths = {
  html: './src/**/*.html',
  scss: './src/scss/**/*.scss',
  vendorsCss: [
    'src/css/vendors/bootstrap.min.css'
  ],
  pluginsCss: [
    'src/css/plugins/jquery-ui.min.css'
  ],
  vendors: [
    'src/js/vendors/jquery-3.7.1.min.js',
    'src/js/vendors/bootstrap.bundle.min.js'
  ],
  plugins: [
    'src/js/plugins/jquery-ui.min.js'
  ],
  js: './src/js/**/*.js',
  img: './src/img/**/*.{jpg,jpeg,png,gif,svg,webp}',
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


// Vendors CSS
export const vendorsCSS = () =>
  gulp.src(paths.vendorsCss)
    .pipe(concat('vendors.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${paths.dist}/css`));

// Plugins CSS
export const pluginsCSS = () =>
  gulp.src(paths.pluginsCss)
    .pipe(concat('plugins.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${paths.dist}/css`));

// Images
// export const images = () =>
//   gulp.src(paths.img, { buffer: true }).pipe(gulp.dest(`${paths.dist}/img`));

export const copyImages = async () => {
  const files = glob.sync('src/img/**/*.{png,jpg,jpeg,gif,svg,webp}');
  await Promise.all(
    files.map(async (file) => {
      const destPath = file.replace('src/img', 'dist/img');
      await fse.ensureDir(path.dirname(destPath));
      await fse.copy(file, destPath);
    })
  );
};

// Vendors task
export const vendors = () =>
  gulp.src(paths.vendors)
    .pipe(sourcemaps.init())
    .pipe(concat('vendors.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.dist}/js`));

// Plugins task
export const plugins = () =>
  gulp.src(paths.plugins)
    .pipe(sourcemaps.init())
    .pipe(concat('plugins.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.dist}/js`));

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
  gulp.watch('src/js/vendors/**/*.js', vendors).on('change', server.reload);
  gulp.watch('src/js/plugins/**/*.js', plugins).on('change', server.reload);
  gulp.watch(paths.scss, styles);
  gulp.watch('src/css/vendors/**/*.css', vendorsCSS).on('change', server.reload);
  gulp.watch('src/css/plugins/**/*.css', pluginsCSS).on('change', server.reload);
  gulp.watch(paths.js, scripts).on('change', server.reload);
  // gulp.watch(paths.img, images).on('change', server.reload);
  gulp.watch('src/img/**/*', copyImages).on('change', server.reload);

};

export const build = gulp.series(cleanDist, gulp.parallel(html, compilePug, styles, vendors, plugins, scripts, copyImages, vendorsCSS, pluginsCSS));

export default gulp.series(build, serve);
