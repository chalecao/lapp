let gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  babel = require('gulp-babel'), // es6模块化
  jshint = require('gulp-jshint'), // 校验js的工具
  uglify = require('gulp-uglify'), // 压缩js
  concat = require('gulp-concat') // 合并js
var babelify = require('babelify')
// Load plugins
let $ = require('gulp-load-plugins')()
const SRC_DIR = './src/**/*.js'
const DIST_DIR = './dist/'

// 打包js
gulp.task('build', function () {
  return gulp.src(SRC_DIR)
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['es2015', 'stage-1']
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.uglify())
    .pipe($.concat('fvdn.js'))
    .pipe(gulp.dest(DIST_DIR))
})

// 监听文件修改
gulp.task('watch', ['build'], function () {
  gulp.watch([SRC_DIR], ['build'])
})

/* 编译js */
gulp.task('js', function () {
  return gulp.src(SRC_DIR)
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(DIST_DIR))
})

// 处理jsx模板
gulp.task('jsx', function () {
  return gulp.src(['./example/tpl.jsx'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-react-jsx', 'jsx-control-statements']
    }))
    .pipe(gulp.dest('./dist'))
})

// 处理jsx模板
gulp.task('html', function () {
  return gulp.src(['./example/*.html', './example/*.js'])
    .pipe(gulp.dest('./dist'))
})

gulp.task('main', ['html'], function () {
  return gulp.src(['./dist/init.js', './dist/simple.js'])
    .pipe(browserify({
      transform: [babelify.configure({
        presets: ['es2015'],
        plugins: ['transform-react-jsx']
      })]
    }))
    .pipe(gulp.dest('./dist'))
})
