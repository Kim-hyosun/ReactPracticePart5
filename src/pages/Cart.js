import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { countMinus, 수량더하기 } from '../store/cart/cartItemSlice';

const Cart = () => {
  let cartItem = useSelector((state) => state.cartItem); //store state
  cartItem = Object.values(cartItem); //Array로 변환

  let dispatch = useDispatch(); //store에 요청전달
  return (
    <>
      <h3>장바구니</h3>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {/*  <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr> */}
          {cartItem.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button onClick={() => dispatch(수량더하기(item.id))}>+</button>
                <button
                  onClick={() =>
                    item.count > 0 ? dispatch(countMinus(item.id)) : ''
                  }>
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Cart;
