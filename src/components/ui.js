// Modal button

export function openModal() {
  document.getElementById('createModal').classList.remove('hidden')
  document.getElementById('modalOverlay').classList.remove('hidden')
}

export function closeModal() {
  document.getElementById('createModal').classList.add('hidden')
  document.getElementById('modalOverlay').classList.add('hidden')
}

export function createProject() {
  document.getElementById('createProject').classList.remove('hidden')
  document.getElementById('modalProject').classList.remove('hidden')
}

export function closeProject() {
  document.getElementById('createProject').classList.add('hidden')
  document.getElementById('modalProject').classList.add('hidden')
}

let selectedColor = ''

export function initColorPicker() {
  document.querySelectorAll('.color-circle').forEach((circle) => {
    circle.addEventListener('click', () => {
      document.querySelectorAll('.color-circle').forEach((c) => {
        c.classList.remove('ring-2', 'ring-gray-400')
      })

      selectedColor = circle.dataset.color
      circle.classList.add('ring-2', 'ring-gray-400')
    })
  })
}

export function getSelectedColor() {
  return selectedColor
}
