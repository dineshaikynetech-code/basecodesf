import AuthLayout from "../layout/AuthLayout";
import { LoginFormPage } from "./LoginForm";
export default function Login() {
  return (
    <AuthLayout>
      <LoginFormPage />
    </AuthLayout>
  );
}