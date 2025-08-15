# 🎉 Congratulations

> **A stunning animated lyrics experience celebrating success**

Experience the iconic lyrics of "Congratulations" brought to life with mesmerizing animations, gradient text effects, confetti bursts, and a trippy animated background that will blow your mind.

## ✨ Features

- **🌟 Dual Effect Modes**: Switch between low-impact and intense "Malone Mode" effects
- **✨ Low Effects Mode** (Default): Gentle starry background with subtle animations for performance and accessibility
- **🌈 Malone Mode**: Full psychedelic experience with multi-layered animated gradients, color cycling, and intense visual effects
- **📝 Sequential Lyric Animation**: Each line fades in dramatically with perfect timing
- **🎊 Interactive Confetti**: Click or tap anywhere to trigger confetti bursts (reduced intensity in low effects mode)
- **✨ Parallax Sparkles**: Mouse-reactive twinkling stars that follow your cursor
- **🎨 Gradient Text Effects**: Animated rainbow text with shimmer effects on key lines
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **♿ Accessibility**: Respects `prefers-reduced-motion` and provides low-impact default experience
- **⚡ Blazor WebAssembly**: Built with cutting-edge .NET technology

## 🚀 Live Demo

Experience it yourself: [Coming Soon]

## 🎵 Lyrics

*"My momma called, see you on TV, son  
Said shit done changed ever since we was on  
I dreamed it all ever since I was young  
They said I would be nothing  
**Now they always say, Congratulations**  
Worked so hard, forgot how to vacation  
They ain't never had the dedication  
People hatin', say we changed and, look, we made it  
**Yeah, we made it**"*

## 🛠️ Tech Stack

- **Framework**: Blazor WebAssembly (.NET 9)
- **Styling**: CSS3 with advanced animations and effects
- **Interactivity**: Vanilla JavaScript for confetti and sparkle systems
- **Assets**: Custom SVG favicon with generated PNG variants

## 🏃‍♂️ Running Locally

```bash
# Clone the repository
git clone https://github.com/jamesmontemagno/congratulations.git
cd congratulations

# Build and run
dotnet build
dotnet run --project CongratulationsApp

# Open browser to http://localhost:5189
```

## 🎨 Customization

### Animation Timing
Adjust lyric reveal timing in `wwwroot/css/congrats.css`:
```css
.lyrics.play .line-1 { animation-delay: 0.5s; }
.lyrics.play .line-2 { animation-delay: 2.0s; }
/* ... */
```

### Confetti Intensity
Modify confetti density in `wwwroot/js/congrats.js`:
```javascript
spawnBurst(jx, jy, 110); // Third parameter controls particle count
```

### Effect Modes
Toggle between low-impact and intense experiences:
- **Low Effects Mode**: Default starry background with reduced particles for better performance
- **Malone Mode**: Full psychedelic experience with all intense visual effects enabled

Use the toggle button in the top-right corner to switch modes.

### Background Effects
Disable trippy effects for a calmer experience:
```css
@media (prefers-reduced-motion: reduce) {
  /* Simplified animations automatically applied */
}
```

## 🌟 Effects Breakdown

### Effect Modes
**Low Effects Mode (Default)**
- Simple starry night background with gentle gradients
- Reduced confetti particles (30% of full intensity)
- Subtle sparkle animations with reduced parallax
- Toned-down text effects while maintaining readability

**Malone Mode**
- Multi-layered animated gradients with color cycling
- Full confetti intensity with complex particle systems  
- Intense sparkle animations with full parallax effects
- Psychedelic text effects with full intensity

### Background Layers (Malone Mode)
1. **Base Gradients**: Multiple animated linear gradients
2. **Color Cycling**: Hue rotation with saturation/brightness changes
3. **Floating Overlays**: Psychedelic radial and conic gradients
4. **Aurora Effects**: Screen blend mode aurora swirls

### Text Effects
- **Gradient Ink**: Animated rainbow text coloring
- **Dramatic Reveal**: Multi-stage fade/scale/blur animation
- **Shimmer Sweep**: Light sweeps across important lines

### Interactive Elements
- **Global Confetti**: Click/tap anywhere for particle bursts
- **Parallax Sparkles**: Mouse-reactive twinkling background
- **Synced Effects**: Confetti automatically triggers on "Congratulations"

## 📱 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🤝 Contributing

Feel free to submit issues and enhancement requests! This project celebrates creativity and pushing web animation boundaries.

## 📄 License

MIT License - feel free to use this for your own celebration pages!

## 🎯 Inspiration

Built to celebrate achievements and success with style. Sometimes you just need to say "**Congratulations**" in the most epic way possible.

---

**Made with 💜 by [James Montemagno](https://github.com/jamesmontemagno)**

*We made it* ✨
