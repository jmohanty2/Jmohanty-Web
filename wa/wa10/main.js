const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const storyText = "The year was 3125, and the heat from the twin suns was unbearable. :insertx: adjusted their visor and stepped onto the surface of :inserty:. Suddenly, alarms went off as :insertz:. Commander Arch watched from the control deck, unfazed—this was just another day in deep space.";
const insertX = ["Captain Zorak", "Lieutenant Vega", "Dr. Xypher"];
const insertY = ["Titan Station", "the abandoned Martian colony", "the edge of a black hole"];
const insertZ = ["a wormhole opened before them", "an alien spacecraft decloaked", "the gravity field shifted unpredictably"];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

   
    if (customName.value) {
        const name = customName.value;
        newStory = newStory.replace('Arch', name);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}