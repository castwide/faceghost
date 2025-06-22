function faceGhost() {
  document.querySelectorAll('[data-ad-rendering-role=profile_name]').forEach((elem) => {
    if (elem.innerHTML.includes('>Follow<') || elem.innerHTML.includes('>Join<')) {
      const header = elem.innerText.replace(/\s+/g, ' ').trim();
      console.log('Faceghost sighting:', `"${header}"`, elem);
      const parent = elem.closest('[data-virtualized=false]');
      if (parent) {
        console.log('Faceghost container:', parent);
        parent.style.border = '1px solid #cc9999';
        parent.innerHTML = `<div style="text-align: center; color: #cc9999;">Ghosted</div>`;
      } else {
        console.error('Faceghost container not found');
      }
    }
  });
}

faceGhost();

const observer = new MutationObserver(() => {
  faceGhost();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
