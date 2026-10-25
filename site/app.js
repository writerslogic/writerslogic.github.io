const tiles = document.querySelectorAll('.tile');
let navigating = false;

for (const tile of tiles) {
  tile.addEventListener('click', (event) => {
    if (navigating || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    navigating = true;
    const rect = tile.getBoundingClientRect();
    const overlay = tile.cloneNode(true);
    overlay.removeAttribute('href');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.add('tile-transition');
    Object.assign(overlay.style, {left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`});
    document.body.append(overlay);
    const navigate = () => { window.location.assign(tile.href); };
    const animation = overlay.animate([
      {left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: getComputedStyle(tile).borderRadius},
      {left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px`, borderRadius: '0px'},
    ], {duration: 460, easing: 'cubic-bezier(.2,.75,.18,1)', fill: 'forwards'});
    animation.finished.then(navigate, navigate);
  });
}

addEventListener('pageshow', () => {
  document.querySelector('.tile-transition')?.remove();
  navigating = false;
});
