const DEBUG = true;
const boton = document.querySelector(".Boton");
const sonido = document.getElementById("clickSound");

function debugLog(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

boton.addEventListener("click", function() {
    sonido.currentTime = 0; 
    sonido.onvolumechange = 100;
    sonido.play();
});


debugLog("Page Loaded correctly")
debugLog("By: Carlos Hernandez")
debugLog("El Bosque University")

document.addEventListener("DOMContentLoaded", function () {
    debugLog("JS cargado");
    let currentSlide = 0;
    const bgMusic = document.getElementById("bgMusic");
    const slides = document.querySelectorAll(".slide");
    const startBtn = document.getElementById("startBtn");
    const nextButtons = document.querySelectorAll(".nextBoton");
    const prevButtons = document.querySelectorAll(".prevBoton");
    const lastButtons = document.querySelectorAll(".goLast");
    const clickSlides = document.querySelectorAll(".slide-click-nav");

    startBtn.addEventListener("click", () => {
        bgMusic.volume = 0.1;
        bgMusic.play().then(() => {
            debugLog("Música iniciada");
        }).catch(err => {
            debugLog("Error al reproducir:", err);
        });

        goToSlide(1);
    });

    clickSlides.forEach(slide => {
        slide.addEventListener("click", (e) => {

            if (e.target.closest("button")) return;

            const rect = slide.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const slideWidth = rect.width;

            const deadZonePercent = 0.05;
            const deadZoneSize = slideWidth * deadZonePercent;
            const deadZoneStart = (slideWidth / 2) - (deadZoneSize / 2);
            const deadZoneEnd = (slideWidth / 2) + (deadZoneSize / 2);

            if (clickX >= deadZoneStart && clickX <= deadZoneEnd) {
                return;
            }

            if (clickX > slideWidth / 2) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }

        });
    });

    function goToSlide(index) {

        if (index < 0 || index >= slides.length) return;

        document.querySelector(".slide.active").classList.remove("active");
        slides[index].classList.add("active");
        currentSlide = index;
    }

    startBtn.addEventListener("click", () => {
        debugLog("Start clicked");
        goToSlide(1);
    });

    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
        });
    });

    prevButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
        });
    });

    lastButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            goToSlide(slides.length - 1);
        });
    });
});

