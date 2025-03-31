// Contagem regressiva
function atualizarContagem() {
    const eventoData = new Date("April 21, 2025 00:00:00").getTime();
    const agora = new Date().getTime();
    const diferenca = eventoData - agora;

    if (diferenca < 0) {
        document.querySelectorAll(".relogio-valor").forEach(el => {
            el.textContent = "00";
        });
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    const valores = document.querySelectorAll(".relogio-valor");
    valores[0].textContent = String(dias).padStart(2, '0');
    valores[1].textContent = String(horas).padStart(2, '0');
    valores[2].textContent = String(minutos).padStart(2, '0');
    valores[3].textContent = String(segundos).padStart(2, '0');
}

// Carrossel
function setupCarrossel() {
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let intervalId;
    
    function startCarousel() {
        intervalId = setInterval(nextSlide, 5000);
    }
    
    function stopCarousel() {
        clearInterval(intervalId);
    }
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicadores.forEach(ind => ind.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        indicadores[currentIndex].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
        stopCarousel();
        nextSlide();
        startCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        stopCarousel();
        prevSlide();
        startCarousel();
    });
    
    // Indicadores clicáveis
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', function() {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });
    
    // Inicia o carrossel
    startCarousel();
    
    // Pausa quando o mouse está sobre o carrossel
    document.querySelector('.carrossel-container').addEventListener('mouseenter', stopCarousel);
    document.querySelector('.carrossel-container').addEventListener('mouseleave', startCarousel);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicia a contagem regressiva
    setInterval(atualizarContagem, 1000);
    atualizarContagem();
    
    // Configura o carrossel
    setupCarrossel();
});