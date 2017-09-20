const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');

const project = ts.createProject('tsconfig.json');

// Compile all necessary files to "lib" directory
gulp.task('compileTS', () => {
  const result = gulp.src('src/**/*{ts,tsx}').pipe(project());
  return result.js.pipe(gulp.dest('temp'));
});

gulp.task('compileRCT', () => {
  gulp
    .src(['temp/**/*.js', 'index.js'])
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015', 'stage-0', 'react'] }))
    .pipe(gulp.dest('lib'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', () => {
  gulp.watch('src/**/*{ts,tsx}', ['compileTS']);
  gulp.watch('temp/**/*js', ['compileRCT']);
});
