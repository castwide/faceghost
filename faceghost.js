function faceGhost() {
  document.querySelectorAll('[data-ad-rendering-role=profile_name]').forEach((elem) => {
    if (elem.innerHTML.includes('>Follow<') || elem.innerHTML.includes('>Join<')) {
      const parent = elem.closest('[data-virtualized=false]');
      if (parent) {
        console.log('Ghost sighting:', elem);
        console.log('Ghost container:', parent);
        parent.style.border = '1px solid #cc9999';
        parent.innerHTML = `<div style="text-align: center; color: #cc9999;">Ghosted</div>`;
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
