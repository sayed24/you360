var webpack = require('webpack');
var JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
    /// ... rest of config
    plugins: [
        new JsDocPlugin({
            conf: './jsdoc.conf'
        })
    ]
}