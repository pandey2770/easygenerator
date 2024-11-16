import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { DONT_HAVE_ACCOUNT, BUTTON_SING_IN, ROUTE_SING_UP, HEADING_SING_IN } from '../utils/appConst';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const memoizedForm = useMemo(() => form, [form]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(signInUser(memoizedForm));
    },
    [dispatch, memoizedForm]
  );

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>{HEADING_SING_IN}</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={memoizedForm.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={memoizedForm.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}>
            {BUTTON_SING_IN}
          </Button>
        </form>
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate(ROUTE_SING_UP)}
          fullWidth
          sx={{ mt: 2 }}>
          {DONT_HAVE_ACCOUNT}
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
