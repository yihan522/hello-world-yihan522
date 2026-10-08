// 引入 Node.js 内置模块，无需安装任何第三方依赖
const http = require('http');
const fs = require('fs');
const path = require('path');

// 服务器监听端口
const PORT = process.env.PORT || 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 读取静态页面 index.html
  const indexPath = path.join(__dirname, 'public', 'index.html');

  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('服务器内部错误：无法读取页面文件');
      return;
    }

    // 生成当前服务器时间
    const now = new Date();
    const serverTime = now.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // 将页面中的占位符替换为真实的服务器时间
    const finalHtml = html.replace('__SERVER_TIME__', serverTime);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(finalHtml);
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log('========================================');
  console.log('  Hello World 网站已启动！');
  console.log(`  访问地址: http://localhost:${PORT}`);
  console.log('  按 Ctrl + C 停止服务器');
  console.log('========================================');
});
