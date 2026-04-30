import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { forgotPasswordSchema, type ForgotPasswordForm} from '../schema/authSchema';



export const ForgotPasswordFormPage = () => {
    const navigate = useNavigate();

    // Form Hooks
    const form = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema)
    });



    const onForgotSubmit = async (data: ForgotPasswordForm) => {
        console.log("Password reset requested for:", data.email);
        toast.success("Reset link sent to your email!");
        //  stay here or navigate back to login
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-full mb-8 text-left">
                <h2 className="text-h2 text-[#1e293b]">Forgot Password</h2>
            </div>

            <form onSubmit={form.handleSubmit(onForgotSubmit)} className="w-full space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="forgot-email" >Email</Label>
                    <Input
                        id="forgot-email"
                        {...form.register('email')}
                        placeholder="Enter email"
                        className="h-12 border-none focus-visible:ring-primary"
                    />
                    {form.formState.errors.email && <p className="text-destructive text-caption">{form.formState.errors.email.message}</p>}
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
                        <button type="button" onClick={() => navigate('/auth/login')} className="text-primary hover:underline">Sign in</button>
                    </p>
                    <p className="text-body font-medium text-slate-900">
                        Do not have an account?{' '}
                        <button type="button" onClick={() => navigate('/auth/signup')} className="text-primary hover:underline">Sign up</button>
                    </p>
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