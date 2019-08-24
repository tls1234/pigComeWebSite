'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

let devWebpackConfig = merge(baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
        },
        // cheap-module-eval-source-map is faster for development
        devtool: config.dev.devtool,

        // these devServer options should be customized in /config/index.js
        devServer: {
            historyApiFallback: true,
            hot: true,
            host: process.env.HOST || config.dev.host,
            port: process.env.PORT || config.dev.port,
            open: config.dev.autoOpenBrowser,
            overlay: config.dev.errorOverlay ? {
                warnings: false,
                errors: true,
            } : false,
            publicPath: config.dev.assetsPublicPath,
            proxy: config.dev.proxyTable,
            quiet: true, // necessary for FriendlyErrorsPlugin
            watchOptions: {
                poll: config.dev.poll,
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': require('../config/dev.env')
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
            new webpack.NoEmitOnErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            // new HtmlWebpackPlugin({
            //   filename: 'index.html',
            //   template: 'index.html',
            //   inject: true
            // }),
            new FriendlyErrorsPlugin()
        ]
    })
    // 添加客户端热加载
for (let name in devWebpackConfig.entry) {
    devWebpackConfig.entry[name] = ['./build/dev-client.js', devWebpackConfig.entry[name]]
}
console.log(devWebpackConfig.entry)
let pages = utils.getEntry('./src/pages/**/*.html');

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: './' + pathname + '.html',
        template: pages[pathname], // 模板路径d
        inject: true // js插入位置
    };

    if (pathname in devWebpackConfig.entry) {
        conf.chunks = [pathname];
        conf.hash = true;
    }

    devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
// module.exports = devWebpackConfig;
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.dev.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})