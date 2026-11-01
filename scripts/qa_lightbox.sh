#!/usr/bin/env bash
set -u
PROXY="http://21.0.8.240:81/?XTransformPort=3000"
OUT=/tmp/render
PORT=3000
up() { curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" ; }
if [ "$(up)" != "200" ]; then
  cd /home/z/my-project
  setsid bash -c 'exec bun run dev' > /dev/null 2>&1 < /dev/null &
  for i in $(seq 1 60); do sleep 2; [ "$(up)" = "200" ] && break; done
fi
echo "server: $(up)"
ab() { agent-browser "$@"; }
ab set viewport 1440 900
ab open "$PROXY"
ab wait --load networkidle
sleep 3
ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2.5
# click the 4th real review card (buttons inside #testimonials are only the wall cards)
ab eval "(() => { const b = document.querySelectorAll('#testimonials button'); b[3].click(); return 'cards=' + b.length; })()"
sleep 2
ab screenshot "$OUT/qb1_lightbox.png"
# check dialog state + counter text
ab eval "(() => { const d=document.querySelector('[role=dialog]'); return d ? 'dialog open: ' + d.getAttribute('aria-label') : 'NO DIALOG'; })()"
# navigate next twice
ab press ArrowLeft
sleep 1.2
ab screenshot "$OUT/qb2_lightbox_next.png"
ab press Escape
sleep 0.6
ab eval "document.querySelector('[role=dialog]') ? 'still open' : 'closed ok'"
