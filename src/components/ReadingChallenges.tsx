import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Trophy, Crown, Sparkles,
    Star, Medal, Rocket,
    Brain
} from 'lucide-react';

const ReadingChallenges = () => {
    const [activeChallenge, setActiveChallenge] = useState(0);

    const challenges = [
        {
            title: "Book Master",
            subtitle: "Elite Reader Challenge",
            icon: Crown,
            color: "from-amber-500 to-amber-700",
            progress: 75,
            level: 3,
            currentPoints: 750,
            targetPoints: 1000,
            achievements: [
                { name: "Fast Reader", completed: true },
                { name: "Book Worm", completed: true },
                { name: "Knowledge Seeker", completed: false }
            ],
            reward: "Golden Book Badge"
        },
        {
            title: "Speed Reader",
            subtitle: "Quick Learning Path",
            icon: Rocket,
            color: "from-amber-400 to-amber-600",
            progress: 45,
            level: 2,
            currentPoints: 450,
            targetPoints: 1000,
            achievements: [
                { name: "Quick Start", completed: true },
                { name: "Focus Master", completed: false },
                { name: "Time Optimizer", completed: false }
            ],
            reward: "Silver Speed Badge"
        },
        {
            title: "Genre Master",
            subtitle: "Diverse Reading Path",
            icon: Brain,
            color: "from-amber-300 to-amber-500",
            progress: 60,
            level: 1,
            currentPoints: 600,
            targetPoints: 1000,
            achievements: [
                { name: "Explorer", completed: true },
                { name: "Discoverer", completed: true },
                { name: "Genre Expert", completed: false }
            ],
            reward: "Explorer Badge"
        }
    ];

    return (
        <section className="py-24 px-4 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 
                            rounded-full bg-amber-100 dark:bg-amber-900/40
                            text-amber-800 dark:text-amber-200 mb-6">
                            <Trophy size={18} className="animate-pulse" />
                            <span className="text-sm font-medium">Reading Challenges</span>
                            <Star size={14} className="text-amber-500" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Challenge Yourself
                        </h2>

                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl">
                            Embark on exciting reading adventures and earn unique rewards
                        </p>
                    </motion.div>
                </div>

                {/* Challenge Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className={`relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                                rounded-2xl overflow-hidden
                                border-2 transition-all duration-300
                                ${activeChallenge === index 
                                    ? 'border-amber-500 shadow-amber-500/20' 
                                    : 'border-amber-200/50 dark:border-amber-800/50'
                                }`} >
                                {/* Challenge Header */}
                                <div className={`relative h-32 bg-gradient-to-r ${challenge.color}
                                    flex items-center justify-center overflow-hidden`}>
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute"
                                                animate={{
                                                    rotate: [0, 360],
                                                    scale: [1, 1.2, 1]
                                                }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Infinity,
                                                    delay: i * 2
                                                }}
                                                style={{
                                                    left: `${20 * i}%`,
                                                    top: `${10 * i}%`
                                                }}
                                            >
                                                <Sparkles className="w-8 h-8 text-white/30" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Level Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1 rounded-full
                                            bg-white/90 dark:bg-amber-950
                                            text-amber-900 dark:text-amber-100
                                            text-xs font-medium
                                            flex items-center gap-1">
                                            <Star size={12} />
                                            Level {challenge.level}
                                        </div>
                                    </div>

                                    {/* Challenge Icon */}
                                    <div className="relative">
                                        <div className="p-4 rounded-xl
                                            bg-white dark:bg-amber-950
                                            shadow-lg border-2 border-amber-200/50 
                                            dark:border-amber-800/50
                                            group-hover:scale-110 transition-transform duration-300">
                                            <challenge.icon className="w-8 h-8 
                                                text-amber-600 dark:text-amber-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Challenge Content */}
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold mb-1
                                            text-amber-900 dark:text-amber-100">
                                            {challenge.title}
                                        </h3>
                                        <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                                            {challenge.subtitle}
                                        </p>
                                    </div>

                                    {/* Progress Circle */}
                                    <div className="relative w-32 h-32 mx-auto mb-6">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                className="stroke-amber-100 dark:stroke-amber-900/40"
                                                strokeWidth="8"
                                                fill="none"
                                            />
                                            <motion.circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                className="stroke-amber-500"
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                initial={{ strokeDasharray: "0 360" }}
                                                whileInView={{
                                                    strokeDasharray: `${challenge.progress * 3.6} 360`
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center 
                                            justify-center flex-col">
                                            <span className="text-2xl font-bold
                                                text-amber-900 dark:text-amber-100">
                                                {challenge.progress}%
                                            </span>
                                            <span className="text-xs text-amber-600 dark:text-amber-400">
                                                Complete
                                            </span>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <div className="space-y-3 mb-6">
                                        {challenge.achievements.map((achievement, i) => (
                                            <div key={achievement.name}
                                                className="flex items-center gap-3 
                                                    p-2 rounded-lg
                                                    bg-amber-200/50 dark:bg-amber-900/20">
                                                <div className={`w-5 h-5 rounded-full
                                                    flex items-center justify-center
                                                    ${achievement.completed
                                                        ? 'bg-amber-500'
                                                        : 'bg-amber-200 dark:bg-amber-800'
                                                    }`}>
                                                    {achievement.completed && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-amber-700 
                                                    dark:text-amber-300">
                                                    {achievement.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Reward */}
                                    <div className="pt-4 border-t border-amber-200/50 
                                        dark:border-amber-800/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Medal className="w-4 h-4 text-amber-600 
                                                    dark:text-amber-400" />
                                                <span className="text-sm font-medium 
                                                    text-amber-900 dark:text-amber-100">
                                                    {challenge.reward}
                                                </span>
                                            </div>
                                            <span className="text-xs text-amber-600 
                                                dark:text-amber-400">
                                                {challenge.currentPoints}/{challenge.targetPoints} XP
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Check = ({ className }: { className?: string }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3"
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default ReadingChallenges;