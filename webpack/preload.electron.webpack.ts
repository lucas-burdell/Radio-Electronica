import * as path from "path";
import { Configuration } from "webpack";

const rootPath = path.resolve(__dirname, "..");

const config: Configuration = {
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            ['#']: path.resolve(rootPath, 'src/shared/')
        },
    },
    devtool: "source-map",
    entry: path.resolve(rootPath, "src/preload", "preload.ts"),
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
        filename: "preload.js",
    },
};

export default config;
