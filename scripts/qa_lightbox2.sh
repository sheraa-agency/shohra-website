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
sleep 3.5
ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2.5
# open review 4 (wide) then review 13 (square 1080x1080)
ab eval "(() => { const b = document.querySelectorAll('#testimonials button'); b[3].click(); return 'ok'; })()"
sleep 2
ab screenshot "$OUT/qc1_lightbox_wide.png"
ab press Escape; sleep 0.8
ab eval "(() => { const b = document.querySelectorAll('#testimonials button'); b[12].click(); return 'ok'; })()"
sleep 2
ab screenshot "$OUT/qc2_lightbox_square.png"
ab press Escape; sleep 0.5
echo "dialog: $(ab eval "document.querySelector('[role=dialog]') ? 'open' : 'closed'")"
# mobile wall check
ab set viewport 390 844
ab reload
ab wait --load networkidle
sleep 3
ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2
ab screenshot "$OUT/qc3_mobile_quotes.png"
ab eval "window.scrollBy(0, 1200)"
sleep 2
ab screenshot "$OUT/qc4_mobile_wall.png"
echo done
