import { updateStatus } from '../app.js';

export async function insertionSort(arr, bars, delay) {
  let comparisons = 0;
  let swaps = 0;

  updateStatus({
    name: 'Insertion Sort',
    step: 'Starting...',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    comparisons,
    swaps
  });

  const container = document.getElementById('barContainer');

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    bars[i].style.backgroundColor = 'red';
    await sleep(delay);

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      arr[j + 1] = arr[j];

      updateStatus({
        name: 'Insertion Sort',
        step: `Shifting ${arr[j]} to index ${j + 1}`,
        complexity: { time: 'O(n²)', space: 'O(1)' },
        comparisons,
        swaps
      });

      // Move DOM wrapper at j to j+1
      const wrapperJ = bars[j].parentElement;
      const wrapperJ1 = bars[j + 1].parentElement;

      container.removeChild(wrapperJ);
      container.removeChild(wrapperJ1);

      container.insertBefore(wrapperJ1, container.children[j]);
      container.insertBefore(wrapperJ, container.children[j + 1]);

      bars = document.querySelectorAll('.bar');
      swaps++;
      j--;
      await sleep(delay);
    }

    arr[j + 1] = key;

    updateStatus({
      name: 'Insertion Sort',
      step: `Inserted ${key} at index ${j + 1}`,
      complexity: { time: 'O(n²)', space: 'O(1)' },
      comparisons,
      swaps
    });

    bars = document.querySelectorAll('.bar');
    bars[j + 1].style.backgroundColor = 'lime';
    await sleep(delay);
  }

  updateStatus({
    name: 'Insertion Sort',
    step: 'Sorting complete!',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    comparisons,
    swaps
  });

  bars.forEach(bar => bar.style.backgroundColor = 'lime');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
