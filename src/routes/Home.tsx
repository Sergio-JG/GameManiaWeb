import Header from '../components/Header';
import Footer from '../components/Footer';
import GameList from '../components/GameList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const storedIdLocal = localStorage.getItem('userId');
    const storedIdSession = sessionStorage.getItem('userId');
    const storedRoleLocal = localStorage.getItem('role');
    const storedRoleSession = sessionStorage.getItem('role');

    if ((storedIdLocal || storedIdSession) && (storedRoleLocal === 'Admin' || storedRoleSession === 'Admin')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <><Header /><GameList /><Footer /></>
  );
}

export default Home;
