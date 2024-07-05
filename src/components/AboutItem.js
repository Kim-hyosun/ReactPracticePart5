import { AboutContext } from '../pages/About';
import { useContext } from 'react';

const AboutItem = () => {
  let user = useContext(AboutContext);

  return (
    <div>
      <h3>회사멤버 정보</h3>
      <ul>
        {user.map((item) => {
          return (
            <li key={item.name}>
              <img
                src={item.userImage}
                alt={item.name + '의 사진 '}
                style={{ width: '100px', height: '100px' }}
              />
              <h5>
                {item.position}: {item.name}
              </h5>
              <p>{item.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AboutItem;
