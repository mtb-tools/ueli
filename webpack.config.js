const path = require("path");
const distributionDirectoryPath = path.join(__dirname, "bundle");
const mode = process.env.NODE_ENV === "production" ? "production" : "development";

console.log(`Mode: ${mode}`);

const entryPoints = {
    main: path.join(__dirname, "src", "main", "Main.ts"),
    preload: path.join(__dirname, "src", "common", "Preload.ts"),
    mainRenderer: path.join(__dirname, "src", "renderer", "MainRenderer.tsx"),
    settingsRenderer: path.join(__dirname, "src", "renderer", "SettingsRenderer.tsx"),
};

const outputFiles = {
    main: "Main.js",
    preload: "Preload.js",
    mainRenderer: "MainRenderer.js",
    settingsRenderer: "SettingsRenderer.js",
};

const targets = {
    main: "electron-main",
    preload: "electron-preload",
    renderer: "electron-renderer",
};

const baseConfig = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(__dirname, ".babelrc"),
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    mode,
};

const mainConfig = {
    entry: entryPoints.main,
    output: {
        filename: outputFiles.main,
        path: distributionDirectoryPath,
    },
    target: targets.main,
};

const preloadConfig = {
    entry: entryPoints.preload,
    output: {
        filename: outputFiles.preload,
        path: distributionDirectoryPath,
    },
    target: targets.preload,
};

const mainRendererConfig = {
    entry: entryPoints.mainRenderer,
    output: {
        filename: outputFiles.mainRenderer,
        path: distributionDirectoryPath,
    },
    target: targets.renderer,
};

const settingsRendererConfig = {
    entry: entryPoints.settingsRenderer,
    output: {
        filename: outputFiles.settingsRenderer,
        path: distributionDirectoryPath,
    },
    target: targets.renderer,
};

module.exports = [
    Object.assign({}, baseConfig, mainConfig),
    Object.assign({}, baseConfig, preloadConfig),
    Object.assign({}, baseConfig, mainRendererConfig),
    Object.assign({}, baseConfig, settingsRendererConfig),
];
