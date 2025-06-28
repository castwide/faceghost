function faceGhost() {
  [...ghostableProfiles(), ...ghostableReels()].forEach((elem) => {
        elem.style.border = '1px solid #cc9999';
        elem.innerHTML = `<div style="display: block; text-align: center; color: #cc9999;">Ghosted</div>`;
  });
}

function ghostableProfiles() {
  const list = [];
  document.querySelectorAll('[role=main] [data-ad-rendering-role=profile_name]').forEach((elem) => {
    if (elem.innerHTML.includes('>Follow<') || elem.innerHTML.includes('>Join<')) {
      const header = elem.innerText.replace(/\s+/g, ' ').trim();
      console.log('Faceghost sighting:', `"${header}"`, elem);
      const parent = elem.closest('[data-virtualized=false]');
      if (parent) {
        console.log('Faceghost container:', parent);
        list.push(elem.closest('[data-virtualized=false]'));
      } else {
        console.error('Faceghost container not found');
      }
    }
  });
  return list;
}

function ghostableReels() {
  const list = [];
  document.querySelectorAll('[role=main] .html-div').forEach((elem) => {
    if (elem.innerHTML.includes('>Reels<')) {
      const header = elem.innerText.replace(/\s+/g, ' ').trim();
      console.log('Faceghost sighting:', `"${header}"`, elem);
      const parent = elem.closest('[data-virtualized=false]');
      if (parent) {
        console.log('Faceghost container:', parent);
        list.push(elem.closest('[data-virtualized=false]'));
      } else {
        console.error('Faceghost container not found');
      }
    }
  });
  return list;
}

faceGhost();

const observer = new MutationObserver(() => {
  faceGhost();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
