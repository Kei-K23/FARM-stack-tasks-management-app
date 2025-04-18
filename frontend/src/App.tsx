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
import { NewTaskDialog } from "@/components/new-task-dialog";
import type { Task, TaskStatus } from "@/lib/types";
import { KanbanColumn } from "./components/kanban/kanban-column";
import { KanbanTask } from "./components/kanban/kanban-task";

export default function App() {
  const [columns] = useState<TaskStatus[]>([
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ]);

  const [tasks, setTasks] = useState<Task[]>(() => {
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
        id: "task-1",
        title: "Research competitors",
        description: "Analyze top 5 competitors in the market",
        status: "todo",
        priority: "medium",
        assignee: "Alex",
      },
      {
        id: "task-2",
        title: "Design homepage mockup",
        description: "Create wireframes for the new homepage",
        status: "in-progress",
        priority: "high",
        assignee: "Sam",
      },
      {
        id: "task-3",
        title: "Fix navigation bug",
        description: "Mobile menu doesn't close when clicking outside",
        status: "review",
        priority: "high",
        assignee: "Taylor",
      },
      {
        id: "task-4",
        title: "Update documentation",
        description: "Add new API endpoints to the docs",
        status: "done",
        priority: "low",
        assignee: "Jordan",
      },
    ];
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  // Save tasks to localStorage whenever they change
  useState(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }
  });

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
    const task = tasks.find((t) => t.id === activeTaskId);
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
    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Check if over a column
    const isOverColumn = columns.some((col) => col.id === overId);
    if (isOverColumn) {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === activeId) {
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
    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // If over a task, reorder within the column
    const isOverTask = tasks.some((task) => task.id === overId);
    if (isOverTask) {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      const overIndex = tasks.findIndex((task) => task.id === overId);

      // If tasks are in the same column, reorder them
      const overTask = tasks[overIndex];
      if (activeTask.status === overTask.status) {
        const newTasks = arrayMove(tasks, activeIndex, overIndex);
        setTasks(newTasks);
      }
    }
  }

  function handleAddTask(task: Omit<Task, "id">) {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
    };

    setTasks((prev) => [...prev, newTask]);
    setIsNewTaskDialogOpen(false);
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function handleEditTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-xl font-semibold">Kanban Board</h1>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
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
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
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

      <NewTaskDialog
        open={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
        onAddTask={handleAddTask}
        columns={columns}
      />
    </div>
  );
}
