import { Task } from './task.js'

export class TaskManager {
  constructor() {
    this.tasks = []
  }

  addTask(title, descrption, project, status, priority) {
    const id = Date.now()
    const task = new Task(id, title, descrption, project, status, priority)
    this.tasks.push(task)
    return task
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((prev) => prev.id !== id)
  }

  editTask(id) {
    this.editingTaskId = id
  }

  getTaskToEdit() {
    return this.tasks.find((task) => task.id === this.editingTaskId)
  }

  updateTask(title, descrption, project, status, priority) {
    const task = this.getTaskToEdit()
    if (!task) return

    task.title = title
    task.descrption = descrption
    task.project = project
    task.status = status
    task.priority = priority

    this.editingTaskId = null
  }

  search(keyword) {
    const regex = new RegExp(keyword, 'i')
    return this.tasks.filter((task) => regex.test(task.title))
  }
}
