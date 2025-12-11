export class Task {
  constructor(
    id,
    title,
    description,
    project,
    status,
    priority,
    completed = false
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.project = project
    this.status = status
    this.priority = priority
    this.completed = completed
  }
}
