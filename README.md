# Hinode Module - Font Awesome

<!-- Tagline -->
<p align="center">
    <b>A Hugo module to add Font Awesome icons to your Hinode site (work in progress)</b>
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

<!-- MARKDOWN LINKS -->
[hugo]: https://gohugo.io
[hinode_docs]: https://gethinode.com
[fontawesome]: https://fontawesome.com
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git


## Notes

The repository of [Font Awesome has changed its pattern for semantic versioning](https://github.com/FortAwesome/Font-Awesome/issues/17342). As a result, [hugo does not pick up the latest version correctly](https://discourse.gohugo.io/t/how-to-specify-the-version-of-third-parties-library/41861). A workaround is to create a fork for version 6.x only and to use this as a source instead.

This repository ([mod-fontawesome](https://github.com/gethinode/mod-fontawesome)) has chosen a different approach, which is more in line with the other modules maintained by Hinode. It downloads the latest npm release of Font Awesome and redistributes several selected files and folders. The steps are fully automated as part of a CI/CD process.