import { Project } from './project.js'

export class ProjectManager {
  constructor() {
    this.projects = [
      { id: '1', name: 'Personal', color: '#3b82f6' },
      { id: '2', name: 'Work', color: '#a855f7' },
      { id: '3', name: 'Ideas', color: '#22c55e' },
    ]
  }

  addProject(name, color) {
    const id = Date.now().toString()
    const project = new Project(id, name, color)
    this.projects.push(project)
    return project
  }
}
