import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cognitoService } from '../../services/cognito-service';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await cognitoService.forgotPassword(email);
            toast.success('Reset code sent to your email');
            navigate('/auth/reset-password', { state: { email } });
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-amber-100 via-white to-orange-50
            dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
            p-4">

            {/* Main Container */}
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-amber-50 dark:bg-[#1a1412]
                        text-amber-900/80 dark:text-amber-100/80
                        border border-amber-300/50 dark:border-amber-600/30
                        rounded-3xl shadow-2xl shadow-amber-900/10 overflow-hidden">

                    {/* Header Section */}
                    <div className="p-8 text-center overflow-hidden">
                        

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="w-20 h-20 mx-auto mb-4 rounded-2xl
                                bg-gradient-to-br from-amber-400 to-amber-600
                                flex items-center justify-center relative">
                            <Mail className="w-10 h-10 text-white" />
                            <div className="absolute -right-1 -top-1 w-6 h-6
                                bg-amber-200 dark:bg-amber-400 rounded-full
                                flex items-center justify-center">
                                <span className="text-amber-700 text-sm font-bold">?</span>
                            </div>
                        </motion.div>

                        <h2 className="text-2xl font-bold mb-2
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Forgot Password?
                        </h2>
                        <p className="text-amber-700/70 dark:text-amber-300/70">
                            No worries! Enter your email and we'll send you reset instructions
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 bg-transparent">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-3 rounded-xl
                                            bg-white/50 dark:bg-[#261713]
                                            border-2 border-amber-600 dark:border-amber-800/30
                                            focus:border-amber-400 dark:focus:border-amber-600
                                            text-amber-900 dark:text-amber-100
                                            transition-all duration-300
                                            focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                            pl-12"
                                        placeholder="john@example.com"
                                        required
                                    />
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2
                                        w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-6 rounded-xl
                                    bg-gradient-to-r from-amber-600 to-amber-800
                                    hover:from-amber-700 hover:to-amber-900
                                    text-white font-medium
                                    transform hover:-translate-y-0.5
                                    transition-all duration-300
                                    shadow-lg shadow-amber-900/20 hover:shadow-xl
                                    flex items-center justify-center gap-2
                                    disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent
                                            rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Send Reset Instructions</span>
                                    </>
                                )}
                            </button>

                            {/* Back to Login Link */}
                            <Link
                                to="/auth/login"
                                className="flex items-center justify-center gap-2 mt-6
                                    text-amber-700 dark:text-amber-300
                                    hover:text-amber-900 dark:hover:text-amber-100
                                    transition-colors duration-300
                                    group">
                                <ArrowLeft className="w-4 h-4 
                                    transform group-hover:-translate-x-1
                                    transition-transform duration-300" />
                                <span>Back to Login</span>
                            </Link>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;