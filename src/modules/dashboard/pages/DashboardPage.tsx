import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import useAnalytics from "../../analytics/hooks/useAnalytics";
import { path } from "../../../routes/routes.paths";
import { IconAnalytics } from "../../../shared/components/icons/Icons";

const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

const DashboardPage = () => {
  const { __session } = useAuth();
  const { __overview } = useAnalytics();
  const navigate = useNavigate();

  return (
    <>
      {/* Welcome header */}
      <div className="card border rounded-3 bg-body-tertiary mb-4">
        <div className="card-body">
          <h1 className="h4 mb-1">
            Welcome back, {__session?.name ?? "User"}
          </h1>
          <p className="text-body-secondary mb-0">
            Here's a summary of GX App activity today.
          </p>
        </div>
      </div>

      {/* Summary */}
      <section>
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div>
            <h2 className="h5 mb-1">Summary</h2>
            <p className="text-body-secondary small mb-0">
              Quick stats on prospects and customers.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => navigate(path.analytics)}
          >
            <IconAnalytics />
            View Analytics
          </button>
        </div>

        <div className="row g-3">
          <StatCard
            title="Total Prospect"
            value={__overview.totalProspects}
          />
          <StatCard
            title="Total Customer"
            value={__overview.totalCustomers}
          />
          <StatCard
            title="Active Customers"
            value={__overview.activeCustomers}
          />
          <StatCard
            title="Conversion Rate"
            value={formatPercentage(__overview.conversionRate)}
          />
        </div>
      </section>
    </>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card border bg-body-tertiary rounded-3 h-100">
        <div className="card-body">
          <p className="text-body-secondary small mb-2">{title}</p>
          <h2 className="h4 mb-0">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
