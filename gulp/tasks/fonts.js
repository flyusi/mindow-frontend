import fs from 'fs'; // works with file system
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // searching for .otf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message%>"
            })))
        // convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // load to source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // searching for .ttf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message%>"
            })))
        // convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // load to results folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
    // fonts style file
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // checking if there are fonts files
    fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
        if (fontsFiles) {
            // checking if there is fonts style file
            if(!fs.existsSync(fontsFile)) {
                // create file if doesn't exist
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // write connecting fonts to style file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeigt = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeigt.toLowerCase() === 'thin') {
                            fontWeigt = 100;
                        } else if (fontWeigt.toLowerCase() === 'extralight') {
                            fontWeigt = 200;
                        } else if (fontWeigt.toLowerCase() === 'light') {
                            fontWeigt = 300;
                        } else if (fontWeigt.toLowerCase() === 'medium') {
                            fontWeigt = 500;
                        } else if (fontWeigt.toLowerCase() === 'semibold') {
                            fontWeigt = 600;
                        } else if (fontWeigt.toLowerCase() === 'bold') {
                            fontWeigt = 700;
                        } else if (fontWeigt.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeigt = 800;
                        } else if (fontWeigt.toLowerCase() === 'black') {
                            fontWeigt = 900;
                        } else {
                            fontWeigt = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeigt};\n\tfont-style: normal;\n}\r\n`, cb);
                            // `@font-face {
                            //     font-family: ${fontName};
                            //     font-display: swap;
                            //     src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff2");
                            //     font-weight: ${fontWeigt};
                            //     font-style: normal;
                            // }\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // if there is already style file
                console.log("The file scss/fonts.scss already exists. To update it you have to remove it first")
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {  }
}