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
import { loginSchema, registerSchema, type LoginForm, type RegisterForm } from '../schema/authSchema';
import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';



export const SignUpFormPage = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const { isOnboarded } = useOnboardingStore();
    const [showPassword, setShowPassword] = useState(false);

    // Form Hooks
    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });




    const onRegisterSubmit = async (data: RegisterForm) => {
        // Logic for registration would go here
        console.log("Registering:", data);
        const result = await login(data.email, data.password);

        if (!result.success) return;

        toast.success("Account created successfully!");
        navigate('/onboarding');

    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-full mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">Register</h2>
            </div>

            <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-semibold">First Name</Label>
                    <Input
                        id="firstName"
                        {...form.register('firstName')}
                        placeholder="First Name"
                        className="h-12 border-nonefocus-visible:ring-primary"
                    />
                    {form.formState.errors.firstName && <p className="text-destructive text-caption">{form.formState.errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-semibold">Last Name</Label>
                    <Input
                        id="lastName"
                        {...form.register('lastName')}
                        placeholder="Last Name"
                        className="h-12 border-none focus-visible:ring-primary"
                    />
                    {form.formState.errors.lastName && <p className="text-destructive text-caption">{form.formState.errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reg-email" className="font-semibold">Email</Label>
                    <Input
                        id="reg-email"
                        {...form.register('email')}
                        placeholder="aikynestorefries@yahoo.com"
                        className="h-12 border-none focus-visible:ring-primary"
                    />
                    {form.formState.errors.email && <p className="text-destructive text-caption">{form.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-2 relative">
                    <Label htmlFor="reg-password" className="font-semibold">Password</Label>
                    <div className="relative">
                        <Input
                            id="reg-password"
                            type={showPassword ? 'text' : 'password'}
                            {...form.register('password')}
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
                    {form.formState.errors.password && <p className="text-destructive text-caption">{form.formState.errors.password.message}</p>}
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
                        onClick={() => navigate('/auth/login')}
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

            <div className="mt-5 text-center space-y-6 w-full pb-8">
                <div className="flex items-center justify-center gap-4 text-slate-400 font-medium text-body">
                    <span>2021@ Storefries</span>
                    <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                    <Link to="/plans" className="text-primary hover:underline">Plans</Link>
                </div>
            </div>

        </div >
    );
};