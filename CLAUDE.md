# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo module that provides Font Awesome icon integration for Hinode sites. The module imports FontAwesome directly from the official Git repository as a Hugo module (no npm dependencies). It supports three rendering modes: SVG symbols (static), SVG+JS (runtime), and webfonts.

**Version 4.x Architecture:** This module imports Font Awesome as a Hugo module from `github.com/FortAwesome/Font-Awesome`, eliminating npm dependencies. All assets are vendored through Hugo's module system. No dist/ folder or build scripts needed.

## Development Commands

### Setup and Installation
```bash
npm install              # Install dev dependencies (commitlint, husky, etc.)
npm run mod:vendor      # Vendor Hugo modules into _vendor/ (includes FontAwesome)
npm run mod:tidy        # Tidy up Hugo modules
```

**Note:** FontAwesome is imported as a Hugo module, not an npm dependency. No npm installation required for FontAwesome assets.

### Running Locally
```bash
npm start               # Start development server (http://localhost:1313)
npm run build           # Build production site
npm run clean           # Clean generated files (public/, resources/)
```

### Maintenance
```bash
npm run mod:update      # Update FontAwesome to latest 7.x + all Hugo modules
npm run upgrade         # Check and update all npm packages (dev dependencies only)
npm test                # Build site (validates configuration and templates)
```

**FontAwesome updates:** The module tracks Font Awesome 7.x branch. Running `mod:update` executes:
```bash
hugo mod get -u github.com/FortAwesome/Font-Awesome@7.x
```

### Git Commits
```bash
npx git-cz              # Prepare commit message (enforces Conventional Commits)
```

