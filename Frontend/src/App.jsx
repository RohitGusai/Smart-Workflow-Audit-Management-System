
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import './index.css';
import { AuthProvider } from './Context/authContext';

import LoginPage from './Pages/LoginPage';
import UserDashboard from './Pages/UserDashboard';
import ManagerDashboard from './Pages/ManagerDashboard';
import Registration from './Pages/Registration';
// import AdminPage from './Pages/AdminPage';
import UnauthorizedPage from './Pages/Unauthorization';
import ProtectedRoute from './Components/ProtectedRoute';
import UpdateProfile from './Pages/UpdateProfile';
import NotFound from './Pages/NotFound';
import Navbar from './Pages/Navbar';
import ProfilePage from './Pages/ProfilePage';


function App() {


  return (
    <>
    
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<ProtectedRoute role={["ADMIN","USER","MANAGER"]}>
        <UserDashboard/>
        </ProtectedRoute>
        }/>

        <Route path="/approvals" element={<ProtectedRoute role={["MANAGER"]}>
        <ManagerDashboard/>
        </ProtectedRoute>
        }/> 

        <Route path="/registration" element={<ProtectedRoute role={["ADMIN"]}>
        <Registration/>
        </ProtectedRoute>
        }/>

        <Route path="/profile" element={<ProtectedRoute role={["ADMIN"]}>
        <ProfilePage/>
        </ProtectedRoute>
        }/>

        <Route path="/update/:id" element={<ProtectedRoute role={["ADMIN"]}>
        <UpdateProfile/>
        </ProtectedRoute>
        }/>

        {/* <Route path="/admin" element={<ProtectedRoute role={["admin"]}>    
        <AdminPage/>
        </ProtectedRoute>
        }/>  */}

        <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
