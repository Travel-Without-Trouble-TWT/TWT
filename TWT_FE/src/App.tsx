import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
