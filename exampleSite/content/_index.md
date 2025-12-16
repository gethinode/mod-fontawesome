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

## Fluid icon

{{< fas icon="triangle-exclamation" wrapper="w-25" >}}

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

{{< icon src="fa-house.svg" wrapper="w-25" >}}

## Stacked icon

{{< fas circle fa-stack-2x >}}
{{< fas fire fa-stack-1x fa-inverse >}}
{.fa-stack .fa-2x}
