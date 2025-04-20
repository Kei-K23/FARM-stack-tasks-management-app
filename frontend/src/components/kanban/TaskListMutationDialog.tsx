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
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";

interface TaskListMutationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan_id: string;
}

interface TaskListInput {
  title: string;
  description: string;
  plan_id: string;
}

const taskListSchema = z.object({
  title: z.string({ required_error: "Title is required" }).trim(),
  description: z.string({ required_error: "Description is required" }).trim(),
  plan_id: z.string({ required_error: "Plan id is required" }),
});

export function TaskListMutationDialog({
  open,
  onOpenChange,
  plan_id,
}: TaskListMutationDialogProps) {
  const queryclient = useQueryClient();
  const form = useForm<TaskListInput>({
    resolver: zodResolver(taskListSchema),
    defaultValues: {
      title: "",
      description: "",
      plan_id: plan_id,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TaskListInput) =>
      api.post(`/api/v1/plans/${plan_id}/task-lists`, data).then((res) => res),
    onSuccess: async () => {
      toast.success("New task list added");
      await queryclient.invalidateQueries({
        queryKey: ["plans", plan_id, "include_all"],
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error?.message || "An error occurred");
    },
  });

  function onSubmit(data: TaskListInput) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Task List</DialogTitle>
              <DialogDescription>
                Create a new task list for your board. Click save when you're
                done.
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
