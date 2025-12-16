import { fillForm } from './utils.js'

export default function renderTask(taskManager, projectManager) {
  const taskList = document.getElementById('task')
  taskList.innerHTML = ''

  let floatingBtn = document.querySelector('.floating-add-btn')
  if (!floatingBtn) {
    floatingBtn = document.createElement('button')
    floatingBtn.className =
      'floating-add-btn fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 cursor-pointer'
    floatingBtn.setAttribute('data-open-task', '')
    floatingBtn.innerHTML = '<i class="fa-solid fa-plus"></i>'
    document.body.appendChild(floatingBtn)
  }

  if (taskManager.tasks.length === 0) {
    const div = document.createElement('div')
    div.className = 'absolute inset-0 flex flex-col items-center justify-center'
    div.innerHTML = `
      
        <div class="mt-[200px]" >
          <p class="text-gray-500 text-center mb-5">No tasks yet</p>
          <button
           data-open-task
            class="flex flex-col bg-blue-600 text-white rounded-md p-2 text-sm font-medium cursor-pointer hover:bg-blue-700"
          >
            <i class="fa-solid fa-plus text-gray-200"></i>
            Create your first task
          </button>
        </div>
       
       
    `
    taskList.appendChild(div)
  } else {
    taskManager.tasks.forEach((task) => {
      const card = document.createElement('div')

      const priorityBorder = {
        High: 'border-red-500',
        Medium: 'border-yellow-500',
        Low: 'border-gray-300',
      }

      const borderColor = priorityBorder[task.priority] || 'border-gray-300'

      const statusClasses = {
        done: 'bg-green-100 text-green-600',
        inProgress: 'bg-blue-100 text-blue-600',
        todo: 'bg-gray-100 text-gray-600',
      }

      const statusClass =
        statusClasses[task.status] || 'bg-gray-200 text-gray-700'

      card.className = `border-l-4 ${borderColor} m-2 p-2 bg-white shadow-sm rounded-md hover:shadow-lg`

      const project = projectManager.projects.find(
        (p) => p.name === task.project
      )

      const projectColor = project ? project.color : '#3b82f6'

      card.innerHTML = `
     <div class="flex justify-between">
                <p class="text-sm font-medium">${task.title}</p>
               
                <div class="flex gap-2">
                  <button
                    data-edit-task="${task.id}"
                    class="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
                    title="Edit task"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    data-delete-task="${task.id}"
                    class="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                    title="Delete task"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <p class="text-gray-700 text-xs">
                ${task.description || 'No description'}
              </p>

              <div class="flex gap-3 mt-5">
                <p
                  class="${statusClass} font-medium text-xs rounded-sm p-2"
                >
                  ${task.status}
                </p>
                <div class="flex gap-1 mt-1.5">
                  <i
                    class="fa-solid fa-circle text-xs mt-0.5"
                    style="color:${projectColor}"
                  ></i>
                  <span class="text-xs">${task.project}</span>
                </div>
              </div>
                 <button data-open-task class="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600
           text-white w-14 h-14 rounded-full shadow-lg
           flex items-center justify-center z-50 cursor-pointer">
          <i class="fa-solid fa-plus"></i>
        </button>
    `

      taskList.appendChild(card)

      //Delete
      card.querySelector('[data-delete-task]').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete ths task?')) {
          taskManager.deleteTask(task.id)
          renderTask(taskManager, projectManager)
        }
      })

      //Edit

      const editBtn = card.querySelector('[data-edit-task]')
      editBtn.addEventListener('click', () => {
        taskManager.editTask(task.id)
        fillForm(task)
        document.querySelector('[data-open-task]').click()
      })
    })
  }
}
