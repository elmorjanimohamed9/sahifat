import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';
import Modal from './Modal';
import { UserProfile } from '../pages/Profile';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile;
    tempImage: string | null;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (updatedProfile: UserProfile) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    isOpen,
    onClose,
    profile,
    tempImage,
    onImageChange,
    onSave,
}) => {
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedProfile);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
            <form onSubmit={handleSubmit} className="space-y-6 z-50">
                {/* Avatar Section */}
                <div className="flex justify-center">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden
                            ring-4 ring-amber-200 dark:ring-amber-700/50">
                            <img 
                                src={tempImage || profile.avatar} 
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="absolute bottom-0 right-0 p-2 rounded-full
                            bg-amber-500 text-white cursor-pointer
                            opacity-0 group-hover:opacity-100
                            transform translate-y-2 group-hover:translate-y-0
                            transition-all duration-300">
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={onImageChange}
                            />
                            <Camera size={18} />
                        </label>
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    {[
                        { label: 'Name', key: 'name' },
                        { label: 'Email', key: 'email', icon: Mail },
                        { label: 'Phone', key: 'phone', icon: Phone },
                        { label: 'Address', key: 'address', icon: MapPin }
                    ].map(({ label, key, icon: Icon }) => (
                        <div key={key} className="space-y-1">
                            <label className="text-sm font-medium
                                text-amber-700 dark:text-amber-300">
                                {label}
                            </label>
                            <div className="relative">
                                {Icon && (
                                    <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2
                                        text-amber-600/50 dark:text-amber-400/50" />
                                )}
                                <input
                                    type="text"
                                    value={editedProfile[key as keyof UserProfile]}
                                    onChange={(e) => setEditedProfile(prev => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))}
                                    className={`w-full rounded-lg border border-amber-200/50 
                                        dark:border-amber-800/50 bg-transparent outline-none
                                        focus:border-amber-500 dark:focus:border-amber-400
                                        focus:ring-1 focus:ring-amber-500 dark:focus:ring-amber-400
                                        text-amber-900 dark:text-amber-100
                                        ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-xl
                            border border-amber-200/50 dark:border-amber-800/50
                            hover:bg-amber-100 dark:hover:bg-amber-900/30
                            text-amber-700 dark:text-amber-300
                            transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 rounded-xl
                            bg-gradient-to-r from-amber-500 to-amber-600
                            hover:from-amber-600 hover:to-amber-700
                            text-white font-medium
                            transition-all duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;