import './main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

import {
  openModal,
  closeModal,
  createProject,
  closeProject,
  getSelectedColor,
  initColorPicker,
} from './components/ui.js'
import renderTask from './components/CreateTask.js'

import { ProjectManager } from './components/projectManager.js'
import { TaskManager } from './components/taskManager.js'

const projectManager = new ProjectManager()
window.projectManager = projectManager

const taskManager = new TaskManager()
window.taskManager = taskManager

window.openModal = openModal
window.closeModal = closeModal
window.createProject = createProject
window.closeProject = closeProject

renderProject()

// UI elements

const cretaeprojectBtn = document.querySelector(
  '#createModal button.bg-blue-500'
)
const projectNameInput = document.querySelector('#createModal input')

initColorPicker()

cretaeprojectBtn.addEventListener('click', () => {
  const projectName = projectNameInput.value.trim()
  const color = getSelectedColor()

  if (!projectName) return alert('Write roject name!')

  projectManager.addProject(projectName, color)
  renderProject()
  closeModal()
  projectNameInput.value = ''
  document.querySelectorAll('.color-circle').forEach((c) => {
    c.classList.remove('ring-2', 'ring-gray-400')
  })
})

function renderProject() {
  const list = document.getElementById('projectsList')
  list.innerHTML = ''

  projectManager.projects.forEach((project) => {
    const div = document.createElement('div')
    const btn = document.createElement('button')
    const btnIcon = document.createElement('button')
    div.className = 'flex justify-between hover:bg-gray-100 rounded-md'
    btn.className = 'flex gap-2 p-2 cursor-pointer w-full'
    btn.innerHTML = `
      <i class="fa-solid fa-circle text-sm mt-1" style="color:${project.color}"></i>
      <span class="text-sm">${project.name}</span>
  `

    btnIcon.className =
      'p-2 cursor-pointer hover:bg-gray-100 text-gray-600 rounded-md'

    btnIcon.innerHTML = `
      <i class="fa-solid fa-ellipsis-vertical"></i>
  `

    btnIcon.addEventListener('click', () => {
      div.remove()

      projectManager.deleteProject(project.id)
    })

    div.appendChild(btn)
    div.appendChild(btnIcon)

    list.appendChild(div)
  })
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-task]')) {
    createProject()
  }
})

renderTask(taskManager)
