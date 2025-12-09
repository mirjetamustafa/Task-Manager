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

import { ProjectManager } from './components/projectManager.js'

const projectManager = new ProjectManager()
window.projectManager = projectManager

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
})

function renderProject() {
  const list = document.getElementById('projectsList')
  list.innerHTML = ''

  projectManager.projects.forEach((project) => {
    const btn = document.createElement('button')
    btn.className =
      'flex gap-2 p-2 cursor-pointer w-full hover:bg-gray-100 rounded-md'
    btn.innerHTML = `
      <i class="fa-solid fa-circle text-sm mt-1" style="color:${project.color}"></i>
      <span class="text-sm">${project.name}</span>
  `
    list.appendChild(btn)
  })
}
