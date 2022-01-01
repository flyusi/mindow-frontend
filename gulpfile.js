// main module
import gulp from "gulp";
// paths import
import { path } from "./gulp/config/path.js";

// plugins import
import { plugins } from "./gulp/config/plugins.js";

// passing values to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// tasks import
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js"; // maybe change to selective deletion?
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

function watcher() {
    // gulp.series(html, ftp) - for each case to automatically load changes
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive }; // doesnt execute every time, 'cause icons prepared once, executes manually

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// building task execution scripts
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp. series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);


// scripts export
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// default script execution
gulp.task('default', dev);