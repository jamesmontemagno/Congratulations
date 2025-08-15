// Optimized confetti using canvas-confetti library
(function(){
  // Color palette for confetti
  const palette = [
    '#ff7a18', '#ffb84d', '#af00ff', '#8a5cff', '#00d4ff', '#00ffa3', '#ffd6e0'
  ];

  function createConfettiBurst(x, y, count = 120) {
    // Check for low effects mode
    const isLowEffects = document.body.classList.contains('low-effects');
    const adjustedCount = isLowEffects ? Math.round(count * 0.4) : count;
    
    // Create multiple smaller bursts for more dynamic effect
    const burstCount = isLowEffects ? 2 : 3;
    
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        confetti({
          particleCount: Math.round(adjustedCount / burstCount),
          angle: 90 + (i - 1) * 30, // Vary the angle for each burst
          spread: isLowEffects ? 45 : 70,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight
          },
          colors: palette,
          gravity: isLowEffects ? 0.8 : 0.6,
          drift: isLowEffects ? 0 : (Math.random() - 0.5) * 2,
          scalar: isLowEffects ? 0.8 : 1,
          ticks: isLowEffects ? 100 : 160,
          shapes: ['square', 'circle'],
          startVelocity: isLowEffects ? 25 : 35
        });
      }, i * 50);
    }
  }

  function createChorusBurst() {
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.45;
    const isLowEffects = document.body.classList.contains('low-effects');
    
    // Multiple simultaneous bursts for chorus effect
    const positions = [
      { x: cx - 120, y: cy - 50 },
      { x: cx, y: cy },
      { x: cx + 120, y: cy + 50 }
    ];
    
    positions.forEach((pos, i) => {
      setTimeout(() => {
        createConfettiBurst(pos.x, pos.y, isLowEffects ? 80 : 110);
      }, i * 100);
    });
  }

  function createFinalBurst() {
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.55;
    const isLowEffects = document.body.classList.contains('low-effects');
    
    // Spectacular finale burst
    for (let i = 0; i < (isLowEffects ? 3 : 5); i++) {
      setTimeout(() => {
        const jx = cx + (Math.random() - 0.5) * 200;
        const jy = cy + (Math.random() - 0.5) * 150;
        createConfettiBurst(jx, jy, isLowEffects ? 70 : 100);
      }, i * 80);
    }
  }

  // Global click/tap handler -> randomize around pointer
  function onTrigger(e) {
    const baseX = (e.touches?.[0]?.clientX ?? e.clientX ?? window.innerWidth/2);
    const baseY = (e.touches?.[0]?.clientY ?? e.clientY ?? window.innerHeight/2);
    
    createConfettiBurst(baseX, baseY, 80);
  }

  // Export for Blazor init and manual trigger
  window.CongratsFX = {
    init: function() {
      document.addEventListener('click', onTrigger);
      document.addEventListener('touchstart', onTrigger, {passive: true});
    },
    burstAt: createConfettiBurst,
    playLyricsLoop: function(rootSelector, cycleMs, options) {
      const root = document.querySelector(rootSelector || '.lyrics');
      if (!root) return;
      if (root.dataset.loopStarted === '1') return; // guard
      root.dataset.loopStarted = '1';

      const total = cycleMs || 14000;
      const congratsDelay = (options && options.congratsDelayMs) || 5800;
      const finalDelay = (options && options.finalDelayMs) || 12500;
      
      // Confetti timings for each line (matching CSS animation delays)
      const lineConfettiDelays = [
        500,   // line 1
        2000,  // line 2  
        3500,  // line 3
        5000,  // line 4
        6500,  // line 5 (Congratulations)
        8000,  // line 6
        9500,  // line 7
        11000, // line 8
        12500  // line 9 (Yeah, we made it)
      ];
      
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
        
        // Schedule confetti for each line
        lineConfettiDelays.forEach((delay, index) => {
          setTimeout(() => {
            const lineNumber = index + 1;
            const isImportantLine = lineNumber === 5 || lineNumber === 9; // Congratulations and finale
            
            if (isImportantLine) {
              // Special burst for important lines
              if (lineNumber === 5) {
                createChorusBurst();
              } else {
                createFinalBurst();
              }
            } else {
              // Small burst for regular lines
              const cx = window.innerWidth * 0.5;
              const cy = window.innerHeight * 0.4;
              const jx = cx + (Math.random() - 0.5) * 300;
              const jy = cy + (Math.random() - 0.5) * 200;
              createConfettiBurst(jx, jy, 40); // Smaller burst for regular lines
            }
          }, delay);
        });
      };
      run();
      setInterval(run, total);
    }
  };
})();
