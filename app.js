let timeframe = 'weekly'; //default value
const mainContainer = document.querySelector('.main-container');
let regularCards; //place holder for all cards (work, play, study, etc)


// Initialize Menu 
const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});


// JSON for Cards 
let data = {}; 

fetch('data.json') 
    .then(resp => resp.json())
    .then(jsonData => {

    // Regular cards in js form
    jsonData.forEach(element => {
        mainContainer.insertAdjacentHTML('beforeend', 
            createRegularCard(element, timeframe));
    });

    // Convert array to dict
    jsonData.forEach(element => {
        data[element.title] = element.timeframes;
    });

    //Reference to created cards 
    regularCards = document.querySelectorAll('.regular-card');
    //console.log(regularCards);
    });


// -------- Functions

function menuOnClick(event){
    console.log('click', event.target.innerText.toLowerCase());
    menu.forEach(element => {
        element.classList.remove('menu-active');
    });
    event.target.classList.add('menu-active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe){
    regularCards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('h3').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.description');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };
    
    return `
    <div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="data-card">
      <div class="row">
        <h3>${title}</h3>
        <div class="points">
          <div class="point"></div>
          <div class="point"></div>
          <div class="point"></div>
        </div>
      </div>
      <div class="row-2">
        <h4 class=hours>${current}hrs</h4>
        <h5 class=description>${timeframeMsg[timeframe]} - ${previous}hrs</h5>
      </div>
    </div>
  </div>`
}