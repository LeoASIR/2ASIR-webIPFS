import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Chat } from './components/chat';
import { Footer } from './components/footer';
import { Menu } from './components/menu';
import { Rutas } from './pages/rutas';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu/>
          <div className="content-wrapper">
            <Rutas/>
          </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
