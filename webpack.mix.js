const mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .sass("assets/scss/popup.scss", "assets/dist/css")
  .js("assets/js/background.js", "assets/dist/js")
  .js("assets/js/popup.js", "assets/dist/js")
  .js("assets/js/popup.ts", "assets/dist/js")
  .js("assets/js/background.ts", "assets/dist/js")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
  })
  .options({
    processCssUrls: false,
  });
