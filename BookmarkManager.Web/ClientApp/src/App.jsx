import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { AuthenticationComponent } from './AuthenticationContext';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LogOut from './Pages/LogOut';
import PrivateRoute from './components/PrivateRoute';
import MyBookmarks from './Pages/MyBookmarks';
import Add from './Pages/Add';
const App = () => {
    return (
        <AuthenticationComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/logout' element={<PrivateRoute><LogOut /></PrivateRoute>} />
                    <Route path='/mybookmarks' element={<PrivateRoute><MyBookmarks /></PrivateRoute>} />
                    <Route path='/add' element={<PrivateRoute><Add /></PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthenticationComponent>
    );
}

export default App;