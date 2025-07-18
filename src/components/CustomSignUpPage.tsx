// components/CustomSignUpPage.tsx
import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CustomSignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Add your signup logic here
      console.log('Signing up with:', formData);
      // You can show a success message or redirect
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #C0355E 0%, #E8639B 100%)',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #C0355E 0%, #8B1538 100%)',
            color: 'white',
            padding: 4,
            textAlign: 'center',
          }}
        >
          <img 
            src="/enda-logo.png" 
            alt="Enda Logo" 
            style={{ 
              height: '60px',
              width: 'auto',
              marginBottom: '16px'
            }} 
          />
          <Typography variant="h4" fontWeight="600">
            Join Enda
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Create your account
          </Typography>
        </Box>

        <CardContent sx={{ padding: 4 }}>
          <form onSubmit={handleSignUp}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C0355E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C0355E',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C0355E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C0355E',
                      },
                    },
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C0355E',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: '#C0355E',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#8B1538',
                  },
                  '&:disabled': {
                    backgroundColor: '#E0E0E0',
                  },
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate('/login')}
                    sx={{
                      color: '#C0355E',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};