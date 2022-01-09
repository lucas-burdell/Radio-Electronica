import * as path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { Configuration, WebpackPluginInstance } from "webpack";

const rootPath = path.resolve(__dirname, "..");

const config: Configuration & { devServer: any } = {
  resolve: {
    extensions: [".vue", ".ts", ".js", ".vue.ts"],
    mainFields: ["main", "module", "browser"],
    alias: {
      ['@']: path.resolve(rootPath, 'src/renderer/'),
      ['#']: path.resolve(rootPath, 'src/shared/')
    },
  },
  entry: path.resolve(rootPath, "src/renderer", "index.ts"),
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
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
  node: {
    __dirname: false
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
  plugins: [new HtmlWebpackPlugin({ template: 'src/renderer/index.ejs' }), new VueLoaderPlugin() as WebpackPluginInstance],
};

export default config;
