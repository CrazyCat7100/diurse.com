const initialAutoClickerTime = 2000;
const initialUpgradeMoney = 10;
const initialAutoClickerCost = 1000;

const cookie = document.querySelector('.cookie');
const cookieCounter = document.querySelector('.cookie_counter');
const upgrade = document.querySelector('.upgrade');
const autoClicker = document.querySelector('.autoclicker');
const clearConfirm = document.querySelector('.clearconfirm');
const clearData = document.querySelector('.cleardata');
const cancel = document.querySelector('.cancel');
const confirm = document.querySelector('.confirm');

let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let clicksMultiplier = parseInt(localStorage.getItem('clicksMultiplier')) || 5;
let upgradeMoney = parseInt(localStorage.getItem('upgradeMoney')) || initialUpgradeMoney;
let autoClickerTime = parseInt(localStorage.getItem('autoClickerTime')) || initialAutoClickerTime;
let autoClickerCost = parseInt(localStorage.getItem('autoClickerCost')) || initialAutoClickerCost;
let autoClickInterval;
let back = document.getElementsByClassName('back')[0]

function updateLocalStorage() {
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('clicksMultiplier', clicksMultiplier);
    localStorage.setItem('upgradeMoney', upgradeMoney);
    localStorage.setItem('autoClickerTime', autoClickerTime);
    localStorage.setItem('autoClickerCost', autoClickerCost);
}

function updateCookieCounter() {
    cookieCounter.textContent = `${clicks} Cookies`;
}

function createPlusOneAnimation(event) {
    const plusOne = document.createElement('div');
    plusOne.textContent = `+${clicksMultiplier}`;
    plusOne.classList.add('plus_one');
    document.body.appendChild(plusOne);

    const { clientX: clickX, clientY: clickY } = event;

    plusOne.style.left = `${clickX}px`;
    plusOne.style.top = `${clickY}px`;

    setTimeout(() => {
        plusOne.style.opacity = '0';
        plusOne.style.top = `${clickY - 50}px`;
    }, 50);

    setTimeout(() => {
        document.body.removeChild(plusOne);
    }, 1000);
}

function handleCookieClick(event) {
    clicks += clicksMultiplier;
    updateCookieCounter();
    updateLocalStorage();
    createPlusOneAnimation(event);
}

function startAutoClicker() {
    autoClickInterval = setInterval(function () {
        clicks += clicksMultiplier;
        updateCookieCounter();
        updateLocalStorage();
    }, autoClickerTime);
}

function handleUpgradeClick() {
    if (clicks >= upgradeMoney) {
        clicks -= upgradeMoney;
        clicksMultiplier += 5;
        upgradeMoney *= 2;
        upgrade.textContent = `Upgrade: ${upgradeMoney}`;
        updateCookieCounter();
        updateLocalStorage();
    }
}

function handleAutoClickerClick() {
    if (clicks >= autoClickerCost && autoClickerCost < 512000) {
        clicks -= autoClickerCost;
        localStorage.setItem('autoClickerActive', 'true');

        startAutoClicker();
        autoClickerCost *= 2;
        autoClickerTime /= 2;

        autoClicker.textContent = `Upgrade Auto Clicker: ${autoClickerCost}`;
        autoClicker.style.fontSize = '25px';
        updateCookieCounter();
        localStorage.setItem('autoClickerTime', autoClickerTime);
        updateLocalStorage();
    } else if (autoClickerCost >= 512000) {
        autoClicker.textContent = 'Max Level';
        autoClicker.disabled = true; // Disable further upgrades
    }
}

function clearAllData() {
    clicks = 0;
    clicksMultiplier = 1;
    upgradeMoney = initialUpgradeMoney;
    autoClickerCost = initialAutoClickerCost;

    clearInterval(autoClickInterval);
    autoClickInterval = null;

    localStorage.removeItem('autoClickerActive');
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('clicksMultiplier', clicksMultiplier);
    localStorage.setItem('upgradeMoney', upgradeMoney);
    
    autoClickerTime = initialAutoClickerTime;
    localStorage.setItem('autoClickerTime', autoClickerTime);
    
    localStorage.setItem('autoClickerCost', autoClickerCost);

    updateCookieCounter();
    upgrade.textContent = `Upgrade: ${upgradeMoney}`;
    autoClicker.textContent = `Upgrade Auto Clicker: ${autoClickerCost}`;
}

function handleConfirmClick() {
    clearAllData();
    clearConfirm.style.display = 'none';

    if (localStorage.getItem('autoClickerActive') === 'true') {
        startAutoClicker();
    }
}

function handleCancelClick() {
    clearConfirm.style.display = 'none';
}

function initiateAutoClicker() {
    updateCookieCounter();
    autoClicker.style.fontSize = '24px';

    const autoClickerActive = localStorage.getItem('autoClickerActive');

    autoClickerTime = parseInt(localStorage.getItem('autoClickerTime')) || initialAutoClickerTime;

    if (autoClickerActive === 'true') {
        startAutoClicker();
    }

    
        autoClicker.textContent = `Upgrade Auto Clicker: ${autoClickerCost}`;
    

    
        upgrade.textContent = `Upgrade: ${upgradeMoney}`;
    
}


window.addEventListener('load', initiateAutoClicker);

cookie.addEventListener('click', handleCookieClick);
upgrade.addEventListener('click', handleUpgradeClick);
autoClicker.addEventListener('click', handleAutoClickerClick);
clearData.addEventListener('click', () => {
    clearConfirm.style.display = 'flex';
});

confirm.addEventListener('click', handleConfirmClick);
cancel.addEventListener('click', handleCancelClick);




back.addEventListener('click', function () {
    window.location.href = '/games/games.html'
})
