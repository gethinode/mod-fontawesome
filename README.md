# Hinode Module - Font Awesome

<!-- Tagline -->
<p align="center">
    <b>A Hugo module to add Font Awesome icons to your Hinode site</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen">
    </a>
    <a href="https://gethinode.com" alt="Hinode theme">
        <img src="https://img.shields.io/badge/theme-hinode-blue">
    </a>
    <a href="https://github.com/gethinode/mod-fontawesome/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/gethinode/mod-fontawesome.svg">
    </a>
    <a href="https://github.com/gethinode/hinode/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/gethinode/hinode.svg">
    </a>
    <a href="https://github.com/gethinode/mod-fontawesome/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/gethinode/mod-fontawesome.svg">
    </a>
    <a href="https://github.com/gethinode/mod-fontawesome/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/gethinode/mod-fontawesome">
    </a>
</p>

## About

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Hinode is available as a [template][repository_template], and a [main theme][repository]. This repository maintains a Hugo module to add [Font Awesome][fontawesome] icons to a Hinode site. Visit the Hinode documentation site for [installation instructions][hinode_docs].

## Installation

This module is imported automatically when using Hinode. To use it in your own Hugo site:

1. **Add the module to your `hugo.toml`:**
   ```toml
   [module]
     [[module.imports]]
       path = "github.com/gethinode/mod-fontawesome/v5"
   ```

2. **Vendor the module (optional but recommended):**
   ```bash
   hugo mod vendor
   ```

3. **Use icons in your templates or content:**
   ```hugo
   {{- partial "assets/icon.html" (dict "icon" "fas fa-heart") -}}
   ```

No npm installation required - all Font Awesome assets are automatically included via Hugo modules.

## Configuration

> [!IMPORTANT]
> Webfonts (`mode = "webfonts"`) require Dart Sass to function correctly. See https://gohugo.io/functions/css/sass/#dart-sass for installation instructions.

This module supports the following parameters (see the section `params.modules` in `config.toml`):

| Setting                 | Default   | Description |
|-------------------------|-----------|-------------|
| fontawesome.mode        | "symbols" | Icon rendering mode: `"symbols"` (static SVG sprites with `<use>` references), `"svg"` (inline SVG elements), or `"webfonts"` (CSS webfonts). Symbols mode offers the best performance. |
| fontawesome.defaultFamily | "fas"   | Default icon family for shorthand notation (e.g., `{{< icon "user" >}}` uses this family). |
| fontawesome.debug       | false     | If set, prints debug information to Hugo build output. |
| fontawesome.skipMissing | false     | If set, displays a warning when an icon cannot be found instead of exiting with an error. |

**Example configuration:**

```toml
[params.modules.fontawesome]
  mode = "symbols"      # Use SVG symbols (recommended)
  defaultFamily = "fas" # Default to Font Awesome Solid
  debug = false
  skipMissing = false
```

## Notes

### Hugo Module Architecture

This module imports the official [Font Awesome repository][fontawesome_repo] directly as a Hugo module, eliminating the need for npm dependencies. Font Awesome assets (SVG files, SCSS, and webfonts) are vendored automatically by Hugo's module system.

**Key features:**
- **No npm required**: All Font Awesome assets come from the official Git repository
- **SVG-first approach**: Uses Font Awesome 7.x SVGs (`svgs/`) with `overflow="visible"` to prevent icon clipping
- **Symbol map support**: Generate reusable SVG symbols for optimal performance
- **CI/CD compatible**: Works identically in development and production environments

### Version Management

Font Awesome changed its version tagging pattern after v4.x, breaking semantic versioning compatibility with Go modules (see [issue #17342][fa_isue_17342]). As a workaround, this module imports the `7.x` branch, which Go resolves to a pseudo-version in `go.mod`:

```go
require (
  github.com/FortAwesome/Font-Awesome v0.0.0-20260210181720-337dd2045d56
)
```

To update to the latest Font Awesome 7.x release:

```bash
hugo mod get -u github.com/FortAwesome/Font-Awesome@7.x
hugo mod tidy
hugo mod vendor
```

**Note**: The `@7.x` branch reference is needed in the `hugo mod get` command because Font Awesome uses non-standard version tags (e.g., "Release 7.0.0" instead of "v7.0.0").

## Contributing

This module uses [semantic-release][semantic-release] to automate the release of new versions. The package uses `husky` and `commitlint` to ensure commit messages adhere to the [Conventional Commits][conventionalcommits] specification. You can run `npx git-cz` from the terminal to help prepare the commit message.

<!-- MARKDOWN LINKS -->
[hugo]: https://gohugo.io
[hinode_docs]: https://gethinode.com
[fa_isue_17342]: https://github.com/FortAwesome/Font-Awesome/issues/17342
[fontawesome]: https://fontawesome.com
[fontawesome_repo]: https://github.com/FortAwesome/Font-Awesome
[hugo_discussion_41861]: https://discourse.gohugo.io/t/how-to-specify-the-version-of-third-parties-library/41861
[mod-fontawesome]: https://github.com/gethinode/mod-fontawesome
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
[conventionalcommits]: https://www.conventionalcommits.org
[husky]: https://typicode.github.io/husky/
[semantic-release]: https://semantic-release.gitbook.io/
