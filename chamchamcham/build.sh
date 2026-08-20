#!/bin/sh
# index.html + style.css + game.js 를 한 파일(standalone.html)로 합친다.
set -e
cd "$(dirname "$0")"
python3 - <<'PY'
html = open('index.html', encoding='utf-8').read()
css  = open('style.css',  encoding='utf-8').read()
js   = open('game.js',    encoding='utf-8').read()
html = html.replace('<link rel="stylesheet" href="style.css" />', '<style>\n' + css + '</style>')
html = html.replace('<script src="game.js"></script>', '<script>\n' + js + '</script>')
open('standalone.html', 'w', encoding='utf-8').write(html)
print('standalone.html', len(html), 'bytes')
PY
