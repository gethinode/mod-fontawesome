{{- /*
    FontAwesome Intelligent Loader
    Conditionally loads FontAwesome JavaScript only when in SVG+JS mode
    - inline=true, embed=false: Load FontAwesome JS (SVG+JS runtime)
    - inline=true, embed=true: No JS needed (SVG symbols/sprites)
    - inline=false: No JS needed (webfonts via CSS)
    Copyright © 2024 - 2025 The Hinode Team / Mark Dumay. All rights reserved.
*/ -}}

{{- if and site.Params.modules.fontawesome.inline (not site.Params.modules.fontawesome.embed) -}}
    {{- /* SVG+JS mode (inline=true, embed=false) - load FontAwesome JavaScript library */ -}}
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
    {{- /* SVG symbols mode (inline=true, embed=true) or Webfont mode (inline=false) - no JavaScript needed */ -}}
    // FontAwesome rendering via {{ if site.Params.modules.fontawesome.inline }}SVG symbols{{ else }}webfonts (CSS){{ end }}
{{- end -}}
