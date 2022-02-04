import NavBar, { NavBarProps } from '../components/navBar';

type Props = {
  currentPage: NavBarProps
}

const Home: React.FC<Props> = props => {
  return (
  <div className='container-fluid'> 
    <NavBar props={props.currentPage}/>
    <div className='container-lg'> 
    </div>
  </div>);
}

export async function getStaticProps() {
  return {
    props: {
      currentPage: {currentPage: "pitchDeck"}
    }
  }
}

export default Home