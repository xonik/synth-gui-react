# Vite Migration Guide

This project has been successfully upgraded from Create React App to Vite.

## Key Changes

### 1. **Build Tool**
- Replaced `react-scripts` with Vite
- Much faster development server and builds
- Better ES modules support

### 2. **Dependencies Updated**
- React 18.2.0 (from 16.13.1)
- React DOM 18.2.0 (from 16.13.1)
- TypeScript 5.3.3 (from 4.3.2)
- All other dependencies updated to modern versions

### 3. **Scripts Changed**
- `npm start` → `npm run dev`
- `npm run build` - now uses Vite (same command, faster)
- New: `npm run type-check` - run TypeScript type checking
- New: `npm run preview` - preview production build locally
- Updated: `npm run run-ts` - now uses `tsx` instead of `ts-node`

### 4. **HTML Changes**
- Removed `%PUBLIC_URL%` variable substitution (not needed with Vite)
- Updated paths: `/favicon.ico` instead of `%PUBLIC_URL%/favicon.ico`
- Added script module entry: `<script type="module" src="/src/index.tsx"></script>`

### 5. **React 18 API Changes**
- `ReactDOM.render()` → `ReactDOM.createRoot()` in `src/index.tsx`
- Added `React.StrictMode` wrapper for development warnings

### 6. **Build Output**
- Output directory changed: `/build` → `/dist`
- Updated `.gitignore` accordingly

### 7. **Configuration Files**
- New: `vite.config.ts` - Vite configuration
- Updated: `tsconfig.json` - for ES2020 target
- Removed: CRA's internal webpack config (no longer needed)

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

## Migration Notes

### Environment Variables
If you were using CRA's `REACT_APP_*` variables, Vite uses `VITE_*` instead:
- Rename `.env` variables from `REACT_APP_VAR` to `VITE_VAR`
- Update code references: `process.env.REACT_APP_VAR` → `import.meta.env.VITE_VAR`

### Public Assets
- Assets in `public/` are copied to `dist/` during build
- Reference them with absolute paths: `/image.png`
- No need for `%PUBLIC_URL%` placeholder

### Service Worker
- The service worker code is unchanged
- It's still included in the build

### Testing
- CRA's Jest setup has been removed
- Consider using Vitest for testing: https://vitest.dev/
- Install with: `npm install -D vitest @vitest/ui`

### SCSS/SASS
- No changes needed - Vite handles SASS out of the box
- The proxy config for the backend API is set in `vite.config.ts`

## Deployment

### GitHub Pages
```bash
npm run predeploy  # Builds the project
npm run deploy     # Deploys to gh-pages
```

The deploy script now points to `dist/` instead of `build/`.

## Node Version Requirement

The project now works with Node 16+, but Node 18+ is recommended for better compatibility with modern packages.

## Troubleshooting

### Port Already in Use
By default, Vite uses port 5173. Change it in `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change this
}
```

### API Proxy Not Working
The proxy config in `vite.config.ts` redirects `/api` to `http://localhost:3001`. If your backend is on a different port, update the config.

### Module Resolution Issues
If you get "Cannot find module" errors, check that:
1. File paths are case-sensitive on macOS (they're sensitive on Linux/Windows too)
2. You're not using CRA-specific features like `require.context()`

## Performance Improvements

Vite provides significant improvements:
- ⚡ ~2-3x faster dev server startup
- ⚡ ~10-20x faster HMR (Hot Module Replacement)
- ⚡ Faster production builds
- ⚡ Better tree-shaking for smaller bundles

## Resources

- Vite Documentation: https://vitejs.dev/
- React with Vite: https://react.dev/learn/start-a-new-react-project
- Migrate from CRA: https://vitejs.dev/guide/migration.html

