import CopyableText from "../../../shared/components/CopyableText";

interface ProfileViewProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  gender: string;
  roleLabel: string;
}

const ProfileView = ({
  name,
  email,
  phone,
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
          <div>
            <CopyableText text={email} />
          </div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Phone</div>
          <div>
            <CopyableText text={phone} />
          </div>
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

        <>
          <div className="form-label text-muted mb-1">Role</div>
          <div>{roleLabel}</div>
        </>
      </div>
    </div>
  );
};

export default ProfileView;
