import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Hash, ArrowRight, RefreshCw } from 'lucide-react';
import { cognitoService } from '../../services/cognito-service';
import { toast } from 'sonner';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get email from location state if available
        const userEmail = location.state?.email;
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [location]);

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await cognitoService.verifyEmail(email, verificationCode);
            toast.success('Email verified successfully!');
            navigate('/auth/login');
        } catch (error: any) {
            if (error.code === 'CodeMismatchException') {
                toast.error('Invalid verification code. Please try again.');
            } else if (error.code === 'ExpiredCodeException') {
                toast.error('Verification code has expired. Please request a new one.');
            } else {
                toast.error(error.message || 'Verification failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsLoading(true);
        try {
            await cognitoService.resendVerificationEmail(email);
            toast.success('Verification code sent to your email');
        } catch (error: any) {
            toast.error(error.message || 'Failed to resend verification code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-amber-100 via-white to-orange-50
            dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
            p-4">

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 rounded-full bg-amber-600/5 dark:bg-amber-400/5"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.2, 0.3],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-3xl
                    backdrop-blur-xl bg-white/80 dark:bg-black/40
                    border border-amber-300/50 dark:border-amber-600/20
                    shadow-2xl shadow-amber-900/10">

                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-20 h-20 mx-auto mb-4 rounded-2xl
                            bg-gradient-to-br from-amber-400 to-amber-600
                            flex items-center justify-center"
                    >
                        <Mail className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2
                        bg-gradient-to-r from-amber-900 to-amber-700
                        dark:from-amber-200 dark:to-amber-400
                        bg-clip-text text-transparent">
                        Verify your email
                    </h2>
                    <p className="text-amber-700/70 dark:text-amber-300/70">
                        Please check your email for the verification code
                    </p>
                </div>

                <form onSubmit={handleVerification} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                required
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
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2
                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>

                    {/* Verification Code Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                            Verification Code
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl
                                    bg-white/50 dark:bg-[#261713]
                                    border-2 border-amber-600 dark:border-amber-800/30
                                    focus:border-amber-400 dark:focus:border-amber-600
                                    text-amber-900 dark:text-amber-100
                                    transition-all duration-300
                                    focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                    pl-12 tracking-[0.5em] text-center font-mono"
                                placeholder="• • • • • •"
                                maxLength={6}
                            />
                            <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2
                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl
                            bg-gradient-to-r from-amber-600 to-amber-800
                            hover:from-amber-700 hover:to-amber-900
                            text-white font-medium
                            transform hover:-translate-y-0.5
                            transition-all duration-300
                            shadow-lg shadow-amber-900/20 hover:shadow-xl
                            flex items-center justify-center gap-2"
                    >
                        <span>{isLoading ? 'Verifying...' : 'Verify Email'}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Resend Code Button */}
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isLoading}
                        className="w-full py-2 px-4 rounded-xl
                            text-amber-700 dark:text-amber-300
                            hover:text-amber-900 dark:hover:text-amber-100
                            transition-colors duration-300
                            flex items-center justify-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>{isLoading ? 'Resending...' : 'Resend Code'}</span>
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;