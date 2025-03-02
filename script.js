function getVals() {
    let flour = document.getElementById('flour');
    let water = document.getElementById('water');
    let starter = document.getElementById('starter');
    let salt = document.getElementById('salt');
    let hydration = document.getElementById('hydration');
    let start_percent = document.getElementById('ss_percent');
    return [flour,water,starter,salt,hydration,start_percent];
  }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', function () {
    const [flour, water, starter, salt, hydration, start_percent] = getVals();
    const hydrationInput = document.getElementById('hydration');

    const tempLeft = document.getElementById('tempLeft');
    const iconLeft = document.getElementById('iconLeft');
    const iconMiddle = document.getElementById('iconMid');
    const iconRight = document.getElementById('iconRight');
    const tempRight = document.getElementById('tempRight')

    const hydrationIconsMap = {
        '45':{ 
            icons: [
                'images/brick.png',
                'images/brick.png', // Bread icon for 70% hydration
                'images/brick.png',
                'images/brick.png',
                'images/pretzel.png'
            ],
            captions: [
                '',
                '',
                '',
                'Anything lower will be very dense!',
                'Pretzels work here! May be a bit dense.',
            ]},
        '50':{ 
            icons: [
                'images/brick.png',
                'images/brick.png', // Bread icon for 70% hydration
                'images/brick.png',
                'images/pretzel.png',
                'images/bagel.png'
            ],
            captions: [
                '',
                '',
                'Anything lower will be very dense!',
                'Pretzels work here!',
                'Bagels work here too!'
            ]},
        '55':{ 
            icons: [
                'images.brick.png',
                'images/brick.png', 
                'images/pretzel.png',
                'images/bagel.png',
                'images/sandwich.png'
            ],
            captions: [
                '',
                'Anything lower will be very dense!',
                'Pretzels work here!',
                'Bagels work here too!',
                'Sandwich bread is normally in this range!'
            ]},
        '60':{ 
            icons: [
                'images.brick.png',
                'images/pretzel.png', // Bread icon for 70% hydration
                'images/bagel.png',
                'images/sandwich.png',
                'images/sourdough.png'
            ],
            captions: [
                'Anything lower will be very dense!',
                'Pretzels work here!',
                'Bagels work here too!',
                'Sandwich bread is normally in this range!',
                'Sourdough bread will work!'
            ]},
        '65':{ 
            icons: [
                'images/pretzel.png',
                'images/bagel.png', // Bread icon for 70% hydration
                'images/sandwich.png',
                'images/sourdough.png',
                'images/pizza.png'
            ],
            captions: [
                'Pretzels work here!',
                'Bagels work here too!',
                'Sandwich bread is normally in this range!',
                'Sourdough bread will work!',
                'Pizza is great in this range!'
            ]},
        '70':{ 
            icons: [
                'images/bagel.png',
                'images/sandwich.png', // Bread icon for 70% hydration
                'images/sourdough.png',
                'images/pizza.png',
                'images/focaccia.png'
            ],
            captions: [
                'Bagels work here too!',
                'Sandwich bread is normally in this range!',
                'Sourdough bread will work!',
                'Pizza is great in this range!',
                'Focaccia is delicious in this range!'
            ]},
        '80':{ 
            icons: [
                'images/sandwich.png',
                'images/sourdough.png', // Bread icon for 70% hydration
                'images/pizza.png',
                'images/focaccia.png',
                'images/icicle.png'
            ],
            captions: [
                'Sandwich bread is normally in this range!',
                'Sourdough bread will work!',
                'Pizza is great in this range!',
                'Focaccia is delicious in this range!',
                'Might be too sticky :/'
            ]},
        '85':{ 
            icons: [
                'images/sourdough.png',
                'images/pizza.png', // Bread icon for 70% hydration
                'images/focaccia.png',
                'images/icicle.png',
                'images/icicle1.png',
            ],
            captions: [
                'Sourdough bread will work!',
                'Pizza is great in this range!',
                'Focaccia is delicious in this range!',
                'Might be too sticky :/',
                'Anything this high will be highly challenging!!'
            ]},
        '90':{ 
            icons: [
                'images/pizza.png',
                'images/focaccia.png', // Bread icon for 70% hydration
                'images/icicle.png',
                'images/icicle1.png',
                'images/icicle2.png'
            ],
            captions: [
                'Pizza is great in this range!',
                'Focaccia is delicious in this range!',
                'Might be too sticky :/',
                'Anything this high will be highly challenging!!',
                'Warning Anything this high will be Extremely challenging!'
            ]},
        '100':{ 
            icons: [
                'images/focaccia.png',
                'images/icicle.png',
                'images/icicle1.png',
                'images/icicle2.png',
                'images/icicle.png'
            ],
            captions: [
                'Pizza is great in this range!',
                'Focaccia is delicious in this range!',
                'Might be too sticky :/',
                'Anything this high will be highly challenging!!',
                'Warning Anything this high will be Extremely challenging!',
                ''
            ]}
        // Add more hydration levels and icons as needed
    };

 // Function to update flour based on starter and ss-percent
    function updateFlour() {
        let starterValue = parseFloat(starter.value) || 0; // Convert to number, default to 0 if invalid
        let ssPercentValue = parseFloat(start_percent.value) || 0; // Convert to number, default to 0 if invalid

        if(ssPercentValue>0){
            flour.value = (starterValue / (ssPercentValue/ 100)).toFixed(); // Example formula: starter / ss_percent
        }
        else{
            flour.value = 0
        }
    };
    function updateWater() {
        let hydrationValue = parseFloat(hydration.value) || 0;
        let flourValue = parseFloat(flour.value) || 0;
        let starterValue = parseFloat(starter.value) ||0;
        water.value = (hydrationValue/100 * (flourValue+starterValue/2) - starterValue/2).toFixed();
    };
    function updateSalt() {
        let flourValue = parseFloat(flour.value) || 0;
        
        salt.value = (flourValue*0.02).toFixed(1);
    };
    function updateStarter() {
        let flourValue = parseFloat(flour.value) || 0;
        let ssPercentValue = parseFloat(start_percent.value) || 0; // Convert to number, default to 0 if invalid

        if(ssPercentValue>0){
            starter.value = (flourValue * (ssPercentValue/ 100)).toFixed(); // Example formula: starter / ss_percent
        }
        else{
            starter.value = 0
        }

    };
    function updateHydration() {
        let waterValue = parseFloat(water.value) || 0;
        let starterValue = parseFloat(starter.value)||0;
        let flourValue = parseFloat(flour.value)||0;

        if (flourValue >0){
            hydration.value = ((waterValue + starterValue/2)*100 /(flourValue + starterValue/2)).toFixed(1);
        }
        else{
            hydration.value = 0;
        }
    };
    
    function updateSsPercent() {
        let flourValue = parseFloat(flour.value) || 0;
        let starterValue = parseFloat(starter.value) || 0;
        

        if (flourValue>0){
            start_percent.value = (starterValue*100/flourValue).toFixed(1);
            
        }
        else{
            start_percent.value = 0;
        }
    };
    let t = 0
    let currentIcons = []
    function updateBreadType() {
        const hydrationPercent = parseFloat(hydrationInput.value); // Get the hydration percent
    
        let iconsToShow = [];
        let captionsToShow = [];
    
        if (hydrationPercent >= 100) {
            iconsToShow = hydrationIconsMap['100'].icons;
            captionsToShow = hydrationIconsMap['100'].captions;
        } else if (hydrationPercent >= 90) {
            iconsToShow = hydrationIconsMap['90'].icons;
            captionsToShow = hydrationIconsMap['90'].captions;
        } else if (hydrationPercent >= 85) {
            iconsToShow = hydrationIconsMap['85'].icons;
            captionsToShow = hydrationIconsMap['85'].captions;
        } else if (hydrationPercent >= 80) {
            iconsToShow = hydrationIconsMap['80'].icons;
            captionsToShow = hydrationIconsMap['80'].captions;
        } else if (hydrationPercent >= 70) {
            iconsToShow = hydrationIconsMap['70'].icons;
            captionsToShow = hydrationIconsMap['70'].captions;
        } else if (hydrationPercent >= 65) {
            iconsToShow = hydrationIconsMap['65'].icons;
            captionsToShow = hydrationIconsMap['65'].captions;
        } else if (hydrationPercent >= 60) {
            iconsToShow = hydrationIconsMap['60'].icons;
            captionsToShow = hydrationIconsMap['60'].captions;
        } else if (hydrationPercent >= 55) {
            iconsToShow = hydrationIconsMap['55'].icons;
            captionsToShow = hydrationIconsMap['55'].captions;
        } else if (hydrationPercent >= 50) {
            iconsToShow = hydrationIconsMap['50'].icons;
            captionsToShow = hydrationIconsMap['50'].captions;
        } else {
            iconsToShow = hydrationIconsMap['45'].icons;
            captionsToShow = hydrationIconsMap['45'].captions;
        }
        if(t=0){ //only want this to happen the first time
            
            tempLeft.innerHTML = `<img src="${iconsToShow[0]}" class="hydration-icon" alt="Bread for lower hydration">`
            iconLeft.innerHTML = `<img src="${iconsToShow[1]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[0]}</p>`;
            iconMiddle.innerHTML = `<img src="${iconsToShow[2]}" class="hydration-icon" alt="Bread for current hydration"><p>${captionsToShow[1]}</p>`;
            iconRight.innerHTML = `<img src="${iconsToShow[3]}" class="hydration-icon" alt="Bread for higher hydration"><p>${captionsToShow[2]}</p>`;
            tempRight.innerHTML = `<img src="${iconsToShow[4]}" class="hydration-icon" alt="Bread for lower hydration">`
            currentIcons = iconsToShow;  // Update current icons
            tempLeft.style.opacity = 0;
            tempRight.style.opacity = 0;
            t+=1
        }
        // Check if the icons have changed, and update accordingly
        const iconsChanged = iconsToShow.some((icon, index) => icon !== currentIcons[index]);
    
        if (iconsChanged) {
            if(iconsToShow[2]==currentIcons[3]){
                tempLeft.style.animation = '';
                iconLeft.style.animation = 'slideOutLeft 1s';
                iconMiddle.style.animation = 'slideLeft 1s';
                iconRight.style.animation = 'slideLeft 1s';
                tempRight.style.animation = 'slideInLeft 1s';
                setTimeout(() => {
                    tempLeft.innerHTML = `<img src="${iconsToShow[0]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[0]}</p>`;
                    iconLeft.innerHTML = `<img src="${iconsToShow[1]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[1]}</p>`;
                    iconMiddle.innerHTML = `<img src="${iconsToShow[2]}" class="hydration-icon" alt="Bread for current hydration"><p>${captionsToShow[2]}</p>`;
                    iconRight.innerHTML = `<img src="${iconsToShow[3]}" class="hydration-icon" alt="Bread for higher hydration"><p>${captionsToShow[3]}</p>`;
                    tempRight.innerHTML = `<img src="${iconsToShow[4]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[4]}</p>`;
                    tempLeft.style.opacity = 0;
                    tempRight.style.opacity = 0;
                    currentIcons = iconsToShow;}, 999); // Update current icons
            }
            else if(iconsToShow[2]==currentIcons[1]){
                tempLeft.style.animation = 'slideInRight 1s'
                iconLeft.style.animation = 'slideRight 1s';
                iconMiddle.style.animation = 'slideRight 1s';
                iconRight.style.animation = 'slideOutRight 1s';
                tempRight.style.animation = '';
                setTimeout(() => {
                    tempLeft.innerHTML = `<img src="${iconsToShow[0]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[0]}</p>`;
                    iconLeft.innerHTML = `<img src="${iconsToShow[1]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[1]}</p>`;
                    iconMiddle.innerHTML = `<img src="${iconsToShow[2]}" class="hydration-icon" alt="Bread for current hydration"><p>${captionsToShow[2]}</p>`;
                    iconRight.innerHTML = `<img src="${iconsToShow[3]}" class="hydration-icon" alt="Bread for higher hydration"><p>${captionsToShow[3]}</p>`;
                    tempRight.innerHTML = `<img src="${iconsToShow[4]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[4]}</p>`;
                    tempLeft.style.opacity = 0;
                    tempRight.style.opacity = 0;
                    currentIcons = iconsToShow;}, 999); // Update current icons
            }
            
            else{
                tempLeft.innerHTML = `<img src="${iconsToShow[0]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[0]}</p>`;
                iconLeft.innerHTML = `<img src="${iconsToShow[1]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[1]}</p>`;
                iconMiddle.innerHTML = `<img src="${iconsToShow[2]}" class="hydration-icon" alt="Bread for current hydration"><p>${captionsToShow[2]}</p>`;
                iconRight.innerHTML = `<img src="${iconsToShow[3]}" class="hydration-icon" alt="Bread for higher hydration"><p>${captionsToShow[3]}</p>`;
                tempRight.innerHTML = `<img src="${iconsToShow[4]}" class="hydration-icon" alt="Bread for lower hydration"><p>${captionsToShow[4]}</p>`;
                tempLeft.style.opacity = 0;
                tempRight.style.opacity = 0;
                currentIcons = iconsToShow; // Update current icons

            }
            // Clear previous icons and update with new ones

        }
        
      
    };
    
        
    



// Add event listeners to the input fields
starter.addEventListener('input', function() {
    updateHydration();
    updateSsPercent();
    updateBreadType();
});
start_percent.addEventListener('input', function() {
    updateFlour();
    updateWater();
    updateSalt();
    updateHydration();
    updateSsPercent();
    updateBreadType();
});
flour.addEventListener('input', function() {
    updateWater();
    updateStarter();
    updateSalt();
    updateHydration();
    updateSsPercent();
    updateBreadType();
});
hydration.addEventListener('input',function() {
    updateWater();
    updateBreadType();
});
water.addEventListener('input', function () {
    updateHydration();  
    updateBreadType();
});
// Initialize everything when page loads
updateFlour();
updateWater();
updateSalt();
updateStarter();
updateHydration();
updateSsPercent();
updateBreadType();
}

);

