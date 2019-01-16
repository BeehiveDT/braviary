const mix = require('laravel-mix');
const browserSyncPlugin = require('browser-sync-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .browserSync('braviary.test');
//    .browserSync({
//       proxy: '172.19.0.7', // nginx or caddy Docker ip (more on that later)
//       host: 'braviary.test', // your hostname from .hosts
//       open: true // there is no browser in workspace
//   });


// DOCKER_HOST_IP
// 10.0.75.1