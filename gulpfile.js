const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/style.+(scss|sass)')
  .pipe(gulpif(argv.dev, sourcemaps.init()))
  .pipe(sass())
  .pipe(autoprefixes({
    cascade: false
  }))
  .pipe(gulpif(argv.prod, cleanCSS({
    level: 2
  })))
  .pipe(gulpif(argv.dev, sourcemaps.write()))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
};

const htmlMinify = () => {
  return src('src/**/*.html')
  .pipe(gulpif(argv.prod, htmlMin({
    collapseWhitespace: true,
  })))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
    'src/images/*.svg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const fonts = () => {
  return src('src/fonts/**/*')
  .pipe(dest('dist/fonts'))
}

const normalize = () => {
  return src('src/styles/normalize.css')
  .pipe(dest('dist/css'))
}

const scripts = () => {
  return src([
    'src/js/**/*.js',
    'src/js/main.js',
  ])
  .pipe(gulpif(argv.dev, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(gulpif(argv.prod, uglify().on('error', notify.onError())))
  .pipe(gulpif(argv.dev, sourcemaps.write()))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    browser: 'chrome',
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
watch('src/styles/**/*.sass', styles)
watch('src/styles/**/*.scss', styles)

exports.clean = clean;
exports.styles = styles;
exports.htmlMinify = htmlMinify;

exports.default = series(clean, resources, fonts, normalize, htmlMinify, styles, images, svgSprites, scripts, watchFiles)