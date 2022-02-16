import NavBar from '../components/navBar';
import { readdirSync } from "fs"
import sizeOf from "image-size"
import ImageList, { iImage } from "../components/ImageList"


type Props = {
  images: iImage[]
}

const PitchDeck: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar/>
    <div className='container-lg'> 
      <ImageList
        images = {props.images}
      />
    </div>
  </div>);
}

export async function getStaticProps() {
  var images = readdirSync(process.env.UPLOAD_PATH + "images");
  var pitchDeckImages = []; // iImage []
  for(var image in images) {
    const dimensions = sizeOf(process.env.UPLOAD_PATH + "/images/" + images[image])
    pitchDeckImages.push({ src: "images/" + images[image], height: dimensions.height, width: dimensions.width});
  }
  return {
    props: {
      currentPage: {currentPage: "pitchDeck"},
      images: pitchDeckImages
    }
  }
}

export default PitchDeck