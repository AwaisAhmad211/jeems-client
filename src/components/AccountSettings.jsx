import { useEffect, useState } from "react";
import {
  Shield,
  Bell,
  Smartphone,
  User,
  Save,
  RefreshCw,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const AccountSettings = ({ userProfile }) => {
  // Separate loading states for better UX
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "", // Added to show user their email
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    preferences: {
      newCollectionAlerts: true,
      orderStatusUpdates: true,
    },
  });

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        name: userProfile.name || "",
        email: userProfile.email || "", // Populate email
        phoneNumber: userProfile.phoneNumber || "",
        preferences: {
          newCollectionAlerts:
            userProfile.preferences?.newCollectionAlerts ?? true,
          orderStatusUpdates:
            userProfile.preferences?.orderStatusUpdates ?? true,
        },
      }));
    }
  }, [userProfile]);

  // Handler for Profile & Toggles
  const handleUpdateProfile = async () => {
    try {
      setProfileLoading(true);
      const { data } = await axiosInstance.put("/api/user/profile", {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        preferences: formData.preferences,
      });
      toast.success(data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handler for Password
  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword) {
      return toast.error("Please fill all password fields");
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      setPasswordLoading(true);
      await axiosInstance.put("/api/user/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password updated successfully");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-2xl font-serif text-[var(--color-primary-dark)]">Account Settings</h2>
        <p className="text-sm text-gray-400 font-light mt-1">
          Manage your identity and security.
        </p>
      </div>

      <div className="space-y-12">
        {/* SECTION 1: PERSONAL DETAILS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-50 pb-12">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-primary-dark)] uppercase tracking-widest flex items-center gap-2">
              <User size={16} className="text-[var(--color-accent-lime)]" /> Profile
            </h3>
          </div>
          <div className="md:col-span-2 space-y-4">
            {/* Read-only Email Field */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={16}
              />
              <input
                type="text"
                value={formData.email}
                disabled
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-500 cursor-not-allowed border border-transparent outline-none"
                placeholder="Email Address"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent-lime)] border border-transparent focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent-lime)] border border-transparent focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: SECURITY */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-50 pb-12">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-primary-dark)] uppercase tracking-widest flex items-center gap-2">
              <Shield size={16} className="text-[var(--color-accent-lime)]" /> Password
            </h3>
          </div>
          <div className="md:col-span-2 space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none"
              />
            </div>
            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-accent-lime)] uppercase tracking-widest hover:underline disabled:opacity-50"
            >
              {passwordLoading && (
                <RefreshCw className="animate-spin" size={12} />
              )}
              Update Password
            </button>
          </div>
        </section>

        {/* SECTION 3: PREFERENCES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-primary-dark)] uppercase tracking-widest flex items-center gap-2">
              <Bell size={16} className="text-[var(--color-accent-lime)]" /> Notifications
            </h3>
          </div>
          <div className="md:col-span-2 space-y-4">
            {[
              {
                id: "newCollectionAlerts",
                label: "New Collection Alerts",
                icon: <Smartphone size={16} />,
              },
              {
                id: "orderStatusUpdates",
                label: "Order Status Updates",
                icon: <Shield size={16} />,
              },
            ].map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl"
              >
                <div className="flex gap-4 items-center">
                  <div className="text-[var(--color-accent-lime)]">{pref.icon}</div>
                  <p className="text-sm font-medium text-[var(--color-primary-dark)]">
                    {pref.label}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!!formData.preferences[pref.id]} // Fix: Force boolean check
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setFormData((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          [pref.id]: newValue,
                        },
                      }));
                    }}
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[var(--color-primary-dark)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER SAVE BUTTON */}
        <div className="flex justify-end pt-6">
          <button
            onClick={handleUpdateProfile}
            disabled={profileLoading}
            className="flex items-center gap-3 bg-[var(--color-primary-dark)] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[var(--color-accent-lime)] transition-all shadow-lg shadow-[var(--color-primary-dark)]/10 disabled:opacity-70"
          >
            {profileLoading ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
