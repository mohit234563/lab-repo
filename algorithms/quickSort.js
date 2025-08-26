import { updateStatus } from '../app.js';

export async function quickSort(arr, bars, delay) {
  const metrics = { comparisons: 0, swaps: 0 };

  updateStatus({
    name: 'Quick Sort',
    step: 'Starting...',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    comparisons: metrics.comparisons,
    swaps: metrics.swaps
  });

  await quickSortHelper(arr, 0, arr.length - 1, bars, delay, metrics);

  bars.forEach(bar => bar.style.backgroundColor = 'lime');

  updateStatus({
    name: 'Quick Sort',
    step: 'Sorting complete!',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    comparisons: metrics.comparisons,
    swaps: metrics.swaps
  });
}

async function quickSortHelper(arr, low, high, bars, delay, metrics) {
  if (low < high) {
    const pi = await partition(arr, low, high, bars, delay, metrics);
    await quickSortHelper(arr, low, pi - 1, bars, delay, metrics);
    await quickSortHelper(arr, pi + 1, high, bars, delay, metrics);
  }
}

async function partition(arr, low, high, bars, delay, metrics) {
  const pivot = arr[high];
  bars[high].style.backgroundColor = 'red';
  let i = low - 1;

  for (let j = low; j < high; j++) {
    metrics.comparisons++;
    bars[j].style.backgroundColor = 'yellow';

    updateStatus({
      name: 'Quick Sort',
      step: `Comparing ${arr[j]} with pivot ${pivot}`,
      complexity: { time: 'O(n log n)', space: 'O(log n)' },
      comparisons: metrics.comparisons,
      swaps: metrics.swaps
    });

    await sleep(delay);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      updateBar(bars[i], arr[i]);
      updateBar(bars[j], arr[j]);
      metrics.swaps++;
      await sleep(delay);
    }

    bars[j].style.backgroundColor = '#00c6ff';
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  updateBar(bars[i + 1], arr[i + 1]);
  updateBar(bars[high], arr[high]);
  metrics.swaps++;
  await sleep(delay);

  bars[i + 1].style.backgroundColor = 'lime';
  bars[high].style.backgroundColor = '#00c6ff';

  return i + 1;
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
