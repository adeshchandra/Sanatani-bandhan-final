const fs = require('fs');
let content = fs.readFileSync('src/components/account/DevoteeSelfService.tsx', 'utf8');

const handleUploadOld = `  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error');
      return;
    }
    
    try {
      setIsUploading(true);
      showToast('Uploading and optimizing image...', 'info');
      const downloadUrl = await compressDevoteeAvatar(file);
      setFormData({ ...formData, avatarUrl: downloadUrl });
      showToast('Profile image uploaded successfully', 'success');
    } catch (error: any) {
      showToast('Failed to upload image: ' + error.message, 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };`;

const handleUploadNew = `  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error');
      return;
    }
    
    setPendingPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };`;

content = content.replace(handleUploadOld, handleUploadNew);

const handleSaveOld = `    try {
      const updatePayload = {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        bloodGroup: formData.bloodGroup,
        medicalNotes: formData.medicalNotes,
        avatarUrl: formData.avatarUrl,
        updatedAt: new Date().toISOString()
      };`;

const handleSaveNew = `    try {
      setIsUploading(true);
      let finalAvatarUrl = formData.avatarUrl;
      
      if (pendingPhotoFile) {
        showToast('Optimizing and saving photo...', 'info');
        finalAvatarUrl = await compressDevoteeAvatar(pendingPhotoFile);
      }
      
      const updatePayload = {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        bloodGroup: formData.bloodGroup,
        medicalNotes: formData.medicalNotes,
        avatarUrl: finalAvatarUrl,
        updatedAt: new Date().toISOString()
      };`;

content = content.replace(handleSaveOld, handleSaveNew);

const afterSaveOld = `      showToast('Profile updated successfully', 'success');
      setIsEditing(false);`;

const afterSaveNew = `      showToast('Profile updated successfully', 'success');
      setIsEditing(false);
      setPendingPhotoFile(null);
      setPreviewUrl(null);
      setIsUploading(false);`;

content = content.replace(afterSaveOld, afterSaveNew);

const handleCancelOld = `  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      phone: currentDevotee?.phone || '',
      email: currentDevotee?.email || '',
      address: currentDevotee?.address || '',
      emergencyContact: currentDevotee?.emergencyContact || '',
      emergencyPhone: currentDevotee?.emergencyPhone || '',
      bloodGroup: currentDevotee?.bloodGroup || '',
      medicalNotes: currentDevotee?.medicalNotes || '',
      avatarUrl: currentDevotee?.avatarUrl || '',
    });
    setPhoneVerified(true);
    setEmailVerified(true);
  };`;

const handleCancelNew = `  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      phone: currentDevotee?.phone || '',
      email: currentDevotee?.email || '',
      address: currentDevotee?.address || '',
      emergencyContact: currentDevotee?.emergencyContact || '',
      emergencyPhone: currentDevotee?.emergencyPhone || '',
      bloodGroup: currentDevotee?.bloodGroup || '',
      medicalNotes: currentDevotee?.medicalNotes || '',
      avatarUrl: currentDevotee?.avatarUrl || '',
    });
    setPhoneVerified(true);
    setEmailVerified(true);
    setPendingPhotoFile(null);
    setPreviewUrl(null);
  };`;

content = content.replace(handleCancelOld, handleCancelNew);

const avatarRenderOld = `                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-stone-300" />
                )}`;

const avatarRenderNew = `                {previewUrl || formData.avatarUrl ? (
                  <img src={previewUrl || formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-stone-300" />
                )}`;

content = content.replace(avatarRenderOld, avatarRenderNew);

// Finally, we need a catch block for save to reset isUploading to false just in case.
const catchBlockOld = `    } catch (error: any) {
      showToast('Failed to update profile: ' + error.message, 'error');
    }
  };`;

const catchBlockNew = `    } catch (error: any) {
      showToast('Failed to update profile: ' + error.message, 'error');
      setIsUploading(false);
    }
  };`;

content = content.replace(catchBlockOld, catchBlockNew);

fs.writeFileSync('src/components/account/DevoteeSelfService.tsx', content);
