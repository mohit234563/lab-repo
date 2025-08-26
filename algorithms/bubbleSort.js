import { updateStatus } from '../app.js';

export async function bubbleSort(arr, bars, delay) {
  let comparisons = 0, swaps = 0;

  updateStatus({
    name: 'Bubble Sort',
    step: 'Starting...',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    comparisons,
    swaps
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparisons++;

      updateStatus({
        name: 'Bubble Sort',
        step: `Comparing index ${j} and ${j + 1}`,
        complexity: { time: 'O(n²)', space: 'O(1)' },
        comparisons,
        swaps
      });

      bars[j].style.backgroundColor = 'yellow';
      bars[j + 1].style.backgroundColor = 'yellow';
      await sleep(delay);

      if (arr[j] > arr[j + 1]) {
        swaps++;

        // Swap data
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Swap DOM elements
        const parent = bars[j].parentElement.parentElement;
       const container = document.getElementById('barContainer');
const wrapperJ = bars[j].parentElement;
const wrapperJ1 = bars[j + 1].parentElement;

container.insertBefore(wrapperJ1, wrapperJ);
bars = document.querySelectorAll('.bar');



        updateStatus({
          name: 'Bubble Sort',
          step: `Swapped ${arr[j]} and ${arr[j + 1]}`,
          complexity: { time: 'O(n²)', space: 'O(1)' },
          comparisons,
          swaps
        });
      }

      bars[j].style.backgroundColor = '#00c6ff';
      bars[j + 1].style.backgroundColor = '#00c6ff';
    }

    bars[arr.length - i - 1].style.backgroundColor = 'lime';
  }

  bars[0].style.backgroundColor = 'lime';
  updateStatus({
    name: 'Bubble Sort',
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
