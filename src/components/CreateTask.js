export default function renderTask() {
  const taskList = document.getElementById('task')
  taskList.innerHTML = ''
  const createTasks = document.getElementById('createTasks')

  if (taskManager.tasks.length === 0) {
    const div = document.createElement('div')
    div.className = 'flex flex-row justify-center justify-items-center'
    div.innerHTML = `
      
        <div class="mt-[100px]" id="createTasks">
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
    createTasks.appendChild(div)
  } else {
    taskManager.tasks.forEach((task) => {
      const card = document.createElement('div')

      card.className =
        'border-l-4 border-red-500 m-2 p-2 bg-white shadow-sm rounded-md hover:shadow-lg'

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
                 <button data-open-task class="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600
           text-white w-14 h-14 rounded-full shadow-lg
           flex items-center justify-center z-50 cursor-pointer">
          <i class="fa-solid fa-plus"></i>
        </button>
    `

      taskList.appendChild(card)
    })
  }
}
