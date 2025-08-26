import { updateStatus } from '../app.js';

export async function selectionSort(arr, bars, delay) {
  let comparisons = 0;
  let swaps = 0;

  updateStatus({
    name: 'Selection Sort',
    step: 'Starting...',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    comparisons,
    swaps
  });

  const container = document.getElementById('barContainer');

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = 'red';

    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      bars[j].style.backgroundColor = 'yellow';

      updateStatus({
        name: 'Selection Sort',
        step: `Comparing ${arr[minIdx]} and ${arr[j]}`,
        complexity: { time: 'O(n²)', space: 'O(1)' },
        comparisons,
        swaps
      });

      await sleep(delay);

      if (arr[j] < arr[minIdx]) {
        bars[minIdx].style.backgroundColor = '#00c6ff';
        minIdx = j;
        bars[minIdx].style.backgroundColor = 'red';
      } else {
        bars[j].style.backgroundColor = '#00c6ff';
      }
    }

    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      const wrapperI = bars[i].parentElement;
const wrapperMin = bars[minIdx].parentElement;

// Remove both from container
container.removeChild(wrapperI);
container.removeChild(wrapperMin);

// Re-insert in swapped order
if (i < minIdx) {
  container.insertBefore(wrapperMin, container.children[i]);
  container.insertBefore(wrapperI, container.children[minIdx]);
} else {
  container.insertBefore(wrapperI, container.children[minIdx]);
  container.insertBefore(wrapperMin, container.children[i]);
}

// Refresh bars
bars = document.querySelectorAll('.bar');


      updateStatus({
        name: 'Selection Sort',
        step: `Swapped ${arr[minIdx]} and ${arr[i]}`,
        complexity: { time: 'O(n²)', space: 'O(1)' },
        comparisons,
        swaps
      });

      await sleep(delay);
    }

    bars[i].style.backgroundColor = 'lime';
  }

  updateStatus({
    name: 'Selection Sort',
    step: 'Sorting complete!',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    comparisons,
    swaps
  });
}
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
if(isSorted){
  console.log("success");
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
