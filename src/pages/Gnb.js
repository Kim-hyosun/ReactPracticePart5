import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Gnb = () => {
  const fetchData = async () => {
    let res = await axios.get(
      'https://kim-hyosun.github.io/dummydata/userdata.json'
    );
    return res.data;
  };

  let {
    data: userdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchData,
    config: {
      //staleTime: 1000, // 1초 동안 만료된 데이터를 사용하도록 설정
      //cacheTime: 60000, // 1분 동안 데이터를 캐시로 저장- 다른컴포넌트에서 서버에 값 요청해도 해당 시간안에는 캐싱된 데이터를 씀
      retry: 3, //요청 실패시 3번까지 요청
    },
  });

  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            My Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/about/member">
              Member
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              detail
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              cart
            </Nav.Link>

            <Nav.Link onClick={() => navigate(-1)}>뒤로가기</Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: '#fff' }}>
            {isLoading && '로딩중'}
            {isError && 'user정보 불러오기 실패 '}
            {userdata && userdata[0].name + '님 반갑습니다'}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Gnb;
