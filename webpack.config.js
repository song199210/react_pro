const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");

module.exports={
    entry:__dirname+"/main.js",
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"dist")
    },
    devtool: "source-map",
    devServer:{
        host:"localhost",
        port:"8806",
        inline:true,
        historyApiFallback:true,
        hot:true,
        https:false,
        proxy: { // proxy URLs to backend development server
            "/api": {
              target: "http://localhost:3000",
              pathRewrite: {"^/api" : ""}
            }
        }
    },
    module:{
      rules:[
          {
              test:/\.(js|jsx)$/,
              exclude:/node_modules/,
              use:[
                  {
                      loader:"babel-loader",
                      options:{
                          presets:['es2015','react']
                      }
                  }
              ]
          },{
              test:/\.css$/,
              exclude:/node_modules/,
              use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                // module:true
                            }
                        }
                    ]
              })
          },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          },{
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
      ]  
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:__dirname+"/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'build',
            filename: '[name].min.js',
        }),
        new webpack.HotModuleReplacementPlugin()        
    ]
}