import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import formidable from 'formidable'
import { rename } from 'fs';
import convertToImages from "../../lib/pdf2png"
import rimraf from 'rimraf';
import fs from 'fs'

// TODO put in central location. Exists in index.tsx also
const acceptedFileTypes = process.env.AcceptedFileTypes.split(" ");
const uploadFolder = process.env.UPLOAD_PATH + "uploads";

// helper function to get the file extension from the mimetype
function getFileType(mimeType: string | null) {
    var mimeTypeExtension = mimeType?.split('/').pop();
    // Docx does weird things with their mimetype
    if(mimeTypeExtension?.indexOf("document") !== -1) return "docx";
    return mimeTypeExtension;
}

// This is where we handle the file being posted.
function handle (req: NextApiRequest, res: NextApiResponse) {  
    // Create the output folder if it doesnt exist.
    if (!fs.existsSync(uploadFolder)){
      fs.mkdirSync(uploadFolder);
    }

    // Unix rm -rf synchronously
    rimraf.sync(uploadFolder + "/*", {});

    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      uploadDir: uploadFolder,
      keepExtensions: true
    });

    form.on('file', async(name, file) => {      
      // Get file extension from the mimetype
      var fileType = getFileType(file.mimetype);

      // Check the user did not send an unsupported file. This should only be a problem if the user is a bad actor since we check for this on client side.
      if(acceptedFileTypes.indexOf(fileType || "") == -1) {
        throw new Error("invalid file type");
      }

      // Rename the incoming file to the file's name
      rename(uploadFolder + "/" + file.newFilename, uploadFolder + "/" + name + "." + fileType, (err) => {
        rimraf.sync(uploadFolder + "/*", {});
        if(err) throw new  Error(err.message);
      });
    });

    form.parse(req, async (err, fields, files) => {
      await convertToImages();

      res.send(res.statusMessage);
    });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);

    // Unix rm -rf synchronously
    rimraf.sync(uploadFolder + "/*", {});

    res.status(500).end("Unable to upload file! " + err.toString());
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  }
}).post(handle); // Only handle posts

export default handler;