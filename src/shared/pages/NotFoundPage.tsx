import { Link } from "react-router-dom";
import { path } from "../../routes/routes.paths";

const NotFoundPage = () => (
  <div className="text-center py-5">
    <h1 className="display-4 fw-bold">404</h1>
    <p className="text-muted mb-4">The page you are looking for was not found.</p>
    <Link to={path.dashboard} className="btn btn-primary">
      Back to Dashboard
    </Link>
  </div>
);

export default NotFoundPage;
