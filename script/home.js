const displayedImageAbout = document.querySelector('.displayed-img-about');
const displayedImageTut = document.querySelector('.displayed-img-tut');
const thumbBarAbout = document.querySelector('.thumb-bar-about');
const thumbBarTut = document.querySelector('.thumb-bar-tut');
const titleAbout = document.querySelector('.displayed-title-about');
const titleTut = document.querySelector('.displayed-title-tut');

const aboutTexts = [
    "Polarization",
    "Interference",
    "Total Internal Refraction"
];

const tutorialTexts = [
    "Learn with Dialogue Tutorials",
    "Visualise Complex Concepts",
    "Responsive Interactions",
];

for(let i = 1; i <= 3; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', './resources/images/about/pic' + i + '.jpg');
    thumbBarAbout.appendChild(newImage);

    newImage.onclick = function (event) {
        displayedImageAbout.src = event.target.src;
        titleAbout.textContent = aboutTexts[i-1];
    }
}

for(let i = 1; i <= 3; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', './resources/images/tutorial/pic' + i + '.gif');
    thumbBarTut.appendChild(newImage);

    newImage.onclick = function (event) {
        displayedImageTut.src = event.target.src;
        titleTut.textContent = tutorialTexts[i-1];
    }
}