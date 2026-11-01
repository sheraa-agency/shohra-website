# 📦 HANDOFF — SHOHRA | شُهرة Website

> ملاحظات تسليم المشروع للمطوّر | Handoff notes for the developer taking over this project.

---

## 🇪🇬 بالعربي

### إيه ده؟
موقع بورتفوليو لوكالة SHOHRA | شُهرة للتسويق الرقمي — موقع ثابت بالكامل بعد البناء (Static Site)، عربي RTL مع تبديل للإنجليزية.

### التقنيات
- **Next.js 16** (App Router) + TypeScript + Tailwind CSS + Framer Motion
- مدير الحزم: **bun** (يشتغل برضه بـ npm أو pnpm)

### التشغيل محليًا
```bash
bun install        # أو: npm install
bun run dev        # يشتغل على http://localhost:3000
```

### البناء (Static Export)
```bash
bun run build      # الناتج في مجلد out/
```
الموقع **لا يحتاج أي متغيرات بيئة (.env)** ولا قاعدة بيانات — كل شيء ثابت ويعمل فورًا.

### النشر + الدومين المدفوع (الطريقة الموصى بها: Vercel)
1. ارفع الكود على حساب GitHub الخاص بك (أو استخدم المستودع الأصلي).
2. ادخل [vercel.com](https://vercel.com) → **Add New Project** → استورد المستودع → **Deploy** (استضافة مجانية).
3. اشترِ الدومين من أي مسجّل (Namecheap / Cloudflare / GoDaddy / سجل.سعودي).
4. في مشروع Vercel: **Settings → Domains → Add** → اكتب الدومين.
5. ارجع لموقع المسجّل واضبط الـ DNS زي ما Vercel يوضّح لك:
   - `A` record على `76.76.21.21` (للدومين الرئيسي)
   - أو `CNAME` على `cname.vercel-dns.com` (للنطاقات الفرعية مثل www)
6. انتظر انتشار الـ DNS (من دقائق إلى 24 ساعة) وسيصبح الموقع على الدومين المدفوع مع HTTPS تلقائي.

> بدائل الاستضافة: Netlify / Cloudflare Pages — نفس الفكرة (الموقع ثابت جدًا وسريع على أي استضافة).

### ملاحظات مهمة
- محتوى الموقع كله في: `src/components/site/` والنصوص في `src/lib/site-data.ts`
- الألوان والتصميم في: `src/app/globals.css` + `tailwind.config.ts`
- لا يوجد أي بيانات حساسة في هذا المشروع (ملف .env غير مطلوب أصلًا).

---

## 🇬🇧 English

### What is this?
Portfolio website for SHOHRA | شُهرة digital agency — fully static after build, Arabic (RTL) first with English toggle.

### Stack
- **Next.js 16** (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Package manager: **bun** (npm/pnpm also work)

### Run locally
```bash
bun install        # or: npm install
bun run dev        # http://localhost:3000
```

### Build (Static Export)
```bash
bun run build      # output goes to out/
```
**No `.env` or database required** — everything is static and works out of the box.

### Deploy + custom domain (recommended: Vercel)
1. Push the code to a GitHub account (or use the original repo).
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo → **Deploy** (free hosting).
3. Buy the domain from any registrar (Namecheap / Cloudflare / GoDaddy, etc.).
4. In the Vercel project: **Settings → Domains → Add** → enter the domain.
5. At the registrar, point the DNS as Vercel instructs:
   - `A` record → `76.76.21.21` (apex domain)
   - or `CNAME` → `cname.vercel-dns.com` (subdomains like www)
6. Wait for DNS propagation (minutes up to 24h) — the site goes live on the paid domain with automatic HTTPS.

> Alternative hosts: Netlify / Cloudflare Pages — same idea (pure static, fast everywhere).

### Where things live
- Site content: `src/components/site/` — texts: `src/lib/site-data.ts`
- Colors/design: `src/app/globals.css` + `tailwind.config.ts`
- No secrets in this project (no `.env` needed).
