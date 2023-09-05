import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import routes from './router/index';

//component
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Selected from './pages/Selected';
import Mypage from './pages/Mypage';
import Schedule from './pages/Schedule';
import Detail from './pages/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/location" element={<Selected />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
