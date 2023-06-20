// Make sure the Document is done loading before running the function generateItems()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        generateBriefItems();
        generateFeaturedItems();
    });
} else {
    generateBriefItems();
    generateFeaturedItems();
}


// #New -- Brief Presentation Items
function generateBriefItems() {
    // Select the div where all items will be generated / appended
    const containerNewItems = document.getElementById("newItemsContainer");

    // Fetching from .json file
    fetch("../e.commerce.website/items/briefItems.json")
        .then(response => response.json())
        .then(parsedItems => {
            // Looping through the items array and creating the necessary elements
            parsedItems.forEach((item) => {
                // Create a div with bootstrap classes
                // where the img + div.details will be appended
                const itemDivBootstrap = document.createElement("div");
                itemDivBootstrap.classList.add("one", "col-lg-4", "col-md-12", "col-12", "px-3");

                // Create an img element 
                const itemImg = document.createElement("img");
                itemImg.classList.add("img-fluid");
                itemImg.src = item.image;
                itemImg.alt = "error";

                // Create a div.details where the 
                // h2/title + button will be appended
                const divDetails = document.createElement("div");
                divDetails.classList.add("details");

                // Create a h2 for item's title
                const itemTitle = document.createElement("h2");
                itemTitle.textContent = item.title;

                // Create a button with click event
                const itemButton = document.createElement("button");
                itemButton.classList.add("text-uppercase");
                itemButton.textContent = "Shop Now";
                itemButton.addEventListener("click", () => {
                    window.location.href = item.link;
                });

                // Appending h2/title + button to div.details
                divDetails.appendChild(itemTitle);
                divDetails.appendChild(itemButton);

                // Appending img + div.details to itemDivBootstrap
                itemDivBootstrap.appendChild(itemImg);
                itemDivBootstrap.appendChild(divDetails);

                // Appending itemDivBootstrap to containerNewItems
                containerNewItems.appendChild(itemDivBootstrap);
            });
        })
        .catch(error => {
            console.error("Error fetching new items:", error);
        }
        );
}


// #Featured Items
function generateFeaturedItems() {
    const containerFeaturedItems = document.querySelector("#featured .row");

    fetch("../e.commerce.website/items/featuredItems.json")
        .then(response => response.json())
        .then(parsedFeaturedItems => {
            parsedFeaturedItems.forEach((item) => {
                const itemDivBootstrap = document.createElement("div");
                itemDivBootstrap.classList.add("product", "text-center", "col-lg-3", "col-md-4", "col-12");

                const itemImg = document.createElement("img");
                itemImg.classList.add("img-fluid", "mb-3");
                itemImg.src = item.image;
                itemImg.alt = "error";

                const divStar = document.createElement("div");
                divStar.classList.add("star");

                for (let i = 0; i < 5; i++) {
                    const iStar = document.createElement("i");
                    iStar.classList.add("fa", "fa-star");

                    divStar.append(iStar);
                }

                const itemTitle = document.createElement("h5");
                itemTitle.classList.add("p-name")
                itemTitle.textContent = item.title;

                const itemPrice = document.createElement("h5");
                itemPrice.classList.add("p-price")
                itemPrice.textContent = item.price;

                const itemButton = document.createElement("button");
                itemButton.classList.add("buy-btn");
                itemButton.textContent = "Buy Now";
                itemButton.addEventListener("click", () => {
                    window.location.href = item.link;
                });

                itemDivBootstrap.appendChild(itemImg);
                itemDivBootstrap.appendChild(divStar);
                itemDivBootstrap.appendChild(itemTitle);
                itemDivBootstrap.appendChild(itemPrice);
                itemDivBootstrap.appendChild(itemButton);

                containerFeaturedItems.appendChild(itemDivBootstrap);
            });
        })
        .catch(error => {
            console.error("Error fetching new items:", error);
        }
        );
}

