import { useMemo, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import type { ITask, TaskStatus } from "@/lib/types";
import { KanbanTaskItem } from "./KanbanTaskItem";
import { TaskMutationDialog } from "./TaskMutationDialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface KanbanColumnProps {
  column: TaskStatus;
  tasks: ITask[];
  plan_id: string;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: ITask) => void;
}

export function KanbanColumn({
  column,
  tasks,
  plan_id,
  onDeleteTask,
  onEditTask,
}: KanbanColumnProps) {
  // Column = Task List
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
  });
  const [open, setOpen] = useState(false);
  const taskIds = useMemo(() => tasks.map((task) => task._id), [tasks]);

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn(
          "flex h-full w-72 shrink-0 flex-col rounded-lg bg-gray-100/80 p-2",
          isOver && "ring-2 ring-blue-500/50"
        )}
      >
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-x-3">
            <h3 className="font-medium">{column.title}</h3>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">
              {tasks.length}
            </span>
          </div>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusCircle />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <KanbanTaskItem
                key={task._id}
                task={task}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
      <TaskMutationDialog
        task_list_id={column._id}
        plan_id={plan_id}
        onOpenChange={setOpen}
        open={open}
      />
    </>
  );
}
