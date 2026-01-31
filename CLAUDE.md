# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo module that provides Font Awesome icon integration for Hinode sites. It automatically fetches Font Awesome SVG files during installation and exposes them through Hugo shortcodes (`{{< icon >}}`, `{{< fa >}}`, `{{< fab >}}`, `{{< fas >}}`). The module supports both inline SVG embedding and web font approaches.

## Development Commands

### Setup and Installation
```bash
npm install              # Install dependencies and copy Font Awesome files to dist/
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
npm run meta            # Regenerate fa-icons.yml metadata file (run after updating Font Awesome)
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

### Key Components

**Font Awesome Integration:**
- Font Awesome source files are downloaded as npm dependency (`@fortawesome/fontawesome-free`)
- During `npm install`, post-install scripts copy SVG files to `dist/svgs/` organized by family (fas, fa, fab)
- The `meta.sh` script generates `data/fa-icons.yml` listing all available icons

**Hugo Module Structure:**
- `layouts/_shortcodes/` - Public shortcodes users can call
- `layouts/_partials/assets/icon.html` - Core logic for icon rendering (handles both inline SVG and web font modes)
- `data/structures/icon.yml` - Argument validation schema for shortcodes
- `dist/svgs/` - Font Awesome SVG files (organized as `{family}-{icon-name}.svg`)
- `dist/scss/` - Font Awesome SCSS files (optional, for web font approach)
- `_vendor/` - Vendored Hugo dependencies (created at build time)

### Configuration Options

Set in `params.modules` of `config.toml`:
- `fontawesome.inline` (default: true) - Use inline SVG instead of web fonts
- `fontawesome.embed` (default: true) - Generate symbol map for embedded icons (with `inline`)
- `fontawesome.debug` (default: false) - Output original icon code as comments
- `fontawesome.skipMissing` (default: false) - Warn instead of error on missing icons

**Important:** When using webfonts (`inline = false`), Dart Sass is required to compile Font Awesome 7.x SCSS. Configure the transpiler in your stylesheet partial:
```html
{{- $options := (dict "transpiler" "dartsass" "targetPath" $target) -}}
```

### Shortcode Usage

All shortcodes delegate to the core `icon.html` partial:

- `{{< icon "fas heart" >}}` - Solid icon (using family prefix)
- `{{< fa "heart" >}}` - Regular icon (shorthand for fa-regular)
- `{{< fab "github" >}}` - Brand icon
- `{{< fas "star" >}}` - Solid icon
- `{{< icon "fas heart" wrapper="..." scale="1.15" inline-style="..." >}}` - With options

### Icon Resolution Process

1. User calls shortcode with icon name (e.g., `fas heart`)
2. `icon.html` partial extracts family and icon name
3. If `inline` is true: load SVG from `dist/svgs/{family}-{name}.svg`
4. Strip comments and inject classes/attributes into SVG
5. If `embed` is true: convert to symbol for symbol map inclusion
6. If `inline` is false: output `<i>` tag for Font Awesome web font

## Important Implementation Details

**SVG Embedding Process:**
- Comments are stripped from SVG content using regex: `<!--(.*?)-->`
- The `xmlns` attribute is replaced to inject icon classes and styling
- Optional `data-scale` attribute is added when scale parameter is specified
- Custom icons (in `assets/svgs/{custom}/{name}.svg`) have width/height removed to allow CSS sizing

**Symbol Map (when embed=true):**
- Converted to `<symbol>` elements with ID format: `{family}-{name}`
- Included via `{{< partial "assets/symbols.html" >}}` (requires page context)
- Symbols are collected in `page.Scratch.icons` during partial execution

**Dependency Management:**
- Hinode core utilities are available as vendored module `mod-utils`
- Uses `utilities/InitArgs.html` for argument validation
- Uses `utilities/LogErr.html` and `utilities/LogWarn.html` for error handling

## Release Process

Uses semantic-release with conventional commits. Releases are triggered automatically on push to `main` branch:
- Commit format determines version bump (fix:, feat:, BREAKING CHANGE:)
- `dist/` and package.json are committed as part of release
- No manual version bumping needed

## File Organization

```
├── layouts/
│   ├── _shortcodes/          # Public shortcodes (icon.html, fa.html, fab.html, fas.html)
│   └── _partials/
│       └── assets/           # Core rendering logic (icon.html, symbols.html)
├── data/
│   ├── structures/           # Argument validation schemas (icon.yml)
│   └── fa-icons.yml          # Generated list of available icons
├── dist/
│   ├── svgs/                 # Font Awesome SVG files (generated from npm install)
│   └── scss/                 # Font Awesome SCSS (optional)
├── exampleSite/              # Hugo example site for testing
├── package.json              # npm scripts and dependencies
└── hugo.toml                 # Module configuration (if exists)
```

## Common Tasks

**Adding a new icon variant or configuration:**
- Modify `layouts/_partials/assets/icon.html` to adjust rendering logic
- Update `data/structures/icon.yml` to document new parameters
- Test with `npm start` and check the example site

**Updating Font Awesome:**
- Update version in `package.json` (@fortawesome/fontawesome-free)
- Run `npm install` (copies new SVG files to dist/)
- Run `npm run meta` to regenerate icon list
- Test with `npm test`

**Fixing icon rendering issues:**
- Check if SVG content is being loaded correctly (inspect `dist/svgs/`)
- Verify scale parameter behavior in `icon.html` and JavaScript
- Test with `inline` and `embed` settings in config
- Use `debug` setting to see original vs. rendered output
