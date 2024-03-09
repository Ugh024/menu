function showDetail(itemTitle, itemPrice, itemDescription, imageUrl) {
    document.getElementById('detailTitle').innerText = itemTitle;
    document.getElementById('detailPrice').innerText = itemPrice;
    document.getElementById('detailDescription').innerText = itemDescription;
    document.getElementById('detailImage').src = imageUrl;

    document.getElementById('itemDetail').classList.add('active');
}

function closeDetail() {
    document.getElementById('itemDetail').classList.remove('active');
}

// This function is called when the page loads to set the selected category based on the URL
window.onload = function() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        if (category) {
            highlightCategory(category);
        }
};

function goToCategory(category) {
    // Highlight the selected category
    highlightCategory(category);

    // Get all containers and hide them
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => container.style.display = 'none');

    // Show only the selected category's container
    const selectedCategoryContainer = document.getElementById(category);
    if (selectedCategoryContainer) {
        selectedCategoryContainer.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const closeButton = document.querySelector('#itemDetail button');
    closeButton.addEventListener('click', closeDetail);
});


function highlightCategory(category) {
    // Remove 'selected' class from all buttons
    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Start by hiding all categories
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = 'none';
        container.style.opacity = '0';
    });

    // Then show and fade in the selected category
    const categoryContainer = document.getElementById(category);
    if (categoryContainer) {
        categoryContainer.style.display = 'flex';
        setTimeout(() => { categoryContainer.style.opacity = '1'; }, 10); // delay needed to allow the display change to take effect
    }

    // Add 'selected' class to the button that has the category
    const button = document.querySelector(`button[onclick*="'${category}'"]`);
    if (button) {
        button.classList.add('selected');
    }
}

document.querySelector('.dismiss-icon').addEventListener('click', function() {
    document.getElementById('itemDetail').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', (event) => {
    let startY;
    let isSwiping = false;

    const itemDetail = document.getElementById('itemDetail');
    const dismissIcon = document.querySelector('.dismiss-icon');

    // Function to handle the start of a touch
    const handleTouchStart = (evt) => {
        const firstTouch = evt.touches[0];
        startY = firstTouch.clientY;
        isSwiping = true; // A new swipe is starting
    };

    // Function to handle the move of a touch
    const handleTouchMove = (evt) => {
        if (!startY) {
            return;
        }

        if (isSwiping) {
            evt.preventDefault(); // Prevent the default action (scroll / refresh)
            let yUp = evt.touches[0].clientY;
            let yDiff = startY - yUp;

            // Check if the swipe is downward and over a certain threshold
            if (yDiff < -50) { // You might need to adjust this threshold
                closeDetail();
                isSwiping = false; // Swipe is finished
            }
        }
    };

    // Function to handle the end of a touch
    const handleTouchEnd = (evt) => {
        if (isSwiping) {
            evt.preventDefault(); // Prevent the default action (scroll / refresh)
            isSwiping = false; // Swipe is finished
        }
        startY = null; // Reset starting Y position
    };

    // Add event listeners to the detail view
    itemDetail.addEventListener('touchstart', handleTouchStart, false);
    itemDetail.addEventListener('touchmove', handleTouchMove, false);
    itemDetail.addEventListener('touchend', handleTouchEnd, false);

    // Add click event to dismiss icon
    dismissIcon.addEventListener('click', closeDetail);

    // Function to close the detail view
    function closeDetail() {
        itemDetail.classList.remove('active');
    }
});

