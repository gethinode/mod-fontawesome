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

## Configuration

> [!IMPORTANT]
> Webfonts (`inline = false`) require Dart Sass to function correctly. See https://gohugo.io/functions/css/sass/#dart-sass for installation instructions.

This module supports the following parameters (see the section `params.modules` in `config.toml`):

| Setting                 | Default | Description |
|-------------------------|---------|-------------|
| fontawesome.embed      | true    | If set, generates a symbol map with embedded vector images. Only works in conjunction with `inline`. Include the symbol with the partial `assets/symbols.html` (requires the current page context).|
| fontawesome.inline      | true    | If set, uses inline vector images instead of web fonts. Both methods support Font Awesome styling and animation. However, when using vector images you cannot use aliases. Instead, use the default name of the icon. |
| fontawesome.debug       | true    | If set, prints the original code `<i class="[...]" style=[...]></i>` as comments next to the inline vector image. |
| fontawesome.skipMissing | false   | If set, displays a warning when an icon cannot be found. The missing icon is replaced with a dummy. By default, Hinode exits with an error when an icon is missing. |

## Notes

The repository of [Font Awesome has changed its pattern for semantic versioning][fa_isue_17342]. As a result, [hugo does not pick up the latest version correctly][hugo_discussion_41861]. A workaround is to create a fork for version 6.x only and to use this as a source instead.

This repository ([mod-fontawesome][mod-fontawesome]) has chosen a different approach, which is more in line with the other modules maintained by Hinode. It downloads the latest npm release of Font Awesome and redistributes several selected files and folders. The steps are fully automated as part of a CI/CD process.

## Contributing

This module uses [semantic-release][semantic-release] to automate the release of new versions. The package uses `husky` and `commitlint` to ensure commit messages adhere to the [Conventional Commits][conventionalcommits] specification. You can run `npx git-cz` from the terminal to help prepare the commit message.

<!-- MARKDOWN LINKS -->
[hugo]: https://gohugo.io
[hinode_docs]: https://gethinode.com
[fa_isue_17342]: https://github.com/FortAwesome/Font-Awesome/issues/17342
[fontawesome]: https://fontawesome.com
[hugo_discussion_41861]: https://discourse.gohugo.io/t/how-to-specify-the-version-of-third-parties-library/41861
[mod-fontawesome]: https://github.com/gethinode/mod-fontawesome
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
[conventionalcommits]: https://www.conventionalcommits.org
[husky]: https://typicode.github.io/husky/
[semantic-release]: https://semantic-release.gitbook.io/
