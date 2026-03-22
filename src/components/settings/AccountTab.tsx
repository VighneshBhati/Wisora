import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Mail, Lock, Camera, Loader2 } from "lucide-react";
import styled from "styled-components";

const Card = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  padding: 2px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }
`;

const CardInner = styled.div`
  background-color: #1a1a1a;
  border-radius: 18px;
  padding: 2rem;
  transition: all 0.2s;
  &:hover {
    transform: scale(0.99);
  }
`;

export const AccountTab = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.name || user.email?.split("@")[0] || "");
      setEmail(user.email || "");
      setAvatarUrl(user.avatar || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({
        email: email !== user.email ? email : undefined,
        data: { full_name: displayName, display_name: displayName },
      });
      if (authError) throw authError;

      // Try updating profiles table if it exists
      await supabase
        .from("profiles")
        .upsert({ id: user.id, display_name: displayName, avatar_url: avatarUrl }, { onConflict: "id" });

      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(data.publicUrl);
      await supabase.auth.updateUser({ data: { avatar_url: data.publicUrl } });
      toast.success("Avatar updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const initials = displayName
    ? displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardInner>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-green-400" /> Profile Information
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-green-500/40">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-[#2a2a2a] text-green-400 text-lg font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 bg-green-500 hover:bg-green-400 rounded-full p-1 cursor-pointer transition-colors"
              >
                {uploadingAvatar ? (
                  <Loader2 className="h-3 w-3 text-black animate-spin" />
                ) : (
                  <Camera className="h-3 w-3 text-black" />
                )}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div>
              <p className="text-white font-medium">{displayName || "Your Name"}</p>
              <p className="text-gray-400 text-sm capitalize">{user?.role || "user"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-gray-300 flex items-center gap-2">
                <User className="h-4 w-4 text-green-400" /> Display Name
              </Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your full name"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 focus:border-green-500/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400" /> Email Address
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 focus:border-green-500/60"
              />
              <p className="text-xs text-gray-500">Changing email will send a confirmation link.</p>
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white border-0"
            >
              {savingProfile ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Profile
            </Button>
          </div>
        </CardInner>
      </Card>

      {/* Password Card */}
      <Card>
        <CardInner>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-purple-400" /> Change Password
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-gray-300">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 focus:border-purple-500/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 focus:border-purple-500/60"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              disabled={savingPassword}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
            >
              {savingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Update Password
            </Button>
          </div>
        </CardInner>
      </Card>
    </div>
  );
};
