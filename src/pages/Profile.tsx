import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, 
    BookOpen, Clock, CheckCircle, 
    XCircle, Edit, Camera, Calendar,
    ChevronRight, Download, Share2
} from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

interface Book {
    id: string;
    title: string;
    author: string;
    borrowDate: string;
    returnDate?: string;
    status: 'borrowed' | 'returned';
    imageUrl: string;
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    memberSince: string;
    totalBorrowed: number;
    currentlyBorrowed: number;
}

const mockUserProfile: UserProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Library Street, New York, NY 10001",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    memberSince: "January 2023",
    totalBorrowed: 47,
    currentlyBorrowed: 3
};

const mockBooks: Book[] = [
    {
        id: "1",
        title: "The Design of Everyday Things",
        author: "Don Norman",
        borrowDate: "2024-02-15",
        status: 'borrowed',
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646"
    },
    {
        id: "2",
        title: "Clean Code",
        author: "Robert C. Martin",
        borrowDate: "2024-01-10",
        returnDate: "2024-02-10",
        status: 'returned',
        imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2"
    }
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState<'borrowed' | 'returned'>('borrowed');
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(mockUserProfile);
    const [tempImage, setTempImage] = useState<string | null>(null);

    const filteredBooks = mockBooks.filter(book => book.status === activeTab);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (updatedProfile: UserProfile) => {
        // Here you would typically make an API call to update the profile
        if (tempImage) {
            updatedProfile.avatar = tempImage;
        }
        setEditedProfile(updatedProfile);
        setIsEditing(false);
        setTempImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50
            dark:from-[#1a1412] dark:via-[#1e1815] dark:to-[#1a1412] p-6 mt-4">
            
            <div className="max-w-7xl mx-auto">
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-r from-amber-100 to-amber-50
                        dark:from-amber-900/20 dark:to-amber-800/20
                        rounded-3xl p-8 mb-8 overflow-hidden
                        border border-amber-200/50 dark:border-amber-800/50"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.15) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden
                                ring-4 ring-amber-200 dark:ring-amber-700/50">
                                <img 
                                    src={editedProfile.avatar} 
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                <h1 className="text-3xl font-bold font-serif
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    {editedProfile.name}
                                </h1>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 rounded-full hover:bg-amber-100 
                                        dark:hover:bg-amber-900/30
                                        transition-colors duration-300"
                                >
                                    <Edit size={18} className="text-amber-600 dark:text-amber-400" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { icon: Mail, value: editedProfile.email },
                                    { icon: Phone, value: editedProfile.phone },
                                    { icon: MapPin, value: editedProfile.address }
                                ].map(({ icon: Icon, value }) => (
                                    <div key={value} className="flex items-center justify-center md:justify-start gap-2
                                        text-amber-700/70 dark:text-amber-300/70">
                                        <Icon size={16} />
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { 
                                    icon: BookOpen,
                                    label: "Total Borrowed",
                                    value: editedProfile.totalBorrowed
                                },
                                { 
                                    icon: Clock,
                                    label: "Currently Borrowed",
                                    value: editedProfile.currentlyBorrowed
                                }
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="p-4 rounded-xl
                                    bg-white/50 dark:bg-amber-900/10
                                    border border-amber-200/50 dark:border-amber-800/50">
                                    <Icon size={20} className="text-amber-600 dark:text-amber-400 mb-2" />
                                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                        {value}
                                    </div>
                                    <div className="text-sm text-amber-700/70 dark:text-amber-300/70">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Books Section */}
                <div>
                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        {[
                            { id: 'borrowed', label: 'Currently Borrowed' },
                            { id: 'returned', label: 'Return History' }
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id as 'borrowed' | 'returned')}
                                className={`px-6 py-3 rounded-xl font-medium
                                    transition-all duration-300
                                    ${activeTab === id
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="wait">
                            {filteredBooks.map((book) => (
                                <motion.div
                                    key={book.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group bg-white dark:bg-amber-900/10 rounded-xl
                                        overflow-hidden border border-amber-200/50 dark:border-amber-800/50
                                        hover:border-amber-300 dark:hover:border-amber-700
                                        transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={book.imageUrl}
                                            alt={book.title}
                                            className="w-full h-full object-cover
                                                transform group-hover:scale-110
                                                transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t 
                                            from-black/60 to-transparent" />
                                        
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold mb-1 line-clamp-1">
                                                {book.title}
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                by {book.author}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2 text-sm
                                                text-amber-700/70 dark:text-amber-300/70">
                                                <Calendar size={14} />
                                                <span>Borrowed: {book.borrowDate}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs
                                                flex items-center gap-1.5
                                                ${book.status === 'borrowed'
                                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                }`}>
                                                {book.status === 'borrowed' ? (
                                                    <>
                                                        <Clock size={12} />
                                                        Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle size={12} />
                                                        Returned
                                                    </>
                                                )}
                                            </span>
                                        </div>

                                        {book.returnDate && (
                                            <div className="text-sm text-amber-700/70 dark:text-amber-300/70
                                                flex items-center gap-2">
                                                <CheckCircle size={14} />
                                                <span>Returned: {book.returnDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setTempImage(null);
                }}
                profile={editedProfile}
                tempImage={tempImage}
                onImageChange={handleImageChange}
                onSave={handleSave}
            />
        </div>
    );
};

export default Profile;