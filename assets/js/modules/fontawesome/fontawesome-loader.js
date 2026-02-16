{{- /*
    FontAwesome Intelligent Loader
    Conditionally loads FontAwesome JavaScript only when in SVG+JS mode
    - mode="svg": Load FontAwesome JS (SVG+JS runtime)
    - mode="symbols": No JS needed (SVG symbols/sprites)
    - mode="webfonts": No JS needed (webfonts via CSS)

    Legacy support:
    - inline=true, embed=false: Load FontAwesome JS (SVG+JS runtime)
    - inline=true, embed=true: No JS needed (SVG symbols/sprites)
    - inline=false: No JS needed (webfonts via CSS)
    Copyright © 2024 - 2026 The Hinode Team / Mark Dumay. All rights reserved.
*/ -}}

{{- /* Determine rendering mode from global config */ -}}
{{- $mode := site.Params.modules.fontawesome.mode -}}
{{- if not $mode -}}
    {{- /* Fallback to legacy inline/embed if mode not set in config */ -}}
    {{- $inline := default true site.Params.modules.fontawesome.inline -}}
    {{- $embed := default true site.Params.modules.fontawesome.embed -}}
    {{- if not $inline -}}
        {{- $mode = "webfonts" -}}
    {{- else if not $embed -}}
        {{- $mode = "svg" -}}
    {{- else -}}
        {{- $mode = "symbols" -}}
    {{- end -}}
{{- else -}}
    {{- /* Validate mode parameter - must be one of: symbols, svg, webfonts */ -}}
    {{- $validModes := slice "symbols" "svg" "webfonts" -}}
    {{- if not (in $validModes $mode) -}}
        {{- warnf "[mod-fontawesome] Invalid mode '%s'. Valid values are: symbols, svg, webfonts. Defaulting to 'symbols'." $mode -}}
        {{- $mode = "symbols" -}}
    {{- end -}}
{{- end -}}

{{- if eq $mode "svg" -}}
    {{- /* SVG+JS mode - load FontAwesome JavaScript library */ -}}
    {{- $baseURL := urls.JoinPath site.BaseURL "js/fontawesome" -}}

    // FontAwesome SVG+JS runtime loader
    (function() {
        // Load core library
        var core = document.createElement('script');
        core.src = '{{ $baseURL }}/fontawesome.min.js';
        core.async = false;
        document.head.appendChild(core);

        // Load solid icons
        var solid = document.createElement('script');
        solid.src = '{{ $baseURL }}/solid.min.js';
        solid.async = false;
        document.head.appendChild(solid);

        // Load regular icons
        var regular = document.createElement('script');
        regular.src = '{{ $baseURL }}/regular.min.js';
        regular.async = false;
        document.head.appendChild(regular);

        // Load brand icons
        var brands = document.createElement('script');
        brands.src = '{{ $baseURL }}/brands.min.js';
        brands.async = false;
        document.head.appendChild(brands);
    })();
{{- else -}}
    {{- /* SVG symbols mode or Webfont mode - no JavaScript needed */ -}}
    // FontAwesome rendering via {{ if eq $mode "symbols" }}SVG symbols{{ else }}webfonts (CSS){{ end }}
{{- end -}}
