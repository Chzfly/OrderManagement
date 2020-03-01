module.exports = {
    //模式
    mode : "development" , 
    //入口
    entry : "./app/main.js",
    //出口
    output : {
        //虚拟打包路径，文件并没有真正生成
        publicPath : "xuni",
        //文件名
        filename : "bundle.js"
    },
    //外加模块（loader）
    module: {
        rules: [
            {
                //less结尾的
                test: /\.less$/,
                //使用三个loader
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader", 
                        options: { javascriptEnabled: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                //以js结尾，或者mjs结尾
                test: /\.m?js$/,
                //排除node_modules文件夹
                exclude: /(node_modules|bower_components)/,
                //使用loader
                use: {
                    loader: 'babel-loader',
                    //loader的配置项
                    options: {
                        //预处理设置。env翻译新版本ES到旧版本的，react是翻译jsx语法的
                        presets: ['env' , 'react'],
                        //插件,transform-runtime是处理async/await，transform-object-rest-spread是处理...语法的
                        plugins: ['transform-runtime', 'transform-object-rest-spread', ['import', {
                            "libraryName": "antd",
                            "style": 'css',
                            "libraryDirectory": "lib" 
                        }]]
                    }
                }
            }
        ]
    },
    //代理跨域，比如将http://127.0.0.1:3000/shu代理到http://127.0.0.1:8080/api/shu
    devServer: {
        //proxy就是代理的意思
        proxy: {
            //补充/api前缀
            '/api': {
                target: 'http://192.168.2.250/',
                //路径重写
                pathRewrite: { '^/api': '' }
            }
        }
    },
    //配置别名
    resolve: {
        //数组中就是所有的默认文件名
        mainFiles: ['index','Index'],
        //省略扩展名
        extensions: ['.js']
    }
}