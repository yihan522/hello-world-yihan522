// Vercel Serverless 函数入口
// 保留本地 server.js 用于本地运行；部署到 Vercel 时走本文件
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // 读取静态页面 index.html
  const indexPath = path.join(process.cwd(), 'public', 'index.html');

  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
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

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(finalHtml);
  });
};
