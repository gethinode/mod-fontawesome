---
title: Test site
description: Site to test Font Awesome module.
date: 2023-08-02
---

## Recently added icons

{{< fas code-compare fa-4x >}}
{{< fab meta fa-4x >}}
{{< fa folder-closed fa-4x >}}

## Beat animation

<div class="fa-3x" style="color: red">
  {{< fas circle-plus fa-beat >}}
  {{< fas heart fa-beat >}}
  {{< icon class="fas heart fa-beat" style="--fa-animation-duration: 0.5s;" >}}
  {{< icon class="fas heart fa-beat" style="--fa-animation-duration: 2s;" >}}
  {{< icon class="fas heart fa-beat" style="--fa-beat-scale: 2.0;" >}}
</div>

## Fade animation

<div class="fa-3x">
  {{< fas triangle-exclamation fa-fade >}}
  {{< fas skull-crossbones fa-fade >}}
  {{< fas desktop fa-fade >}}
  {{< icon class="fas i-cursor fa-fade" style="--fa-animation-duration: 2s; --fa-fade-opacity: 0.6;" spacing=false >}}
</div>

## Custom animation

<div class="fa-3x" style="color: blue">
  {{< fas gear fa-spin >}}
  {{< icon class="fas gear fa-spin" style="--fa-animation-direction: reverse;" >}}
  {{< icon class="fas gear fa-spin" style="--fa-animation-duration: 15s;" >}}
  {{< icon class="fas compact-disc fa-spin" style="--fa-animation-duration: 30s; --fa-animation-iteration-count: 1;" >}}
  {{< icon class="fas cookie fa-spin" style="--fa-animation-duration: 3s; --fa-animation-iteration-count: 5;--fa-animation-timing: ease-in-out;" >}}
</div>

## Fluid icon

{{< fas class="triangle-exclamation" wrapper="w-25" >}}

## Custom icon

{{< icon custom activity fa-4x >}}

## List

- {{< fas class="location-dot" wrapper="fa-li" >}} This is the first list item
- {{< fas class="utensils" wrapper="fa-li" >}} This is the second list item
- {{< fas class="truck" wrapper="fa-li" >}} This is the third and final list item
{.fa-ul}
