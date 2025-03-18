document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".product-card");

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const filterProducts = debounce(function () {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
            const description = card.querySelector(".card-text")?.textContent.toLowerCase() || "";
            const price = card.querySelector(".fs-5")?.textContent.toLowerCase() || "";

            if (title.includes(searchTerm) || description.includes(searchTerm) || price.includes(searchTerm)) {
                card.style.display = "";  // Show the card (default display)
            } else {
                card.style.display = "none";  // Hide the card
            }
        });
    }, 300);

    searchInput.addEventListener("input", filterProducts);
});