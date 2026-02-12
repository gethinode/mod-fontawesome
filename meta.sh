#!/usr/bin/env bash

# Generate fa-icons.yml from FontAwesome SVGs in node_modules
# Format: - {family} {icon-name}

{
  # Regular icons (fa prefix)
  find node_modules/@fortawesome/fontawesome-free/svgs/regular -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fa " $0}'

  # Solid icons (fas prefix)
  find node_modules/@fortawesome/fontawesome-free/svgs/solid -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fas " $0}'

  # Brand icons (fab prefix)
  find node_modules/@fortawesome/fontawesome-free/svgs/brands -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fab " $0}'
} | sort > data/fa-icons.yml

echo "Generated data/fa-icons.yml with $(wc -l < data/fa-icons.yml) icons"
