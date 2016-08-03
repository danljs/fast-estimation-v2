"use strict"

let pdfmaker  = require('pdfmake/src/printer')
// const linebreak = require('linebreak')

module.exports = ( () => {
	var createPdfBinary = (font_desc, pdfDoc, callback) => {
    var printer = new pdfmaker(font_desc)
    var doc = printer.createPdfKitDocument(pdfDoc)
    var chunks = []

    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => callback(Buffer.concat(chunks)))
    doc.end()
  }
  // var lenOfString = str => str.replace(/[\u0391-\uFFE5]/g,"aa").length

  // var font = { fontSize: 12, bold: false, italics: false, font: 'Helvetica' }
  // var sizeOfString = text => text.length * font.fontSize * (font.bold ? 1.5 : 1) * (font.italics ? 1.1 : 1)
  // console.log(lenOfString('hj六'))

  // var lorem = '中文表后中文表后中文表后中文表后';
  // // var lorem = 'lorem ipsum...';
  // var breaker = new linebreak(lorem);
  // var last = 0;
  // var bk;

  // while (bk = breaker.nextBreak()) {
  //   // get the string between the last break and this one
  //   var word = lorem.slice(last, bk.position);
  //   console.log(word);

  //   // you can also check bk.required to see if this was a required break...
  //   if (bk.required) {
  //     console.log('\n\n');
  //   }
  // }

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
        data.contract.before,
        {
          style: 'tableExample',
          table: {
            widths: widths,
            body: [
              data.title.map(c => ({ text: c, style: 'tableHeader', alignment: 'center' })), 
              ...data.body.map(c => c.map((d,i) => ({text: d, style: 'tableHeader', alignment:  alignment[i]})))
            ]
          }
        },
        { text: data.summary, style: 'header', alignment:  'right' },
        data.contract.after,
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
      defaultStyle: { font: 'msyh' }
    }

    createPdfBinary(font_desc, doc_def, callback)
  }
}
}())