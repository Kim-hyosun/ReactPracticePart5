import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import data from '../data';
import CardItem from '../components/CardItem';

const Detail = () => {
  let [count, setCount] = useState(3);
  let [alert, setAlert] = useState(true);
  let [shopItems, setshopItems] = useState(data);
  let [loading, setLoading] = useState(true);
  let [storageData, setstorageData] = useState([]);

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    // 1초마다 count를 1씩 감소
    const countInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          //현재count가 양수이면
          return prevCount - 1;
        } else {
          //0이거나 음수이면
          clearInterval(countInterval);
          return 0;
        }
      });
    }, 1000);

    return () => {
      //unmount시 실행
      clearTimeout(alertTimeout);
      clearInterval(countInterval);
    };
  }, []);

  /* data get */
  useEffect(() => {
    axios
      .get('https://kim-hyosun.github.io/dummydata/shopitem.json')
      .then((res) => {
        setshopItems((prev) => [...prev, ...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log('에러: ', err);
      });
  }, []);

  /* 최근 본상품이 있으면 보여주기 */
  useEffect(() => {
    let storedData = localStorage.getItem('watched');
    storedData = JSON.parse(storedData);
    setstorageData(storedData);
  }, []);

  return (
    <>
      <div className="container">
        {alert === true ? (
          <div className="alert alert-warning">
            {count}초이내 클릭시 할인쿠폰 찬스
          </div>
        ) : (
          ''
        )}

        {storageData.length === 0 ? (
          '최근 본 상품 없음'
        ) : (
          <>
            <h5>최근 본 상품</h5>
            <div className="row">
              <CardItem data={storageData} />
            </div>
          </>
        )}

        {loading ? '데이터 로딩중' : <Outlet context={{ shopItems }} />}
      </div>
    </>
  );
};

export default Detail;
