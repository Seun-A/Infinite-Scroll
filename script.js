// Loader SVG
const loader = document.getElementById('loader'); 
setTimeout(() => {
    loader.style.display = 'none';
}, 1000);


// - 
const imageContainer = document.getElementById('image-container')
// Using let not const because the value within the array will change every time you make a request 
let photosArray = []; 


// Unsplash API 
const count = 10;
const apiKey = 'tivBhKAV6vbR1BTyADvO08mgYIJBIOnDpHjbg4vxUr4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 


// Get Photos from unsplash API 
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray );

        // Display Photos from Photos Array 
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}
getPhotos()

// Add Links and Photos Elements to the DOM 
function displayPhotos() {
    try {        
        photosArray.forEach((photo) => {
            // imageContainer += `<img src="${photo.urls.raw}" alt="${photo.urls.raw}">`;
    
            // Create <a> link to Unsplash 
            const item = document.createElement('a');
            item.setAttribute('href', photo.links.html);
            item.setAttribute('target', '_blank');
    
            // Create <img> for Photo
            const img = document.createElement('img')
            img.setAttribute('src', photo.urls.regular);
            img.setAttribute('alt', photo.alt_description);
            img.setAttribute('title', photo.alt_description);
    
            // Put <img> inside <a> tag, and put both inside imageContainer
            item.appendChild(img)
            imageContainer.appendChild(item)
        })
    } catch (error) {
        console.log(error);
    }
}
