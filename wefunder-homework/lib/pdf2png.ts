import { fromPath } from "pdf2pic";

// When we have successfully uploaded the pdf to the server, 
const convertToImages = () => {
    const options = {
      density: 100,
      saveFilename: "untitled",
      savePath: "../images",
      format: "png",
      width: 600,
      height: 600
    };

    const storeAsImage = fromPath(process.env.UPLOAD_PATH + "/theFile.pdf", options);
    const pageToConvertAsImage = -1;

    storeAsImage.bulk(pageToConvertAsImage, false);
}

export default convertToImages;