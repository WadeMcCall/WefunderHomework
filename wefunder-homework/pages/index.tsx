import FileInputForm, { FileInputProps } from '../components/FileInputForm';
import NavBar, { NavBarProps } from '../components/navBar';

const acceptedFileTypes = [".PDF"/*, ".DOCX"*/];

type Props = {
  fileInputs: FileInputProps
  currentPage: NavBarProps
}

const Home: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar props={props.currentPage}/>
    <div className='container-lg'> 
      <h3>Import any .pdf, .ppt. or .docx for your pitch deck</h3>
      <FileInputForm props={props.fileInputs}/>
    </div>
  </div>);
}

export async function getStaticProps() {
  return {
    props: {
      fileInputs: { AcceptedFileTypes: acceptedFileTypes},
      currentPage: {currentPage: "index"}
    }
  }
}

export default Home
