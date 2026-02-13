{{- /* FontAwesome SVG+JS dynamic loader for Hinode */ -}}
{{- if site.Params.modules.fontawesome -}}
  {{- if site.Params.modules.fontawesome.inline -}}

// FontAwesome configuration injected at build time
const faConfig = {
  inline: {{ site.Params.modules.fontawesome.inline | jsonify }},
  styles: {{ or site.Params.modules.fontawesome.styles (slice "solid" "regular" "brands") | jsonify }}
};

// Load FontAwesome scripts sequentially
(function loadFontAwesome() {
  if (!faConfig.inline) {
    return;
  }

  const faBaseUrl = '/js/fontawesome/';
  const faCore = faBaseUrl + 'fontawesome.min.js';

  // Load core library first
  const coreScript = document.createElement('script');
  coreScript.src = faCore;
  coreScript.defer = true;

  coreScript.addEventListener('load', function() {
    // After core loads, load icon sets
    loadIconSets();
  });

  coreScript.addEventListener('error', function() {
    console.warn('[FontAwesome] Failed to load core library from', faCore);
  });

  document.head.appendChild(coreScript);
})();

// Load configured icon sets
function loadIconSets() {
  if (!faConfig.styles || faConfig.styles.length === 0) {
    return;
  }

  const faBaseUrl = '/js/fontawesome/';

  faConfig.styles.forEach(function(style) {
    const url = faBaseUrl + style + '.min.js';
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;

    script.addEventListener('error', function() {
      console.warn('[FontAwesome] Failed to load style:', style);
    });

    document.head.appendChild(script);
  });
}

  {{- end -}}
{{- end -}}
