#!/usr/bin/env bash

find dist/svgs -name "*.svg" | \
cut -f 1 -d '.' | \
awk '{sub(/-/," ")}1' | \
awk '{sub(/dist\/svgs\//,"- ")}1' |\
sort > data/fa-icons.yml
