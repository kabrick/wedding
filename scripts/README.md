# Thumbnail Generation Script

This script automatically generates optimized thumbnails for the wedding gallery images.

## What it does

- Creates 400px wide thumbnails from full-size WebP images
- Maintains aspect ratio and quality (80% WebP compression)
- Places thumbnails in `thumbs/` subdirectories within each category folder
- Only regenerates thumbnails if source images are newer (smart caching)
- Works with all gallery categories: kukyala, engagement, pre_shoot, introduction, church, reception

## Usage

### Manual Generation
```bash
npm run thumbnails
```

### Automatic Generation
Thumbnails are automatically generated before each build:
```bash
npm run build  # This will run thumbnails first via prebuild hook
```

### Install Dependencies
First time setup requires installing Sharp:
```bash
npm install
```

## File Structure

After running the script, your image directories will look like:

```
public/images/
├── kukyala/
│   ├── kukyala1.webp           # Original full-size image
│   ├── kukyala2.webp
│   └── thumbs/
│       ├── kukyala1_thumb.webp # 400px thumbnail
│       └── kukyala2_thumb.webp
├── engagement/
│   ├── engagement1.webp
│   └── thumbs/
│       └── engagement1_thumb.webp
└── ...
```

## Performance Benefits

- **Faster Loading**: Gallery loads small 400px thumbnails initially
- **Better UX**: Users see images quickly, full-size loads only when needed
- **Mobile Friendly**: Reduces data usage on mobile devices
- **Smart Caching**: Only regenerates thumbnails when source images change

## Technical Details

- **Thumbnail Size**: 400px width, height auto-calculated
- **Quality**: 80% WebP compression
- **Fallback**: Script handles missing directories and files gracefully
- **Logging**: Detailed console output shows processing status