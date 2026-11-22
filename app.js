(() => {
  const choice = document.querySelector('#font-choice');
  const size = document.querySelector('#font-size');
  const sizeValue = document.querySelector('#size-value');
  const input = document.querySelector('#sample-input');
  const specimen = document.querySelector('#specimen');
  const description = document.querySelector('#font-description');
  const original = 'Good ideas deserve good type.';
  const cuts = {
    headline: {family: 'Kip Headline', weight: 700, label: 'Kip Headline / Bold / 700'},
    light: {family: 'Kip Gothic', weight: 300, label: 'Kip Gothic / Light / 300'},
    medium: {family: 'Kip Gothic', weight: 500, label: 'Kip Gothic / Medium / 500'},
    bold: {family: 'Kip Gothic', weight: 700, label: 'Kip Gothic / Bold / 700'}
  };
  const defaultSize = () => window.matchMedia('(max-width: 560px)').matches ? 42 : 72;
  size.value = defaultSize();
  function update() {
    const cut = cuts[choice.value];
    specimen.style.fontFamily = `"${cut.family}", ${choice.value === 'headline' ? 'Georgia, serif' : 'Arial, sans-serif'}`;
    specimen.style.fontWeight = cut.weight;
    specimen.style.setProperty('--specimen-size', `${size.value}px`);
    specimen.textContent = input.value || original;
    sizeValue.textContent = `${size.value} px`;
    description.textContent = cut.label;
  }
  choice.addEventListener('change', update);
  size.addEventListener('input', update);
  input.addEventListener('input', update);
  document.querySelector('#reset').addEventListener('click', () => {
    choice.value = 'headline';
    size.value = defaultSize();
    input.value = original;
    update();
  });
  document.querySelector('#copy-css').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(document.querySelector('#embed-code').textContent);
      status.textContent = 'Copied. Paste this into your page’s <head>.';
    } catch {
      status.textContent = 'Select and copy the code above to add it to your page.';
    }
  });
  update();
})();
