import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AboutContext = createContext([]);

const About = () => {
  let [user, setUser] = useState([]);
  let [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get('https://kim-hyosun.github.io/dummydata/userdata.json')
      .then((res) => {
        setUser(res.data);
        setLoad(true);
      })
      .catch((err) => {
        console.log('에러: ', err);
      });
  }, []);

  return (
    <>
      <h4>회사정보</h4>
      {load ? (
        <AboutContext.Provider value={user}>
          <Outlet />
        </AboutContext.Provider>
      ) : (
        ''
      )}
    </>
  );
};

export default About;
