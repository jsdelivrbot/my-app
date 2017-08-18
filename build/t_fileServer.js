'use strict'

var
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.')

console.log('Static root dir:' + root)

// 创建服务器
var server = http.createServer(function (request, response) {
	// 获得URL的path，类似'/css/bootstrap.css'
	var pathname = url.parse(request.url).pathname;
	// 获得对应的本地文件路径，类似'/srv/www/css/bootstrap.css'
	pathname = pathname === '/' ? pathname + 'index.html' : pathname
	var filepath = path.join(root, pathname);

	// 获取文件状态
	fs.stat(filepath, function (err, stats) {
		if(!err && stats.isFile()){
			// 没有出错并且文件存在
			console.log('200' + request.url);
			// 发送200响应
			response.writeHead(200);
			// 将文件六导向response
			fs.createReadStream(filepath).pipe(response);	//response对象本身是一个Writable Stream
		} else {
			// 出错误或者文件不在
			console.log('404' + request.url)
			// 发送404响应
			response.end('404 Not Found')
		}
	})
})

/**
 * 文件服务器：首先读取url路径，解析出要访问的文件路径
 * 为什么需要文件服务器：因为用户访问的是域名，所以至少需要一个首页充当入口的角色，
 */

server.listen(8080)

console.log('Server is running at http://127.0.0.1:8080/')