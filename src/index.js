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

import renderTasks from './components/CreateTask.js'
import { ProjectManager } from './components/projectManager.js'
import { TaskManager } from './components/taskManager.js'

let activeProject = 'All'

const projectManager = new ProjectManager()
const taskManager = new TaskManager()

window.projectManager = projectManager
window.taskManager = taskManager
window.openModal = openModal
window.closeModal = closeModal
window.createProject = createProject
window.closeProject = closeProject

// ------------------ Projects---------------------------

renderProject()
initColorPicker()

const cretaeprojectBtn = document.querySelector(
  '#createModal button.bg-blue-500'
)
const projectNameInput = document.querySelector('#createModal input')

cretaeprojectBtn.addEventListener('click', () => {
  const projectName = projectNameInput.value.trim()
  const color = getSelectedColor()

  if (!projectName) return alert('Write project name!')

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
    div.className = 'flex justify-between hover:bg-gray-100 rounded-md'

    const btn = document.createElement('button')
    btn.className = 'flex gap-2 p-2 cursor-pointer w-full'
    btn.innerHTML = `
      <i class="fa-solid fa-circle text-sm mt-1" style="color:${project.color}"></i>
      <span class="text-sm">${project.name}</span>
  `
    btn.addEventListener('click', () => {
      activeProject = project.name
      renderTasks(taskManager, projectManager, activeProject)
    })

    const btnIcon = document.createElement('button')
    btnIcon.className =
      'p-2 cursor-pointer hover:bg-gray-100 text-gray-600 rounded-md'
    btnIcon.innerHTML = `
      <i class="fa-solid fa-ellipsis-vertical"></i>
  `

    btnIcon.addEventListener('click', () => {
      // div.remove()

      projectManager.deleteProject(project.id)
      if (activeProject === project.name) activeProject = 'All'
      renderProject()
      renderTasks(taskManager, projectManager, activeProject)
    })

    div.appendChild(btn)
    div.appendChild(btnIcon)
    list.appendChild(div)
  })
}

// ----------------------- All Tasks Button ------------------------

document.getElementById('allTasksBtn').addEventListener('click', () => {
  activeProject = 'All'
  renderTasks(taskManager, projectManager, activeProject)
})

// ---------------------- Floating Add Button (One time) --------------------

const floatingBtn = document.createElement('button')
floatingBtn.setAttribute('data-open-task', '')
floatingBtn.className =
  'fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 cursor-pointer'
floatingBtn.innerHTML = '<i class="fa-solid fa-plus"></i>'
document.body.appendChild(floatingBtn)

// ---------------- Task Modal --------------------------

function renderProjectOptions() {
  const select = document.getElementById('taskProject')
  select.innerHTML = ''

  projectManager.projects.forEach((project) => {
    const option = document.createElement('option')
    option.value = project.name
    option.textContent = project.name
    select.appendChild(option)
  })
}

// open task modal
// works for floating button + empty state button

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-task]')) {
    renderProjectOptions()
    createProject()
  }
})

// -------------------- Create / Update Task -----------------------
const tasksBtn = document.getElementById('createTaskBtn')

tasksBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim()
  const description = document.getElementById('taskDescription').value
  const project = document.getElementById('taskProject').value
  const status = document.getElementById('taskStatus').value
  const priority = document.getElementById('taskPriority').value

  if (!title) {
    alert('This is required')
    return
  }
  if (taskManager.editingTaskId) {
    // Update
    taskManager.updateTask(title, description, project, status, priority)
    document.getElementById('createTaskBtn').textContent = 'Create'
  } else {
    // Create
    taskManager.addTask(title, description, project, status, priority)
  }

  renderTasks(taskManager, projectManager, activeProject)
  closeProject()

  // reset form
  document.getElementById('taskTitle').value = ''
  document.getElementById('taskDescription').value = ''
})

// ----------- Initial Render ------------------------
renderTasks(taskManager, projectManager, activeProject)
