import dartSass from 'sass'; // compiler
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // css compression
import webpcss from 'gulp-webpcss'; // webp pics output !works at apple devices) but needs webp-converter@2.2.3
import autoprefixer from 'gulp-autoprefixer'; // wendor prefix adding, cross-browser layout
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // media requests grouping

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message%>"
            })))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(sass({
            outputStyle: 'expanded' // css compiling
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        // TODO check if it works
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({ // some js will be needed to know if browser supports webp
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        // uncomment next row if uncompressed css will be needed
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}