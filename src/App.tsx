import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from './Components/HomeScreen/HomeScreen';
import { FormScreen } from './Components/FormScreen/FormScreen';
import { ResultScreen } from './Components/ResultScreen/ResultScreen';
import './index.scss';
import { GalleryScreen } from './Components/GalleryScreen/GalleryScreen';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/form" element={<FormScreen />} />
        <Route path="/results" element={<ResultScreen />} />
        <Route path="/gallery" element={<GalleryScreen />} />
      </Routes>
    </div>
  );
}