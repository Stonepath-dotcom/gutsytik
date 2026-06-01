# Task 1: Implement 3 Features for GetMova

## Summary

All 3 features were successfully implemented in `/home/z/my-project/src/app/page.tsx`:

### Feature A: QR Code Scanner
- Installed `html5-qrcode` package
- Added `QrCode` import from lucide-react
- Added `showQR` state to HeroSection
- Added QR scanner useEffect that dynamically imports html5-qrcode and starts camera scanning
- Added QR button next to the history button in the shortcut hint area
- Added QR scanner modal with camera preview and close button
- When a URL is detected, it auto-fills the input, closes the modal, and triggers analysis

### Feature B: Trending Section
- Added trending translations for both `id` and `en` locales
- Added `TrendingSection` function component that:
  - Fetches trending videos from tikwm API on mount
  - Shows 6 video cards in 2x3 (mobile) / 3x2 (desktop) grid
  - Displays thumbnail, title, and author for each video
  - Shows loading skeleton state
  - Quick download: clicking a card auto-fills the hero input and triggers download
- Added `<TrendingSection />` before `<Footer />` in the Home component

### Feature C: Audio Bitrate Selector
- Added `audioBitrate` state (default: "192") to HeroSection
- Added bitrate selector UI that appears when the selected quality is MP3 or Audio
- Shows 4 bitrate options: 128kbps, 192kbps, 256kbps, 320kbps
- Styled consistently with the existing quality button design (#E52222 accent)
- Uses `Headphones` icon from lucide-react for the bitrate label

## Build Verification
- `npx next build` completed successfully with no errors
