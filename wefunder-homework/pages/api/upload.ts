import formidable from 'formidable'
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from 'next'
import { rename } from 'fs';
import rimraf from 'rimraf' // Unix rm -rf
import convertToImages from "../../lib/pdf2png"

// TODO put in central location. Exists in index.tsx also
const acceptedFileTypes = ["pdf"/*, "docx"*/];
const uploadFolder = process.env.UPLOAD_PATH;

// Helper function for deleting all files in the uploads folder
function deleteOldFiles() {
  rimraf.sync; // do it synchronously for convenience sake.
  rimraf(uploadFolder + "/*", function () { });
}

// helper function to get the file extension from the mimetype
function getFileType(mimeType: string | null) {
    var mimeTypeExtension = mimeType?.split('/').pop();
    // Docx does weird things with their mimetype
    if(mimeTypeExtension?.indexOf("document") !== -1) return "docx";
    return mimeTypeExtension;
}

// This is where we handle the file being posted.
async function handle (req: NextApiRequest, res: NextApiResponse) {    
    // First, delete the old file if there is one.
    deleteOldFiles();

    const form = new formidable.IncomingForm({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      uploadDir: uploadFolder,
      keepExtensions: true
    });

    form.on('file', (name, file) => {      
      // Get file extension from the mimetype
      var fileType = getFileType(file.mimetype);

      // Rename the incoming file to the file's name
      rename(uploadFolder + "/" + file.newFilename, uploadFolder + "/" + name + "." + fileType, (err) => {
        if(err) throw new  Error(err.message);
      });

      // Check the user did not send an unsupported file. This should only be a problem if the user is a bad actor since we check for this on client side.
      if(acceptedFileTypes.indexOf(fileType || "") == -1) {
        throw new Error("invalid file type");
      }
      
    });

    // This is where we set things in motions. Parse the file and the on 'file' event we set up above will fly
    form.parse(req, (err, fields, files) => {
      // convertToImages(); // pdf

      res.send(res.statusMessage);
    });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.log(err);
    // deleteOldFiles();

    res.status(500).end(err.toString());

    next();
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  }
}).post(handle); // Only handle posts

export default handler;