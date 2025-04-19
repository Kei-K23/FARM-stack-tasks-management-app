import { PlanCard } from "@/components/home/PlanCard";
import { PlanMutationDialog } from "@/components/home/PlanMutationDialog";
import SummaryCardsContainer from "@/components/home/SummaryCardsContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import { Plan } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const { isLoading, data: plans } = useQuery<Plan[]>({
    queryKey: ["plans", "include_all"],
    queryFn: async () => {
      const res = await api.get("/api/v1/plans?include_all=true");
      return res?.data?.data;
    },
    retry: false,
  });

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="mb-5">
          <div>
            <h1 className="text-3xl font-bold">
              Hello, {auth.user?.username} 👋
            </h1>
            <p className="text-muted-foreground">Welcome from Task-Tasks</p>
          </div>
        </div>
        <SummaryCardsContainer />
        <div className="space-y-4 mt-5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-semibold">Your Plans</h2>
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              <PlusCircle /> Create New Plan
            </Button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            plans?.map((plan) => <PlanCard key={plan._id} plan={plan} />)
          )}
        </div>
      </div>
      <PlanMutationDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
