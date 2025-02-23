import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Users, Library, Globe,
    Award, BookMarked, GraduationCap, Heart
} from 'lucide-react';

const stats = [
    { icon: BookOpen, value: '10,000+', label: 'Books Available' },
    { icon: Users, value: '5,000+', label: 'Active Members' },
    { icon: Library, value: '3', label: 'Physical Locations' },
    { icon: Globe, value: '24/7', label: 'Digital Access' },
];

const features = [
    {
        icon: Award,
        title: 'Quality Selection',
        description: 'Carefully curated collection of books across various disciplines and genres.'
    },
    {
        icon: BookMarked,
        title: 'Easy Access',
        description: 'Seamless digital platform for browsing and managing your reading list.'
    },
    {
        icon: GraduationCap,
        title: 'Learning Focus',
        description: 'Resources designed to support continuous learning and development.'
    },
    {
        icon: Heart,
        title: 'Community Driven',
        description: 'Built with and for our growing community of book lovers.'
    },
];

const About = () => {
    return (
        <section className="min-h-screen py-20 px-4 bg-gradient-to-br 
            from-amber-50 via-white to-amber-50
            dark:from-[#1a1412] dark:via-[#1e1815] dark:to-[#1a1412]">

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto space-y-24">

                {/* Hero Section */}
                <div className="text-center relative">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.15) 1px, transparent 0)`,
                                backgroundSize: '24px 24px'
                            }}
                        />
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 space-y-6"
                    >
                        <span className="px-4 py-2 rounded-full text-sm
                            bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50">
                            <BookOpen size={16} />
                            About Sahifat Library
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold font-serif
                            bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700
                            dark:from-amber-200 dark:via-amber-300 dark:to-amber-200
                            bg-clip-text text-transparent">
                            Empowering Knowledge Seekers
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-amber-700/70 dark:text-amber-300/70">
                            Sahifat Library is more than just a collection of books - it's a gateway to
                            knowledge, discovery, and community learning.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Decorative background with hover effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 transform transition-all duration-500 ease-out"
                            />

                            {/* Glow effect on hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-2xl opacity-0 "
                            />

                            {/* Main content */}
                            <div className="relative p-6 text-center space-y-3">
                                {/* Icon with hover effect */}
                                <div className="relative">
                                    <stat.icon className="w-8 h-8 mx-auto text-amber-500"
                                    />
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md opacity-0 "
                                    />
                                </div>

                                {/* Value with animation */}
                                <div className="relative">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-300 dark:to-amber-500 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    {/* Decorative line */}
                                    <div className="absolute -bottom-1 left-1/2 w-0 h-0.5
                        bg-gradient-to-r from-transparent via-amber-500 to-transparent
                        transform -translate-x-1/2
                        transition-all duration-300 ease-out
                        group-hover:w-1/2 opacity-0 group-hover:opacity-100"
                                    />
                                </div>

                                {/* Label with hover effect */}
                                <div className="text-sm font-medium text-amber-700/70 dark:text-amber-300/70 transform transition-all duration-300 group-hover:text-amber-800 dark:group-hover:text-amber-200">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group p-6 rounded-2xl
                                bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                                transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40">
                                    <feature.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-amber-700/70 dark:text-amber-300/70">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto space-y-6"
                >
                    <h2 className="text-3xl font-bold font-serif bg-gradient-to-r 
                        from-amber-700 to-amber-900 dark:from-amber-200 dark:to-amber-400 
                        bg-clip-text text-transparent">
                        Our Mission
                    </h2>
                    <p className="text-lg text-amber-700/70 dark:text-amber-300/70">
                        To provide accessible, high-quality educational resources and create
                        an inclusive environment that fosters learning, discovery, and
                        intellectual growth for our community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;