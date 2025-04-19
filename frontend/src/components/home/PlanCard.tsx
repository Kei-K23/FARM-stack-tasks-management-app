import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Plan } from "@/lib/types";
import { Link } from "react-router";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Calculate completion rate
  const totalTasks = plan?.task_lists?.length;
  const completedTasks = 30;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate tasks by status
  //   const tasksByStatus = {
  //     TO_DO: taskList.tasks.filter((task) => task.status === "TO_DO").length,
  //     IN_PROGRESS: taskList.tasks.filter((task) => task.status === "IN_PROGRESS")
  //       .length,
  //     REVIEW: taskList.tasks.filter((task) => task.status === "REVIEW").length,
  //     DONE: completedTasks,
  //   };
  const tasksByStatus = {
    TO_DO: 2,
    IN_PROGRESS: 3,
    REVIEW: 4,
    DONE: completedTasks,
  };

  // Calculate tasks by priority
  //   const tasksByPriority = {
  //     LOW: taskList.tasks.filter((task) => task.priority === "LOW").length,
  //     MEDIUM: taskList.tasks.filter((task) => task.priority === "MEDIUM").length,
  //     HIGH: taskList.tasks.filter((task) => task.priority === "HIGH").length,
  //   };
  const tasksByPriority = {
    LOW: 5,
    MEDIUM: 2,
    HIGH: 1,
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{plan.title}</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle details</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Task List</DropdownMenuItem>
                <DropdownMenuItem>Add Task</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription className="text-xs">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total: {totalTasks} tasks</span>
            <span>
              Updated: {new Date(plan.updated_at).toLocaleDateString()}
            </span>
          </div>

          {expanded && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Status Breakdown</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>To Do</span>
                    <Badge variant="outline">{tasksByStatus.TO_DO}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>In Progress</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {tasksByStatus.IN_PROGRESS}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Review</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      {tasksByStatus.REVIEW}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Done</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {tasksByStatus.DONE}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Priority Breakdown</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Low</span>
                    <Badge variant="secondary">{tasksByPriority.LOW}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium</span>
                    <Badge>{tasksByPriority.MEDIUM}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High</span>
                    <Badge variant="destructive">{tasksByPriority.HIGH}</Badge>
                  </div>
                </div>
              </div>

              <Link to={`/${plan._id}/task-lists`}>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Tasks
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
