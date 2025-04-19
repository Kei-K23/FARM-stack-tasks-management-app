import { PlanCard } from "@/components/home/PlanCard";
import SummaryCardsContainer from "@/components/home/SummaryCardsContainer";
import api from "@/lib/axios";
import { Plan } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, data: plans } = useQuery<Plan[]>({
    queryKey: ["plans", "include_all"],
    queryFn: async () => {
      const res = await api.get("/api/v1/plans?include_all=true");
      return res?.data?.data;
    },
    retry: false,
  });

  return (
    <div className="container mx-auto">
      <SummaryCardsContainer />
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          plans?.map((plan) => <PlanCard key={plan._id} plan={plan} />)
        )}
      </div>
    </div>
  );
}
