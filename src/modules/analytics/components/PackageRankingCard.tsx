import { Bar } from "react-chartjs-2";
import useChartTheme from "../../../shared/hooks/useChartTheme";

interface PackageRanking {
  packageId: string;
  packageName: string;
  prospects: number;
  customers: number;
}

interface PackageRankingCardProps {
  title: string;
  items: PackageRanking[];
  type: "prospects" | "customers";
}

const PackageRankingCard = ({
  title,
  items,
  type,
}: PackageRankingCardProps) => {
  const chartTheme = useChartTheme();

  const data = {
    labels: items.map((item) => item.packageName),
    datasets: [
      {
        label: type === "prospects" ? "Prospects" : "Customers",
        data: items.map((item) => item[type]),
        backgroundColor: chartTheme.slot1,
        borderRadius: 4,
        maxBarThickness: 24,
      },
    ],
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h2 className="h5 mb-4">{title}</h2>

        <div style={{ height: Math.max(160, items.length * 56) }}>
          <Bar
            data={data}
            options={{
              indexAxis: "y",
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: { color: chartTheme.muted, precision: 0 },
                  grid: { color: chartTheme.grid },
                },
                y: {
                  ticks: { color: chartTheme.text },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageRankingCard;
