#!/usr/bin/env bash

# Generate fa-icons.yml from FontAwesome SVGs in vendored Hugo module
# Format: - {family} {icon-name}
# Note: Run 'hugo mod vendor' first to ensure _vendor directory is up to date

VENDOR_PATH="_vendor/github.com/FortAwesome/Font-Awesome/svgs"

if [ ! -d "$VENDOR_PATH" ]; then
  echo "Error: Vendored FontAwesome not found at $VENDOR_PATH"
  echo "Run 'hugo mod vendor' first to vendor the module"
  exit 1
fi

{
  # Regular icons (fa prefix)
  find "$VENDOR_PATH/regular" -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fa " $0}'

  # Solid icons (fas prefix)
  find "$VENDOR_PATH/solid" -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fas " $0}'

  # Brand icons (fab prefix)
  find "$VENDOR_PATH/brands" -name "*.svg" -exec basename {} .svg \; | \
    awk '{print "- fab " $0}'
} | sort > data/fa-icons.yml

echo "Generated data/fa-icons.yml with $(wc -l < data/fa-icons.yml) icons"
