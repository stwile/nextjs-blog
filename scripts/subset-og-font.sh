#!/bin/sh
set -eu

INPUT_FONT=${1:?Usage: $0 /path/to/NotoSansJP-Bold.otf}
OUTPUT_FONT="$(dirname "$0")/../src/app/api/og/NotoSansJP-Bold-subset.ttf"

PYTHONPATH=${PYTHONPATH:-.} python3 -m fontTools.subset "$INPUT_FONT" \
  --text='歯科第一子が爆誕したブログタイトル記事Storybookで見るMDX ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_,.:!?()&/' \
  --output-file="$OUTPUT_FONT" \
  --layout-features='*' \
  --name-IDs='*' \
  --no-ignore-missing-unicodes
