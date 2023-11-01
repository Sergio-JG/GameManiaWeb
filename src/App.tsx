import './App.css';
import ApiData from './components/GameList';
import Header from './components/HeaderComponent';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <Header/>
      <ApiData />
      <Footer/>
    </div>
  );
}

export default App;
