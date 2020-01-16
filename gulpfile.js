//1.引入gulp模块
//gulp.task()创建gulp任务
//gulp.src(路径)引入文件的目录
//gulp.dest(路径)输出文件目录设置
//pipe : 管道流--链式操作的连接点。


const gulp = require('gulp'); //引入gulp模块
const html = require('gulp-minify-html'); //引入gulp下面的gulp-minify-html包
const css = require('gulp-minify-css'); //引入gulp下面的gulp-minify-css包
const uglifyjs = require('gulp-uglify'); //引入gulp下面的gulp-uglify包
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
// const sass = require('gulp-sass'); //引入sass编译包。
// const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
// const plugins = require('gulp-load-plugins')(); //生成.map文件
const imagemin = require('gulp-imagemin'); //引入图片压缩模块
const watch = require('gulp-watch'); //引入监听模块
gulp.task('copyfile', function () {
    return gulp.src('src/top.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('runhtml', function () {
    return gulp.src('src/top.html')
        .pipe(html())
        .pipe(gulp.dest('dist/'));
});

// gulp.task('runcss', function () {
//     return gulp.src('src/stylesheets/index.css')
//         .pipe(css()) //调用模块或者包
//         .pipe(gulp.dest('dist/css/'));
// });

//编译压缩sass,同时生成.map文件。
gulp.task('compilesass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(plugins.sourcemaps.init()) // 初始化 gulp-sourcemaps 插件  生成.map文件初始化  
        .pipe(plugins.sass({ // 调用 sass 插件，编译 sass 文件
            outputStyle: 'compressed' //压缩一行
        }))
        .pipe(plugins.sourcemaps.write('.')) // 生成 sourcemap 生成.map文件 
        .pipe(gulp.dest('dist/css/')); // 目标文件存放路径
});

gulp.task('uglifyjs', function () {
    return gulp.src('src/script/*.js')
        .pipe(babel({ //es6转es5
            presets: ['es2015']
        }))
        .pipe(uglifyjs()) //调用模块或者包
        .pipe(gulp.dest('dist/script/'));
});

gulp.task('runimg', function () {
    return gulp.src('src/images/*.{png,gif,jpg,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});




