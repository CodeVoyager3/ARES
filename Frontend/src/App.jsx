import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LegalPage from './pages/LegalPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-[#101010] min-h-screen text-white selection:bg-[#00FFFF] selection:text-[#101010]">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
