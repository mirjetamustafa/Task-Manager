export function fillForm(task) {
  document.getElementById('taskTitle').value = task.title
  document.getElementById('taskDescription').value = task.description || ''
  document.getElementById('taskProject').value = task.project
  document.getElementById('taskStatus').value = task.status
  document.getElementById('taskPriority').value = task.priority

  document.getElementById('createTaskBtn').textContent = 'Update Task'
}
