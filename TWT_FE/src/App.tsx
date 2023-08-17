import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Selected from './pages/Selected';

import Selected from './pages/Selected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/location" element={<Selected />} />
          <Route path="/" element={<Main />} />
          <Route path="/location" element={<Selected />} />
          <Route path="/search/location" element={<Selected />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
