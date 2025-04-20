import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ITask, Plan } from "@/lib/types";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import { KanbanTask } from "@/components/kanban/KanbanTask";
import { useParams } from "react-router";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TaskListMutationDialog } from "@/components/kanban/TaskListMutationDialog";

export default function TaskLists() {
  let { plan_id } = useParams();

  const { isLoading, data: plan } = useQuery<Plan>({
    queryKey: ["plans", plan_id, "include_all"],
    queryFn: async () => {
      const res = await api.get(`/api/v1/plans/${plan_id}?include_all=true`);
      return res?.data;
    },
    retry: false,
  });

  const [tasks, setTasks] = useState<ITask[]>(() => {
    // Try to load from localStorage on client side
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("kanban-tasks");
      if (savedTasks) {
        try {
          return JSON.parse(savedTasks);
        } catch (e) {
          console.error("Failed to parse saved tasks", e);
        }
      }
    }

    // Default tasks
    return [
      {
        _id: "task-1",
        title: "Research competitors",
        description: "Analyze top 5 competitors in the market",
        status: "todo",
        priority: "medium",
        assignee: "Alex",
      },
      {
        _id: "task-2",
        title: "Design homepage mockup",
        description: "Create wireframes for the new homepage",
        status: "in-progress",
        priority: "high",
        assignee: "Sam",
      },
      {
        _id: "task-3",
        title: "Fix navigation bug",
        description: "Mobile menu doesn't close when clicking outside",
        status: "review",
        priority: "high",
        assignee: "Taylor",
      },
      {
        _id: "task-4",
        title: "Update documentation",
        description: "Add new API endpoints to the docs",
        status: "done",
        priority: "low",
        assignee: "Jordan",
      },
    ];
  });
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeTaskId = active.id as string;
    const task = tasks.find((t) => t._id === activeTaskId);
    if (task) {
      setActiveTask(task);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active task
    const activeTask = tasks.find((task) => task._id === activeId);
    if (!activeTask) return;

    // Check if over a column
    const isOverColumn = plan?.task_lists?.some((col) => col._id === overId);
    if (isOverColumn) {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task._id === activeId) {
            return { ...task, status: overId };
          }
          return task;
        })
      );
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Find the tasks in the same column
    const activeTask = tasks.find((task) => task._id === activeId);
    if (!activeTask) return;

    // If over a task, reorder within the column
    const isOverTask = tasks.some((task) => task._id === overId);
    if (isOverTask) {
      const activeIndex = tasks.findIndex((task) => task._id === activeId);
      const overIndex = tasks.findIndex((task) => task._id === overId);

      // If tasks are in the same column, reorder them
      const overTask = tasks[overIndex];
      if (activeTask.status === overTask.status) {
        const newTasks = arrayMove(tasks, activeIndex, overIndex);
        setTasks(newTasks);
      }
    }
  }

  function handleAddTask(task: Omit<ITask, "_id">) {
    const newTask: ITask = {
      ...task,
      _id: `task-${Date.now()}`,
    };

    setTasks((prev) => [...prev, newTask]);
    setIsNewTaskDialogOpen(false);
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  }

  function handleEditTask(updatedTask: ITask) {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-xl font-semibold">{plan?.title}</h1>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task List
        </Button>
      </header>

      <main className="flex-1 overflow-x-auto p-4 md:p-6">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4">
            {plan?.task_lists?.map((taskList) => (
              <KanbanColumn
                key={taskList._id}
                column={taskList}
                tasks={taskList?.tasks?.filter(
                  (task) => task.task_list_id === taskList._id
                )}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? <KanbanTask task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      {plan_id && (
        <TaskListMutationDialog
          open={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
          plan_id={plan_id!}
        />
      )}
    </div>
  );
}
