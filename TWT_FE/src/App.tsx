import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';

import Selected from './pages/Selected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/location" element={<Selected />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
