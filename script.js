const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// So the goal here is to run the fetch only when all images are loaded 

let ready = false;
let imagesLoaded = 0; 
let totalImages = 0;

// Dynamic Photos Array 
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'aIdZRKydz9J5bYXQ0PdaEZRNIfuHmXBW0env-1nCxRI'
const apiUrl = `https://api.unsplash.com/photos/random?query=architecture&client_id=${apiKey}&count=${count}`

// Check if all images have loaded 
function imageLoaded() {
    imagesLoaded++;
    // console.log('Images Loaded: ', imagesLoaded); // Test Images loaded
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.style.display = 'none';
        // console.log('ready =', ready); // Test ready. Loader will become hidden
    }
} 

// Set Attribute function for DRY codes - Avoid repeating '.setAttribute'
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and Photos
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length

    // console.log('totalImages: ', totalImages); // Test images loaded
    photosArray.forEach((photo) => {
        // Create element 
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href : photo.links.html, 
            target : '_blank'
        });

        // Create Image 
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular, 
            alt : `${photo.user.name}: ${photo.location.title}`, 
            title : `${photo.user.name}: ${photo.location.title}`
        });

        // Check if all images have loaded 
        img.addEventListener('load', imageLoaded)

        // Put Image Inside Anchor Element
        anchor.appendChild(img)
        // Put Anchor inside Image-container
        imageContainer.appendChild(anchor)
    });
}


// Get Photos from Unsplash API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray); // => Log the response to test
        
        // Display Photos
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Check if scroll bar is near the end, load more photos 
/* So here's the logic
* .innerHeight is the height of the window, which is fixed unless window is rescaled
* .offsetHeight is the height of the page content, which is fixed unless content is added
* the document itself is usually longer than the window, so it sort of pours out under
* scrollY is the height that has been scrolled from the normal height of the window
* scrollY increases as you scroll down
* **Trigger when we're getting close to the end of the document, say 1000px from the end**
* 
* How?
* 
* Window height is fixed. But when you start scrolling down, scrollY begins counting
* So we imagine a height that is the window.innerHeight + scrollY, visualizing that the page is increasing in length 
* Of course with time, this value will approach the height of the document, until they finally equal each other and scrollY stops increasing 
* But since we don't want to trigger it when it's right at the end of the page, we trigger it when it's close to the end i.e. 1000px from the of the document
 */
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; // Reset ready
        getPhotos()
        }
    });
    
// On Load
getPhotos()
