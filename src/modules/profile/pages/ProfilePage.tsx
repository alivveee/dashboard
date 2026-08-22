import { useState } from "react";
import PageHeader from "../../../shared/components/PageHeader";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";
import { IconEdit } from "../../../shared/components/icons/Icons";
import useProfile, { ProfileFormData } from "../hooks/useProfile";

const ProfilePage = () => {
  const {
    roleLabel,
    isLoading,

    formInitialValues,
    updateProfile,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (data: ProfileFormData) => {
    await updateProfile(data);
    setIsEditing(false);
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        action={
          isEditing
            ? undefined
            : {
                label: "Edit",
                icon: <IconEdit />,
                onClick: () => setIsEditing(true),
              }
        }
        actions={
          isEditing ? (
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="profile-form"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : undefined
        }
      />

      {isEditing ? (
        <ProfileForm
          initialValues={formInitialValues}
          roleLabel={roleLabel}
          onSubmit={handleSubmit}
        />
      ) : (
        <ProfileView
          name={formInitialValues.name}
          email={formInitialValues.email}
          address={formInitialValues.address}
          birthday={formInitialValues.birthday}
          gender={formInitialValues.gender}
          roleLabel={roleLabel}
        />
      )}
    </div>
  );
};

export default ProfilePage;
