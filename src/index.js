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

function renderTask() {
  const taskList = document.getElementById('task')
  taskList.innerHTML = ''
  const createTasks = document.getElementById('createTasks')
  createTasks.innerHTML = ''

  if (taskManager.tasks.length === 0) {
    const div = document.createElement('div')
    div.className = 'flex flex-row justify-center justify-items-center'
    div.innerHTML = `
      
        <div class="mt-[100px]" id="createTasks">
          <p class="text-gray-500 text-center mb-5">No tasks yet</p>
          <button
            onclick="createProject()"
            class="flex flex-col bg-blue-600 text-white rounded-md p-2 text-sm font-medium cursor-pointer hover:bg-blue-700"
          >
            <i class="fa-solid fa-plus text-gray-200"></i>
            Create your first task
          </button>
        </div>
        <div class="">
              <div
                id="modalProject"
                class="hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              ></div>

              <div
                id="createProject"
                class="hidden fixed inset-0 flex items-center justify-center z-50"
              >
                <div
                  class="bg-white rounded-2xl shadow-xl w-[520px] p-6 relative"
                >
                  <div class="flex justify-between">
                    <h1 class="text- font-medium">Create Task</h1>
                    <button
                      onclick="closeProject()"
                      class="absolute right-4 top-6 cursor-pointer text-gray-400 hover:text-gray-500"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  <div class="border-t border-gray-200 mt-1"></div>

                  <div class="mt-5">
                    <label class="font-medium text-sm text-gray-700"
                      >Title</label
                    >
                    <input
                      type="text"
                      placeholder="Task title"
                      class="w-full mt-1 mb-4 px-3 py-2 border border-gray-200 outline-none rounded-lg focus:outline-none focus:ring-blue-300"
                    />
                  </div>

                  <div class="mt-2">
                    <label class="font-medium text-sm text-gray-700"
                      >Description</label
                    >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      placeholder="Task description (optional)"
                      class="w-full mt-1 mb-4 px-3 py-2 border border-gray-200 outline-none rounded-lg focus:outline-none focus:ring-blue-300"
                    ></textarea>
                  </div>

                  <div class="mt-2">
                    <label class="font-medium text-sm text-gray-700"
                      >Project</label
                    >
                    <select
                      name=""
                      id=""
                      class="w-full mt-1 mb-4 px-3 py-2 border border-gray-200 outline-none rounded-lg focus:outline-none focus:ring-blue-300"
                    >
                      <option value="">Personal</option>
                      <option value="">Work</option>
                      <option value="">Ideas</option>
                    </select>
                  </div>

                  <div class="mt-2">
                    <label class="font-medium text-sm text-gray-700"
                      >Status</label
                    >
                    <select
                      name=""
                      id=""
                      class="w-full mt-1 mb-4 px-3 py-2 border border-gray-200 outline-none rounded-lg focus:outline-none focus:ring-blue-300"
                    >
                      <option value="">To Do</option>
                      <option value="">In Progress</option>
                      <option value="">Done</option>
                    </select>
                  </div>

                  <div class="mt-2">
                    <label class="font-medium text-sm text-gray-700"
                      >Priority</label
                    >
                    <select
                      name=""
                      id=""
                      class="w-full mt-1 mb-4 px-3 py-2 border border-gray-200 outline-none rounded-lg focus:outline-none focus:ring-blue-300"
                    >
                      <option value="">Low</option>
                      <option value="">Medium</option>
                      <option value="">High</option>
                    </select>
                  </div>

                  <div class="flex justify-between mt-8">
                    <button
                      onclick="closeProject()"
                      class="w-1/2 mr-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      class="w-1/2 mr-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
       
    `
    createTasks.appendChild(div)
  } else {
    taskManager.tasks.forEach((task) => {
      const card = document.createElement('div')
      card.className =
        'border-l-4 border-red-500 m-2 p-3 bg-white shadow-sm rounded-md hover:shadow-lg'

      card.innerHTML = `
     <div class="flex justify-between">
                <p class="text-sm font-medium">${task.title}</p>
                <button class="text-sm text-gray-600 cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
              
              <span class="text-gray-700 text-xs">
                ${task.description}
              </span>

              <div class="flex gap-3 mt-5">
                <p
                  class="bg-gray-200 text-gray-700 font-medium text-xs rounded-sm p-2"
                >
                  ${task.status}
                </p>
                <div class="flex gap-1 mt-1.5">
                  <i
                    class="fa-solid fa-circle text-xs text-blue-500 mt-0.5"
                  ></i>
                  <span class="text-xs">${task.project}</span>
                </div>
              </div>
    `
      taskList.appendChild(card)
    })
  }
}

renderTask()
