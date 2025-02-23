import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Eye, EyeOff, Hash, ShieldCheck, Lock as LockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cognitoService } from '../../services/cognito-service';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: location.state?.email || '',
        code: '',
        newPassword: '',        
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await cognitoService.confirmNewPassword(
                formData.email,
                formData.code,
                formData.newPassword
            );
            toast.success('Password reset successful');
            navigate('/auth/login');
        } catch (error: any) {
            toast.error(error.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!formData.email) {
        navigate('/auth/forgot-password');
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-amber-100 via-white to-orange-50
            dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
            p-4">

            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-amber-50 dark:bg-[#1a1412]
                        border border-amber-300/50 dark:border-amber-600/30
                        rounded-3xl shadow-2xl shadow-amber-900/10 overflow-hidden">

                    {/* Header Section */}
                    <div className="p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="w-20 h-20 mx-auto mb-4 rounded-2xl
                                bg-gradient-to-br from-amber-400 to-amber-600
                                flex items-center justify-center
                                relative overflow-hidden">
                            <KeyRound className="w-10 h-10 text-white" />
                            {/* Animated rings */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.4,
                                        repeat: Infinity,
                                    }}
                                />
                            ))}
                        </motion.div>

                        <h2 className="text-2xl font-bold mb-2
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Reset Password
                        </h2>
                        <p className="text-amber-700/70 dark:text-amber-300/70">
                            Enter the code sent to your email and your new password
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 bg-amber-50 dark:bg-[#1a1412] space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Verification Code Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
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
                                        required
                                    />
                                    <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2
                                        w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            </div>

                            {/* New Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-xl
                                            bg-white/50 dark:bg-[#261713]
                                            border-2 border-amber-600 dark:border-amber-800/30
                                            focus:border-amber-400 dark:focus:border-amber-600
                                            text-amber-900 dark:text-amber-100
                                            transition-all duration-300
                                            focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                            pl-12"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2
                                        w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2
                                            text-amber-600/50 hover:text-amber-600
                                            dark:text-amber-400/50 dark:hover:text-amber-400
                                            transition-colors duration-300">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-xl
                                            bg-white/50 dark:bg-[#261713]
                                            border-2 border-amber-600 dark:border-amber-800/30
                                            focus:border-amber-400 dark:focus:border-amber-600
                                            text-amber-900 dark:text-amber-100
                                            transition-all duration-300
                                            focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                            pl-12"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2
                                        w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2
                                            text-amber-600/50 hover:text-amber-600
                                            dark:text-amber-400/50 dark:hover:text-amber-400
                                            transition-colors duration-300">
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
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
                                        <span>Resetting...</span>
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        <span>Reset Password</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResetPassword;