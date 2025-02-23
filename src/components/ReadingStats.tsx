import React from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Clock, Calendar, Target,
    TrendingUp, Award, Bookmark, Coffee,
    Brain, Flame, Zap, Star
} from 'lucide-react';

interface Genre {
    name: string;
    progress: number;
}

interface ReadingStatsData {
    booksRead: number;
    hoursRead: number;
    currentStreak: number;
    yearlyGoal: number;
    topGenres: Genre[];
}

// Constants
const ACHIEVEMENTS = [
    { icon: Award, title: "Book Champion", desc: "Read 10 books in a month" },
    { icon: Zap, title: "Speed Reader", desc: "Finished a book in one day" },
    { icon: Coffee, title: "Night Owl", desc: "Read for 2 hours at night" },
    { icon: Star, title: "Genre Explorer", desc: "Read from 5 different genres" }
] as const;

const MAIN_STATS = [
    { icon: BookOpen, label: "Books Read", value: (stats: ReadingStatsData) => stats.booksRead },
    { icon: Clock, label: "Hours Read", value: (stats: ReadingStatsData) => `${stats.hoursRead}h` },
    { icon: Flame, label: "Current Streak", value: (stats: ReadingStatsData) => `${stats.currentStreak} days` },
    { icon: Target, label: "2024 Goal", value: (stats: ReadingStatsData) => `${stats.booksRead}/${stats.yearlyGoal}` }
] as const;

// Animation variants
const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

const ReadingStats = () => {
    const stats: ReadingStatsData = {
        booksRead: 42,
        hoursRead: 156,
        currentStreak: 15,
        yearlyGoal: 50,
        topGenres: [
            { name: "Technology", progress: 75 },
            { name: "Science", progress: 60 },
            { name: "Business", progress: 45 },
            { name: "Psychology", progress: 30 }
        ]
    };

    return (
        <section className="py-24 px-4 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative">
                {/* Enhanced Header */}
                <motion.div
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex flex-col items-center">
                        <motion.span 
                            className="px-4 py-2 rounded-full text-sm
                                bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50
                            backdrop-blur-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <TrendingUp size={16} className="animate-pulse" />
                            Reading Progress
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent
                            tracking-tight">
                            Your Reading Journey
                        </h2>

                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl">
                            Track your reading progress and celebrate your achievements
                        </p>
                    </div>
                </motion.div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {MAIN_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 backdrop-blur-md rounded-2xl p-6
                                border border-amber-200/50 dark:border-amber-800/50
                                group hover:-translate-y-2 hover:border-amber-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl
                                    bg-gradient-to-br from-amber-500/20 to-amber-600/20
                                    group-hover:from-amber-500/30 group-hover:to-amber-600/30
                                    transition-all duration-300">
                                    <stat.icon className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-amber-600 dark:text-amber-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                        {stat.value(stats)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced Reading Progress Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Genre Progress */}
                    <motion.div
                        variants={fadeInUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 backdrop-blur-md rounded-2xl p-8
                            border border-amber-200/50 dark:border-amber-800/50"
                    >
                        <h3 className="text-xl font-bold mb-6
                            text-amber-900 dark:text-amber-100
                            flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            Top Genres
                        </h3>

                        <div className="space-y-6">
                            {stats.topGenres.map((genre, index) => (
                                <div key={genre.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-amber-900 dark:text-amber-100">
                                            {genre.name}
                                        </span>
                                        <span className="text-amber-600 dark:text-amber-400">
                                            {genre.progress}%
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-amber-100 dark:bg-amber-900/40
                                        overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r 
                                                from-amber-500 to-amber-700"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${genre.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ 
                                                duration: 1.5,
                                                delay: index * 0.2,
                                                ease: "easeOut"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievement Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {ACHIEVEMENTS.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                variants={scaleInVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 backdrop-blur-sm rounded-xl p-4
                                    group hover:-translate-y-2 hover:border-amber-300">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="p-2 rounded-lg
                                        bg-gradient-to-br from-amber-500/20 to-amber-600/20
                                        group-hover:from-amber-500/30 group-hover:to-amber-600/30
                                        transition-all duration-300">
                                        <achievement.icon className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                                    </div>
                                    <h4 className="font-medium text-amber-900 dark:text-amber-100">
                                        {achievement.title}
                                    </h4>
                                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                                        {achievement.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReadingStats;