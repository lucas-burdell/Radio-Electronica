import * as path from "path";
import { Configuration } from "webpack";

const rootPath = path.resolve(__dirname, "..");

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      ['!']: path.resolve(__dirname, 'src/main/'),
      ['#']: path.resolve(__dirname, 'src/shared/')
    },
  },
  devtool: "source-map",
  entry: path.resolve(rootPath, "src/main", "main.ts"),
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(rootPath, "dist"),
    filename: "[name].js",
  },
};

export default config;
