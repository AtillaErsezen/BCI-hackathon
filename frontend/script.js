document.getElementById("action-button").addEventListener("click", function() {
    const imagesContainer = document.getElementById("images-container");
    imagesContainer.innerHTML = ""; // Clear any previous images

    // Array to store image URLs (use placeholder images)
    const imageUrls = [
        "images\\war.webp",
        "images\\action.webp",
        "images\\comedy.webp",
        "images\\crime.webp",
        "images\\drama.webp",
        "images\\fantasy.webp",
        "images\\horror.webp",
        "images\\romance.webp",
        "images\\sci-fi.webp",
        "images\\sports.webp"
    ];

    // Add images to the container
    imageUrls.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        imagesContainer.appendChild(img);
    });

    // Flash each image one by one quickly
    let currentIndex = 0;
    const images = document.querySelectorAll("#images-container img");

    const flashImagesQuickly = () => {
        if (currentIndex < images.length) {
            const img = images[currentIndex];
            img.style.display = "block"; // Show the current image

            // Flash quickly by toggling visibility
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                img.style.opacity = img.style.opacity === "1" ? "0" : "1";
                flashCount++;

                if (flashCount === 2) { // Toggle 4 times (2 flashes)
                    clearInterval(flashInterval);
                    img.style.display = "none"; // Hide the current image
                    currentIndex++;
                    flashImagesQuickly(); // Move to the next image immediately
                }
            }, 50); // Faster flashing speed (100ms for each flash)
        }
    };

    flashImagesQuickly();
});
