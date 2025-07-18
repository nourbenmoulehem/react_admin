// components/CustomLoginPage.tsx
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
import { useLogin, useNotify } from 'react-admin';
import { useNavigate } from 'react-router-dom';

export const CustomLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({ username: email, password });
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion');
      notify('Échec de la connexion', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // background: 'linear-gradient(135deg, #C0355E 0%, #E8639B 100%)',
        padding: 2,
      }}
    >

      <img 
        src="/enda-logo.png" 
        alt="Enda Logo" 
        style={{ 
          height: '100px',
          width: 'auto',
          marginBottom: '16px'
        }} 
      />
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
            background: 'linear-gradient(135deg, #C0355E 0%, #8B1538 100%)',
            color: 'white',
            padding: 4,
            textAlign: 'center',
          }}
        >
          
          <Typography variant="h4" fontWeight="600">
            Bienvenue chez Enda Admin
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Connectez-vous à votre compte
          </Typography>
        </Box>

        <CardContent sx={{ padding: 4 }}>
          <form onSubmit={handleLogin}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                label="Mot de Passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Connexion en cours…' : 'Se connecter'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Pas encore de compte ?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate('/signup')}
                    sx={{
                      color: '#C0355E',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    S’inscrire
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