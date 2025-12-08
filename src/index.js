import './main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

// Modal button

window.openModal = function () {
  document.getElementById('createModal').classList.remove('hidden')
  document.getElementById('modalOverlay').classList.remove('hidden')
}

window.closeModal = function () {
  document.getElementById('createModal').classList.add('hidden')
  document.getElementById('modalOverlay').classList.add('hidden')
}

const circles = document.querySelectorAll('.color-circle')

circles.forEach((circle) => {
  circle.addEventListener('click', () => {
    circles.forEach((c) => c.classList.remove())

    circle.classList.add('selected')
  })
})

// End Modal button
