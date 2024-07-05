import { Link } from 'react-router-dom';

const CardItem = ({ data }) => {
  return (
    <>
      {data.map((item, idx) => (
        <div className="col-md-4 cardImg" key={item.id}>
          <Link to={`/detail/${item.id}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/car${idx + 1}.png`}
              alt=""
            />
            <h5>{item.title}</h5>
            <p>{item.content}</p>
            <strong>가격: {item.price}</strong>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CardItem;
