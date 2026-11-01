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
ab eval "document.querySelector('#trust').scrollIntoView({block:'start'})"
sleep 2.5
ab screenshot "$OUT/qd1_stats_ar.png"
# EN
ab eval "(() => { const b=[...document.querySelectorAll('button,a')].find(x=>x.textContent.trim()==='EN'); if(b){b.click(); return 'ok';} return 'x'; })()"
sleep 1.5
ab eval "document.querySelector('#trust').scrollIntoView({block:'start'})"
sleep 2
ab screenshot "$OUT/qd2_stats_en.png"
# back to AR + mobile
ab eval "(() => { const b=[...document.querySelectorAll('button,a')].find(x=>x.textContent.trim()==='عربي'); if(b){b.click(); return 'ok';} return 'x'; })()" 2>/dev/null
ab set viewport 390 844
ab reload
ab wait --load networkidle
sleep 3
ab eval "document.querySelector('#trust').scrollIntoView({block:'start'})"
sleep 2
ab screenshot "$OUT/qd3_stats_mobile.png"
echo done
