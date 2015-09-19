'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    opn = require('opn');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        img: 'build/assets/images/'
    },
    dev: {
        html: 'dev/',
        js: 'dev/js/',
        img: 'dev/assets/images/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/**/*.js',
        img: 'src/assets/images/**/*.*'
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/**/*.js',
        img: 'src/assets/images/**/*.*'
    },
    cleanBuild: './build',
    cleanDev: './dev'
};

var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'image:build'
]);

gulp.task('html:dev', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dev.html))
        .pipe(connect.reload());
});

gulp.task('js:dev', function () {
    gulp.src([path.src.js])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dev.js))
        .pipe(connect.reload());
});

gulp.task('image:dev', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dev.img))
        .pipe(connect.reload());
});

gulp.task('dev', [
    'html:dev',
    'js:dev',
    'image:dev'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dev');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dev');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:dev');
    });
});

gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.cleanBuild);
    rimraf(path.cleanDev);
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/dev' );
});

gulp.task('default', ['dev', 'webserver', 'watch', 'openbrowser']);