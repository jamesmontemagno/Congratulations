// Parallax sparkle layer with gentle twinkle
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
    const count = Math.round((canvas.width * canvas.height) / 12000); // density
    stars = new Array(count).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.015 + 0.005, // twinkle speed
      l: Math.random() * 0.6 + 0.2, // base lightness
      d: Math.random() * 0.6 + 0.4 // depth for parallax
    }));
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // ease parallax toward target
    parallax.x += (target.x - parallax.x) * 0.05;
    parallax.y += (target.y - parallax.y) * 0.05;

    for(const st of stars){
      st.a += st.s;
      const tw = (Math.sin(st.a) + 1) * 0.5; // 0..1
      const px = st.x + parallax.x * (1 - st.d) * 10; // farther stars move less
      const py = st.y + parallax.y * (1 - st.d) * 10;

      // soft glow
      const grd = ctx.createRadialGradient(px, py, 0, px, py, st.r * 6);
      grd.addColorStop(0, `rgba(255,255,255,${0.35 * tw + 0.05})`);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(px, py, st.r * 6, 0, Math.PI*2);
      ctx.fill();

      // core
      ctx.fillStyle = `rgba(255,255,255,${0.8 * tw + 0.2})`;
      ctx.beginPath();
      ctx.arc(px, py, st.r, 0, Math.PI*2);
      ctx.fill();
    }
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

  window.addEventListener('DOMContentLoaded', mount);
})();
