
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import Home from './pages/Home';
import History from "./pages/history";


function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>


          <Routes>

            <Route path='/' element={<LandingPage />} />

            <Route path='/auth' element={<Authentication />} />

            <Route path='/home' element={<Home/>} />

            <Route path='/:url' element={<VideoMeetComponent />} />

            <Route path="/history" element={<History />} />
            
          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;