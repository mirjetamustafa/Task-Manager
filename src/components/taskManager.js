import { Task } from './task.js'

export class TaskManager {
  constructor() {
    this.tasks = []
  }

  addTask(title, descrption) {
    const id = Date.now().toString()
    const task = new Task(id, title, descrption)
    this.tasks.push(task)
    return task
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((prev) => prev.id !== id)
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
  }

  search(keyword) {
    const regex = new RegExp(keyword, 'i')
    return this.addTask.tasks.filter((task) => regex.test(task.title))
  }
}
