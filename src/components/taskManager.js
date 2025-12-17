import { Task } from './task.js'

export class TaskManager {
  constructor() {
    this.tasks = []
    this.editingTaskId = null
  }

  // --------------- Create --------------------------
  addTask(title, descrption, project, status, priority) {
    const id = Date.now()
    const task = new Task(id, title, descrption, project, status, priority)
    this.tasks.push(task)
    return task
  }

  // --------------- Delete ---------------------------
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id)

    // if deeting task being edited
    if (this.editingTaskId === id) {
      this.editingTaskId = null
    }
  }

  // ------------- Edit ------------------
  editTask(id) {
    this.editingTaskId = id
  }

  getTaskToEdit() {
    return this.tasks.find((task) => task.id === this.editingTaskId)
  }

  updateTask(title, description, project, status, priority) {
    const task = this.getTaskToEdit()
    if (!task) return

    task.title = title
    task.description = description
    task.project = project
    task.status = status
    task.priority = priority

    // exit edit mode
    this.editingTaskId = null
  }

  // --------------- Search -------------------------
  search(keyword) {
    const regex = new RegExp(keyword, 'i')
    return this.tasks.filter((task) => regex.test(task.title))
  }
}
