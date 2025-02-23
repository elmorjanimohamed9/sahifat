import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, BookOpen, Facebook, Instagram } from 'lucide-react';
import { CibGoogle } from '../../components/Icon/IconGoogle';
import { SimpleIconsX } from '../../components/Icon/IconTwitter';
import { toast } from 'sonner';
import { cognitoService } from '../../services/cognito-service';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const socialButtons = [
        { 
            icon: Facebook, 
            label: 'Facebook',
            color: 'from-blue-600 to-blue-800',
            hoverColor: 'from-blue-700 to-blue-900'
        },
        { 
            icon: SimpleIconsX, 
            label: 'Twitter',
            color: 'from-sky-500 to-sky-700',
            hoverColor: 'from-sky-600 to-sky-800'
        },
        { 
            icon: Instagram, 
            label: 'Instagram',
            color: 'from-pink-500 to-purple-600',
            hoverColor: 'from-pink-600 to-purple-700'
        },
        { 
            icon: CibGoogle, 
            label: 'Google',
            color: 'from-red-500 to-red-700',
            hoverColor: 'from-red-600 to-red-800'
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await cognitoService.signIn(
                formData.email,
                formData.password,
                rememberMe
            );
            toast.success('Login successful!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-amber-100 via-white to-orange-50
            dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
            p-4">

            {/* Animated Book Pages Background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-40 h-40 rounded-lg bg-amber-600/5 dark:bg-amber-400/5"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            rotate: `${Math.random() * 180}deg`,
                        }}
                        animate={{
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Main Container */}
            <div className="w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-gradient-to-b from-amber-50 to-white
                        dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
                        text-amber-900/80 dark:text-amber-100/80 border border-amber-300 dark:border-amber-600/30
                        rounded-3xl shadow-2xl shadow-amber-900/10 overflow-hidden">
                    
                    <div className="grid md:grid-cols-5 gap-0 bg-gradient-to-r
                        from-amber-300/60 via-amber-200/60 to-orange-100/60
                        dark:from-[#1a1412] dark:via-[#2a1108] dark:to-[#3d1908]">
                        
                        {/* Left Side - Welcome Message */}
                        <div className="md:col-span-2 p-8 flex flex-col justify-center relative">
                            <div className="relative z-10">
                                <BookOpen className="w-16 h-16 mb-6 text-amber-600 dark:text-amber-400" />
                                <h2 className="text-3xl font-bold mb-4
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    Welcome Back!
                                </h2>
                                <p className="text-amber-700/70 dark:text-amber-300/70 mb-8">
                                    Your literary journey continues here. Sign in to access your personalized reading experience.
                                </p>

                                <div className="space-y-4">
                                    {socialButtons.map(({ icon: Icon, label, color, hoverColor }) => (
                                        <button
                                            key={label}
                                            className={`w-full p-3 rounded-xl
                                                bg-gradient-to-r ${color}
                                                hover:${hoverColor}
                                                text-white font-medium
                                                flex items-center justify-center gap-3
                                                transform hover:-translate-y-0.5
                                                transition-all duration-300
                                                shadow-lg shadow-amber-900/10 hover:shadow-xl`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>Continue with {label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="md:col-span-3 p-8 bg-white/40 dark:bg-black/40">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-bold mb-6
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    Sign in to your account
                                </h3>

                                <form className="space-y-6">
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3 rounded-xl
                                                    bg-white/50 dark:bg-[#261713]
                                                    border-2 border-amber-600 dark:border-amber-800/30
                                                    focus:border-amber-400 dark:focus:border-amber-600
                                                    text-amber-900 dark:text-amber-100
                                                    transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                                    focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                                    pl-12"
                                                placeholder="john@example.com"
                                            />
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2
                                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                                Password
                                            </label>
                                            <Link to="/auth/forgot-password" 
                                                className="text-sm text-amber-600 hover:text-amber-700
                                                    dark:text-amber-400 dark:hover:text-amber-300
                                                    transition-colors duration-300">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3 rounded-xl
                                                    bg-white/50 dark:bg-[#261713]
                                                    border-2 border-amber-600 dark:border-amber-800/30
                                                    focus:border-amber-400 dark:focus:border-amber-600
                                                    text-amber-900 dark:text-amber-100
                                                    transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                                    focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                                    pl-12"
                                                placeholder="••••••••"
                                            />
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2
                                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2
                                                    text-amber-600/50 hover:text-amber-600
                                                    dark:text-amber-400/50 dark:hover:text-amber-400
                                                    transition-colors duration-300"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember-me"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 rounded
                                                border-amber-300 dark:border-amber-800
                                                text-amber-600 dark:text-amber-400
                                                focus:ring-amber-400/20"
                                        />
                                        <label className="ml-2 text-sm text-amber-700/70 dark:text-amber-300/70">
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full py-3 px-6 rounded-xl
                                            bg-gradient-to-r from-amber-600 to-amber-800
                                            hover:from-amber-700 hover:to-amber-900
                                            text-white font-medium
                                            transform hover:-translate-y-0.5
                                            transition-all duration-300
                                            shadow-lg shadow-amber-900/20 hover:shadow-xl"
                                    >
                                        Sign in
                                    </button>

                                    {/* Register Link */}
                                    <p className="text-center text-amber-700/70 dark:text-amber-300/70">
                                        New here?{' '}
                                        <Link to="/auth/register" className="font-medium text-amber-700 dark:text-amber-300
                                            hover:text-amber-900 dark:hover:text-amber-100
                                            transition-colors duration-300">
                                            Create an account
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;