**Important:** Commits must follow [Conventional Commits](https://www.conventionalcommits.org) format. The repository uses husky and commitlint to validate this automatically. Use `npx git-cz` to ensure proper formatting.

## Architecture

### Rendering Modes

The module supports three rendering modes controlled by `inline` and `embed` parameters:

**1. SVG Symbols Mode (inline=true, embed=true):**
- Loads static SVG files from Hugo resources at build time
- Creates reusable SVG symbols with `<symbol>` and `<use>` references
- Icons output as `<svg overflow="visible"><use href="#fas-heart"></use></svg>` markup
- No JavaScript required - pure static SVG
- Uses `overflow="visible"` attribute to prevent clipping of FA v7 icons with negative coordinates
- Best for: Static sites, performance-critical applications, when JS is disabled
- Requires: `{{- partial "assets/symbols.html" . -}}` in layout to output symbol definitions

**2. SVG+JS Mode (inline=true, embed=false):**
- Uses FontAwesome's official SVG+JS runtime
- Loads FontAwesome JavaScript library via `fontawesome-loader.js`
- Icons output as `<i class="fas fa-heart"></i>` markup
- FontAwesome JS converts to SVG at runtime in browser
- Proper scaling, sizing, accessibility handled by FontAwesome automatically
- Best for: Dynamic applications, when using FontAwesome animations/features
- Requires: Hinode module integration (automatically loads JS)

**3. Webfont Mode (inline=false):**
- Uses FontAwesome webfonts rendered via CSS
- Loads FontAwesome CSS files with @font-face rules
- Icons output as `<i class="fas fa-heart"></i>` markup
- Rendered as webfonts via CSS (::before pseudo-elements)
- Best for: Simple integration, legacy browser support

### Multi-Library Support

The icon.html partial supports multiple icon libraries:

1. **FontAwesome (fas, fa, fab, far):**
   - `inline=true, embed=true`: Static SVG with symbol references (loads from `assets/svgs/fa/`)
   - `inline=true, embed=false`: `<i>` tags rendered by FontAwesome JS
   - `inline=false`: `<i>` tags rendered as webfonts via CSS
2. **Bootstrap Icons (bi) and other libraries:**
   - `inline=true`: Static SVG loaded from `assets/svgs/{family}/{name}.svg`
   - `inline=false`: `<i>` tag rendered as webfont
3. **Custom SVGs:** Always loaded via `resources.Get` using `src` parameter

### Hugo Module Architecture

The module imports Font Awesome directly from the official Git repository as a Hugo module:

```toml
[[module.imports]]
  path = "github.com/FortAwesome/Font-Awesome"
```

**Hugo Mounts** (from vendored module):
- **SCSS:** `scss` → `assets/scss/modules/fontawesome` (for webfont mode)
- **Webfonts:** `webfonts` → `static/webfonts` (for webfont mode)
- **SVGs:** `svgs` → `assets/svgs/fa` (for SVG symbols mode)
- **JS:** `js` → `static/js/fontawesome` (for SVG+JS mode - minified files only)

**Module loader:**
- **JS loader:** `assets/js/modules/fontawesome/fontawesome-loader.js` → Hinode module system

**Version Management:**
- Font Awesome uses non-standard Git tags (e.g., "Release 7.0.0" instead of "v7.0.0")
- This breaks Go module semantic versioning
- Solution: Import from `@7.x` branch, which resolves to a pseudo-version in `go.mod`
- Example: `github.com/FortAwesome/Font-Awesome v0.0.0-20260210181720-337dd2045d56`
- To update: `hugo mod get -u github.com/FortAwesome/Font-Awesome@7.x`

This approach:
- ✅ No npm dependency for FontAwesome
- ✅ No dist/ folder to maintain
- ✅ No build scripts needed
- ✅ Smaller git repository
- ✅ Official FontAwesome repository as source
- ✅ Automatic vendoring via Hugo modules

### Configuration Options

Set in `params.modules.fontawesome` of your Hugo config:

```toml
[params.modules.fontawesome]
  inline = true              # Use SVG mode (true) or webfonts (false)
  embed = true               # Use SVG symbols (true) or SVG+JS runtime (false) - only applies when inline=true
  debug = false              # Show original markup as comments (FontAwesome icons only)
  skipMissing = false        # Warn vs. error on missing icons
```

**Parameters:**
- `inline` (boolean, default: true) - Primary rendering mode selection
  - `true`: Use SVG rendering (behavior depends on `embed` setting)
  - `false`: Use webfonts via CSS

- `embed` (boolean, default: true) - SVG rendering method (only applies when `inline=true`)
  - `true`: SVG symbols mode - loads static SVGs at build time, creates reusable symbols with `<use>` references. Requires `{{- partial "assets/symbols.html" . -}}` in your layout to output symbol definitions. No JavaScript required.
  - `false`: SVG+JS mode - uses FontAwesome JavaScript runtime to convert `<i>` tags to SVG at runtime in browser

- `debug` (boolean, default: false) - Debug output for FontAwesome icons. Shows original markup as HTML comments.

- `skipMissing` (boolean, default: false) - Error handling for missing icons
  - `true`: Display warning when icon cannot be found
  - `false`: Exit with error when icon cannot be found

**Removed parameters (from v3):**
- `renderMode` - No per-family mixed mode support in v4
- `styles` - No longer configurable; all icon sets (solid, regular, brands) always available

### Template Integration

**For SVG+JS mode (inline=true, embed=false):**
- Hinode sites automatically load the FontAwesome JavaScript via the module integration system
- The loader file `assets/js/modules/fontawesome/fontawesome-loader.js` is integrated via Hinode's module loader
- No manual template inclusion required for Hinode sites
- Non-Hinode sites: Include the loader script in your layout before `</body>`

**For SVG symbols mode (inline=true, embed=true):**
- Must include the symbols partial in your layout to output symbol definitions:
  ```html
  {{- partial "assets/symbols.html" . -}}
  ```
- Place this partial anywhere in your layout (typically in `<head>` or before `</body>`)
- No JavaScript required

**For webfont mode (inline=false):**
- No template integration required
- CSS automatically loaded via SCSS imports

### Shortcode Usage

All shortcodes delegate to the core `icon.html` partial:

- `{{< icon "fas heart" >}}` - Solid icon (using family prefix)
- `{{< fa "heart" >}}` - Regular icon (shorthand for fa-regular)
- `{{< fab "github" >}}` - Brand icon
- `{{< fas "star" >}}` - Solid icon
- `{{< icon "fas heart" wrapper="..." inline-style="..." >}}` - With options

### Icon Resolution Process

**For FontAwesome icons:**
1. User calls shortcode with icon name (e.g., `fas heart`)
2. `icon.html` partial extracts family and icon name
3. Rendering depends on mode:
   - **SVG symbols mode (`inline=true, embed=true`):**
     - Loads static SVG from `assets/svgs/fa/{family}/{name}.svg`
     - Creates symbol reference: `<svg overflow="visible" viewBox="..."><use href="#fas-heart"></use></svg>`
     - Adds `overflow="visible"` attribute to prevent clipping of FA v7 icons with negative coordinates
     - Stores symbol definition (with `overflow="visible"`) in page.Scratch for output via `symbols.html` partial
     - Animated icons (fa-spin, fa-beat, etc.) use inline SVG instead (no symbols)
   - **SVG+JS mode (`inline=true, embed=false`):**
     - Outputs simple `<i class="fas fa-heart"></i>` tag
     - FontAwesome JS converts to SVG at runtime in browser
   - **Webfont mode (`inline=false`):**
     - Outputs `<i class="fas fa-heart"></i>` tag
     - CSS renders as webfont with ::before pseudo-element

**For other icon libraries (Bootstrap Icons, etc.):**
1. If `inline=true, embed=true`: Load static SVG from `assets/svgs/{family}/{name}.svg` and create symbol references (same as FontAwesome)
2. If `inline=true, embed=false`: Load static SVG as inline SVG (no symbols)
3. If `inline=false`: Output `<i>` tag for webfont rendering
4. Width/height attributes removed to allow fa-2x, fa-4x, etc. sizing utilities to work
5. Original class/fill attributes cleaned to prevent duplicates

**For custom SVGs (src parameter):**
1. Always load via `resources.Get` with basic SVG processing
2. In embed mode (`embed=true`): Creates symbol references like other icon types
3. Width/height attributes removed to allow CSS sizing utilities

## Important Implementation Details

**FontAwesome JS Loading (SVG+JS mode: inline=true, embed=false):**
- Loader: `assets/js/modules/fontawesome/fontawesome-loader.js`
- Loads in order: fontawesome.min.js, solid.min.js, regular.min.js, brands.min.js
- Scripts loaded with `async=false` to ensure proper loading order
- Only outputs when `inline=true AND embed=false`
- Integrated via Hinode's module system (automatically included)

**SVG Symbol Loading (SVG symbols mode: inline=true, embed=true):**
- Loads static SVG files from `assets/svgs/fa/{family}/{name}.svg` at build time
- Uses original viewBox from FontAwesome (no adjustments)
- Adds `overflow="visible"` SVG attribute to both symbol definitions and containing `<svg>` elements
- This prevents clipping of FA v7 icons with paths extending beyond the viewBox (e.g., negative coordinates)
- Creates reusable symbol definitions stored in page.Scratch
- Symbol definitions output via `{{- partial "assets/symbols.html" . -}}` partial
- Animated icons (fa-spin, fa-beat, etc.) use inline SVG instead of symbols (for correct transform behavior)

**CSS Loading:**
- **SVG symbols mode** (`inline=true, embed=true`): Loads core utilities + custom SVG CSS
  - Core utilities: sizing (fa-2x, fa-3x), animations (fa-spin, fa-beat), stacking (fa-stack), etc.
  - Custom SVG CSS: vertical alignment, overflow handling, stacking support
  - Vertical alignment matches FontAwesome's SVG+JS mode (base: `-0.125em`, size-specific overrides)
- **Webfont mode** (`inline=false`): Loads core utilities + webfont CSS
  - Core utilities: same as SVG symbols mode
  - Webfont CSS: solid.scss, regular.scss, brands.scss (with @font-face rules)
  - Custom SVG CSS: for custom SVG icons (vertical alignment, overflow handling)
- **SVG+JS mode** (`inline=true, embed=false`): NO core utilities or custom CSS loaded
  - FontAwesome JavaScript provides complete CSS (all sizing, animations, stacking, etc.)
  - Loading core utilities in this mode causes CSS conflicts with FontAwesome's JS-injected styles
  - Critical for stacked icons: core utilities' `.fa-stack` rules conflict with FA's runtime CSS
- No CSS conflicts between modes due to conditional loading

**Clipping Prevention for FA v7 Icons:**
- Font Awesome 7.x icons can have paths with negative coordinates (e.g., star icon has y=-18.9)
- Standard viewBox (e.g., "0 0 512 512") would normally clip content outside these bounds
- Solution: Add `overflow="visible"` SVG attribute (per [FontAwesome SVG Sprites documentation](https://docs.fontawesome.com/web/add-icons/svg-sprites/))
- Applied to both symbol definitions (`<symbol overflow="visible">`) and containing SVG elements
- Maintains original viewBox for proper scaling while allowing content to render beyond bounds
- Alternative approaches (viewBox adjustment, inline SVG) caused vertical alignment or transform issues

**Vertical Alignment in SVG Symbols Mode:**
- Replicates FontAwesome's official SVG+JS vertical-align values (extracted from FontAwesome v7.2.0 JavaScript)
- Base alignment: `vertical-align: -0.125em` for `.svg-inline--fa` class
- Size-specific overrides to match FontAwesome's behavior:
  - `.svg-inline--fa.fa-2xs`: `0.1em`
  - `.svg-inline--fa.fa-xs`: `0em`
  - `.svg-inline--fa.fa-sm`: `-0.0714285714em`
  - `.svg-inline--fa.fa-lg`: `-0.2em`
  - `.svg-inline--fa.fa-xl`: `-0.25em`
  - `.svg-inline--fa.fa-2xl`: `-0.3125em`
- Ensures consistent vertical centering across all three rendering modes (symbols, SVG+JS, webfonts)

**Width/Height Removal for CSS Sizing:**
- All icon types (FontAwesome, Bootstrap Icons, custom SVGs) have width/height attributes removed from SVG elements
- Allows CSS sizing utilities (fa-2x, fa-3x, fa-4x, etc.) to work correctly
- Icons scale based on `font-size` set by size classes, not fixed pixel dimensions
- Only exception: Symbol definitions in embed mode have width/height removed to prevent conflicts

**Stacked Icon Support Across All Modes:**
- FontAwesome's icon stacking (using `fa-stack`, `fa-stack-1x`, `fa-stack-2x` classes) works correctly in all three rendering modes
- **SVG symbols mode** (`inline=true, embed=true`):
  - Uses symbol references for stacked icons (no inline SVG needed)
  - Custom `.fa-stack` CSS provides proper positioning and sizing
  - Icons scale correctly relative to each other (2x vs 1x)
- **SVG+JS mode** (`inline=true, embed=false`):
  - Core utilities CSS excluded to prevent conflicts with FontAwesome's JavaScript
  - FontAwesome JS provides complete stacking CSS at runtime
  - Critical fix: Loading core utilities' `.fa-stack` rules in this mode caused sizing conflicts
- **Webfont mode** (`inline=false`):
  - Core utilities CSS provides stacking support
  - Webfonts render via ::before pseudo-elements with correct positioning
- **Implementation**: `assets/scss/fontawesome.scss` conditionally excludes core utilities when `inline=true AND embed=false` to avoid CSS conflicts with FontAwesome's JavaScript-injected styles
- Stacked icons also have spacing disabled (no `&nbsp;` between icons) to prevent layout issues

**Removed Features (from v3):**
- Custom scaling logic - Handled by FontAwesome or CSS
- Mixed renderMode per-family configuration - Simplified to global modes
- npm dependency - Now uses Hugo module import

## Breaking Changes from v3

1. **Removed renderMode config** - No per-family mixed mode support; global `inline` and `embed` settings instead
2. **Changed embed parameter behavior** - Now controls SVG rendering method (symbols vs JS runtime), not just symbol maps
3. **Removed styles parameter** - All icon sets (solid, regular, brands) always available
4. **Changed architecture** - No longer uses npm; imports from Git repository as Hugo module
5. **Changed mounting** - Mounts from vendored Hugo module, not node_modules
6. **Requires Hinode integration** - JS loader integrated via Hinode module system (non-Hinode sites need manual integration)
7. **No dist/ folder** - FontAwesome files mounted from vendored Hugo module
8. **Hugo minimum version** - Lowered to 0.110.0 (from 0.153.0)

## Migration from v3 to v4

**1. Update configuration:**
```toml
# OLD v3 config (remove this)
[params.modules.fontawesome]
  inline = true
  [params.modules.fontawesome.renderMode]
    fab = "font"

# NEW v4 config (current)
[params.modules.fontawesome]
  inline = true              # Use SVG mode (true) or webfonts (false)
  embed = true               # Use SVG symbols (true) or SVG+JS runtime (false)
  debug = false
  skipMissing = false
  # Note: 'styles' parameter removed - all icon sets always available
```

**2. Update module import:**
```toml
# In config.toml - module now imports from Git repository
[[module.imports]]
  path = "github.com/FortAwesome/Font-Awesome"
```

**3. Vendor the module:**
```bash
hugo mod get -u github.com/FortAwesome/Font-Awesome@7.x
hugo mod vendor
hugo mod tidy
```

**4. Template integration (mode-specific):**

For **SVG symbols mode** (`inline=true, embed=true`):
```html
<!-- Add to layout (head or before </body>) -->
{{- partial "assets/symbols.html" . -}}
```

For **SVG+JS mode** (`inline=true, embed=false`):
- Hinode sites: Automatically integrated via module system (no action needed)
- Non-Hinode sites: Include `fontawesome-loader.js` in your layout

For **webfont mode** (`inline=false`):
- No template changes required

**5. Update Hugo minimum version:**
```toml
[module.hugoVersion]
  min = "0.110.0"
```

**6. Benefits:**
- No npm dependency for FontAwesome
- Automatic updates via Hugo modules
- Three rendering modes for flexibility
- No CSS conflicts
- Smaller git repository (no dist/ folder)
- Direct import from official FontAwesome repository

## File Organization

```
├── layouts/
│   ├── _shortcodes/          # Public shortcodes (icon.html, fa.html, fab.html, fas.html, far.html)
│   └── _partials/
│       └── assets/           # Core rendering logic (icon.html, symbols.html)
├── assets/
│   ├── scss/                 # Module SCSS (fontawesome.scss)
│   └── js/modules/fontawesome/  # FontAwesome loader (fontawesome-loader.js)
├── data/
│   └── structures/           # Argument validation schemas (icon.yml)
├── _vendor/                  # Vendored Hugo modules (includes Font-Awesome)
│   └── github.com/FortAwesome/Font-Awesome/
│       ├── scss/             # FontAwesome SCSS (mounted to assets/scss/modules/fontawesome)
│       ├── svgs/             # FontAwesome SVG icons (mounted to assets/svgs/fa)
│       ├── webfonts/         # FontAwesome webfonts (mounted to static/webfonts)
│       └── js/               # FontAwesome JavaScript (mounted to static/js/fontawesome)
├── exampleSite/              # Hugo example site for testing
├── config.toml               # Module configuration with Hugo module imports and mounts
├── go.mod                    # Hugo module dependencies (Font-Awesome import)
└── package.json              # npm scripts (dev dependencies only - no FontAwesome)
```

**Note:**
- The dist/ folder is no longer used in v4
- FontAwesome assets come from the vendored Hugo module, not npm
- Run `hugo mod vendor` to populate `_vendor/` directory

## Common Tasks

**Testing in SVG symbols mode:**
```bash
# Set inline = true, embed = true in exampleSite/hugo.toml
npm run build
# Verify NO JS files in public/js/fontawesome/
# Verify symbol definitions in HTML (look for <symbol id="fas-...">)
# Verify <use> references in icon markup
# Test in browser - icons should render as static SVG
```

**Testing in SVG+JS mode:**
```bash
# Set inline = true, embed = false in exampleSite/hugo.toml
npm run build
# Verify JS files in public/js/fontawesome/ (fontawesome.min.js, solid.min.js, etc.)
# Verify <script> tags or module loader in HTML
# Test in browser - icons should render as <svg> after JS processing
# Check browser console for FontAwesome runtime messages
```

**Testing in webfont mode:**
```bash
# Set inline = false in exampleSite/hugo.toml
npm run build
# Verify NO JS files/script tags
# Verify webfont CSS in public/css/
# Test in browser - icons should render with ::before pseudo-elements
```

**Updating FontAwesome:**
```bash
# Update to latest Font Awesome 7.x
hugo mod get -u github.com/FortAwesome/Font-Awesome@7.x
hugo mod vendor
hugo mod tidy
# Test all three rendering modes
npm test
```

**Regenerating icon metadata:**
```bash
# After updating FontAwesome, regenerate fa-icons.yml
hugo mod vendor  # Ensure _vendor is up to date
./meta.sh        # Generates data/fa-icons.yml from vendored SVGs
```

**Troubleshooting icon rendering:**
- Check `inline` and `embed` parameter settings
- Verify Hugo module is vendored: `hugo mod vendor`
- Check `_vendor/github.com/FortAwesome/Font-Awesome/` exists
- Use `debug` setting to see original vs. rendered output
- For symbols mode: Verify `{{- partial "assets/symbols.html" . -}}` is in layout
- For SVG+JS mode: Check browser console for JS errors
- Verify Hugo mounts in config.toml point to correct vendored paths
