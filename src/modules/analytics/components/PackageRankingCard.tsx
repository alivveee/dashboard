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
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h2 className="h5 mb-4">{title}</h2>

        <div className="d-flex flex-column gap-3">
          {items.map((item, index) => (
            <div
              key={item.packageId}
              className="d-flex align-items-center gap-3"
            >
              <span className="fw-bold text-body-secondary">#{index + 1}</span>

              <div className="flex-grow-1">
                <div className="fw-medium">{item.packageName}</div>

                <div className="text-body-secondary small">
                  {item[type]}{" "}
                  {type === "prospects" ? "prospects" : "customers"}
                </div>
              </div>

              <span className="badge text-bg-light">{item[type]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageRankingCard;
