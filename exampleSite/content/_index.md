---
title: Test site
description: Site to test Font Awesome module.
date: 2023-08-02
---

## Default Icon Family Tests

**Config:** `defaultFamily = "fas"` (see hugo.toml)

### Shorthand Notation (using default family)
These icons use only the icon name, so they should get the default "fas" family:

{{< icon "user" >}}
{{< icon "heart" >}}
{{< icon "star" >}}
{{< icon "home" >}}

### Explicit Family (overrides default)
These icons specify a family prefix, so they should use the explicit family:

{{< icon "far heart" >}} (FontAwesome Regular)
{{< icon "fab github" >}} (FontAwesome Brands)
{{< icon "fas coffee fa-3x" >}} (FontAwesome Solid - explicit)

### Using Family-Specific Shortcodes
These use the traditional shortcodes and should work unchanged:

{{< fas "thumbs-up" >}}
{{< far "thumbs-up" >}}
{{< fab "twitter" >}}

---

## Recently added icons

{{< fas code-compare fa-4x >}}
{{< fab meta fa-4x >}}
{{< fa folder-closed fa-4x >}}
{{< far folder-closed fa-4x >}}
{{< fas star fa-4x >}}

## Beat animation

<div class="fa-3x" style="color: red">
  {{< fas circle-plus fa-beat >}}
  {{< fas heart fa-beat >}}
  {{< icon icon="fas heart fa-beat" inline-style="--fa-animation-duration: 0.5s;" >}}
  {{< icon icon="fas heart fa-beat" inline-style="--fa-animation-duration: 2s;" >}}
  {{< icon icon="fas heart fa-beat" inline-style="--fa-beat-scale: 2.0;" >}}
</div>

## Fade animation

<div class="fa-3x">
  {{< fas triangle-exclamation fa-fade >}}
  {{< fas skull-crossbones fa-fade >}}
  {{< fas desktop fa-fade >}}
  {{< icon icon="fas i-cursor fa-fade" inline-style="--fa-animation-duration: 2s; --fa-fade-opacity: 0.6;" spacing=false >}}
</div>

## Custom animation

<div class="fa-3x" style="color: blue">
  {{< fas gear fa-spin >}}
  {{< icon icon="fas gear fa-spin" inline-style="--fa-animation-direction: reverse;" >}}
  {{< icon icon="fas gear fa-spin" inline-style="--fa-animation-duration: 15s;" >}}
  {{< icon icon="fas compact-disc fa-spin" inline-style="--fa-animation-duration: 30s; --fa-animation-iteration-count: 1;" >}}
  {{< icon icon="fas cookie fa-spin" inline-style="--fa-animation-duration: 3s; --fa-animation-iteration-count: 5;--fa-animation-timing: ease-in-out;" >}}
</div>

## Fluid Icons - Responsive Container-Based Sizing

Fluid icons scale to fill their container using CSS container queries (100cqi).

### Triangle Exclamation Icon

25% width:
{{< fas icon="triangle-exclamation fa-fluid" wrapper="w-25 fa-wrapper" >}}

50% width:
{{< fas icon="triangle-exclamation fa-fluid" wrapper="w-50 fa-wrapper" >}}

75% width:
{{< fas icon="triangle-exclamation fa-fluid" wrapper="w-75 fa-wrapper" >}}

### Star Icon

25% width:
{{< fas icon="star fa-fluid" wrapper="w-25 fa-wrapper" >}}

50% width:
{{< fas icon="star fa-fluid" wrapper="w-50 fa-wrapper" >}}

75% width:
{{< fas icon="star fa-fluid" wrapper="w-75 fa-wrapper" >}}

### Multiple sizes side-by-side

<div style="display: flex; gap: 20px; align-items: start;">
{{< fas icon="heart fa-fluid" wrapper="w-25 fa-wrapper" >}}
{{< fas icon="heart fa-fluid" wrapper="w-50 fa-wrapper" >}}
{{< fas icon="heart fa-fluid" wrapper="w-75 fa-wrapper" >}}
</div>

## Custom icon

{{< icon custom activity fa-4x >}}

## List

- {{< fas icon="location-dot" wrapper="fa-li" >}} This is the first list item
- {{< fas icon="utensils" wrapper="fa-li" >}} This is the second list item
- {{< fas icon="truck" wrapper="fa-li" >}} This is the third and final list item
{.fa-ul}

## Icon with path

<div style="color: blue">
{{< icon src="fa-house.svg" icon="fa-2x fa-beat" inline-style="--fa-animation-duration: 2s;" >}}
</div>

## Fluid icon with path

Different container sizes with custom SVG:

25% width:
{{< icon src="fa-house.svg" icon="fa-fluid" wrapper="w-25 fa-wrapper" >}}

50% width:
{{< icon src="fa-house.svg" icon="fa-fluid" wrapper="w-50 fa-wrapper" >}}

75% width:
{{< icon src="fa-house.svg" icon="fa-fluid" wrapper="w-75 fa-wrapper" >}}

## Stacked icon

Icons can be layered using FontAwesome's stacking feature. Use `fa-stack-2x` for the background icon and `fa-stack-1x` for the foreground icon. Wrap them in a container with the `fa-stack` class.

<span class="fa-stack fa-4x">
{{< fas circle fa-stack-2x >}}
{{< fas fire fa-stack-1x fa-inverse >}}
</span>
