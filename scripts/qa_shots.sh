#!/usr/bin/env bash
# QA screenshots for SHOHRA site — testimonials redesign + footer CR
set -u
PORT=3000
PROXY="http://21.0.8.240:81/?XTransformPort=3000"
OUT=/tmp/render
mkdir -p "$OUT"

up() { curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" ; }

# ensure server is running (respawn if needed)
if [ "$(up)" != "200" ]; then
  cd /home/z/my-project
  setsid bash -c 'exec bun run dev' > /dev/null 2>&1 < /dev/null &
  for i in $(seq 1 60); do
    sleep 2
    [ "$(up)" = "200" ] && break
  done
fi
echo "server status: $(up)"

ab() { agent-browser "$@"; }

# ---------- desktop AR ----------
ab set viewport 1440 900
ab open "$PROXY"
ab wait --load networkidle
sleep 3
echo "body chars: $(ab eval "document.body.innerText.length")"

ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2.5
ab screenshot "$OUT/qa1_quotes.png"

ab eval "window.scrollBy(0, 1600)"
sleep 2
ab screenshot "$OUT/qa2_wall.png"

ab eval "window.scrollTo(0, document.body.scrollHeight)"
sleep 2
ab screenshot "$OUT/qa3_footer.png"

# lightbox: click a review card
ab eval "(() => { const btns = document.querySelectorAll('#testimonials .group'); btns[Math.min(3, btns.length-1)].click(); return 'clicked'; })()" 2>/dev/null
sleep 1.8
ab screenshot "$OUT/qa4_lightbox.png"
ab press Escape
sleep 0.8

# ---------- desktop EN ----------
ab eval "(() => { const b=[...document.querySelectorAll('button,a')].find(x=>x.textContent.trim()==='EN'); if(b){b.click(); return 'switched';} return 'notfound'; })()"
sleep 1.5
ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2
ab screenshot "$OUT/qa5_en_quotes.png"
ab eval "window.scrollTo(0, document.body.scrollHeight)"
sleep 2
ab screenshot "$OUT/qa6_en_footer.png"
# switch back to AR
ab eval "(() => { const b=[...document.querySelectorAll('button,a')].find(x=>x.textContent.trim()==='عربي'); if(b){b.click(); return 'back';} return 'x'; })()" 2>/dev/null

# ---------- mobile AR ----------
ab set viewport 390 844
ab reload
ab wait --load networkidle
sleep 3
ab eval "document.querySelector('#testimonials').scrollIntoView({block:'start'})"
sleep 2
ab screenshot "$OUT/qa7_mobile_quotes.png"
ab eval "window.scrollBy(0, 1400)"
sleep 2
ab screenshot "$OUT/qa8_mobile_wall.png"

echo "done"; ls -la "$OUT" | rg qa
