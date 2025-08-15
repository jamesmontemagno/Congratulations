// Optimized parallax sparkle layer with much better performance
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.id = 'sparkle-canvas';

  function mount(){
    document.body.appendChild(canvas);
    resize();
    initStars();
    if(!prefersReduced) loop();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
  }

  let ctx = canvas.getContext('2d');
  let stars = [];
  let parallax = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let rafId = null;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars(){
    // Much more efficient star density calculation
    const isLowEffects = document.body.classList.contains('low-effects');
    const isMaloneMode = document.body.classList.contains('malone-mode');
    
    let baseDensity, maxStars;
    if (isLowEffects) {
      baseDensity = 80000;
      maxStars = 100;
    } else if (isMaloneMode) {
      baseDensity = 12000; // More stars for Malone mode
      maxStars = 400;
    } else {
      baseDensity = 15000;
      maxStars = 300;
    }
    
    const count = Math.min(Math.round((canvas.width * canvas.height) / baseDensity), maxStars);
    
    stars = new Array(count).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: isMaloneMode ? Math.random() * 1.8 + 0.4 : Math.random() * 1.2 + 0.3, // Bigger stars in Malone mode
      a: Math.random() * Math.PI * 2,
      s: isLowEffects ? Math.random() * 0.003 + 0.001 : 
          isMaloneMode ? Math.random() * 0.02 + 0.005 : // Faster twinkle in Malone mode
          Math.random() * 0.01 + 0.003,
      l: Math.random() * 0.4 + 0.3, // Base lightness
      d: Math.random() * 0.5 + 0.5 // Depth for parallax
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isLowEffects = document.body.classList.contains('low-effects');
    const isMaloneMode = document.body.classList.contains('malone-mode');
    const parallaxStrength = isLowEffects ? 0.005 : 0.02; // Much less parallax movement
    parallax.x += (target.x - parallax.x) * parallaxStrength;
    parallax.y += (target.y - parallax.y) * parallaxStrength;

    // Different rendering for Malone mode
    if (isMaloneMode) {
      // Colorful sparkles for Malone mode
      const colors = [
        'rgba(255,107,107,', // Red
        'rgba(78,205,196,',  // Cyan
        'rgba(69,183,209,',  // Blue
        'rgba(253,121,168,', // Pink
        'rgba(255,235,59,',  // Yellow
        'rgba(150,206,180,', // Green
      ];
      
      for(const st of stars){
        st.a += st.s;
        const tw = (Math.sin(st.a) + 1) * 0.5; // 0..1
        const parallaxDistance = 3;
        const px = st.x + parallax.x * (1 - st.d) * parallaxDistance;
        const py = st.y + parallax.y * (1 - st.d) * parallaxDistance;

        // Use colorful sparkles
        const colorIndex = Math.floor((st.x + st.y) * 0.01) % colors.length;
        const alpha = tw * 0.8 + 0.3;
        ctx.fillStyle = colors[colorIndex] + alpha + ')';
        
        ctx.beginPath();
        ctx.arc(px, py, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Standard white sparkles for low effects
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      
      for(const st of stars){
        st.a += st.s;
        const tw = (Math.sin(st.a) + 1) * 0.5; // 0..1
        const parallaxDistance = isLowEffects ? 1 : 3;
        const px = st.x + parallax.x * (1 - st.d) * parallaxDistance;
        const py = st.y + parallax.y * (1 - st.d) * parallaxDistance;

        const alpha = isLowEffects ? tw * 0.4 + 0.1 : tw * 0.7 + 0.2;
        ctx.globalAlpha = alpha;
        
        ctx.beginPath();
        ctx.arc(px, py, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1; // Reset alpha
  }

  function loop(){
    if(rafId) return;
    const step = () => {
      draw();
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  }

  function onMouseMove(e){
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    target.x = (e.clientX - cx) / cx; // -1..1
    target.y = (e.clientY - cy) / cy; // -1..1
  }

  function onTilt(e){
    if(e.beta == null || e.gamma == null) return;
    target.x = (e.gamma || 0) / 45; // -1..1 approx
    target.y = (e.beta || 0) / 45;  // -1..1 approx
  }

  // Listen for mode changes to re-initialize stars
  function onModeChange() {
    initStars();
  }

  window.addEventListener('DOMContentLoaded', mount);
  
  // Make the mode change function globally available
  window.sparklesOnModeChange = onModeChange;
})();
