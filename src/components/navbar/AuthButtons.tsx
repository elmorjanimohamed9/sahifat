import { Link } from 'react-router-dom';
import { 
  LogIn, 
  UserPlus, 
  Sparkles, 
  User,
  LogOut,
  Mail
} from 'lucide-react';
import Dropdown from '../Dropdown';
import { cognitoService } from '../../services/cognito-service';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      cognitoService.signOut();
      toast.success('Successfully logged out');
      navigate('/auth/login');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    }
  };


  if (isAuthenticated && user) {
    return (
      <Dropdown
        button={
          <div className="group flex items-center gap-3 p-2 rounded-full
            hover:bg-amber-50 dark:hover:bg-amber-900/20
            transition-all duration-300">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden
                ring-2 ring-amber-400 dark:ring-amber-600
                group-hover:ring-amber-500 dark:group-hover:ring-amber-400
                transition-all duration-300
                bg-gradient-to-br from-amber-400 to-amber-600">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white absolute top-1/2 left-1/2 
                    transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              {/* Online Status */}
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full
                bg-green-400 border-2 border-white dark:border-[#1a1412]" />
            </div>
          </div>
        }
        btnClassName="relative"
      >
        <div className="w-64 mt-2 p-2 rounded-xl
          bg-white dark:bg-[#1a1412]
          border border-amber-200 dark:border-amber-800/50
          shadow-xl shadow-amber-900/10
          backdrop-blur-lg backdrop-saturate-150
          divide-y divide-amber-200 dark:divide-amber-800/50">

          {/* User Info Section */}
          <div className="p-3">
            <div className="text-center">
              <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100">
                {user.name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-1
                text-sm text-amber-600 dark:text-amber-400">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          
          {/* User Section */}
          <div className="p-2">
            <Link to="/profile"
              className="flex items-center gap-3 p-2 rounded-lg
                hover:bg-amber-50 dark:hover:bg-amber-900/20
                text-amber-900 dark:text-amber-100
                transition-all duration-300">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </div>

          {/* Theme Toggle & Logout */}
          <div className="p-2 space-y-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 rounded-lg
                hover:bg-red-50 dark:hover:bg-red-900/20
                text-red-600 dark:text-red-400
                group transition-all duration-300">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50
                group-hover:-translate-x-1 transition-transform duration-300">
                <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </Dropdown>
    );
  }

  // Return original auth buttons if not authenticated
  return (
    <div className="hidden md:flex items-center gap-6">
      {/* Login Button */}
      <Link
        to="/auth/login"
        className="group relative px-6 py-2.5 rounded-xl overflow-hidden
          bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10
          hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-700/10
          border border-amber-200/50 dark:border-amber-800/50
          transition-all duration-500">

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent
            animate-shine" />
        </div>

        {/* Contenu */}
        <span className="relative flex items-center gap-2.5">
          <LogIn className="w-5 h-5 text-amber-700 dark:text-amber-400 
            transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium tracking-wide bg-gradient-to-r from-amber-700 to-amber-900 
            dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent font-serif
            transform group-hover:translate-x-0.5 transition-transform duration-300">
            Login
          </span>
        </span>
      </Link>

      {/* Register Button */}
      <Link
        to="/auth/register"
        className="group relative px-6 py-2.5 rounded-xl overflow-hidden
          bg-gradient-to-r from-amber-600 to-amber-800
          hover:from-amber-700 hover:to-amber-900
          shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40
          transform hover:scale-105 transition-all duration-300"
      >
        {/* Animated border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 
          rounded-xl opacity-0 group-hover:opacity-30 blur-sm
          animate-border-glow transition-opacity duration-500" />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-0.5 h-0.5 rounded-full bg-amber-200/60
                animate-floating-up"
              style={{
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <span className="relative flex items-center gap-3">
          <UserPlus className="w-5 h-5 text-amber-100 
            transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif font-medium tracking-wider text-amber-50
            transform group-hover:translate-x-0.5 transition-transform duration-300">
            Create Account
          </span>
        </span>

        {/* Sparkles effect */}
        <Sparkles className="absolute top-1 right-1 w-3 h-3 text-amber-200/40 
          animate-spin-slow" />
        <Sparkles className="absolute bottom-1 left-1 w-2 h-2 text-amber-200/30 
          animate-spin-slow-reverse" />
      </Link>
    </div>
  );
};