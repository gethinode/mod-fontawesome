var dynamicSvgs = document.querySelectorAll('.dynamic-svg');
for (var i = 0; i < dynamicSvgs.length; i++) {
  (function(placeholder) {
    placeholder.onload = function () {
      var container = placeholder.parentElement
      var doc = placeholder.contentDocument
      var attr = placeholder.getAttribute('data-class')
      var style = placeholder.getAttribute('data-style')

      if (container !== null && doc !== null) {
        var svg = doc.querySelector('svg')
        if (svg !== null) {
          svg.setAttribute('class', 'svg-inline--fa ' + (attr || ''))
          svg.setAttribute('fill', 'currentcolor')
          svg.setAttribute('aria-hidden', 'true')
          svg.setAttribute('role', 'img')
          if (style !== null && style !== '') {
            svg.setAttribute('style', style)
          }
          svg.removeAttribute('height')
          svg.removeAttribute('width')
          container.innerHTML = ''
          container.appendChild(svg)
        }
      }
    }
  })(dynamicSvgs[i])
}

// Apply Font Awesome icon scale transformations from data-scale attribute
// Uses getBBox() to automatically remove padding and apply zoom
(function() {
    function applyScales() {
        var icons = document.querySelectorAll('.svg-inline--fa[data-scale]');

        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            var scaleStr = icon.getAttribute('data-scale');

            if (scaleStr) {
                var scale = parseFloat(scaleStr);
                if (isNaN(scale) || scale <= 0) {
                    scale = 1;
                }

                // Simple approach: scale the entire SVG by the scale factor
                // No viewBox manipulation, no clipping - just increase the rendered size
                icon.style.transform = 'scale(' + scale + ')';
                icon.style.transformOrigin = 'center';

                // Remove data-scale to prevent re-processing by MutationObserver
                icon.removeAttribute('data-scale');
            }
        }
    }

    // Apply on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyScales);
    } else {
        applyScales();
    }

    // Re-apply for dynamically added icons (SPA compatibility)
    if (window.MutationObserver) {
        var observer = new MutationObserver(applyScales);
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
