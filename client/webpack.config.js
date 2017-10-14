var webpack = require("webpack");
var path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT = path.resolve(__dirname);
// var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: {
    html: ROOT + '/app/content/index.html',
    vendor: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      'react',
      'react-dom',
      'react-router',
    ],
    app:[
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
       ROOT + '/app/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  devtool:'inline-source-map',
  devServer: {
  	inline: true,
    port:4445,
    hot: true,
  },
  module:{
  	rules: [
    {
      test: /\.html$/,
      loader: ['react-hot-loader/webpack', 'file-loader?name=[name].[ext]'],
    },
  	{
  		test: /\.(js|jsx)$/,
  		exclude: /node_modules/,
  		loader: 'babel-loader?cacheDirectory=true'
  	},
    {
      test: /\.css$/,
      exclude: path.join(__dirname, 'app'),
      use: [{
              loader:'style-loader',
            },{
              loader:'css-loader',
            }],
    },
    {
      test: /\.css$/,
      include: path.join(__dirname, 'app'),
      use: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        'postcss-loader',
      ],
    },
    {
      test: /\.svg(\?.*)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]',
      // include: path.join(__dirname, 'client', 'assets'),
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=8192&mimetype=image/png&name=images/[name].[ext]',
      // include: path.join(__dirname, 'client', 'assets'),
    }, {
      test: /\.gif$/,
      loader: 'url-loader?limit=8192&mimetype=image/gif&name=images/[name].[ext]',
      // include: path.join(__dirname, 'client', 'assets'),
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?limit=8192&mimetype=image/jpg&name=images/[name].[ext]',
      // include: path.join(__dirname, 'client', 'assets'),
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    },
  ]
},
resolve: {
  extensions: ['.json','.js', '.jsx']
},
plugins: [
      // new webpack.DefinePlugin({
      //    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
      //  //  'process.env.HOSTNAME': JSON.stringify('localhost'),
      //    'process.env.PORT': 4445
      // }),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
};
//process.traceDeprecation = true;
module.exports = config;
