"use strict"

let pdfmaker  = require('pdfmake/src/printer')

module.exports = ( () => {

  var createPdfBinary = (font_desc, pdfDoc, callback) => {
    var printer = new pdfmaker(font_desc)
    var doc = printer.createPdfKitDocument(pdfDoc)
    var chunks = []

    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => callback(Buffer.concat(chunks)))
    doc.end()
  }

  return {
    create: (data, callback) => {
      var font_desc = {
        msyh: {
          normal: 'font/msyh.ttf',
          bold: 'font/msyh.ttf'
        }
      }
      var widths = [60, 60, 80, 60, 60, 60, '*']
      var alignment = ['left','left','left','left','left','right','right']

      var doc_def = { 
        content: [
          { text: 'Tables', style: 'header' },
          '和This is an sample PDF printed with pdfMake和',
          {
            style: 'tableExample',
            table: {
              widths: widths,
              body: [
                data.title.map(c => ({ text: c, style: 'tableHeader', alignment: 'center' })), 
                ...data.body.map(c =>c.map((d,i)=>({text: d, style: 'tableHeader', alignment:  alignment[i]})))
              ]
            }
          },
          { text: data.summary, style: 'header', alignment:  'right' },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
        defaultStyle: {
          font: 'msyh'
        }
      }

      createPdfBinary(font_desc, doc_def, callback)
    }
  }
}())