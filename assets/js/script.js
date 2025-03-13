document.addEventListener('DOMContentLoaded', () => {
    // Select all slides in the carousel
    const carouselItems = document.querySelectorAll('.slide');

    // Get the next and previous buttons
    const nextBtn = document.getElementById('nxt-slide');
    const prevBtn = document.getElementById('prev-slide');

    // Track the index of the currently active slide
    let currentIndex = 0;

    // List of background images corresponding to each slide
    const backgroundImages = [
        'url("../assets/images/shareanywheremain.webp")',
        'url("../assets/images/hotspotmain.webp")',
        'url("../assets/images/immersivemain.webp")',
        'url("../assets/images/librarymain.webp")',
        'url("../assets/images/360degreemain.webp")',
        'url("../assets/images/ARanimmain.webp")',
        'url("../assets/images/3danimain.webp")',
        'url("../assets/images/2danimmain.webp")',
        'url("../assets/images/brandidentitymain.webp")',
        'url("../assets/images/Productselectionmain.webp")',
    ];

    // Function to update the carousel display
    const updateCarousel = () => {
        carouselItems.forEach((item, index) => {
            item.style.transitionDelay = ''; // Reset transition delay
            item.style = ''; // Reset styles

            // Set styles for the current (centered) slide
            if (index === currentIndex) {
                item.style.transform = 'translate(0, 0) scale(1) rotate(0)';
                item.style.zIndex = '3'; // Bring it to the front
            }
            // Set styles for the previous slide (left position)
            else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.style.transform = 'translateX(-22%) rotate3d(0, 1, -0.06, 48deg) scale(0.9)';
                item.style.zIndex = '2';
            }
            // Set styles for the next slide (right position)
            else if (index === (currentIndex + 1) % carouselItems.length) {
                item.style.transform = 'translateX(22%) rotate3d(0, 1, 0.06, 48deg) scale(0.9)';
                item.style.zIndex = '2';
            }
            // Set styles for the second previous slide (further left)
            else if (index === (currentIndex - 2 + carouselItems.length) % carouselItems.length) {
                item.style.transform = 'translateX(-33%) translateY(1%) rotate3d(0, 1, -0.09, 58deg) scale(0.8)';
                item.style.zIndex = '1';
            }
            // Set styles for the second next slide (further right)
            else if (index === (currentIndex + 2) % carouselItems.length) {
                item.style.transform = 'translateX(33%) translateY(1%) rotate3d(0, 1, 0.09, 58deg) scale(0.8)';
                item.style.zIndex = '1';
            }
        });

        // Update the background image of the carousel
        const backgroundImageElement = document.querySelector('.background-image');
        backgroundImageElement.style.backgroundImage = backgroundImages[currentIndex];
    };

    // Function to move to the next slide
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % carouselItems.length; // Increment index, loop back if needed
        updateCarousel(); // Update the carousel and background image
    };

    // Function to move to the previous slide
    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Decrement index, loop back if needed
        updateCarousel(); // Update the carousel and background image
    };

    // Event listener for the next button click
    nextBtn.addEventListener('click', () => {
        nextSlide(); // Move to the next slide
    });

    // Event listener for the previous button click
    prevBtn.addEventListener('click', () => {
        prevSlide(); // Move to the previous slide
    });

    // Drag functionality
    let startX = 0;
    let isDragging = false;

    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        let diff = e.clientX - startX;

        if (diff > 50) {
            prevSlide(); // Dragged right, go to previous slide
        } else if (diff < -50) {
            nextSlide(); // Dragged left, go to next slide
        }
    });

    updateCarousel(); // Initialize the carousel with the first slide and background image
});
