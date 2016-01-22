var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var del = require('del');
var asar = require('gulp-asar');
var shell = require('gulp-shell');


var paths = {
	scripts: 'app/**.js',
	html: 'index.html',
	images: 'app/images/*.*'
};

gulp.task('clean', function () {
	return del(['package', 'dist']);
});

gulp.task('images', ['clean'], function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest('package'));
});

gulp.task('scripts', ['clean'], function () {
	return gulp.src('app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('package/scripts'));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('copyHTML', ['clean'], function () {
	return gulp.src(['index.html', 'index.css'])
		.pipe(gulp.dest('package'));
});

gulp.task('copyApp', ['clean'], function () {
	return gulp.src(['./index.js', 'games/**/*', 'server/**/*', 'bower_components/**/*.*', 'package.json', 'mock.icns'], {
		base: '.'
	}).pipe(gulp.dest('package'));

});

gulp.task('package', ['clean'], function () {
	return gulp.src('package/**/*')
		.pipe(asar('app.asar'))
		.pipe(gulp.dest('dist'));
});

gulp.task('deployall', ['images', 'copyHTML', 'scripts', 'copyApp', 'package'], shell.task([
	'npm run-script build'
]));

gulp.task('default', ['images', 'copyHTML', 'copyApp', 'watch']);
