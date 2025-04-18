import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KanbanTaskProps {
  task: Task;
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Card className="group cursor-grab border shadow-sm">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {task.description && (
          <p className="mb-2 text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              priorityColors[task.priority as keyof typeof priorityColors]
            )}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {task.assignee.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
