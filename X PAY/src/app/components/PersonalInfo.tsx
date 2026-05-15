import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit2, Save, Camera } from 'lucide-react';

export function PersonalInfo() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    dob: '1995-05-15',
    address: 'Mumbai, Maharashtra, India',
    gender: 'Male',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Personal Info</h1>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Edit2 className="w-5 h-5 text-white" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-violet-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 blur-lg opacity-50" />
              <span className="relative z-10">RS</span>
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
            <p className="text-sm text-gray-400">Member since Jan 2024</p>
          </div>
        </motion.div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Full Name</label>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.name}</p>
            )}
          </div>

          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Email Address</label>
            </div>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.email}</p>
            )}
          </div>

          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Phone Number</label>
            </div>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.phone}</p>
            )}
          </div>

          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Date of Birth</label>
            </div>
            {isEditing ? (
              <input
                type="date"
                value={editedProfile.dob}
                onChange={(e) => setEditedProfile({ ...editedProfile, dob: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              />
            ) : (
              <p className="text-foreground font-medium">
                {new Date(profile.dob).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Gender</label>
            </div>
            {isEditing ? (
              <select
                value={editedProfile.gender}
                onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-foreground font-medium">{profile.gender}</p>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <label className="text-sm text-gray-400">Address</label>
            </div>
            {isEditing ? (
              <textarea
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.address}</p>
            )}
          </div>
        </div>

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-xl bg-cyan-500/10 rounded-2xl p-4 border border-cyan-500/20"
          >
            <p className="text-sm text-cyan-200">
              ✓ Your information is encrypted and secure. We never share your personal data without
              your consent.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
