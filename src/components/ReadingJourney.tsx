import React from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Sparkles, Star, Trophy,
    Target, Flame, Crown, BookMarked,
    Compass, Map, Mountain, Flag
} from 'lucide-react';

const ReadingJourney = () => {
    const journeySteps = [
        {
            icon: Compass,
            title: "Start Your Journey",
            description: "Begin your reading adventure with carefully selected books",
            color: "from-blue-500 to-blue-700",
            progress: "Level 1",
            books: 5
        },
        {
            icon: Map,
            title: "Explorer",
            description: "Discover new genres and expand your literary horizons",
            color: "from-emerald-500 to-emerald-700",
            progress: "Level 2",
            books: 15
        },
        {
            icon: Mountain,
            title: "Adventure Seeker",
            description: "Challenge yourself with diverse and complex readings",
            color: "from-purple-500 to-purple-700",
            progress: "Level 3",
            books: 30
        },
        {
            icon: Flag,
            title: "Master Reader",
            description: "Become a literary connoisseur and inspire others",
            color: "from-amber-500 to-amber-700",
            progress: "Level 4",
            books: 50
        }
    ];

    return (
        <section className="py-24 px-4 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <span className="px-4 py-2 rounded-full text-sm
                            bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50
                            backdrop-blur-xl">
                            <Trophy size={16} className="animate-pulse" />
                            Reading Achievement
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Your Reading Journey
                        </h2>

                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl">
                            Track your progress, earn achievements, and become a master reader
                            through our guided reading journey
                        </p>
                    </motion.div>
                </div>

                {/* Journey Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative group">
                                <div className="absolute rounded-2xl blur-xl opacity-0" />

                                <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                                    rounded-2xl p-8 h-full
                                    border border-amber-200/50 dark:border-amber-800/50">
                                    
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl mb-6
                                        bg-gradient-to-br ${step.color}
                                        flex items-center justify-center
                                        transform transition-transform duration-300
                                        group-hover:scale-110`}>
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-2
                                        text-amber-900 dark:text-amber-100">
                                        {step.title}
                                    </h3>
                                    
                                    <p className="text-amber-700/70 dark:text-amber-300/70 mb-6">
                                        {step.description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-amber-900 dark:text-amber-100 font-medium">
                                                {step.progress}
                                            </span>
                                            <span className="text-amber-700/70 dark:text-amber-300/70">
                                                {step.books} books
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-amber-100 dark:bg-amber-900/40">
                                            <motion.div
                                                className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(index + 1) * 25}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.2 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Achievement Badge */}
                                    <div className="absolute top-4 right-4">
                                        {index === 3 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-amber-100 dark:bg-amber-900/40
                                                    p-2 rounded-full"
                                            >
                                                <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-xl
                            bg-gradient-to-r from-amber-600 to-amber-800
                            hover:from-amber-700 hover:to-amber-900
                            text-white font-medium
                            transition-all duration-300
                            shadow-lg shadow-amber-900/20 hover:shadow-xl
                            flex items-center gap-2 mx-auto"
                    >
                        <Flame className="w-5 h-5" />
                        <span>Start Your Journey</span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default ReadingJourney;