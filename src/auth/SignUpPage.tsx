// src/auth/SignUpPage.tsx
import {
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
  useTranslate,
  useAuthProvider,
} from "react-admin";

const SignUpPage = () => {
  const authProvider: any = useAuthProvider();        // cast for TS
  const notify = useNotify();
  const redirect = useRedirect();
  const _ = useTranslate();

  const handleSubmit = async (values: any) => {
    try {
      await authProvider.register(values);
      notify(
        _("auth.account_created", "Account created – check your e-mail"),
        { type: "info" }
      );
      redirect("/login");
    } catch (e: any) {
      notify(e.message, { type: "warning" });
    }
  };

  return (
    <SimpleForm onSubmit={handleSubmit}>
      <TextInput source="matricule" validate={required()} fullWidth />
      <TextInput source="nom"        validate={required()} fullWidth />
      <TextInput source="prenom"     validate={required()} fullWidth />
      <TextInput source="role"       validate={required()} fullWidth />
      <TextInput source="email"      type="email"  validate={required()} fullWidth />
      <TextInput source="password"   type="password" validate={required()} fullWidth />
    </SimpleForm>
  );
};

export default SignUpPage;
