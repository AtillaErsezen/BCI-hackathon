document.getElementById("action-button").addEventListener("click", function() {
    const imagesContainer = document.getElementById("images-container");
    imagesContainer.innerHTML = ""; // Clear any previous images

    // Array to store image URLs (use placeholder images)
    const imageUrls = [
        "static/images/war.webp",
        "static/images/action.webp",
        "static/images/comedy.webp",
        "static/images/crime.webp",
        "static/images/drama.webp",
        "static/images/fantasy.webp",
        "static/images/horror.webp",
        "static/images/romance.webp",
        "static/images/sci-fi.webp",
        "static/images/sports.webp"
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
            }, 400); // Faster flashing speed (100ms for each flash)
        }
    };

    flashImagesQuickly();
});
