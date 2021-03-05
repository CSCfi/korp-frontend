/** @format */
const webpack = require("webpack")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin")

function getKorpConfigDirs() {
    fs = require("fs")
    let config = "app"
    let plugins = "app/plugins"
    try {
        json = fs.readFileSync("run_config.json", { encoding: "utf-8" })
        json_parsed = JSON.parse(json)
        config = json_parsed.configDir || "app"
        console.log('Using "' + config + '" as config directory.')
        plugins = json_parsed.pluginDir || config + "/plugins"
        console.log('Using "' + plugins + '" as plugin directory.')
    } catch (err) {
        console.error(err)
        console.log('No run_config.json given, using "app" as config and plugin directory (default).')
    }
    return [config, plugins]
}

const [korpConfigDir, korpPluginDir] = getKorpConfigDirs()

// Return an array of all the locale (language) codes LG from
// localization files filename-LG.json in the directories listed in
// array translDirs.
function getLocales(translDirs) {
    fg = require("fast-glob")
    let locales = new Set()
    for (let translDir of translDirs) {
        let fnames = fg.sync(translDir + "/*.json")
        // console.log("getLocales", translDir, fnames)
        for (let fname of fnames) {
            let basename = path.basename(fname, ".json")
            if (basename.indexOf("-") != -1) {
                locales.add(basename.split("-").slice(-1)[0])
            }
        }
    }
    // Return an array
    return [...locales]
}

// Return a value for the groupBy output specification of
// MergeJsonWebpackPlugin: merge into <filenamePrefix>-LG.json all
// JSON files <filenamePrefix>*-LG.json with the same language code LG
// found under "translations" subdirectories of the directories listed
// in array translBasedirs.
function makeMergeJsonGroupBy(filenamePrefix, translBasedirs) {
    const translDirs = translBasedirs.map(dir => dir + "/translations")
    const multipleDirs = translDirs.length > 1
    const pattBegin = multipleDirs ? "{" : ""
    const pattEnd = multipleDirs ? "}" : ""
    // console.log(translDirs)
    const groupBy = getLocales(translDirs).map(locale => (
        {
            pattern:
                pattBegin +
                translDirs.map(
                    dir => `${dir}/${filenamePrefix}*-${locale}.json`)
                .join(",") +
                pattEnd,
            fileName: `translations/${filenamePrefix}-${locale}.json`,
        }))
    // console.log(groupBy)
    return groupBy
}


module.exports = {
    resolve: {
        alias: {
	    // At some point, jquery appeared to require the
            // path.resolve approach, even though in Språkbankens code
            // it was the literal string, but later the literal string
            // worked, too. Which is correct? Is this modification
            // needed? (Jyrki Niemi 2020-04-28)
            // As of 2021-02-25, path.resolve would seem to be needed.
            // jquery: "jquery/src/jquery",
            jquery: path.resolve(__dirname, "node_modules/jquery/src/jquery"),
            jreject: path.resolve(__dirname, "app/lib/jquery.reject"),
            jquerylocalize: path.resolve(__dirname, "app/lib/jquery.localize"),
            jqueryhoverintent: path.resolve(__dirname, "app/lib/jquery.hoverIntent"),
            configjs: path.resolve(korpConfigDir, "config.js"),
            commonjs: path.resolve(korpConfigDir, "modes/common.js"),
            defaultmode: path.resolve(korpConfigDir, "modes/default_mode.js"),
            customcss: path.resolve(korpConfigDir, "styles/"),
            customscripts: path.resolve(korpConfigDir, "scripts/"),
            customviews: path.resolve(korpConfigDir, "views/"),
            customplugins: path.resolve(korpPluginDir),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.json"),
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: require.resolve(
                    path.resolve(__dirname, "app/scripts/cqp_parser/CQPParser.js")
                ),
                use: "imports-loader?this=>window",
            },
            {
                test: /\.pug$/i,
                exclude: [
                    // does not work
                    path.resolve(__dirname, "app/index.pug"),
                ],
                use: [
                    { loader: "file-loader" },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "" },
                    },
                    { loader: "html-loader" },
                    { loader: "pug-html-loader" },
                ],
            },
            {
                test: /index.pug$/,
                use: [
                    { loader: "file-loader?name=index.html" },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "" },
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            // TODO we should not pretty-print HTML, but removing this
                            // option will result in that some elements get closer together
                            // and need to be fixed with CSS
                            pretty: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                exclude: [path.resolve(korpConfigDir, "./views/")],
                use: [
                    { loader: "file-loader" },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "" },
                    },
                    { loader: "html-loader" },
                ],
            },
            {
                test: /\.html$/,
                include: [path.resolve(korpConfigDir, "./views/")],
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            conservativeCollapse: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=[name].[contenthash].[ext]",
            },
            {
                test: /\.ico$/i,
                loader: "file-loader?name=[name].[ext]",
            },
            {
                test: /\.otf$/i,
                loader: "file-loader",
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/octet-stream",
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // plugins: () => [require("tailwindcss"), require("autoprefixer")],
                            // sourceMap: process.env.NODE_ENV !== "production",
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production",
                            // sourceMapContents: false
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: korpConfigDir + "/modes/*mode.js",
                    to: "modes",
                    flatten: true,
                },
                {
                    from: korpConfigDir + "/modes/*html",
                    to: "modes",
                    flatten: true,
                },
                {
                    from: "app/translations/angular-locale_*.js",
                    to: "translations",
                    flatten: true,
                },
                {
                    from: "app/markup/msdtags.html",
                    to: "markup",
                },
                // This is now handled using MergeJsonWebpackPlugin below
                // {
                //     from: "app/translations/locale-*.json",
                //     to: "translations",
                //     flatten: true,
                // },
                {
                    from: korpConfigDir + "/translations/corpora-*.json",
                    to: "translations",
                    flatten: true,
                },
                {
                    from: korpConfigDir + "/translations/angular-locale_*.js",
                    to: "translations",
                    flatten: true,
                },
                {
                    from: "app/lib/deptrees/",
                    to: "lib/deptrees",
                },
                /* TODO: probably remove this? cannot find any json files there.
                    {
                        from: "node_modules/geokorp/dist/data/*.json",
                        // TODO hard-coded in geokorp project that these files should be here
                        // we need to change geokorp so that these files are required
                        to: "components/geokorp/dist/data",
                        flatten: true
                    }
                    */
            ],
        }),
        // Merge the locale-LG.json files in app/translations,
        // app/plugins/**/translations, <korpConfigDir>/translations
        // and <korpConfigDir>/plugins/**/translations into
        // translations/locale-LG.json, so that the configuration may
        // contain additional translations for plugins (and may
        // override default translations).
        new MergeJsonWebpackPlugin({
            // "debug": true,
            "output": {
                "groupBy": makeMergeJsonGroupBy(
                    "locale",
                    [
                        "app",
                        "app/plugins/**",
                        korpConfigDir,
                        `${korpConfigDir}/plugins/**`,
                    ]),
            },
            "space": 1,
            "globOptions": {
                "nosort": true
            }
        }),
    ],
    entry: {
        bundle: "./app/index.js",
        worker: "./app/scripts/statistics_worker.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "this",
    },
}
