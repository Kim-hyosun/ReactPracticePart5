import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Gnb from './pages/Gnb';
import Home from './pages/Home';
import Detail from './pages/Detail';
import About from './pages/About';
import NotFound from './pages/NotFound';

import DetailItem from './components/DetailItem';
import ShopList from './components/ShopList';
import AboutItem from './components/AboutItem';

//import Cart from './pages/Cart';
const Cart = lazy(() => import('./pages/Cart.js')); //lazy load

function App() {
  useEffect(() => {
    const storedData = localStorage.getItem('watched');
    if (!storedData) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Gnb />
      {/*  <Suspense> <Routes></Routes></Suspense> 로 작성시 전체 페이지 로딩 화면 적용*/}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/detail" element={<Detail />}>
          <Route index element={<ShopList />} />
          <Route path=":routeId" element={<DetailItem />} />
        </Route>

        {/*  Nested routes : 같은 레이아웃 속의 일부 다르게 표시해야할때 
        "/about"페이지와 "/about/member"로 접근시 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<AboutItem />} />
        </Route>

        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>로딩중입니다</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
