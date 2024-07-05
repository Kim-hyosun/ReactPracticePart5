import CardItem from '../components/CardItem';
import data from '../data';
const Home = () => {
  return (
    <>
      <div className="main-bg"></div>
      <div className="container cardContainer">
        <div className="row">
          <CardItem data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
