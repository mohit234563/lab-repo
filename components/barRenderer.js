export function renderBars(array, container) {
  container.innerHTML = '';

  const maxValue = Math.max(...array);
  const maxPixelHeight = 300; // tallest bar in pixels
  const barWidth = Math.min(1000 / array.length, 40); // cap width for clarity

  array.forEach(value => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = `${barWidth}px`;
    wrapper.style.margin = '0 3px';

    const label = document.createElement('div');
    label.textContent = value;
    label.style.color = 'white';
    label.style.fontSize = '14px';
    label.style.marginBottom = '4px';
    label.style.whiteSpace = 'nowrap';

    const bar = document.createElement('div');
    bar.classList.add('bar');

    // ✅ Normalize height based on max value
    const normalizedHeight = (value / maxValue) * maxPixelHeight;
    bar.style.height = `${normalizedHeight}px`;
    bar.style.width = '100%';

    wrapper.appendChild(label);
    wrapper.appendChild(bar);
    container.appendChild(wrapper);
  });

  // ✅ Set container height to accommodate tallest bar + label
  container.style.height = `${maxPixelHeight + 40}px`;
}
