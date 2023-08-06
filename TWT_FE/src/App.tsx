import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
