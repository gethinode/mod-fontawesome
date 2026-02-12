# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo module that provides Font Awesome icon integration for Hinode sites using FontAwesome's official SVG+JS approach. The module supports both SVG rendering (using FontAwesome JavaScript) and webfont rendering (using FontAwesome CSS).

**Version 4.0 Changes:** This module now uses FontAwesome's official SVG+JS architecture and mounts directly from node_modules. No more dist/ folder or build scripts.

## Development Commands

### Setup and Installation
```bash
npm install              # Install dependencies (FontAwesome is in node_modules)
npm run mod:vendor      # Vendor Hugo modules into _vendor/
npm run mod:tidy        # Tidy up Hugo modules
```

### Running Locally
```bash
npm start               # Start development server (http://localhost:1313)
npm run build           # Build production site
npm run clean           # Clean generated files (public/, resources/)
```

### Maintenance
```bash
npm run mod:update      # Update all dependencies and Hugo modules
npm run upgrade         # Check and update all npm packages
npm test                # Build site (validates configuration and templates)
```

### Git Commits
```bash
npx git-cz              # Prepare commit message (enforces Conventional Commits)
```

**Important:** Commits must follow [Conventional Commits](https://www.conventionalcommits.org) format. The repository uses husky and commitlint to validate this automatically. Use `npx git-cz` to ensure proper formatting.

## Architecture

### Rendering Modes

**SVG Mode (inline=true):**
- Uses FontAwesome's official SVG+JS approach
- Partial at `layouts/_partials/footer/fontawesome-js.html` loads FontAwesome JS files
- Loads fontawesome.min.js + icon set JS files based on `styles` parameter
- Icons output as `<i class="fas fa-heart"></i>` markup
- FontAwesome JS converts to SVG at runtime in browser
- Proper scaling, sizing, accessibility handled by FontAwesome

**Webfont Mode (inline=false):**
- Uses FontAwesome webfonts
- Loads FontAwesome CSS files
- Icons output as `<i class="fas fa-heart"></i>` markup
- Rendered as webfonts via CSS (::before pseudo-elements)

### Multi-Library Support

The icon.html partial supports multiple icon libraries:

1. **FontAwesome (fas, fa, fab):** Always outputs `<i>` tags - rendered by FontAwesome JS or CSS
2. **Bootstrap Icons (bi) and other libraries:**
   - `inline=true`: Static SVG loaded from `assets/svgs/{family}/{name}.svg`
   - `inline=false`: `<i>` tag rendered as webfont
3. **Custom SVGs:** Always loaded via `resources.Get` using `src` parameter

### Hugo Mounts

The module mounts directly from node_modules (no build/copy step):
- **SCSS:** `node_modules/@fortawesome/fontawesome-free/scss` → `assets/scss/modules/fontawesome`
- **Webfonts:** `node_modules/@fortawesome/fontawesome-free/webfonts` → `static/webfonts`
- **JS:** `node_modules/@fortawesome/fontawesome-free/js` → `static/js/fontawesome` (minified files only)

This approach:
- ✅ No dist/ folder to maintain
- ✅ No postinstall build scripts
- ✅ Smaller git repository
- ✅ Direct dependency on FontAwesome npm package

### Configuration Options

Set in `params.modules.fontawesome` of your Hugo config:

```toml
[params.modules.fontawesome]
  inline = true              # Use SVG+JS (true) or webfonts (false)
  embed = false              # Use symbol maps for SVG icons (inline mode only)
  debug = false              # Show original markup as comments (FontAwesome icons only)
  skipMissing = false        # Warn vs. error on missing icons
  styles = ["solid", "regular", "brands"]  # Optional: limit loaded JS files (inline=true only)
```

**Parameters:**
- `inline` (boolean, default: true) - Rendering mode selection
- `embed` (boolean, default: false) - Enable symbol maps for SVG icons. When enabled, icons are defined once in a hidden `<svg>` element and referenced via `<use>`. Only applies to inline SVG mode (custom icons, Bootstrap Icons, etc.). Reduces HTML size when icons are reused. Requires `{{- partial "assets/symbols.html" . -}}` in your layout.
- `debug` (boolean, default: false) - Debug output for FontAwesome icons
- `skipMissing` (boolean, default: false) - Error handling for missing icons
- `styles` (array, optional) - Icon sets to load when `inline=true`. Valid values: "solid", "regular", "brands". Default: all three.

**Removed parameters (from v3):**
- `renderMode` - No mixed mode support in v4

### Template Integration

Sites using this module must include the FontAwesome JS loader partial in their layout:

```html
{{- partial "footer/fontawesome-js.html" . -}}
```

This should be placed before the closing `</body>` tag. The partial only outputs scripts when `inline=true`.

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
3. Outputs simple `<i class="fas fa-heart"></i>` tag
4. If `inline=true`: FontAwesome JS converts to SVG at runtime in browser
5. If `inline=false`: CSS renders as webfont with ::before pseudo-element

**For other icon libraries (Bootstrap Icons, etc.):**
1. If `inline=true`: Load static SVG from `assets/svgs/{family}/{name}.svg`
2. If `inline=false`: Output `<i>` tag for webfont rendering

**For custom SVGs (src parameter):**
1. Always load via `resources.Get` with basic SVG processing
2. No mode-specific behavior

## Important Implementation Details

**FontAwesome JS Loading (SVG mode):**
- Core library (fontawesome.min.js) loaded first
- Icon set JS files loaded conditionally based on `styles` parameter
- Scripts only loaded when `inline=true`
- No JS output when `inline=false` (webfont mode)

**CSS Loading:**
- SVG mode (`inline=true`): Loads `svg-with-js.scss` only
- Webfont mode (`inline=false`): Loads full FontAwesome CSS (fontawesome, regular, solid, brands)
- No CSS conflicts between modes (simple if/else)

**Removed Features (from v3):**
- Custom scaling logic - FontAwesome JS handles this automatically
- Symbol embedding with page.Scratch - Not needed with FontAwesome JS
- renderMode per-family configuration - No mixed mode support
- Static SVG generation for FontAwesome - Uses official JS approach instead

## Breaking Changes from v3

1. **Removed renderMode config** - No per-family mixed mode support
2. **Removed embed parameter** - FontAwesome JS handles symbol creation
3. **Removed custom scaling** - FontAwesome JS handles this
4. **Changed mounting** - Now mounts directly from node_modules
5. **Requires partial inclusion** - Sites must add fontawesome-js.html partial to layouts
6. **No dist/ folder** - FontAwesome files mounted directly from node_modules

## Migration from v3 to v4

**1. Update configuration:**
```toml
# OLD v3 config (remove this)
[params.modules.fontawesome]
  embed = true
  inline = true
  [params.modules.fontawesome.renderMode]
    fab = "font"

# NEW v4 config
[params.modules.fontawesome]
  inline = true              # SVG+JS mode
  debug = false
  skipMissing = false
  styles = ["solid", "brands"]  # Optional
```

**2. Add JS loader to layout:**
```html
<!-- In baseof.html or footer template, before </body> -->
{{- partial "footer/fontawesome-js.html" . -}}
```

**3. Update Hugo minimum version:**
```toml
[module.hugoVersion]
  min = "0.153.0"
```

**4. Benefits:**
- Proper FontAwesome SVG rendering with official JS
- No CSS conflicts
- Smaller git repository (no dist/ folder)
- Simpler configuration
- Better performance

## File Organization

```
├── layouts/
│   ├── _shortcodes/          # Public shortcodes (icon.html, fa.html, fab.html, fas.html)
│   └── _partials/
│       ├── assets/           # Core rendering logic (icon.html, symbols.html)
│       └── footer/           # FontAwesome JS loader (fontawesome-js.html)
├── assets/
│   └── scss/                 # Module SCSS (fontawesome.scss)
├── data/
│   └── structures/           # Argument validation schemas (icon.yml)
├── exampleSite/              # Hugo example site for testing
├── config.toml               # Module configuration with Hugo mounts
└── package.json              # npm scripts and dependencies
```

**Note:** The dist/ folder and data/fa-icons.yml are no longer used in v4.

## Common Tasks

**Testing in SVG mode:**
```bash
# Set inline = true in exampleSite/hugo.toml
npm run build
# Verify JS files in public/js/fontawesome/
# Verify <script> tags in HTML
# Test in browser - icons should render as <svg> after JS processing
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
# Update version in package.json
npm install
# Test both rendering modes
npm test
```

**Troubleshooting icon rendering:**
- Check `inline` parameter setting
- Verify fontawesome-js.html partial is included in layout
- Check browser console for JS errors (SVG mode)
- Use `debug` setting to see original vs. rendered output
- Verify Hugo mounts in config.toml point to node_modules
