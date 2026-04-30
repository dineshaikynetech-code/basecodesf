import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/store/authStore';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // Assuming lucide-react is used for the icon in screenshot
import LeftHeroCarousel from '../components/LeftHeroCarousel';
import { GradientButton } from '@/shared/components/ui/gradient-button';
import { useOnboardingStore } from '@/shared/store/onboardingStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ViewState = 'login' | 'signup' | 'forgot-password';

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  // UI States
  const [view, setView] = useState<ViewState>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form Hooks
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const signupForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });
  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  // Handlers
  const onLoginSubmit = async (data: LoginForm) => {
    clearError();
    const result = await login(data.email, data.password);
    if (!result.success) return;
    const { isOnboarded } = useOnboardingStore.getState();
    if (!isOnboarded) {
      navigate("/onboarding");
    } else {
      toast.success("Welcome back!");
      navigate("/");
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    // Logic for registration would go here
    console.log("Registering:", data);
    toast.success("Account created successfully!");
    setView('login');
  };

  const onForgotSubmit = async (data: ForgotPasswordForm) => {
    console.log("Password reset requested for:", data.email);
    toast.success("Reset link sent to your email!");
    //  stay here or navigate back to login
  };

  const handleToggleView = (newView: ViewState) => {
    setView(newView);
    clearError();
  };
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* CSS for Thin Modern Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary-light, #34d399);
        }
      `}</style>

      {/* LEFT HERO */}
      <div className="relative hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 to-background items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[120px] h-[120px] bg-gradient-to-br from-[#d1fae5] via-[#6ee7b7] to-[#2dd4bf]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 33%, 66% 33%, 66% 66%, 33% 66%, 33% 100%, 0% 100%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[190px] h-[120px] bg-gradient-to-tl from-[#d1fae5] via-[#6ee7b7] to-[#2dd4bf]"
          style={{ clipPath: "polygon(100% 100%, 0% 100%, 0% 66%, 33% 66%, 33% 33%, 66% 33%, 66% 0%, 100% 0%)" }}
        />
        <div className="absolute top-24 right-12 grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gradient-to-br from-[#7ef1d3] to-[#39d39f]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          ))}
        </div>
        <LeftHeroCarousel />
      </div>

      {/* RIGHT FORM COLUMN */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        {/* Container with margin-auto to center content vertically when short */}
        <div className="m-auto w-full max-w-md p-8 flex flex-col items-center">

          {/* LOGO SECTION */}
          <div className="mb-8">
            <h2 className="text-h1 text-[#1e293b]">Storefries</h2>
          </div>

          {view === 'forgot-password' && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-full mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">Forgot Password</h2>
              </div>

              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotSubmit)} className="w-full space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" >Email</Label>
                  <Input
                    id="forgot-email"
                    {...forgotPasswordForm.register('email')}
                    placeholder="Enter email"
                    className="h-12 border-none focus-visible:ring-primary"
                  />
                  {forgotPasswordForm.formState.errors.email && <p className="text-destructive text-caption">{forgotPasswordForm.formState.errors.email.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-white font-semibold rounded-lg bg-[linear-gradient(180deg,#6de080_0%,#46cc9f_100%)] hover:opacity-95 border-none shadow-sm"
                >
                  Reset Password
                </Button>

                <div className="space-y-4 pt-2">
                  <p className="text-body font-medium text-slate-900">
                    Already have an account?{' '}
                    <button type="button" onClick={() => handleToggleView('login')} className="text-primary hover:underline">Sign in</button>
                  </p>
                  <p className="text-body font-medium text-slate-900">
                    Do not have an account?{' '}
                    <button type="button" onClick={() => handleToggleView('signup')} className="text-primary hover:underline">Sign up</button>
                  </p>
                </div>
              </form>
            </div>
          )}

          {view === 'login' &&  (
            /* --- LOGIN VIEW --- */
            <div className="w-full animate-in fade-in duration-300">
              <div className="w-full mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">User Login</h2>
              </div>

              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="w-full space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...loginForm.register('email')}
                    placeholder="Enter email address"
                    className="h-12 border-nonefocus-visible:ring-primary"
                  />
                  {loginForm.formState.errors.email && <p className="text-destructive text-caption">{loginForm.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" onClick={() => handleToggleView('forgot-password')} className="text-base text-primary font-medium hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...loginForm.register('password')}
                    placeholder="••••••••"
                    className="h-12 border-none focus-visible:ring-primary"
                  />
                  {loginForm.formState.errors.password && <p className="text-destructive text-caption">{loginForm.formState.errors.password.message}</p>}
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <GradientButton type="submit" isLoading={isLoading} className={'w-full'}>
                  Sign In
                </GradientButton>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-12 text-base border-slate-200 text-slate-700 flex items-center justify-center gap-3 cursor-pointer"
                  onClick={() => toast.info('Google login coming soon')}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
                  Sign in with Google
                </Button>
              </form>
            </div>
          ) }
          
          {view === 'signup' && (
            /* --- REGISTER VIEW --- */
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-full mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">Register</h2>
              </div>

              <form onSubmit={signupForm.handleSubmit(onRegisterSubmit)} className="w-full space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-semibold">First Name</Label>
                  <Input
                    id="firstName"
                    {...signupForm.register('firstName')}
                    placeholder="First Name"
                    className="h-12 border-nonefocus-visible:ring-primary"
                  />
                  {signupForm.formState.errors.firstName && <p className="text-destructive text-caption">{signupForm.formState.errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-semibold">Last Name</Label>
                  <Input
                    id="lastName"
                    {...signupForm.register('lastName')}
                    placeholder="Last Name"
                    className="h-12 border-none focus-visible:ring-primary"
                  />
                  {signupForm.formState.errors.lastName && <p className="text-destructive text-caption">{signupForm.formState.errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="font-semibold">Email</Label>
                  <Input
                    id="reg-email"
                    {...signupForm.register('email')}
                    placeholder="aikynestorefries@yahoo.com"
                    className="h-12 border-none focus-visible:ring-primary"
                  />
                  {signupForm.formState.errors.email && <p className="text-destructive text-caption">{signupForm.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="reg-password" className="font-semibold">Password</Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      {...signupForm.register('password')}
                      placeholder="••••••••••••"
                      className="h-12 border-none focus-visible:ring-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && <p className="text-destructive text-caption">{signupForm.formState.errors.password.message}</p>}
                </div>

                <p className="text-caption text-slate-500">
                  By signing up, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline cursor-pointer">terms of service</Link> and{' '}
                  <Link to="/privacy" className="text-primary hover:underline cursor-pointer">privacy policy</Link>.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <GradientButton type="submit" isLoading={isLoading} className={'w-3/4'}>
                    Register
                  </GradientButton>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setView('login')}
                    className="text-base font-medium text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-12 text-base border-slate-200 text-slate-700 flex items-center justify-center gap-3 mt-4 cursor-pointer"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
                  Sign in with Google
                </Button>
              </form>
            </div>
          )}

          {/* FOOTER LINKS */}
          <div className="mt-5 text-center space-y-6 w-full pb-8">
            {view === 'login' && (
              <p className="text-body text-slate-600">
                Do not have an account?{' '}
                <button
                  onClick={() => setView('signup')}
                  className="text-primary text-body font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            )}

            {view === 'login' && (
              <Link to="/privacy-policy" className="block text-body text-slate-500 hover:underline">
                Privacy Policy
              </Link>
            )}

            <div className="flex items-center justify-center gap-4 text-slate-400 font-medium text-body">
              <span>2021@ Storefries</span>
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              <Link to="/plans" className="text-primary hover:underline">Plans</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}