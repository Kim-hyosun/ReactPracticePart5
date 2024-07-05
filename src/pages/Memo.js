import { memo, useMemo, useState } from 'react';

const 비싼연산 = () => {
  for (let i = 0; i < 1000; i++) {
    return i;
  }
};

const Memo = () => {
  let [data, setData] = useState(0);

  //useMemo()
  /*
  let result = 비싼연산(); //렌더링될때마다 비싼연산이 다시 실행됨
  */
  //이럴때 useMemo()로 감싸주면, 컴포넌트 렌더링시 1번만 비싼연산을 한번만 실행해줌
  let result = useMemo(() => 비싼연산(), []); //2번째 파라미터는 useEffect의존성 배열과 같음
  console.log(result);

  return (
    <>
      <button onClick={() => setData(data++)}></button>
      <MemoChild data={data} />
    </>
  );
};

//memo()
const MemoChild = memo(() => {});
//1. memo()함수로 자식을 감싸면, 부모가 재랜더링 되어도 자식은 재랜더링되지 않음
//2. 자식이 받는 props가 변경될때만 자식재랜더링 됨 (diff작업에 자원많이씀)

export default Memo;
