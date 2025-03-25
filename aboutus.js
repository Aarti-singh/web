

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide video");
    let currentIndex = 1;
    const totalSlides = slideElements.length;

    // Clone first and last slides for smooth looping
    const firstClone = slideElements[0].parentElement.cloneNode(true);
    const lastClone = slideElements[totalSlides - 1].parentElement.cloneNode(true);
    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, slides.firstChild);

    // Adjust slides position after cloning
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelector(".next").addEventListener("click", () => moveSlide(1));
    document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));

    function moveSlide(step) {
        currentIndex += step;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        slides.style.transition = "transform 0.5s ease-in-out";
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;

        setTimeout(() => {
            if (currentIndex >= totalSlides + 1) {
                slides.style.transition = "none";
                currentIndex = 1;
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            } else if (currentIndex === 0) {
                slides.style.transition = "none";
                currentIndex = totalSlides;
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            playCurrentVideo();
        }, 500);
    }
}
