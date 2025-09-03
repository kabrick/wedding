const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const categories = ['kukyala', 'engagement', 'pre_shoot', 'introduction', 'church', 'reception'];

const thumbnailConfig = {
  width: 400,
  quality: 80,
  suffix: '_thumb'
};

async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

async function generateThumbnails() {
  console.log('Starting thumbnail generation...');
  
  for (const category of categories) {
    const sourceDir = path.join('public', 'images', category);
    const thumbsDir = path.join(sourceDir, 'thumbs');
    
    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.log(`Source directory not found: ${sourceDir}`);
      continue;
    }
    
    // Create thumbs directory
    await ensureDirectoryExists(thumbsDir);
    
    // Get all WebP files in the category directory
    const files = fs.readdirSync(sourceDir)
      .filter(file => file.endsWith('.webp') && !file.includes('_thumb'))
      .filter(file => fs.statSync(path.join(sourceDir, file)).isFile());
    
    if (files.length === 0) {
      console.log(`No WebP images found in ${category}`);
      continue;
    }
    
    console.log(`Processing ${files.length} images in ${category}...`);
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const baseName = file.replace('.webp', '');
      const thumbPath = path.join(thumbsDir, `${baseName}${thumbnailConfig.suffix}.webp`);
      
      try {
        // Check if thumbnail already exists and is newer than source
        if (fs.existsSync(thumbPath)) {
          const sourceStats = fs.statSync(sourcePath);
          const thumbStats = fs.statSync(thumbPath);
          
          if (thumbStats.mtime > sourceStats.mtime) {
            console.log(`Skipping ${file} (thumbnail up to date)`);
            continue;
          }
        }
        
        // Generate thumbnail
        await sharp(sourcePath)
          .resize(thumbnailConfig.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ 
            quality: thumbnailConfig.quality,
            effort: 6 
          })
          .toFile(thumbPath);
          
        console.log(`Generated thumbnail: ${category}/${file}`);
        
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }
  
  console.log('Thumbnail generation completed!');
}

// Handle command line execution
if (require.main === module) {
  generateThumbnails().catch(error => {
    console.error('Thumbnail generation failed:', error);
    process.exit(1);
  });
}

module.exports = { generateThumbnails };