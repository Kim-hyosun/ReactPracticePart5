import styled from 'styled-components';

let TextAlert = styled.div`
  color: ${(props) => (props.$bg === 'yellow' ? 'red' : 'blue')};
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  background-color: ${(props) => props.$bg};
  padding: 20px 0;
`;

const Btn = styled(TextAlert).attrs({ as: 'button' })`
  //버튼으로 속성변경해서 TextAlert상속하기
  background-color: #ddd;
  border: none;
  cursor: pointer;
`;

const NotFound = () => {
  return (
    <>
      <TextAlert $bg="yellow">잘못된 접근입니다</TextAlert>
      <Btn>다시돌아가기</Btn>
    </>
  );
};

export default NotFound;
