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
  const genderLabel = gender === "L" ? "Laki-laki" : gender === "P" ? "Perempuan" : gender;

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <div className="form-label text-muted mb-1">Nama</div>
          <div>{name}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Email</div>
          <div>{email}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Alamat</div>
          <div>{address}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Tanggal Lahir</div>
          <div>{birthday}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Jenis Kelamin</div>
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
