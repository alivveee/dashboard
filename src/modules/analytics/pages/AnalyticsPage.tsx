import { Doughnut } from "react-chartjs-2";
import PackageRankingCard from "../components/PackageRankingCard";
import useAnalytics from "../hooks/useAnalytics";
import useChartTheme from "../../../shared/hooks/useChartTheme";

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
                      label: "Completed",
                      value: prospectStatus.completed,
                    },
                    {
                      label: "Pending",
                      value: prospectStatus.pending,
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
  const chartTheme = useChartTheme();

  const data = {
    labels: items.map((item) => item.label),
    datasets: [
      {
        data: items.map((item) => item.value),
        backgroundColor: [chartTheme.slot1, chartTheme.slot2],
        borderColor: chartTheme.surface,
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="card border bg-body-tertiary rounded-3 h-100">
      <div className="card-body">
        <h3 className="h6 mb-4">{title}</h3>

        <div style={{ height: 220 }}>
          <Doughnut
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { color: chartTheme.text, usePointStyle: true },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const value = context.parsed;
                      const total = (context.dataset.data as number[]).reduce(
                        (sum, item) => sum + item,
                        0,
                      );
                      const percentage = total > 0 ? (value / total) * 100 : 0;

                      return `${context.label}: ${value} (${formatPercentage(percentage)})`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
