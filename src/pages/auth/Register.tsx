import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, BookOpen, Facebook, Instagram, Smartphone } from 'lucide-react';
import { CibGoogle } from '../../components/Icon/IconGoogle';
import { SimpleIconsX } from '../../components/Icon/IconTwitter';
import { useAuth } from "react-oidc-context";
import { toast } from 'sonner';
import { cognitoService } from '../../services/cognito-service';

const Register = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
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

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            await cognitoService.signUp(
                formData.email,
                formData.password,
                formData.name,
                formData.phoneNumber
            );
            toast.success('Registration successful! Please check your email for verification.');
            navigate('/auth/verify-email', {state: {email: formData.email}});
        } catch (error: any) {
            toast.error(error.message || 'Registration failed');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-amber-100 via-white to-orange-50
            dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
            p-4">

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-amber-600/20 dark:bg-amber-400/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
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
                        {/* Left Side - Social Login */}
                        <div className="md:col-span-2 p-8 flex flex-col justify-center">

                            <div className="text-center mb-8">
                                <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
                                <h2 className="text-2xl font-bold mb-2
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    Join Us
                                </h2>
                                <p className="text-amber-700/70 dark:text-amber-300/70">
                                    Connect with your social networks
                                </p>
                            </div>

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

                        {/* Right Side - Form */}
                        <div className="md:col-span-3 p-8 bg-white/40 dark:bg-black/40">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-bold mb-6
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    Or create an account
                                </h3>

                                <form className="space-y-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                            Full name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3 rounded-xl
                                                    bg-white/50 dark:bg-[#261713]
                                                    border-2 border-amber-600 dark:border-amber-800/30
                                                    focus:border-amber-400 dark:focus:border-amber-600
                                                    text-amber-900 dark:text-amber-100
                                                    transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                                    focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                                    pl-12"
                                                placeholder="John Doe"
                                            />
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2
                                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    </div>

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

                                    {/* Phone Number Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3 rounded-xl
                                                bg-white/50 dark:bg-[#261713]
                                                border-2 border-amber-600 dark:border-amber-800/30
                                                focus:border-amber-400 dark:focus:border-amber-600
                                                text-amber-900 dark:text-amber-100
                                                transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                                focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                                pl-12"
                                                placeholder="+212 6 12 34 56 78"
                                            />
                                            <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2
                                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>

                                        {/* Helper Text */}
                                        <p className="text-xs text-amber-700/60 dark:text-amber-300/60 pl-2">
                                            We'll send a verification code to this number
                                        </p>
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                            Password
                                        </label>
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
                                                    transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                                    focus:outline-none focus:ring-2 focus:ring-amber-400/20
                                                    pl-12"
                                                placeholder="••••••••"
                                            />
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2
                                                w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2
                                                    text-amber-600/50 hover:text-amber-600
                                                    dark:text-amber-400/50 dark:hover:text-amber-400
                                                    transition-colors duration-300"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
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
                                        {auth.isLoading ? 'Loading...' : 'Create my account'}
                                    </button>

                                    {/* Login Link */}
                                    <p className="text-center text-amber-700/70 dark:text-amber-300/70">
                                        Already a member ?{' '}
                                        <Link to="/auth/login" className="font-medium text-amber-700 dark:text-amber-300
                                            hover:text-amber-900 dark:hover:text-amber-100
                                            transition-colors duration-300">
                                            Login
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

export default Register;