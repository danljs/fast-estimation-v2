'use strict'

let gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    less = require('gulp-less'),
    minify_css = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    del = require('del'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    gulpsync = require('gulp-sync')(gulp)

gulp.task('make', () => {
  gulp.start('js')
  gulp.start('css')
})

gulp.task('watch', () => {
  watch(['src/**/*'], () => gulp.start('js'))
  watch(['less/**/*'], () => gulp.start('css'))
})

gulp.task('js', () => 
  browserify({entries: './src/app.js', extensions: ['.jsx','.js']})
  .transform(babelify.configure({stage: 0}))
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js/'))
)

gulp.task('css', () => gulp.src('./less/app.less')
  .pipe(less())
  .pipe(plumber())
  .pipe(gulp.dest('./build/css/'))
)

gulp.task('min-js', () => gulp.src('./build/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/js/'))
)

gulp.task('min-css', () => gulp.src('./build/css/app.css')
  .pipe(minify_css({compatibility: 'ie8'}))
  .pipe(gulp.dest('./build/css/'))
)

//=============================================================================
//build production
//=============================================================================
//production, development
gulp.task('env', () => process.env.NODE_ENV = 'production')

gulp.task('clean', () => del(['../production/**/*'], {force: true}));

gulp.task('build-in', () =>{
  gulp.src('build/index.html')
  .pipe(replace('<link rel="stylesheet" href="css/app.css" type="text/css" media="all" >', () =>
    '<style>\n' + fs.readFileSync('build/css/app.css', 'utf8') + '\n</style>'
  ))
  .pipe(replace('<script src="js/app.js"></script>', () =>
    '<script>\n'
    + fs.readFileSync('build/js/app.js', 'utf8') 
    + '\n</script>'
  ))
  .pipe(gulp.dest('../production'));
})

gulp.task('deploy', () => {
  gulp.start('deploy-client')
  gulp.start('deploy-server')
})

gulp.task('deploy-client', () => gulp.src('./build/**/*', {base:'./build/'})
  .pipe(gulp.dest('../production/'))
)

gulp.task('deploy-server', () => gulp.src([
  '!../server/node_modules',
  '!../server/node_modules/**',
  '!../server/tmp',
  '!../server/tmp/**',
  '../server/**/*'
  ], {base:'../server/'})
  .pipe(gulp.dest('../production/'))
)

gulp.task('build', gulpsync.sync([
  'env', 
  'clean', 
  'js', 
  'css', 
  'min-js', 
  'min-css', 
  'build-in', 
  'deploy-server'
]))

let dest_folder = '../../fast2/'
gulp.task('clean-pub', () => del([
  dest_folder + 'data/*',
  dest_folder + 'font/*',
  dest_folder + 'src/*',
  dest_folder + 'utils/*',
  dest_folder + 'package.json',
  dest_folder + 'app.js',
  dest_folder + 'index.html'
  ], {force: true}))

gulp.task('copy-pub', () => gulp.src('../production/**/*', {base:'../production/'})
  .pipe(gulp.dest(dest_folder))
)

gulp.task('publish', gulpsync.sync([
  'build', 
  'clean-pub', 
  'copy-pub'
]))