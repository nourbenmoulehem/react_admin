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
import { useNotify } from "react-admin"; 
import { authProvider, ExtendedAuthProvider } from "../auth/authProvider";

export const CustomSignUpPage = () => {
  const [formData, setFormData] = useState({
     prenom: "",
    nom: "",
    email: "",
    matricule: "",
    role: 'CHARGEE_OP',
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const notify = useNotify();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  // const handleSignUp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Les mots de passe ne correspondent pas");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await (authProvider as any).register({
  //       email: formData.email.trim(),
  //       password: formData.password,
  //       nom: formData.nom.trim(),
  //       prenom: formData.prenom.trim(),
  //       matricule: formData.matricule.trim(),
  //       role: formData.role,
  //     });
  //     notify(
  //       "Compte créé ! Vérifiez votre boîte mail pour activer votre accès.",
  //       { type: "success" }
  //     );
  //     navigate("/login");
  //   } catch (e: any) {
  //     setError(e.message || "Échec de création du compte");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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
      const extendedAuthProvider = authProvider as ExtendedAuthProvider;
      await extendedAuthProvider.register({
        email: formData.email,
        password: formData.password,
        nom: formData.nom,
        prenom: formData.prenom,
        role: formData.role,
        matricule: formData.matricule,
      });
      
      // Navigate to verification page with email
      navigate('/verify', { 
        state: { 
          email: formData.email,
          message: 'Compte créé ! Vérifiez votre boîte mail pour activer votre accès.' 
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
          
          <Typography variant="h4" fontWeight="600">
            Rejoignez Enda
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Créez votre compte
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

              <TextField
                fullWidth
                label="Matricule"
                type="text"
                value={formData.matricule}
                onChange={handleChange('matricule')}
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

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Prénom"
                  value={formData.prenom}
                  onChange={handleChange('prenom')}
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
                  label="Nom"
                  value={formData.nom}
                  onChange={handleChange('nom')}
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
                label="Mot de passe"
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
                label="Confirmez le mot de passe"
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
                {loading ? 'Création du compte…' : 'Créer le compte'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                   Vous avez déjà un compte ?{' '}
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
                    Se connecter
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