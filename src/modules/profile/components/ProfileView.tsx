interface ProfileViewProps {
  name: string;
  email: string;
  address: string;
  birthday: string;
  gender: string;
  roleLabel: string;
}

const ProfileView = ({
  name,
  email,
  address,
  birthday,
  gender,
  roleLabel,
}: ProfileViewProps) => {
  const genderLabel = gender === "L" ? "Male" : gender === "P" ? "Female" : gender;

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <div className="form-label text-muted mb-1">Name</div>
          <div>{name}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Email</div>
          <div>{email}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Address</div>
          <div>{address}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Date of Birth</div>
          <div>{birthday}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Gender</div>
          <div>{genderLabel}</div>
        </div>

        <div>
          <div className="form-label text-muted mb-1">Role</div>
          <div>{roleLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
