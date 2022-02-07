import NavBar, { NavBarProps } from '../components/navBar';
import { readdirSync } from "fs"
import PitchDeckImage, {pitchDeckImageProps} from '../components/pitchDeckImage';

type Props = {
  currentPage: NavBarProps,
  images: pitchDeckImageProps[]
}

const Home: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar props={props.currentPage}/>
    <div className='container-lg'> 
      {
        props.images.map((image) => {
          <PitchDeckImage props={image}/>
        })
      }
    </div>
  </div>);
}

export async function getServerSideProps() {
  var images = readdirSync(process.env.UPLOAD_PATH + "images");
  var pitchDeckImages = [];
  for(var image in images) {
    pitchDeckImages.push({file: process.env.UPLOAD_PATH + "images\\" + image + ".png"});
  }
  console.log(pitchDeckImages);
  return {
    props: {
      currentPage: {currentPage: "pitchDeck"},
      images: pitchDeckImages
    }
  }
}

export default Home