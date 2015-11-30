var gulp = require('gulp');
var pseudoTranslator = require('gulp-pseudo-translate-angular-json');
var jeditor = require('gulp-json-editor');
var rename = require('gulp-rename');

gulp.task('i18n:pseudo', function() {
  gulp.src('src/assets/locales/locale-en.json') // url to source file
    .pipe(jeditor(function(json) {
      return pseudoTranslator(json, {increasePercent: 50});
    }))
    .pipe(rename('locale-gb.json')) // destination file name
    .pipe(gulp.dest('src/assets/locales/')); // destination folder
});
