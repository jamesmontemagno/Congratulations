// Simple confetti + shimmer helper
(function(){
  const TWO_PI = Math.PI * 2;
  const rand = (min, max) => Math.random() * (max - min) + min;

  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(canvas);
    resize();
  });
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  let confetti = [];
  let rafId = null;

  const palette = [
    '#ff7a18', '#ffb84d', '#af00ff', '#8a5cff', '#00d4ff', '#00ffa3', '#ffd6e0'
  ];

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawnBurst(x, y, count = 120){
    for(let i=0; i<count; i++){
      confetti.push({
        x, y,
        r: rand(2,5),
        w: rand(4,9),
        h: rand(6,14),
        angle: rand(0, TWO_PI),
        spin: rand(-0.25, 0.25),
        vx: Math.cos(rand(0, TWO_PI)) * rand(2, 7),
        vy: Math.sin(rand(0, TWO_PI)) * rand(2, 7) - rand(2,6),
        g: rand(0.05, 0.12),
        c: palette[(Math.random()*palette.length)|0],
        life: rand(60, 120)
      });
    }
    loop();
  }

  function loop(){
    if(rafId) return; // already running
    const step = () => {
      ctx.clearRect(0,0,canvas.width, canvas.height);
      for(let i=confetti.length-1; i>=0; i--){
        const p = confetti[i];
        p.vx *= 0.995; // air drag
        p.vy += p.g;   // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.life -= 1;

        // cull
        if(p.life <= 0 || p.y > canvas.height + 40){
          confetti.splice(i,1);
          continue;
        }

        // draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.c;
        const w = p.w * (0.5 + 0.5*Math.sin(p.life*0.2));
        ctx.fillRect(-w/2, -p.h/2, w, p.h);
        ctx.restore();
      }
      if(confetti.length === 0){
        cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  }

  // Global click/tap handler -> randomize around pointer
  function onTrigger(e){
    const baseX = (e.touches?.[0]?.clientX ?? e.clientX ?? window.innerWidth/2);
    const baseY = (e.touches?.[0]?.clientY ?? e.clientY ?? window.innerHeight/2);
    for(let i=0;i<3;i++){
      const jitterX = baseX + rand(-80, 80);
      const jitterY = baseY + rand(-60, 60);
      spawnBurst(jitterX, jitterY, 80);
    }
  }

  // Export for Blazor init and manual trigger
  window.CongratsFX = {
    init: function(){
      document.addEventListener('click', onTrigger);
      document.addEventListener('touchstart', onTrigger, {passive: true});
    },
    burstAt: spawnBurst,
    playLyricsLoop: function(rootSelector, cycleMs, options){
      const root = document.querySelector(rootSelector || '.lyrics');
      if(!root) return;
      if(root.dataset.loopStarted === '1') return; // guard
      root.dataset.loopStarted = '1';

      const total = cycleMs || 14000; // slightly longer than last line delay
      const congratsDelay = (options && options.congratsDelayMs) || 5800; // line 5 ~5.6s
      const chorusBurst = () => {
        const cx = window.innerWidth * 0.5;
        const cy = window.innerHeight * 0.45;
        for(let i=0;i<3;i++){
          const jx = cx + rand(-120, 120);
          const jy = cy + rand(-80, 80);
          spawnBurst(jx, jy, 110);
        }
      };
      const run = () => {
        // restart sequence by toggling class
        root.classList.remove('play');
        // clear any existing animations on all lines
        const lines = root.querySelectorAll('.line');
        lines.forEach(line => {
          line.style.animation = 'none';
          line.offsetHeight; // force reflow
          line.style.animation = '';
        });
        // force reflow to restart CSS animations
        void root.offsetWidth;
        root.classList.add('play');
        // schedule synced confetti for "Congratulations" line
        setTimeout(chorusBurst, congratsDelay);
      };
      run();
      setInterval(run, total);
    }
  };
})();
