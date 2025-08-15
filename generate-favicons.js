const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Read the SVG file
const svgContent = fs.readFileSync('/Volumes/ExData/GitHub/Congratulations/CongratulationsApp/wwwroot/favicon.svg', 'utf8');

// Convert SVG to data URL
const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;

// Sizes to generate
const sizes = [16, 32, 192];

async function generateFavicons() {
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    try {
      const img = await loadImage(svgDataUrl);
      ctx.drawImage(img, 0, 0, size, size);
      
      const buffer = canvas.toBuffer('image/png');
      const filename = size === 192 ? 'icon-192.png' : `favicon-${size}.png`;
      fs.writeFileSync(`/Volumes/ExData/GitHub/Congratulations/CongratulationsApp/wwwroot/${filename}`, buffer);
      console.log(`Generated ${filename} (${size}x${size})`);
    } catch (error) {
      console.error(`Error generating ${size}x${size}:`, error.message);
    }
  }
}

generateFavicons().catch(console.error);
