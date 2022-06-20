const mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .sass("assets/scss/popup.scss", "assets/dist/css")
  .js("assets/ts/popup.ts", "assets/dist/js")
  .js("assets/ts/background.ts", "assets/dist/js")
  .js("assets/ts/content.ts", "assets/dist/js")
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
