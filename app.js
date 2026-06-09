/* Minimal page script for presentation / purchase / download flow */

const qs = s => document.querySelector(s);
const buyBtn = qs('#buyBtn'); // may be <a> on index (navigates) or <button> on purchase page
const downloadBtn = qs('#downloadBtn');

const contactBtn = qs('#contactBtn');
const termsBtn = qs('#termsBtn');
const ping = qs('#pingSound');

function simulatePurchaseFlow(){
  // Simulate payment processing and then reveal download link
  buyBtn.disabled = true;
  buyBtn.textContent = 'Traitement…';
  setTimeout(()=>{
    // After "payment", show download link and play a success sound
    buyBtn.textContent = 'Acheté';
    downloadBtn.style.display = 'inline-block';
    downloadBtn.href = 'https://example.com/downloads/vinted-bot-windows.exe';
    try { ping.currentTime = 0; ping.play(); } catch(e){}
    alert('Achat effectué — lien de téléchargement activé.');
  }, 1400);
}



function contactSupport(){
  window.location.href = 'mailto:support@example.com?subject=Support%20Vinted%20Bot';
}

function showTerms(){
  alert('Conditions : licence unique, téléchargement pour Windows. Voir la page complète pour détails.');
}

if (buyBtn && buyBtn.tagName === 'BUTTON') {
  buyBtn.addEventListener('click', simulatePurchaseFlow);
}

contactBtn.addEventListener('click', contactSupport);
termsBtn.addEventListener('click', showTerms);

/* Quick accessibility: show download if a special key present (for demo/testing) */
if (location.search.includes('demo=1')) {
  downloadBtn.style.display = 'inline-block';
  downloadBtn.href = 'https://example.com/downloads/vinted-bot-windows.exe';
}

/* Background orb follow effect */
(function(){
  const orb = document.getElementById('bgOrb');
  const panel = document.querySelector('.panel');
  if (!orb || !panel) return;

  // Position smoothing
  let mouseX = panel.clientWidth / 2;
  let mouseY = panel.clientHeight / 2;
  let orbX = mouseX, orbY = mouseY;
  const ease = 0.14;

  function update(){
    orbX += (mouseX - orbX) * ease;
    orbY += (mouseY - orbY) * ease;
    // position orb precisely inside panel (pixels) and center it with CSS transform
    const rect = panel.getBoundingClientRect();
    orb.style.left = (orbX) + 'px';
    orb.style.top = (orbY) + 'px';
    requestAnimationFrame(update);
  }
  // initialize orb to center
  const initRect = panel.getBoundingClientRect();
  orb.style.left = (initRect.width / 2) + 'px';
  orb.style.top = (initRect.height / 2) + 'px';
  requestAnimationFrame(update);

  function onMove(e){
    const rect = panel.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouseX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    mouseY = Math.max(0, Math.min(rect.height, clientY - rect.top));
  }

  // Desktop mouse
  panel.addEventListener('mousemove', onMove, {passive:true});
  // Touch support
  panel.addEventListener('touchmove', onMove, {passive:true});

  // Subtle idle motion reset when leaving
  panel.addEventListener('mouseleave', () => {
    mouseX = panel.clientWidth / 2;
    mouseY = panel.clientHeight / 2;
  });
})();