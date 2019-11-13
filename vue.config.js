// vue.config.js
module.exports = {
	// 选项...
	// publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.splendream.com/' : './',
	publicPath: '/',
	assetsDir: 'static',
	devServer: {
	    proxy: {
      		'/admin': {
	        	target: 'https://ttwx.169kang.com/',
	        	changeOrigin: true,
	      	},
	    },
  	},
  	lintOnSave: false //关闭ESlint规范
}