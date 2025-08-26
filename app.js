import { renderBars } from './components/barRenderer.js';
import { createControlPanel } from './components/controlPanel.js';
import { bubbleSort } from './algorithms/bubbleSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { quickSort } from './algorithms/quickSort.js';

let array = [];
let delay = 50;

const barContainer = document.getElementById('barContainer');
const controlPanel = document.getElementById('controlPanel');

export function updateStatus({ name, step, complexity, comparisons, swaps }) {
  document.getElementById('algoName').textContent = name;
  document.getElementById('stepLabel').textContent = step;
  document.getElementById('complexityLabel').textContent = `Time: ${complexity.time}, Space: ${complexity.space}`;
  document.getElementById('statsLabel').textContent = `Comparisons: ${comparisons}, Swaps: ${swaps}`;
}

function generateArray(size = 50) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 20);
  renderBars(array, barContainer);
}

function visualizeCustomArray(values) {
  array = [...values];
  renderBars(array, barContainer);
}

function setSpeed(value) {
  delay = Math.pow(value, 1.1); // exponential slowdown
}

function startSort(algorithm) {
  const bars = document.querySelectorAll('.bar');
  switch (algorithm) {
    case 'bubble': bubbleSort(array, bars, delay); break;
    case 'selection': selectionSort(array, bars, delay); break;
    case 'insertion': insertionSort(array, bars, delay); break;
    case 'merge': mergeSort(array, bars, delay); break;
    case 'quick': quickSort(array, bars, delay); break;
  }
}

createControlPanel(controlPanel, generateArray, startSort, setSpeed, visualizeCustomArray);
generateArray();
