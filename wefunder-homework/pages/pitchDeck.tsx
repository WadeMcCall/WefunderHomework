import NavBar, { NavBarProps } from '../components/navBar';
import { readdirSync } from "fs"
import sizeOf from "image-size"


type Props = {
  currentPage: NavBarProps,
  images: isImage[]
}

type isImage = {
  src: string,
  dimensions: {width:number, height:number}
}

type imageListProps = {
  images: isImage[]
}

const ImageList: React.FC<imageListProps> = props => {
    const images = props.images.map((image) => {
      return (
        <img 
          src={"/" + image.src}
          key={image.src}
          className="img-fluid"
          height={image.dimensions.height}
          width={image.dimensions.width}
        />);
    });
    return <div>{images}</div>;
}

const PitchDeck: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar props={props.currentPage}/>
    <div className='container-lg'> 
      <ImageList
        images = {props.images}
      />
    </div>
  </div>);
}

export async function getStaticProps() {
  var images = readdirSync(process.env.UPLOAD_PATH + "images");
  var pitchDeckImages = [];
  for(var image in images) {
    const dimensions = sizeOf(process.env.UPLOAD_PATH + "/images/" + images[image])
    pitchDeckImages.push({ src: "images/" + images[image], dimensions:{height: dimensions.height, width:dimensions.width}});
  }
  return {
    props: {
      currentPage: {currentPage: "pitchDeck"},
      images: pitchDeckImages
    }
  }
}

export default PitchDeck