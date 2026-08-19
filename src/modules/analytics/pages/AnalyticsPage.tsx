import PackageRankingCard from "../components/PackageRankingCard";
import useAnalytics from "../hooks/useAnalytics";

const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

const AnalyticsPage = () => {
  const {
    overview,
    prospectStatus,
    customerStatus,
    prospectRankings,
    customerRankings,
  } = useAnalytics();

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h4 text-body-secondary mb-0">
          Overview of prospects, customers, and package rankings.
        </h1>
      </div>

      {/* Overview */}
      <section className="mb-4">
        <div className="card border rounded-3">
          <div className="card-body">
            <div className="mb-3">
              <h2 className="h5 mb-1">Overview</h2>
              <p className="text-body-secondary small mb-0">
                Key metrics for prospects and customers.
              </p>
            </div>

            <div className="row g-3">
              <AnalyticsCard
                title="Total Prospects"
                value={overview.totalProspects}
              />

              <AnalyticsCard
                title="Completed Prospects"
                value={overview.completedProspects}
              />

              <AnalyticsCard
                title="Conversion Rate"
                value={formatPercentage(overview.conversionRate)}
              />

              <AnalyticsCard
                title="Total Customers"
                value={overview.totalCustomers}
              />

              <AnalyticsCard
                title="Active Customers"
                value={overview.activeCustomers}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="mb-4">
        <div className="card border rounded-3">
          <div className="card-body">
            <div className="mb-3">
              <h2 className="h5 mb-1">Status Overview</h2>
              <p className="text-body-secondary small mb-0">
                Current status distribution of prospects and customers.
              </p>
            </div>

            <div className="row g-3">
              <div className="col-12 col-lg-6">
                <StatusCard
                  title="Prospect Status"
                  items={[
                    {
                      label: "Pending",
                      value: prospectStatus.pending,
                    },
                    {
                      label: "Completed",
                      value: prospectStatus.completed,
                    },
                  ]}
                />
              </div>

              <div className="col-12 col-lg-6">
                <StatusCard
                  title="Customer Status"
                  items={[
                    {
                      label: "Active",
                      value: customerStatus.active,
                    },
                    {
                      label: "Blocked",
                      value: customerStatus.blocked,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Rankings */}
      <section>
        <div className="card border rounded-3">
          <div className="card-body">
            <div className="mb-3">
              <h2 className="h5 mb-1">Package Rankings</h2>
              <p className="text-body-secondary small mb-0">
                Most popular packages based on prospects and customers.
              </p>
            </div>

            <div className="row g-3">
              <div className="col-12 col-lg-6">
                <PackageRankingCard
                  title="Prospect Rankings"
                  items={prospectRankings}
                  type="prospects"
                />
              </div>

              <div className="col-12 col-lg-6">
                <PackageRankingCard
                  title="Customer Rankings"
                  items={customerRankings}
                  type="customers"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface AnalyticsCardProps {
  title: string;
  value: string | number;
}

const AnalyticsCard = ({ title, value }: AnalyticsCardProps) => {
  return (
    <div className="col-12 col-sm-6 col-xl">
      <div className="card border bg-body-tertiary rounded-3 h-100">
        <div className="card-body">
          <p className="text-body-secondary small mb-2">{title}</p>

          <h2 className="h4 mb-0">{value}</h2>
        </div>
      </div>
    </div>
  );
};

interface StatusItem {
  label: string;
  value: number;
}

interface StatusCardProps {
  title: string;
  items: StatusItem[];
}

const StatusCard = ({ title, items }: StatusCardProps) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card border bg-body-tertiary rounded-3 h-100">
      <div className="card-body">
        <h3 className="h6 mb-4">{title}</h3>

        <div className="d-flex flex-column gap-3">
          {items.map((item) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;

            return (
              <div key={item.label}>
                <div className="d-flex justify-content-between mb-1">
                  <span>{item.label}</span>

                  <span className="text-body-secondary">
                    {item.value} ({formatPercentage(percentage)})
                  </span>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
