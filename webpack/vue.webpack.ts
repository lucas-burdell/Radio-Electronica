import * as path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';

const rootPath = path.resolve(__dirname, "..");

const config = {
  resolve: {
    extensions: [".vue", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
    alias: {
      ['@']: path.resolve(__dirname, 'src/renderer/'),
      ['#']: path.resolve(__dirname, 'src/shared/')
    },
  },
  entry: path.resolve(rootPath, "src/renderer", "index.ts"),
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|ts)$/,
        exclude: /node_modules/,
        options: { appendTsSuffixTo: [/\.vue$/] },
        loader: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ]
      }
    ],
  },
  devServer: {
    static: path.join(rootPath, "dist/renderer"),
    devMiddleware: {
      publicPath: "/",
    },
    port: 4000,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./"
  },
  plugins: [new HtmlWebpackPlugin({ template: 'src/renderer/index.ejs' }), new VueLoaderPlugin()],
};

export default config;
