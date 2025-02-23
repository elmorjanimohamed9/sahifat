import React from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, Send, BookOpen, Users, MessageCircle, 
    Heart, Star, Gift, Sparkles, ArrowRight, 
    Facebook, Twitter, Instagram, Linkedin 
} from 'lucide-react';

const CommunityNewsletter = () => {
    const communityStats = [
        {
            icon: Users,
            value: "50K+",
            label: "Active Readers",
            color: "text-blue-500"
        },
        {
            icon: BookOpen,
            value: "100K+",
            label: "Books Reviewed",
            color: "text-green-500"
        },
        {
            icon: MessageCircle,
            value: "250K+",
            label: "Discussions",
            color: "text-purple-500"
        },
        {
            icon: Heart,
            value: "1M+",
            label: "Books Loved",
            color: "text-pink-500"
        }
    ];

    const benefits = [
        {
            icon: Star,
            title: "Early Access",
            description: "Be the first to know about new releases and exclusive content"
        },
        {
            icon: Gift,
            title: "Special Offers",
            description: "Get access to member-only discounts and promotions"
        },
        {
            icon: Sparkles,
            title: "Curated Content",
            description: "Receive personalized book recommendations based on your interests"
        }
    ];

    return (
        <section className="py-20 px-4 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative">
                {/* Community Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {communityStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                            <h3 className="text-3xl font-bold mb-2
                                text-amber-900 dark:text-amber-100">
                                {stat.value}
                            </h3>
                            <p className="text-amber-700/70 dark:text-amber-300/70">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-8
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Join Our Reading Community
                        </h2>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl
                                        bg-gradient-to-br from-amber-500 to-amber-600
                                        flex items-center justify-center
                                        shadow-lg shadow-amber-900/20">
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2
                                            text-amber-900 dark:text-amber-100">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-amber-700/70 dark:text-amber-300/70">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>

                    {/* Right Column - Newsletter Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="p-8 rounded-2xl
                            bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                            border border-amber-200/50 dark:border-amber-800/50">
                            
                            <div className="absolute -top-6 -right-6">
                                <span className="px-4 py-2 rounded-full text-sm
                                    bg-gradient-to-r from-amber-500 to-amber-600
                                    text-white font-medium
                                    flex items-center gap-2
                                    shadow-lg shadow-amber-900/20">
                                    <Mail size={14} />
                                    Newsletter
                                </span>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2
                                        text-amber-900 dark:text-amber-100">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl
                                            bg-amber-50 dark:bg-[#220b00]
                                            border border-amber-200 dark:border-amber-800
                                            focus:ring-2 focus:ring-amber-500
                                            text-amber-900 dark:text-amber-100
                                            placeholder-amber-700/50 dark:placeholder-amber-300/50"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2
                                        text-amber-900 dark:text-amber-100">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl
                                            bg-amber-50 dark:bg-[#220b00]
                                            border border-amber-200 dark:border-amber-800
                                            focus:ring-2 focus:ring-amber-500
                                            text-amber-900 dark:text-amber-100
                                            placeholder-amber-700/50 dark:placeholder-amber-300/50"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded
                                                text-amber-600 dark:text-amber-400
                                                focus:ring-amber-500"
                                        />
                                        <span className="text-sm text-amber-700/70 dark:text-amber-300/70">
                                            I agree to receive email newsletters
                                        </span>
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl
                                        bg-gradient-to-r from-amber-600 to-amber-800
                                        hover:from-amber-700 hover:to-amber-900
                                        text-white font-medium
                                        transition-all duration-300
                                        shadow-lg shadow-amber-900/20
                                        flex items-center justify-center gap-2
                                        group"
                                >
                                    <span>Subscribe Now</span>
                                    <Send size={18} className="transition-transform duration-300
                                        group-hover:translate-x-1" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommunityNewsletter;