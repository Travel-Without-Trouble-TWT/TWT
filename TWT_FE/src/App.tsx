import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import routes from './router/index';

//component
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Selected from './pages/Selected';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
