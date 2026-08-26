import useProspect from "../../prospect/hooks/useProspect";
import useCustomer from "../../customer/hooks/useCustomer";

const PACKAGE_LABELS: Record<string, string> = {
  lite: "Lite",
  signature: "Signature",
  dedicated: "Dedicated",
};

const useAnalytics = () => {
  const prospectManager = useProspect();
  const customerManager = useCustomer();

  const _analytics = () => {
    // Prospect
    const totalProspects = prospectManager.__items.length;

    const pendingProspects = prospectManager.__items.filter(
      (prospect) => prospect.status === "pending",
    ).length;

    const completedProspects = prospectManager.__items.filter(
      (prospect) => prospect.status === "completed",
    ).length;

    // Customer
    const totalCustomers = customerManager.__items.length;

    const activeCustomers = customerManager.__items.filter(
      (customer) => customer.status === "active",
    ).length;

    const blockedCustomers = customerManager.__items.filter(
      (customer) => customer.status === "blocked",
    ).length;

    // Conversion
    const conversionRate =
      totalProspects > 0 ? (completedProspects / totalProspects) * 100 : 0;

    // Package
    const packageIds = new Set([
      ...prospectManager.__items.map((prospect) => prospect.packageId),
      ...customerManager.__items.map((customer) => customer.packageId),
    ]);

    const packageRankings = Array.from(packageIds).map((packageId) => {
      const prospectsCount = prospectManager.__items.filter(
        (prospect) => prospect.packageId === packageId,
      ).length;

      const customersCount = customerManager.__items.filter(
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
      __overview: {
        totalProspects,
        completedProspects,
        conversionRate,
        totalCustomers,
        activeCustomers,
        blockedCustomers,
      },

      __prospectStatus: {
        pending: pendingProspects,
        completed: completedProspects,
      },

      __customerStatus: {
        active: activeCustomers,
        blocked: blockedCustomers,
      },

      __prospectRankings: prospectRankings,
      __customerRankings: customerRankings,
    };
  };

  return _analytics();
};

export default useAnalytics;
