const hackFunction = document.querySelector('.hackFunction');
const hackTextTop = document.querySelector('.hackTextTop');
const hackTextBottom = document.querySelector('.hackTextBottom');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const hackOptions = document.querySelector('.hackOptions');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const changeGrid = document.getElementById('changeGrid');
const findPairsId = document.getElementById('findPairs');
const textGame = document.getElementById('textGame');

const timeChangeInput = document.getElementById('timeChangeInput');

var minValue = 0;
var maxValue = 99;
var maxNumbers = 25;
var numberOfPairs = 5;
var arrayListNumbers = [];
var findPairs = 0;
var progressBarInterval;
var hackTime = 25;


const gameInit = () => {
	hackFunction.style.display = 'none';
	hackTextTop.style.display = 'none';
	hackTextBottom.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.getElementById('timeChangeId').innerHTML = hackTime;
	document.addEventListener('contextmenu', event => event.preventDefault());
};

function gameStart() {
	arrayListNumbers = [];
	randomNumbers();
	createNumbers(arrayListNumbers);
	findPairsId.textContent = findPairs;
	textGame.innerHTML = 'Znajdź pary';
	findPairs = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackOptions.style.display = 'none';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj się...';
	changeGrid.style.gridTemplateColumns = 'repeat(5, minmax(0, 1fr))';
	changeGrid.style.padding = '140px';
	findPairsId.textContent = findPairs;
	progressBarStart('start', 2);
}

const gameWin = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack Udany';
	hackFunction.style.display = 'none';
	hackTextTop.style.display = 'none';
	hackTextBottom.style.display = 'none';
	progressBarStart('end', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackTextTop.style.display = 'none';
	hackTextBottom.style.display = 'none';
	progressBarStart('end', 2);
};

function createNumbers(array) {
	hackFunction.innerHTML = '';

	let currentIndex = array.length;
	let randomIndex;

	let firstElement = null;
	let secondElement = null;

	let arrayChosenPairs = [];

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', currentIndex);
		const name = document.createElement('p');
		name.classList.add('name');

		name.textContent = array[currentIndex];
		el.appendChild(name);

		hackFunction.appendChild(el);

		el.onclick = function () {
			if (arrayChosenPairs.includes(array[el.id]))
				return;

			if (firstElement === null) {
				el.style.background = 'rgba(59,50,84,255)';
				firstElement = el;
				return;
			}

			if (firstElement.id === el.id) {
				el.style.background = 'rgba(38 38 38)';
				firstElement = null;
				return;
			}
			secondElement = el;
			if (array[firstElement.id] === array[secondElement.id]) {
				firstElement.style.background = 'rgba(35,80,69,255)';
				el.style.background = "rgba(35,80,69,255)";
				arrayChosenPairs.push(array[firstElement.id]);
				firstElement = null;
				secondElement = null;
				findPairs = findPairs + 1;
				findPairsId.textContent = findPairs;
			} else gameOver();

			if (findPairs === numberOfPairs) {
				gameWin();
			}
		};
	}
}

function addedZero(n) {
	if (n < 10) return '0' + n.toString();
	else return n;
}

function randomNumbers() {
	arrayListNumbers = [];
	for (let i = 0; i < maxNumbers - numberOfPairs; i++) {
		var n = addedZero(Math.floor(Math.random() * maxValue) + minValue);
		var check = arrayListNumbers.includes(n);

		if (check === false) {
			arrayListNumbers.push(n);
			if (arrayListNumbers.length < numberOfPairs * 2)
				arrayListNumbers.push(n);
		} else {
			while (check === true) {
				n = addedZero(Math.floor(Math.random() * maxValue) + minValue);
				check = arrayListNumbers.includes(n);
				if (check === false) {
					arrayListNumbers.push(n);
					if (arrayListNumbers.length < numberOfPairs * 2)
						arrayListNumbers.push(n);
				}
			}
		}
	}
}


function progressBarStart(type = 'start', time, width) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackTextTop.style.display = '';
				hackTextBottom.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', hackTime);
				return;
			}
			if (type == 'game') {
				hackFunction.style.display = '';
				hackTextTop.style.display = '';
				hackTextBottom.style.display = '';
				hackInfo.style.display = 'none';
				gameOver();
				return;
			}
			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackTextTop.style.display = 'none';
				hackTextBottom.style.display = 'none';
				hackInfo.style.display = 'none';
				hackOptions.style.display = '';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
			}
			clearInterval(progressBarInterval);
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function timeChangeFunction() {
	document.getElementById('timeChangeId').innerHTML = timeChangeInput.value;
	hackTime = timeChangeInput.value;
}