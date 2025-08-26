import { updateStatus } from '../app.js';

export async function mergeSort(arr, bars, delay) {
  let comparisons = 0;

  updateStatus({
    name: 'Merge Sort',
    step: 'Starting...',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    comparisons,
    swaps: 0
  });

  await mergeSortHelper(arr, 0, arr.length - 1, bars, delay, () => {
    comparisons++;
    updateStatus({
      name: 'Merge Sort',
      step: `Comparisons: ${comparisons}`,
      complexity: { time: 'O(n log n)', space: 'O(n)' },
      comparisons,
      swaps: 0
    });
  });

  bars.forEach(bar => bar.style.backgroundColor = 'lime');
  updateStatus({
    name: 'Merge Sort',
    step: 'Sorting complete!',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    comparisons,
    swaps: 0
  });
}

async function mergeSortHelper(arr, left, right, bars, delay, onCompare) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(arr, left, mid, bars, delay, onCompare);
  await mergeSortHelper(arr, mid + 1, right, bars, delay, onCompare);
  await merge(arr, left, mid, right, bars, delay, onCompare);
}

async function merge(arr, left, mid, right, bars, delay, onCompare) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    onCompare();
    await sleep(delay);

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      updateBar(bars[k], arr[k]);
      i++;
    } else {
      arr[k] = rightArr[j];
      updateBar(bars[k], arr[k]);
      j++;
    }

    bars[k].style.backgroundColor = 'yellow';
    await sleep(delay);
    bars[k].style.backgroundColor = '#00c6ff';
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    updateBar(bars[k], arr[k]);
    bars[k].style.backgroundColor = 'lime';
    i++; k++;
    await sleep(delay);
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    updateBar(bars[k], arr[k]);
    bars[k].style.backgroundColor = 'lime';
    j++; k++;
    await sleep(delay);
  }
}

function updateBar(bar, value) {
  const maxHeight = 300;
  const normalizedHeight = (value / getMaxValue()) * maxHeight;
  bar.style.height = `${normalizedHeight}px`;
  bar.parentElement.querySelector('div').textContent = value;
}

function getMaxValue() {
  const labels = Array.from(document.querySelectorAll('#barContainer > div > div:first-child'));
  return Math.max(...labels.map(label => parseInt(label.textContent)));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
