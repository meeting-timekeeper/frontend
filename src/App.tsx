// src/App.tsx
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Top from './pages/Top';
import New from './pages/New';
import MeetingDetail from './pages/MeetingDetail';
import Share from './pages/Share';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/new" element={<New />} />
      <Route path="/:meetingId" element={<MeetingDetail />} />
      <Route path="/:meetingId/share" element={<Share />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
