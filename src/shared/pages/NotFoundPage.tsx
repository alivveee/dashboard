import { Link } from "react-router-dom";
import { path } from "../../routes/routes.config";

const NotFoundPage = () => (
  <div className="text-center py-5">
    <h1 className="display-4 fw-bold">404</h1>
    <p className="text-muted mb-4">Halaman yang Anda cari tidak ditemukan.</p>
    <Link to={path.dashboard} className="btn btn-primary">
      Kembali ke Dashboard
    </Link>
  </div>
);

export default NotFoundPage;
