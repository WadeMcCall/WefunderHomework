import FileInputForm, { FileInputProps } from '../components/FileInputForm';
import NavBar from '../components/navBar';

const acceptedFileTypes = process.env.AcceptedFileTypes.split(" ").map(i => "." + i);

type Props = {
  fileInputs: FileInputProps
}

const Home: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar/>
    <div className='container-lg'> 
      <h3>Import any {acceptedFileTypes.toString()} for your pitch deck</h3>
      <FileInputForm props={props.fileInputs}/>
    </div>
  </div>);
}

export async function getStaticProps() {
  return {
    props: {
      fileInputs: { AcceptedFileTypes: acceptedFileTypes},
    }
  }
}

export default Home
