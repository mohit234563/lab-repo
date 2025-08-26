export function createControlPanel(container, onGenerate, onSort, onSpeedChange, onVisualize) {
  container.innerHTML = `
    <select id="algorithmSelect">
      <option value="bubble">Bubble Sort</option>
      <option value="selection">Selection Sort</option>
      <option value="insertion">Insertion Sort</option>
      <option value="merge">Merge Sort</option>
      <option value="quick">Quick Sort</option>
    </select>
    <input type="range" id="sizeSlider" min="10" max="100" value="50" />
    <input type="range" id="speedSlider" min="1" max="200" value="100" />
    <button id="generateBtn">Generate</button>
    <button id="sortBtn">Sort</button>
    <input type="text" id="arrayInput" placeholder="Enter numbers e.g. 5,3,8,1" />
    <button id="visualizeBtn">Visualize</button>
  `;

  const algorithmSelect = container.querySelector('#algorithmSelect');
  const sizeSlider = container.querySelector('#sizeSlider');
  const speedSlider = container.querySelector('#speedSlider');
  const generateBtn = container.querySelector('#generateBtn');
  const sortBtn = container.querySelector('#sortBtn');
  const arrayInput = container.querySelector('#arrayInput');
  const visualizeBtn = container.querySelector('#visualizeBtn');

  generateBtn.onclick = () => onGenerate(sizeSlider.value);
  sortBtn.onclick = () => onSort(algorithmSelect.value);
  speedSlider.oninput = () => onSpeedChange(speedSlider.value);
  visualizeBtn.onclick = () => {
    const raw = arrayInput.value.trim();
    const values = raw.split(',').map(Number).filter(n => !isNaN(n));
    if (values.length > 0) {
      onVisualize(values);
    } else {
      alert("Please enter a valid comma-separated list of numbers.");
    }
  };
}
