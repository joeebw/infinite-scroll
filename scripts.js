let photosArray = [];

const imagesContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


// Helper function to set attributes on DOM Elements
    function setAttribute(element, attributes){
        for(const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

// Create elements for Links and photos. Add to DOM
function displayPhotos() {
    // Run Function for each object in photosArray
    photosArray.forEach((photo)=> {
        // create <a> to link to unplash
        const item = document.createElement('a');       
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.description);
        // img.setAttribute('title', photo.description);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        });
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imagesContainer.appendChild(item);
    });
    
}

// Unplash API
let count = 10;
const apiKey = 'akb2YSlMrJYrYlriQi6gnQJCezZddKcblO981qxNO-I';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Get photos form Unsplash API
async function getPhotos() {
try{
    loader.hidden = false;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    loader.hidden = true;
    

    } catch (error) {

        //Catch error
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${15}`
    getPhotos();
    loader.hidden = true;
    }
})

// On Load
getPhotos();