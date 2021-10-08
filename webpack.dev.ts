import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js",".scss"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 9000,
  },
};

export default config;
