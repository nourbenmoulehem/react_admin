// src/users/UserEdit.tsx
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    BooleanInput,
    useGetList,
    Toolbar,
    SaveButton,
    required,
    email,
    maxLength,
} from 'react-admin';
import { Grid, Typography, Divider, CircularProgress, Box } from '@mui/material';

/* ───── Sélecteur de rôle dynamique ─────────────────────────────── */
const RoleSelectInput = (props: any) => {
   
    return (
        <SelectInput
            source="role"
            label="Rôle"
            choices={roleChoices}
            validate={required()}
            fullWidth
            {...props}
        />
    );
};

/* ───── Toolbar compact : pas de delete, juste Sauver ───────────── */
const UserEditToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);


const roleChoices = [
  { id: "ADMIN",                name: "Admin" },
  { id: "PROSPECTEUR",          name: "Prospecteur" },
  { id: "CHARGEE_OP",           name: "Chargée d’opération" },
  { id: "GESTIONNAIRE_PORTFEUIL", name: "Gestionnaire de Portefeuille" },
  // { id: "CHEF_AGENCE",          name: "Chef d’agence" },
  // { id: "DIRECTEUR_REGION",     name: "Directeur régional" },
  // { id: "COORDINATEUR_OPERATION", name: "Coordonnateur opération" },
];

/* ───── Composant principal ─────────────────────────────────────── */
export const UserEdit = () => (
    <Edit title="Modifier un utilisateur">
        <SimpleForm toolbar={<UserEditToolbar />}>
        <Box sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 3,
            bgcolor: 'background.paper',
            
          }}>
            <Typography variant="h5" color="primary" gutterBottom>
                Modifier un utilisateur
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Mettez à jour les informations puis cliquez sur « Sauvegarder ».
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Grille responsive : 2 colonnes >= md */}
            <Grid container spacing={2}>
                {/* Colonne gauche */}
                <Grid size={{xs: 12, md:6}} >
                    <TextInput source="id" label="ID" disabled fullWidth />
                    <TextInput
                        source="email"
                        label="Email"
                        validate={[required(), email(), maxLength(150)]}
                        disabled              // email non éditable
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
                        validate={[maxLength(100)]}
                        fullWidth
                    />
                </Grid>

                {/* Colonne droite */}
                <Grid size={{xs: 12, md:6}} >
                    <TextInput
                        source="tel"
                        label="Téléphone"
                        validate={maxLength(30)}
                        fullWidth
                    />

                    {/* Sélecteur de rôle dynamique */}
                    <RoleSelectInput fullWidth />

                    <BooleanInput
                        source="isEnabled"
                        label="Compte activé"
                        sx={{ mt: 2 }}
                    />
                    <BooleanInput
                        source="isVerified"
                        label="E-mail vérifié"
                        disabled           // souvent non éditable
                        sx={{ mt: 2 }}
                    />
                </Grid>
            </Grid>
            </Box>
        </SimpleForm>
    </Edit>
);
