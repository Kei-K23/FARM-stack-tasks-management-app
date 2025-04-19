import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAuth } from "@/lib/auth";

interface PlanMutationDialogInput {
  title: string;
  description: string;
  user_id: string;
}

interface PlanMutationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const planMutationSchema = z.object({
  title: z.string({ required_error: "Title is required" }).trim(),
  description: z.string({ required_error: "Description is required" }).trim(),
  user_id: z.string({ required_error: "User id is required" }),
});

export function PlanMutationDialog({
  open,
  onOpenChange,
}: PlanMutationDialogProps) {
  const auth = useAuth();
  const queryclient = useQueryClient();
  const form = useForm<PlanMutationDialogInput>({
    resolver: zodResolver(planMutationSchema),
    defaultValues: {
      title: "",
      description: "",
      user_id: auth.user?._id,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: PlanMutationDialogInput) =>
      api.post("/api/v1/plans", data).then((res) => res),
    onSuccess: async () => {
      toast.success("New plan added");
      await queryclient.invalidateQueries({
        queryKey: ["plans", "include_all"],
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error?.message || "An error occurred");
    },
  });

  function onSubmit(data: PlanMutationDialogInput) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Plan</DialogTitle>
              <DialogDescription>
                Create a new plan for your board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        disabled={mutation.isPending}
                        placeholder="Learn Python"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        disabled={mutation.isPending}
                        placeholder="Learn Python for AI/ML"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Plan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
