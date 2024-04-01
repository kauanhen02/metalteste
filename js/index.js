// index.js

import Router from "./router.js"

const router = new Router()
router.add("/", "./pages/home.html")
router.add("/about", "./pages/about.html")
router.add("/contact", "./pages/contact.html")
router.add("/contato", "./pages/contato.html")
router.add(404, "./pages/404.html")

router.handle()

window.onpopstate = () => {
  router.handle()
  saveState()
}
window.route = (event) => {
  router.route(event)
  saveState()
}

document.addEventListener("DOMContentLoaded", function () {
  const sliderImages = document.querySelectorAll(".slider-image")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  // Função para mostrar a imagem atual
  function showCurrentSlide() {
    sliderImages.forEach((image, index) => {
      if (index === currentIndex) {
        image.classList.add("current")
      } else {
        image.classList.remove("current")
      }
    })
  }

  // Função para mostrar a próxima imagem
  function showNextSlide() {
    currentIndex = (currentIndex + 1) % sliderImages.length
    showCurrentSlide()
  }

  // Função para mostrar a imagem anterior
  function showPrevSlide() {
    currentIndex =
      currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1
    showCurrentSlide()
  }

  // Adiciona eventos de clique aos botões de navegação
  prevBtn.addEventListener("click", () => {
    showPrevSlide()
    saveState()
  })
  nextBtn.addEventListener("click", () => {
    showNextSlide()
    saveState()
  })

  // Mostra a primeira imagem ao carregar a página
  showCurrentSlide()
})

// Função para salvar o estado da aplicação no armazenamento local
function saveState() {
  const currentState = {
    path: window.location.pathname,
    currentIndex: currentIndex,
  }
  localStorage.setItem("appState", JSON.stringify(currentState))
}

// Função para carregar o estado da aplicação do armazenamento local
function loadState() {
  const savedState = localStorage.getItem("appState")
  if (savedState) {
    const parsedState = JSON.parse(savedState)
    window.location.pathname = parsedState.path
    currentIndex = parsedState.currentIndex
  }
}

// Carrega o estado da aplicação quando a página é carregada
loadState()
