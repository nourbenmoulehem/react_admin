// components/VerificationPage.tsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { authProvider } from '../auth/authProvider';
import { ExtendedAuthProvider } from '../auth/authProvider';

export const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or require manual input
  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    }
  }, [location.state]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!code) {
      setError('Verification code is required');
      setLoading(false);
      return;
    }

    try {
      const extendedAuthProvider = authProvider as ExtendedAuthProvider;
      await extendedAuthProvider.verify(email, code);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Account verified successfully! You can now log in.' }
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email is required to resend code');
      return;
    }

    setResendLoading(true);
    setError('');

    try {
      const extendedAuthProvider = authProvider as ExtendedAuthProvider;
      await extendedAuthProvider.resendCode(email);
      setTimeLeft(600); // Reset timer to 10 minutes
      alert('Verification code sent! Check your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  if (success) {
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
            maxWidth: 400,
            width: '100%',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
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
              Account Verified!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Redirecting to login...
            </Typography>
          </Box>
          <CardContent sx={{ padding: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ color: '#C0355E' }} />
          </CardContent>
        </Card>
      </Box>
    );
  }

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
            Verify Your Account
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Enter the verification code sent to your email
          </Typography>
          {timeLeft > 0 && (
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
              Code expires in: {formatTime(timeLeft)}
            </Typography>
          )}
        </Box>

        <CardContent sx={{ padding: 4 }}>
          <form onSubmit={handleVerify}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                  {error}
                </Alert>
              )}

              {timeLeft <= 0 && (
                <Alert severity="warning" sx={{ borderRadius: '8px' }}>
                  Verification code has expired. Please request a new one.
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!location.state?.email}
                helperText={location.state?.email ? "Email from signup" : ""}
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
                label="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                inputProps={{ maxLength: 6 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '18px',
                    textAlign: 'center',
                    '& input': {
                      textAlign: 'center',
                      fontSize: '18px',
                      letterSpacing: '0.5em',
                    },
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
                disabled={loading || timeLeft <= 0}
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
                {loading ? 'Verifying...' : 'Verify Account'}
              </Button>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleResendCode}
                  disabled={resendLoading || !email}
                  sx={{
                    borderColor: '#C0355E',
                    color: '#C0355E',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#8B1538',
                      backgroundColor: '#FFF0F5',
                    },
                  }}
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already verified?{' '}
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
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};