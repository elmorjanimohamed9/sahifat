import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send,
    MessageSquare, Globe, ArrowRight
} from 'lucide-react';

const contactMethods = [
    {
        icon: Mail,
        title: 'Email',
        value: 'contact@sahifat.com',
        description: 'Write to us anytime',
    },
    {
        icon: Phone,
        title: 'Phone',
        value: '+1 (555) 123-4567',
        description: 'Mon-Fri from 8am to 6pm'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: '123 Library Street',
        description: 'Paris, France 75001'
    }
];

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50
            dark:from-[#1a1412] dark:via-[#1e1815] dark:to-[#1a1412]">
            
            {/* Hero Section */}
            <section className="relative py-20 px-4">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.15) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center relative z-10 space-y-6 mb-16">

                        <span className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50">
                            <MessageSquare size={16} />
                            Get in Touch
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold font-serif
                            bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700
                            dark:from-amber-200 dark:via-amber-300 dark:to-amber-200
                            bg-clip-text text-transparent">
                            Contact Sahifat Library
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-amber-700/70 dark:text-amber-300/70">
                            Have questions? We'd love to hear from you. Send us a message
                            and we'll respond as soon as possible.
                        </p>
                    </motion.div>

                    {/* Contact Methods Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={method.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative">

                                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 rounded-2xl
                                    transform transition-transform duration-300 group-hover:scale-105" />
                                <div className="relative p-8 text-center space-y-4">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-amber-200 dark:bg-amber-900/40
                                        flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <method.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                                        {method.title}
                                    </h3>
                                    <div className="text-amber-600 dark:text-amber-300 font-medium">
                                        {method.value}
                                    </div>
                                    <p className="text-sm text-amber-700/70 dark:text-amber-300/70">
                                        {method.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto relative"
                    >
                        <div className="absolute inset-0 bg-amber-50 dark:bg-[#1a1412] rounded-2xl
                            border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-xl
                            transform transition-transform duration-300" />
                        <div className="relative p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-[#220b00]
                                            border border-amber-200 dark:border-amber-800/30
                                            focus:border-amber-400 dark:focus:border-amber-600
                                            text-amber-900 dark:text-amber-100
                                            transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                            focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-[#220b00]
                                            border border-amber-200 dark:border-amber-800/30
                                            focus:border-amber-400 dark:focus:border-amber-600
                                            text-amber-900 dark:text-amber-100
                                            transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                            focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-[#220b00]
                                        border border-amber-200 dark:border-amber-800/30
                                        focus:border-amber-400 dark:focus:border-amber-600
                                        text-amber-900 dark:text-amber-100
                                        transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                        focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                    Message
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-[#220b00]
                                        border border-amber-200 dark:border-amber-800/30
                                        focus:border-amber-400 dark:focus:border-amber-600
                                        text-amber-900 dark:text-amber-100
                                        transition-all duration-300 placeholder:text-amber-900/80 dark:placeholder:text-amber-100
                                        focus:outline-none focus:ring-2 focus:ring-amber-400/20 resize-none"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl bg-gradient-to-r
                                    from-amber-500 to-amber-600 text-white
                                    flex items-center justify-center gap-2
                                    shadow-lg shadow-amber-500/20
                                    hover:shadow-xl hover:shadow-amber-500/30
                                    transition-shadow duration-300"
                            >
                                <Send size={18} />
                                Send Message
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;