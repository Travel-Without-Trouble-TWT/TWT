import { BrowserRouter, Routes, Route } from 'react-router-dom';

//component
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Selected from './pages/Selected';
import Mypage from './pages/Mypage';
import Schedule from './pages/Schedule';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/search/:location" element={<Selected />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
