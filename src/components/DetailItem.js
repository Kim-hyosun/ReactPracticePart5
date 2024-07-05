import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import TabItem from './TabItem';

import { useDispatch, useSelector } from 'react-redux';
import { addItemincart, 수량더하기 } from '../store/cart/cartItemSlice';

const DetailItem = () => {
  let { routeId } = useParams();
  const { shopItems } = useOutletContext();
  //console.log(routeId);

  let 찾은상품 = null;
  if (shopItems) {
    찾은상품 = shopItems.find((item) => {
      return item.id.toString() === routeId;
    });
  }

  let [chackNum, setchackNum] = useState(1);
  let [alertNum, setAlertNum] = useState(false);

  useEffect(() => {
    if (isNaN(chackNum) === true) {
      setAlertNum(true);
    } else {
      setAlertNum(false);
    }
  }, [chackNum]);

  let [tab, setTab] = useState(0);

  /* cart에 상품 추가하기 */
  let dispatch = useDispatch();
  let cartItem = useSelector((state) => state.cartItem); //이미 장바구니에 있는지 체크

  /* 최근 본 상품으로 추가해두기 */
  useEffect(() => {
    let storedData = localStorage.getItem('watched');
    storedData = JSON.parse(storedData);
    let 추가조건 = storedData.find((item) => item.id === 찾은상품.id);
    if (!추가조건) {
      //아니면 new Set해도됨
      storedData.push(찾은상품);
      localStorage.setItem('watched', JSON.stringify(storedData));
    }
  }, [찾은상품]);

  return (
    <>
      {찾은상품 ? (
        <>
          <div className="row">
            <div className="col-md-6">
              {찾은상품.imgUrl ? (
                <img
                  src={찾은상품?.imgUrl}
                  alt="상세페이지 이미지"
                  width="100%"
                />
              ) : (
                ''
              )}
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{찾은상품?.title}</h4>
              <p>{찾은상품?.content}</p>
              <input
                onChange={(e) => {
                  setchackNum(e.target.value);
                }}
              />
              {alertNum ? (
                <p style={{ color: 'red' }}>숫자만 입력하세요</p>
              ) : (
                ''
              )}
              <p>{찾은상품?.price}원</p>
              <button
                className="btn btn-danger"
                onClick={() =>
                  cartItem[찾은상품.id] //이미 장바구니에 있는지 체크
                    ? dispatch(수량더하기(찾은상품?.id)) //수량추가
                    : dispatch(
                        //장바구니 상품추가
                        addItemincart({
                          id: 찾은상품?.id,
                          name: 찾은상품?.title,
                        })
                      )
                }>
                장바구니추가
              </button>
            </div>
          </div>
          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={() => setTab(0)} eventKey="link0">
                버튼0
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setTab(1)} eventKey="link1">
                버튼1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setTab(2)} eventKey="link2">
                버튼2
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <TabItem tab={tab} />
        </>
      ) : (
        '로딩중 '
      )}
    </>
  );
};

export default DetailItem;
