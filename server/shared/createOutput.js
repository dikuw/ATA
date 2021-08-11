const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, ImageRun } = require('docx');

exports.createDoc = (fileName, testTitle, results) => {
  let children = [];

  children.push(
    new Paragraph({
      children: [
        new TextRun(
          {
            text: `${testTitle}`,
            underline: {},
          },
        ),
      ],
    })
  );

  results.forEach(item => {
    let { result, resultString, image } = item;
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${result}`,
          }),
          new TextRun({
            text: resultString,
            italics: true,
          }),
        ],
        keepNext: true,
      }),
    )
    if (image) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: fs.readFileSync(`./tests/screenshots/${image}`),
              transformation: {
                width: 400,
                height: 200,
              },
            }),
          ],
        }),
      )
    }
  });

  const doc = new Document({
    sections: [{ children }]
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`./tests/output/${fileName}.docx`, buffer);
  });
}
