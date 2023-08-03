import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Selected from './pages/Selected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/location" element={<Selected />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
