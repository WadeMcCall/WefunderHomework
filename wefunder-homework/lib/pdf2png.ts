import rimraf from "rimraf";
var exec = require('child_process').execSync; // a better way would be to avoid blocking... 

// When we have successfully uploaded the pdf to the server, 
const convertToImages = async () => {
    // Unix rm -rf synchronously
    rimraf.sync(process.env.UPLOAD_PATH + "images/*", {});

    const inputFile = process.env.UPLOAD_PATH + "uploads\\theFile.pdf"
    const outputFile = process.env.UPLOAD_PATH + "images\\%d.png"

    // The ghostscript command is different for linux and windows
    const ghostscriptCommand = 'gswin32.exe' // 'gs' on linux; 
    
    exec(
      `${ghostscriptCommand} -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sDEVICE=png16m -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -r${300} -dFirstPage=${1} -dLastPage=${20} -sOutputFile=${outputFile} ${inputFile}`,
    );
}

export default convertToImages;