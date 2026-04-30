import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/shared/store/authStore';
import { useOnboardingStore } from '@/shared/store/onboardingStore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { GradientButton } from '@/shared/components/ui/gradient-button';
import { Button } from '@/shared/components/ui/button';
import { loginSchema, type LoginForm } from '../schema/authSchema';
import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type Form = z.infer<typeof schema>;

export const LoginFormPage = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const { isOnboarded } = useOnboardingStore();
    const [showPassword, setShowPassword] = useState(false);

    // Form Hooks
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });


    const onLoginSubmit = async (data: Form) => {
        clearError();
        const result = await login(data.email, data.password);
        if (!result.success) return;

        if (!isOnboarded) {
            navigate('/onboarding');
        } else {
            toast.success("Welcome back!");
            navigate('/');
        }
    };

    return (
        <div className="w-full animate-in fade-in duration-300">
            <div className="mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">User Login</h2>
            </div>

            <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        {...form.register('email')}
                        placeholder="Enter email address"
                        className="h-12 border-nonefocus-visible:ring-primary"
                    />
                    {form.formState.errors.email && <p className="text-destructive text-caption">{form.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <button type="button" onClick={() => navigate('/auth/forgot-password')} className="text-base text-primary font-medium hover:underline">
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...form.register('password')}
                            placeholder="••••••••"
                            className="h-12 border-none focus-visible:ring-primary"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {form.formState.errors.password && <p className="text-destructive text-caption">{form.formState.errors.password.message}</p>}
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <GradientButton isLoading={isLoading} className="w-full">
                    Sign In
                </GradientButton>



                <Button variant="outline" className="w-full h-12 flex gap-3">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
                    Sign in with Google
                </Button>


            </form>
            {/* FOOTER LINKS */}
            <div className="mt-5 text-center space-y-6 w-full pb-8">

                <p className="text-body text-slate-600">
                    Do not have an account?{' '}
                    <button
                        onClick={() => navigate('/auth/register')}
                        className="text-primary text-body font-semibold hover:underline cursor-pointer"
                    >
                        Sign up
                    </button>
                </p>



                <Link to="/privacy-policy" className="block text-body text-slate-500 hover:underline">
                    Privacy Policy
                </Link>


                <div className="flex items-center justify-center gap-4 text-slate-400 font-medium text-body">
                    <span>2021@ Storefries</span>
                    <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                    <Link to="/plans" className="text-primary hover:underline">Plans</Link>
                </div>
            </div>
        </div>
    );
};