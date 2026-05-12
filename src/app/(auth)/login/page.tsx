import UserLoginForm from "@/features/auth/ui/UserLoginForm";
import AuthShell from "@/widgets/auth-shell/ui/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell>
      <UserLoginForm />
    </AuthShell>
  );
}
