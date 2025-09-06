# Q-isms - Nuxt.js Quote Display Application

Q-isms is a Nuxt.js 3 web application that displays random humorous quotes from Q (Tony) with an animated fox character, dark mode toggle, and beautiful gradient styling.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Development
- Install dependencies: `npm install`
  - **NEVER CANCEL**: Takes 1-2 minutes. Set timeout to 180+ seconds.
  - **Expected warnings**: Font provider errors (google, googleicons, bunny, fontshare, fontsource) due to network restrictions - these are normal and do not affect functionality.
  - **Expected vulnerabilities**: npm audit may show 2+ moderate vulnerabilities - these are in development dependencies and do not affect production builds.

- Development server: `npm run dev` 
  - Starts server on `http://localhost:3000`
  - **Expected warnings**: Same font provider errors as install - application still works perfectly.
  - Server starts in 10-20 seconds including initial build.

- Production build: `npm run build`
  - **NEVER CANCEL**: Takes 15-25 seconds. Set timeout to 120+ seconds.
  - Creates optimized build in `.output/` directory.
  - **Expected warnings**: Font provider errors and Browserslist data warnings - these do not affect build success.

- Static generation: `npm run generate`
  - **NEVER CANCEL**: Takes 10-15 seconds. Set timeout to 120+ seconds. 
  - Creates static site in `.output/public/` ready for deployment.
  - Prerenders all routes including error pages.

### Validation After Changes
**ALWAYS run through complete end-to-end scenarios after making changes:**

1. **Quote Display Test**:
   - Visit `http://localhost:3000`
   - Verify a quote displays in the gradient-bordered box
   - Click the quote box to trigger loading animation
   - Wait 2+ seconds for new quote to appear
   - Verify "- Q (Tony)" attribution appears

2. **Dark Mode Test**:
   - Click the sun/moon icon in top-right corner
   - Verify background changes from light to dark theme
   - Verify quote box styling adapts to dark theme
   - Toggle back to light mode

3. **Navigation Test**:
   - Click the Twitch icon in footer
   - Verify it opens `https://www.twitch.tv/qwinnlucky13`

### Important Build Notes
- **Font Provider Errors**: Always expect "Could not initialize provider" errors for google, googleicons, bunny, fontshare, and fontsource during builds. These are due to network restrictions and DO NOT affect functionality.
- **No Linting**: This project has no ESLint, Prettier, or other linting tools configured. Code formatting should follow existing patterns.
- **No Tests**: This project has no test framework configured. Manual validation is required.

## Key Architecture

### File Structure
```
/
├── .github/
│   └── workflows/nuxthub.yml    # CI/CD deployment
├── components/
│   ├── AppNav.vue               # Top navigation with title and theme toggle
│   └── AppFooter.vue           # Footer with Twitch link
├── pages/
│   └── index.vue               # Main quote display page
├── public/
│   ├── data.json              # Quote data source (50+ quotes)
│   └── foxes/                 # Fox character images (static/animated)
├── app.vue                    # Root component with layout
├── nuxt.config.ts            # Nuxt configuration
├── package.json              # Dependencies and scripts
└── tailwind.config.js        # Custom animations and styling
```

### Core Components
- **Quote Engine**: Fetches from `/data.json`, displays random quote with 2-second loading simulation
- **Theme System**: Uses Nuxt UI color mode with light/dark toggle
- **Animation System**: Custom CSS animations for borders, loading states, and subtle tilting effects
- **Responsive Design**: Mobile-first with Tailwind CSS and grid backgrounds

### Dependencies
- **Nuxt 3.14.159**: Vue.js framework with SSR/SSG
- **@nuxt/ui**: Component library with dark mode support
- **Tailwind CSS**: Utility-first CSS framework
- **tailwindcss-motion**: Additional animation utilities
- **@nuxt/fonts**: Font loading (causes warnings but works)

## Common Tasks

### Repository Root Contents
```bash
ls -la
# Key files you'll see:
.github/           # CI/CD workflows
.gitignore         # Standard Nuxt gitignore
.vscode/           # VS Code settings
LICENSE            # Project license
README.md          # Basic Nuxt setup instructions
app.vue            # Root component
components/        # Vue components
node_modules/      # Dependencies (after npm install)
nuxt.config.ts     # Nuxt configuration
package.json       # Project manifest
pages/             # Route pages
public/            # Static assets
server/            # Server-side files
tailwind.config.js # Tailwind configuration
tsconfig.json      # TypeScript configuration
```

### Package.json Scripts
```json
{
  "scripts": {
    "build": "nuxt build",        # Production build
    "dev": "nuxt dev",           # Development server
    "generate": "nuxt generate",  # Static site generation
    "preview": "nuxt preview",   # Preview production build
    "postinstall": "nuxt prepare" # Auto-runs after npm install
  }
}
```

### Data Structure (public/data.json)
```json
{
  "quotes": [
    "The greatest form of flattery is mimication.",
    "I'm just talking off the cuff of my pants.",
    // ... 48 more unique Q quotes
  ]
}
```

## Troubleshooting

### Expected "Errors" That Are Normal
1. **Font Provider Failures**: Multiple "Could not initialize provider" errors during build/dev - ignore these
2. **Browserslist Warning**: "browsers data is 11 months old" - this doesn't affect functionality
3. **npm Vulnerabilities**: Development dependency vulnerabilities - safe to ignore for this simple app
4. **Icon Loading Warnings**: `mdi:twitch` icon warnings in console - Twitch icon still displays correctly

### When Builds Fail
1. **Clear caches**: `rm -rf node_modules package-lock.json && npm install`
2. **Check Node version**: Requires Node.js 18+ (tested with v20.19.4)
3. **Network issues**: Font provider errors are expected, but if builds completely fail, check internet connectivity

### When Development Server Won't Start
1. **Port conflicts**: Default port 3000 - kill existing processes or use `--port` flag
2. **Permission issues**: Ensure write access to `.nuxt` directory
3. **Memory issues**: Nuxt builds can be memory-intensive on constrained systems

## Performance Expectations
- **Cold install**: 1-2 minutes
- **Development server startup**: 10-20 seconds  
- **Production build**: 15-25 seconds
- **Static generation**: 10-15 seconds
- **Hot reload**: 1-3 seconds for component changes

Always use appropriate timeouts (120+ seconds for builds, 180+ seconds for install) and never cancel operations prematurely.