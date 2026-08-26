import useProspect from "../../prospect/hooks/useProspect";
import useCustomer from "../../customer/hooks/useCustomer";

const PACKAGE_LABELS: Record<string, string> = {
  lite: "Lite",
  signature: "Signature",
  dedicated: "Dedicated",
};

const useAnalytics = () => {
  const { items: prospects } = useProspect();
  const { items: customers } = useCustomer();

  const analytics = () => {
    // Prospect
    const totalProspects = prospects.length;

    const pendingProspects = prospects.filter(
      (prospect) => prospect.status === "pending",
    ).length;

    const completedProspects = prospects.filter(
      (prospect) => prospect.status === "completed",
    ).length;

    // Customer
    const totalCustomers = customers.length;

    const activeCustomers = customers.filter(
      (customer) => customer.status === "active",
    ).length;

    const blockedCustomers = customers.filter(
      (customer) => customer.status === "blocked",
    ).length;

    // Conversion
    const conversionRate =
      totalProspects > 0 ? (completedProspects / totalProspects) * 100 : 0;

    // Package
    const packageIds = new Set([
      ...prospects.map((prospect) => prospect.packageId),
      ...customers.map((customer) => customer.packageId),
    ]);

    const packageRankings = Array.from(packageIds).map((packageId) => {
      const prospectsCount = prospects.filter(
        (prospect) => prospect.packageId === packageId,
      ).length;

      const customersCount = customers.filter(
        (customer) => customer.packageId === packageId,
      ).length;

      return {
        packageId,
        packageName: PACKAGE_LABELS[packageId] ?? packageId,
        prospects: prospectsCount,
        customers: customersCount,
      };
    });

    const prospectRankings = [...packageRankings].sort(
      (a, b) => b.prospects - a.prospects,
    );

    const customerRankings = [...packageRankings].sort(
      (a, b) => b.customers - a.customers,
    );

    return {
      overview: {
        totalProspects,
        completedProspects,
        conversionRate,
        totalCustomers,
        activeCustomers,
        blockedCustomers,
      },

      prospectStatus: {
        pending: pendingProspects,
        completed: completedProspects,
      },

      customerStatus: {
        active: activeCustomers,
        blocked: blockedCustomers,
      },

      prospectRankings,
      customerRankings,
    };
  };

  return analytics();
};

export default useAnalytics;
