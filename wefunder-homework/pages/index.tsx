import FileInputForm, { FileInputProps } from '../components/FileInputForm';
import NavBar, { NavBarProps } from '../components/navBar';

const acceptedFileTypes = process.env.AcceptedFileTypes.split(" ").map(i => "." + i);

type Props = {
  fileInputs: FileInputProps
  currentPage: NavBarProps
}

const Home: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar props={props.currentPage}/>
    <div className='container-lg'> 
      <h3>Import any .pdf for your pitch deck</h3>
      <FileInputForm props={props.fileInputs}/>
    </div>
  </div>);
}

export async function getStaticProps() {
  console.log(acceptedFileTypes);
  return {
    props: {
      fileInputs: { AcceptedFileTypes: acceptedFileTypes},
      currentPage: {currentPage: "index"}
    }
  }
}

export default Home
