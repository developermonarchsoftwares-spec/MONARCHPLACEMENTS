import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Helper to assemble standard ICO format from array of PNG buffers
function createIco(pngItems) {
  const count = pngItems.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  let currentOffset = 6 + count * 16;
  const directoryEntries = [];

  for (const item of pngItems) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data in bytes
    entry.writeUInt32LE(currentOffset, 12); // offset of image data
    directoryEntries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngItems.map(item => item.buffer)]);
}

async function run() {
  const projectRoot = process.cwd();
  const publicDir = path.join(projectRoot, 'public');
  const appDir = path.join(projectRoot, 'src', 'app');

  console.log('Reading base logo from public/logo.png...');
  // Extract the geometric Monarch M emblem (x: 106-259, y: 46-205)
  const markBuffer = await sharp(path.join(publicDir, 'logo.png'))
    .extract({ left: 106, top: 46, width: 154, height: 160 })
    .toBuffer();

  const markMeta = await sharp(markBuffer).metadata();
  console.log(`Extracted Monarch emblem mark: ${markMeta.width}x${markMeta.height}`);

  // Create high-res 1024x1024 master circle icon for pristine downsampling
  const masterSize = 1024;
  const circleRadius = 506; // radius leaves 6px margin for anti-aliasing
  const markTargetSize = 650; // ~64% ratio matching reference screenshot

  const resizedMark = await sharp(markBuffer)
    .resize(markTargetSize, markTargetSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const circleSvg = Buffer.from(
    `<svg width="${masterSize}" height="${masterSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${masterSize / 2}" cy="${masterSize / 2}" r="${circleRadius}" fill="#000000"/>
    </svg>`
  );

  console.log('Creating master circular icon...');
  const masterCircleBuffer = await sharp({
    create: {
      width: masterSize,
      height: masterSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: circleSvg, top: 0, left: 0 },
      { input: resizedMark, gravity: 'center' },
    ])
    .png()
    .toBuffer();

  // Helper to downsample master circle with high quality lanczos3
  async function generateIcon(size) {
    return sharp(masterCircleBuffer)
      .resize(size, size, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
  }

  // 1. Generate PNG sizes
  console.log('Generating favicon-16x16.png (circle)...');
  const png16 = await generateIcon(16);
  await fs.writeFile(path.join(publicDir, 'favicon-16x16.png'), png16);

  console.log('Generating favicon-32x32.png (circle)...');
  const png32 = await generateIcon(32);
  await fs.writeFile(path.join(publicDir, 'favicon-32x32.png'), png32);

  console.log('Generating favicon-48x48.png (circle)...');
  const png48 = await generateIcon(48);
  await fs.writeFile(path.join(publicDir, 'favicon-48x48.png'), png48);

  console.log('Generating apple-touch-icon.png (180x180 circle)...');
  const png180 = await generateIcon(180);
  await fs.writeFile(path.join(publicDir, 'apple-touch-icon.png'), png180);

  console.log('Generating icon-192.png (circle)...');
  const png192 = await generateIcon(192);
  await fs.writeFile(path.join(publicDir, 'icon-192.png'), png192);

  console.log('Generating icon-512.png (circle)...');
  const png512 = await generateIcon(512);
  await fs.writeFile(path.join(publicDir, 'icon-512.png'), png512);

  // 2. Multi-resolution ICO
  console.log('Building circular multi-resolution favicon.ico...');
  const png64 = await generateIcon(64);
  const png128 = await generateIcon(128);
  const png256 = await generateIcon(256);

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
    { width: 64, height: 64, buffer: png64 },
    { width: 128, height: 128, buffer: png128 },
    { width: 256, height: 256, buffer: png256 },
  ]);

  // Save to public/favicon.ico and src/app/favicon.ico
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);
  await fs.writeFile(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Circular favicon.ico successfully written to public/ and src/app/ !');

  // 3. Generate favicon.svg (Vector SVG circle with centered high-res Monarch mark)
  console.log('Generating circular favicon.svg...');
  const pngMark512 = await sharp(markBuffer)
    .resize(328, 328, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const base64Mark = pngMark512.toString('base64');
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <circle cx="256" cy="256" r="256" fill="#000000" />
  <image href="data:image/png;base64,${base64Mark}" x="92" y="92" width="328" height="328" />
</svg>
`;
  await fs.writeFile(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('Circular favicon.svg successfully written!');

  console.log('All circular favicon assets generated successfully!');
}

run().catch(err => {
  console.error('Error generating circular favicons:', err);
  process.exit(1);
});
