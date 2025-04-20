import type React from "react";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TaskList } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface TaskListMutationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: TaskList[];
  isLoadingColumns: boolean;
}

export function TaskListMutationDialog({
  open,
  onOpenChange,
  columns,
  isLoadingColumns,
}: TaskListMutationDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  const [openStatusCombobox, setOpenStatusCombobox] = useState(false);
  const [openPriorityCombobox, setOpenPriorityCombobox] = useState(false);

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for your board. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Popover
                  open={openStatusCombobox}
                  onOpenChange={setOpenStatusCombobox}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openStatusCombobox}
                      className="justify-between"
                    >
                      {isLoadingColumns ? (
                        <p>Loading...</p>
                      ) : status ? (
                        columns?.find?.((column) => column._id === status)
                          ?.title
                      ) : (
                        "Select status"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search status..." />
                      <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                          {isLoadingColumns ? (
                            <p>Loading...</p>
                          ) : (
                            columns?.map?.((column) => (
                              <CommandItem
                                key={column._id}
                                value={column._id}
                                onSelect={(currentValue) => {
                                  setStatus(currentValue);
                                  setOpenStatusCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    status === column._id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {column.title}
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Popover
                  open={openPriorityCombobox}
                  onOpenChange={setOpenPriorityCombobox}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPriorityCombobox}
                      className="justify-between"
                    >
                      {priority
                        ? priorities.find((p) => p.value === priority)?.label
                        : "Select priority"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search priority..." />
                      <CommandList>
                        <CommandEmpty>No priority found.</CommandEmpty>
                        <CommandGroup>
                          {priorities.map((p) => (
                            <CommandItem
                              key={p.value}
                              value={p.value}
                              onSelect={(currentValue) => {
                                setPriority(currentValue);
                                setOpenPriorityCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  priority === p.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {p.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
