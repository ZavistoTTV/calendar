import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarLayout from './panel/layout/SidebarLayout';
import Home from './panel/pages/Home';
import Calendar from './panel/pages/Calendar';
import Settings from './panel/pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}

export default App;
