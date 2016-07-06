'use strict'
let http        = require('http'),
    fs            = require('fs'),
    path          = require('path'),
    contentTypes  = require('./utils/content-types'),
    sysInfo       = require('./utils/sys-info'),
    report = require('./src/report'),
    wss           = require('./src/ws_server')


let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  let url = req.url;
  switch(url){
    case '/health':
      res.writeHead(200);
      res.end();
      break;
    case '/info/gen':
    case '/info/poll':
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache, no-store');
      res.end(JSON.stringify(sysInfo[url.slice(6)]()));
      break;
    case '/pdf':
      report.create(req.data, binary => res.end(binary), error => res.send('ERROR:' + error))

      // let tmp_dir = __dirname + '/tmp';
      // !!!fs.existsSync(tmp_dir) ? fs.mkdirSync(tmp_dir) : ''

      // report.create(req.data, binary => {
      //   let file_name = tmp_dir + '/test.pdf'
      //   fs.writeFile(file_name, binary , err => {
      //     if (err) { return console.log(err)}
      //     res.download(file_name)
      //   })
      //   }, error => res.send('ERROR:' + error)
      // )

      break;
    case '/':
      url = 'index.html'
    default:
      fs.readFile(url, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
        } else {
          let ext = path.extname(url).slice(1);
          res.setHeader('Content-Type', contentTypes[ext]);
          if (ext === 'html') {
            res.setHeader('Cache-Control', 'no-cache, no-store');
          }
          res.end(data);
        }
      });
  }
});

wss(server)
let port = process.env.NODE_PORT || 3000
server.listen(port, process.env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started at ${port}...`);
});
