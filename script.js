// Add interactivity if needed in the future
console.log("Navbar Loaded Successfully");


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

    function playCurrentVideo() {
        // Pause all videos first
        slideElements.forEach(video => {
            video.pause();
            video.currentTime = 0; // Reset video to start
        });

        // Get the currently visible video and play it
        const currentVideo = slideElements[currentIndex - 1]; // Adjust for cloned slides
        if (currentVideo) {
            currentVideo.play();
        }
    }

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => moveSlide(1), 5000);

    // Prevent auto-slide pause on hover
    document.querySelector(".video-section").addEventListener("mouseenter", () => clearInterval(autoSlide));
    document.querySelector(".video-section").addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => moveSlide(1), 5000);
    });

    // Ensure all videos are muted, and the first video starts playing
    slideElements.forEach(video => {
        video.muted = true; // Autoplay restrictions require mute
        video.play();
    });
});


//contact us

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (firstName && lastName && contactNumber && email && message) {
        alert(`Thank you, ${firstName}! Your message has been sent.`);
        this.reset(); // Reset form fields
    } else {
        alert("Please fill in all fields.");
    }
});

