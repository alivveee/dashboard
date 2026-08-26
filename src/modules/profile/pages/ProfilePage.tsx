import { useState } from "react";
import PageHeader from "../../../shared/components/PageHeader";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";
import { IconEdit } from "../../../shared/components/icons/Icons";
import useProfile, { ProfileFormData } from "../hooks/useProfile";

const ProfilePage = () => {
  const {
    __roleLabel,
    __isLoading,

    __formInitialValues,
    __updateProfile,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const _handleSubmit = async (data: ProfileFormData) => {
    await __updateProfile(data);
    setIsEditing(false);
  };

  return (
    <>
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
                disabled={__isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="profile-form"
                className="btn btn-primary"
                disabled={__isLoading}
              >
                {__isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : undefined
        }
      />

      {isEditing ? (
        <ProfileForm
          initialValues={__formInitialValues}
          roleLabel={__roleLabel}
          onSubmit={_handleSubmit}
        />
      ) : (
        <ProfileView
          name={__formInitialValues.name}
          email={__formInitialValues.email}
          phone={__formInitialValues.phone}
          address={__formInitialValues.address}
          birthday={__formInitialValues.birthday}
          gender={__formInitialValues.gender}
          roleLabel={__roleLabel}
        />
      )}
    </>
  );
};

export default ProfilePage;
