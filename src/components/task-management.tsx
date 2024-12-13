import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from 'react'

export function TaskManagement() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review patient files", completed: false },
    { id: 2, text: "Prepare for surgery", completed: true },
    { id: 3, text: "Update medical records", completed: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [taskIdCounter, setTaskIdCounter] = useState(4); // Initialize with a deterministic value

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: taskIdCounter, text: newTask, completed: false }])
      setNewTask("")
      setTaskIdCounter(taskIdCounter + 1); // Increment the counter
    }
  }

  interface Task {
    id: number
    text: string
    completed: boolean
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

