"use strict"

let WSServer  = require('ws').Server,
    fs        = require('fs'),
    report    = require('./report'),
    wss       = {}

module.exports = server => {
  wss = new WSServer({server : server})
  wss.on('connection', ws => {
    console.log('A ws client connected.')
    ws.on('message', msg => {
      msg = JSON.parse(msg)
      console.log(msg)
      switch(msg.type){
        case 'json-request':
          fs.readFile('data/data.json', 'utf8', (err, data) => {
            if (err) throw err;
            send({type : 'json-response', data : JSON.parse(data)});
          });
          break;
        case 'print-request':
          report.create(msg.data, binary => send({type : 'print-response', file: binary, aaa : 'pdfpdfpdf'}))
          break;
        case 'save-request':
          fs.writeFile('data/data.json', JSON.stringify(msg.data), 'utf8', (err) => {
            if (err) throw err;
          });
          break;
        default:
      }
    })
    ws.on('close', () => console.log('A ws client disconnected.'))
    ws.on('error', () => console.log(e))
    let send = (msg, cb) => {
      cb = cb || function(){}
      ws.send(JSON.stringify(msg), err => ws.readyState === 3 ? cb() : cb(err))
    }
    let broadcast = msg => wss.clients.map( c => c.send(JSON.stringify(msg)))
  }
)}