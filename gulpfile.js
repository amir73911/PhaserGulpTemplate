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
        data: "build/data/",
        img: 'build/assets/images/',
        sound: 'build/assets/sound/'
    },
    dev: {
        html: 'dev/',
        js: 'dev/js/',
        data: "dev/data/",
        img: 'dev/assets/images/',
        sound: 'dev/assets/sound/'
    },
    src: {
        html: 'src/index.html',
        js: {
            vendor: 'src/js/vendor/*.js',
            app: 'src/js/app/**/*.js'
        },
        data: "src/data/*.json",
        img: 'src/assets/images/**/*.*',
        sound: 'src/assets/sound/**/*.*'
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/**/*.js',
        data: 'src/data/*.json',
        img: 'src/assets/images/**/*.*',
        sound: 'src/assets/sound/**/*.*'
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
    gulp.src([path.src.js.vendor])
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));

    gulp.src([path.src.js.app])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('data:build', function () {
    gulp.src([path.src.data])
        .pipe(gulp.dest(path.build.data));

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

gulp.task('sounds:build', function () {
    gulp.src([path.src.sound])
        .pipe(gulp.dest(path.build.sound));

});

gulp.task('build', [
    'html:build',
    'js:build',
    'data:build',
    'image:build',
    'sounds:build'
]);

gulp.task('html:dev', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dev.html))
        .pipe(connect.reload());
});

gulp.task('js:dev', function () {
    gulp.src([path.src.js.vendor])
        .pipe(gulp.dest(path.dev.js));
    gulp.src([path.src.js.app])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dev.js))
        .pipe(connect.reload());

});

gulp.task('data:dev', function () {
    gulp.src([path.src.data])
        .pipe(gulp.dest(path.dev.data))
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

gulp.task('sounds:dev', function () {
    gulp.src([path.src.sound])
        .pipe(gulp.dest(path.dev.sound))
        .pipe(connect.reload());
});

gulp.task('dev', [
    'html:dev',
    'js:dev',
    'data:dev',
    'image:dev',
    'sounds:dev'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dev');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dev');
    });
    watch([path.watch.data], function(event, cb) {
        gulp.start('data:dev');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:dev');
    });
    watch([path.watch.sound], function(event, cb) {
        gulp.start('sounds:dev');
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