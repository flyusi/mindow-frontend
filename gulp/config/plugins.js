import replace from "gulp-replace";
import plumber from "gulp-plumber"; // error processing
import notify from "gulp-notify"; // notifications, tips
import browsersync from "browser-sync"; //local server
import newer from "gulp-newer"; // checks pics to process only new ones
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}