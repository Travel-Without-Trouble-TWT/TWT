import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './pages/Schedule';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
