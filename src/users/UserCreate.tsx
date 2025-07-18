import { Create, SimpleForm, TextInput, PasswordInput, SelectInput, ReferenceInput, required, email, maxLength } from 'react-admin';
import { Box, Typography, Divider } from '@mui/material';

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: (theme) => theme.shape.borderRadius, boxShadow: (theme) => theme.shadows[1] }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Créer un utilisateur
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Remplissez les détails pour créer un nouvel utilisateur
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextInput
            source="email"
            label="Email"
            validate={[required(), email(), maxLength(150)]}
            fullWidth
          />
          <PasswordInput
            source="password"
            label="Mot de passe"
            validate={[required()]}
            fullWidth
          />
          <TextInput
            source="nom"
            label="Nom"
            validate={[required(), maxLength(100)]}
            fullWidth
          />
          <TextInput
            source="prenom"
            label="Prénom"
            validate={[required(), maxLength(100)]}
            fullWidth
          />
          <TextInput
            source="tel"
            label="Téléphone"
            validate={[maxLength(30)]}
            fullWidth
          />
          <TextInput
            source="matricule"
            label="Matricule"
            validate={[required(), maxLength(100)]}
            fullWidth
          />
          <ReferenceInput source="role" reference="users/roles">
            <SelectInput
              optionText="name"
              label={'Rôle'}
              validate={[required()]}
              fullWidth
            />
          </ReferenceInput>
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);