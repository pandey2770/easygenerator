import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from './redux/actions/authActions';
import { AppDispatch } from './redux/store';
import Welcome from './pages/Welcome'
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            isAuthenticated ? <Welcome /> : <Navigate to="/signin" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;