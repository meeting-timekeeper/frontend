// src/App.tsx
import type { ReactElement } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Top from './pages/Top.tsx';
import New from './pages/New.tsx';
import MeetingDetail from './pages/MeetingDetail.tsx';
import Share from './pages/Share.tsx';

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/new" element={<New />} />
      <Route path="/meetings/:meetingId" element={<MeetingDetail />} />
      <Route path="/meetings/:meetingId/share" element={<Share />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
