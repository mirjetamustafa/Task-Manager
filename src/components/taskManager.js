import { Task } from './task.js'

export class TaskManager {
  constructor() {
    this.tasks = [
      {
        id: 1,
        title: 'Hello',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Work',
        status: 'todo',
        priority: 'Medium',
      },
      {
        id: 2,
        title: 'Hello',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Work',
        status: 'todo',
        priority: 'Medium',
      },
      {
        id: 3,
        title: 'Hello',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Work',
        status: 'todo',
        priority: 'Medium',
      },
      {
        id: 4,
        title: 'Hello',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Work',
        status: 'todo',
        priority: 'Medium',
      },
      {
        id: 5,
        title: 'Hello',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Work',
        status: 'todo',
        priority: 'Medium',
      },
      {
        id: 6,
        title: 'sdfs',
        description:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        project: 'Personal',
        status: 'in progress',
        priority: 'hight',
      },
    ]
  }

  addTask(title, descrption, project, status, priority) {
    const id = Date.now().toString()
    const task = new Task(id, title, descrption, project, status, priority)
    this.tasks.push(task)
    return task
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((prev) => prev.id !== id)
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) task.competed = !task.competed
  }

  search(keyword) {
    const regex = new RegExp(keyword, 'i')
    return this.tasks.filter((task) => regex.test(task.title))
  }
}
