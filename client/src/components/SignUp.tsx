import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BUTTON_SING_UP, HEADING_SING_UP } from '../utils/appConst';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    letter: false,
    number: false,
    specialChar: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const memoizedForm = useMemo(() => form, [form]);

  // Function to validate password
  const validatePassword = (password: string) => {
    const validations = {
      length: password.length >= 8,
      letter: /[a-zA-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidations(validations);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
      if (name === 'password') {
        validatePassword(value);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(signUpUser(memoizedForm));
      navigate('/signin');
    },
    [dispatch, memoizedForm, navigate]
  );

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>{HEADING_SING_UP}</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={memoizedForm.name}
            onChange={handleChange}
            margin="normal"
            required
          />
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {passwordValidations.length &&
                    passwordValidations.letter &&
                    passwordValidations.number &&
                    passwordValidations.specialChar ? (
                      <CheckCircleIcon color="success" />
                    ) : null}
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              Password Requirements:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {passwordValidations.length ? <CheckCircleIcon color="success" /> : null}
              <Typography variant="body2">Minimum length of 8 characters</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {passwordValidations.letter ? <CheckCircleIcon color="success" /> : null}
              <Typography variant="body2">Contains at least 1 letter</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {passwordValidations.number ? <CheckCircleIcon color="success" /> : null}
              <Typography variant="body2">Contains at least 1 number</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {passwordValidations.specialChar ? <CheckCircleIcon color="success" /> : null}
              <Typography variant="body2">Contains at least 1 special character</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            disabled={
              !passwordValidations.length ||
              !passwordValidations.letter ||
              !passwordValidations.number ||
              !passwordValidations.specialChar
            }
          >
            {BUTTON_SING_UP}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
