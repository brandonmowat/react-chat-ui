const gulp = require('gulp');
const ts = require('gulp-typescript');

const project = ts.createProject('tsconfig.json');

// Compile all necessary files to "lib" directory
gulp.task('compile', () => {
  const result = gulp.src('src/**/*{ts,tsx}').pipe(project);
  return result.js.pipe(gulp.dest('lib'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', () => {
  gulp.watch('src/**/*{ts,tsx}', ['compile']);
  // gulp.watch('demo/**/*.js', ['build-demo']);
});
