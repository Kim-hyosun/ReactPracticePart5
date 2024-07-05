import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const ShopList = () => {
  const { shopItems } = useOutletContext();

  return (
    <>
      <h4>상품리스트</h4>
      <ul>
        {shopItems.map((item) => {
          return (
            <Link key={`shopitems-${item.id}`} to={`/detail/${item.id}`}>
              {item.imgUrl ? <img src={item.imgUrl} alt={item.title} /> : ''}
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <strong>{item.price}원</strong>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default ShopList;
