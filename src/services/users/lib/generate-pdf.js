const PdfPrinter = require("pdfmake");
const path = require("path");
const fs = require("fs-extra");

const getDocDefinition = require("./pdfTemplate");

const generatePDF = usersArray =>
  new Promise((resolve, reject) => {
    // I'm returning a Promise because I want to await to the process of creating a PDF
    try {
      // Define font files
      var fonts = {
        Roboto: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalics: "Helvetica-BoldOblique"
        }
      };
      const printer = new PdfPrinter(fonts); // create new PDF creator

      const docDefinition = getDocDefinition(usersArray);

      // We will be using streams to create the pdf file on disk
      const pdfDocStream = printer.createPdfKitDocument(docDefinition, {}); // pdfDocStream is our source stream
      pdfDocStream.pipe(
        fs.createWriteStream(path.join(__dirname, `list.pdf`))
      ); // we pipe pdfDocStream with the destination stream, which is the writable stream to write on disk
      pdfDocStream.end();
      resolve(); // the promise is satisfied when the pdf is
    } catch (error) {
      console.log(error);
      reject(error); // if we are having errors we are rejecting the promise
    }
  });

module.exports = generatePDF;
