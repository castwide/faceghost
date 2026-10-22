function faceGhost(records, observer) {
  
  if (isGhostablePage()) {
    console.log('Running Faceghost on mutation');
    for (const record of records) {
      for (const addedNode of record.addedNodes) {
        [...ghostableProfiles(addedNode), ...ghostableReels(addedNode)].forEach((elem) => {
              elem.style.border = '1px solid #cc9999';
              elem.innerHTML = `<div style="display: block; text-align: center; color: #cc9999;">Ghosted</div>`;
        });
      }
    }
  }
}

function ghostableProfiles(addedNode) {
  const list = [];
  addedNode.querySelectorAll('[role=main] [data-ad-rendering-role=profile_name]').forEach((elem) => {
    if (elem.innerHTML.match(/>\s*Follow\s*</) || elem.innerHTML.includes('>Join<')) {
      pushGhostable(elem, list);
    }
  });
  return list;
}

function ghostableReels(addedNode) {
  const list = [];
  addedNode.querySelectorAll('[role=main] .html-div').forEach((elem) => {
    if (elem.innerHTML.match(/>\s*Reels\s*</)) {
      pushGhostable(elem, list);
    }
  });
  return list;
}

function pushGhostable(elem, list) {
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

function isGhostablePage() {
  return !document.URL.includes('facebook.com/search/');
}

const observer = new MutationObserver(faceGhost)

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Loaded Faceghost');
