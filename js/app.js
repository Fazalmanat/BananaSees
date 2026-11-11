/* ==========================================================
   Banana Sees: app logic
   Pages are chosen by the URL hash:
     #home (default) · #list · #suggest · #about · #<idiom id>
   Idiom content comes from data.js (IDIOMS).
   ========================================================== */
"use strict";

/* ---------- State ---------- */
const LETTERS = ["A", "B", "C", "D"];
const app = document.getElementById("app");
const scoreEl = document.getElementById("score");
const logoSvg = document.querySelector(".logo svg").outerHTML;
const finished = new Set();   // ids of idioms already completed
let score = 0;

/* ---------- Small helpers ---------- */
const $ = (id) => document.getElementById(id);

// Do two on-screen elements overlap?
function overlaps(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(r1.right < r2.left || r1.left > r2.right ||
           r1.bottom < r2.top || r1.top > r2.bottom);
}

// Floating emojis behind the page
function buildBackground() {
  const emojis = ["🍌", "🐦‍⬛", "🍈", "🐘", "🍛", "🐿️", "🌉", "🍽️", "🐒", "🪙"];
  $("bg").innerHTML = emojis.map((e, i) =>
    `<span style="left:${4 + i * 9.5}%;animation-delay:-${i * 2}s;font-size:${1.4 + (i % 3) * 0.5}rem">${e}</span>`
  ).join("");
}

// Falling confetti for a correct guess
function confetti() {
  const pieces = ["🎉", "🍌", "✨", "🎊", "⭐"];
  for (let i = 0; i < 26; i++) {
    const el = document.createElement("span");
    el.className = "cf";
    el.textContent = pieces[i % pieces.length];
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
}

/* ---------- Social icons (inline SVG, no external files) ---------- */
const ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`
};

// Make sure a link is absolute. Without "https://" the browser treats it as
// a path on THIS site and just glues it onto the end of the page address.
function fullUrl(url) {
  url = url.trim();
  if (/^(https?:|mailto:)/i.test(url)) return url;
  return "https://" + url.replace(/^\/+/, "");
}

// The profile links filled in under SITE (data.js). Empty ones are skipped.
function socials() {
  return [
    ["linkedin", "LinkedIn", SITE.linkedin],
    ["github", "GitHub", SITE.github],
    ["instagram", "Instagram", SITE.instagram],
    ["website", "Website", SITE.website],
    ["email", "Email", SITE.email ? "mailto:" + SITE.email : ""]
  ]
    .filter(([, , url]) => url)
    .map(([key, label, url]) => ({ key, label, url: fullUrl(url) }));
}

// Opens in a new tab, except email links
const linkAttrs = (url) => url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"';

// Small footer: copyright + icon links (year updates itself)
function buildFooter() {
  const icons = socials().map((s) =>
    `<a class="soc" href="${s.url}" ${linkAttrs(s.url)} aria-label="${s.label}" title="${s.label}">${ICONS[s.key]}</a>`
  ).join("");
  $("footer").innerHTML = `
    ${icons ? `<div class="soc-row">${icons}</div>` : ""}
    <div>© ${new Date().getFullYear()} ${SITE.owner} · Banana Sees 🍌</div>`;
}

/* ==========================================================
   PAGE 1: Intro
   ========================================================== */
function renderHome() {
  app.innerHTML = `
    <div class="box hero">
      ${logoSvg}
      <h1>Banana Sees</h1>
      <p class="lead">Welcome to the only lab where Malayalam proverbs are tested by a banana with googly eyes.</p>
      <p>You know sayings like <b>“കാക്ക കുളിച്ചാൽ കൊക്കാകുമോ?”</b> (will a crow turn into a crane if it bathes?). Everyone quotes them. Nobody checks. We check.</p>
      <div class="how">
        <div><b>🤔</b>Guess what happens. A, B, C or D.</div>
        <div><b>🖐️</b>Drag things around and run the experiment.</div>
        <div><b>😏</b>Get the answer, plus a sarcastic comment on your choice.</div>
      </div>
      <div class="cta"><a class="btn pk pulse cta-big" href="#list">See the experiments →</a></div>
    </div>`;
}

/* ==========================================================
   PAGE 2: List of experiments
   ========================================================== */
function renderList() {
  const tiles = IDIOMS.map((idiom, n) => `
    <div class="tile" style="--i:${n}" onclick="location.hash='${idiom.id}'">
      <div class="em">${idiom.emoji}</div>
      <b class="ml tile-title">${idiom.idiom}</b>
      <span>${finished.has(idiom.id) ? "✅ Done" : "▶ Try it"}</span>
    </div>`).join("");

  app.innerHTML = `
    <h2>Pick an experiment</h2>
    <p class="en small-note">Tap one to jump straight in. ${finished.size}/${IDIOMS.length} done.</p>
    <div class="grid">
      ${tiles}
      <div class="tile tile--suggest" style="--i:${IDIOMS.length}" onclick="location.hash='suggest'">
        <div class="em">💡</div>
        <b>Got a proverb we should test?</b>
        <span>✉ Request / feedback</span>
      </div>
    </div>`;
}

/* ==========================================================
   PAGE 3: Suggestions & feedback
   ========================================================== */
function renderSuggest() {
  app.innerHTML = `
    <div class="box">
      <h1 class="page-title">Suggestions &amp; feedback 💡</h1>
      <p>Know a Malayalam proverb that deserves a ridiculous experiment? Found something broken, or a line that’s not funny? Tell us.</p>

      <label for="sk">What is this about?</label>
      <select id="sk">
        <option>Request a new idiom</option>
        <option>Feedback on the site</option>
        <option>Report a mistake</option>
      </select>

      <label for="si">Idiom or page (optional)</label>
      <input id="si" maxlength="120" placeholder="e.g. ആന വാ പിളർന്നാൽ…">

      <label for="sm">Your message</label>
      <textarea id="sm" maxlength="800" placeholder="Tell us what you’d like to see…"></textarea>

      <div class="cta"><button class="btn pk" id="sb">Send it 🚀</button></div>
      <div id="sr" class="note hide"></div>
    </div>`;

  const showStatus = (text) => {
    const box = $("sr");
    box.textContent = text;
    box.classList.remove("hide");
  };

  $("sb").onclick = async () => {
    const message = $("sm").value.trim();
    if (!message) return showStatus("Say something first. Even a banana needs input.");

    try {
      // `claude` only exists when the page is opened on claude.ai.
      // If you host this file yourself, connect your own backend here.
      const db = window.claude ? await claude.use("db") : null;
      if (!db) return showStatus("Suggestions can’t be saved right now. Sign in and try again.");

      await db.collection("suggestions").add({
        kind: $("sk").value,
        idiom: $("si").value.trim(),
        message,
        at: Date.now()
      });
      $("sm").value = "";
      showStatus("Received! The banana will pretend to think about it. 🍌");
    } catch (err) {
      showStatus("Couldn’t send that. Please try again in a bit.");
    }
  };
}

/* ==========================================================
   PAGE 5: About & contact
   Contact buttons come from SITE in data.js (empty ones are hidden).
   ========================================================== */
function renderAbout() {
  const links = `<a class="btn pk" href="#suggest">💡 Suggest an idiom</a>` +
    socials().map((s) =>
      `<a class="btn btn-icon" href="${s.url}" ${linkAttrs(s.url)}>${ICONS[s.key]}${s.label}</a>`
    ).join("");

  app.innerHTML = `
    <div class="box">
      <h1 class="page-title">About Banana Sees 🍌👀</h1>
      <p>Malayalam is packed with proverbs everyone quotes and nobody has ever tested. Will a crow really turn into a crane after a bath? Does a plum fill an elephant? We got tired of wondering, so we handed the job to a banana with googly eyes.</p>
      <ul class="about-list">
        <li><b>It’s a game, not a classroom.</b> No marks, no homework. Just guess, drag, laugh.</li>
        <li><b>Bilingual on purpose.</b> The proverbs and the roasts are in Malayalam, with English underneath so everyone can join in.</li>
        <li><b>${IDIOMS.length} experiments</b> so far, and the list keeps growing with your suggestions.</li>
      </ul>
      <p class="small-note">Made by ${SITE.creator}. All emoji scenes, no animals were harmed (the crane may disagree).</p>
    </div>

    <div class="box">
      <h2>Contact 📬</h2>
      <p>Got a proverb we should test, a line that needs fixing, or just want to say hi? Pick whichever is easiest.</p>
      <div class="contact-card">
        <div class="contact-links">${links}</div>
      </div>
    </div>`;
}

/* ==========================================================
   PAGE 4: One idiom (guess → drag → reveal)
   ========================================================== */
function renderIdiom(index) {
  const idiom = IDIOMS[index];
  const next = IDIOMS[index + 1];
  let chosen = -1;        // option the player picked
  let revealed = false;   // true once the experiment is finished

  const optionButtons = idiom.options.map((o, k) => `
    <button class="opt" data-k="${k}">
      <i>${LETTERS[k]}</i>
      <span>${o.textMl}<span class="en">${o.textEn}</span></span>
    </button>`).join("");

  app.innerHTML = `
    <div class="box">
      <div class="steps"><span class="on"></span><span id="s2"></span><span id="s3"></span></div>

      <div class="ml">${idiom.idiom}</div>
      <h2 class="question">${idiom.questionMl}</h2>
      <span class="en">${idiom.questionEn}</span>

      <b class="step-label step-label--first">Step 1: Pick your guess</b>
      <div class="opts">${optionButtons}</div>

      <div id="x" class="hide">
        <div class="note">Guess locked in. Bold choice. We’ll see how that goes 🤫</div>
        <b class="step-label">Step 2: Run the experiment!</b>
        <div class="stage" id="st">
          <div class="clue" id="clue">${idiom.hint}</div>
          <div class="tgt" id="tg">${idiom.dragTarget}</div>
          <div class="tok" id="tk" tabindex="0" role="button" aria-label="Interactive item"><span class="tok-in">${idiom.dragItem}</span></div>
        </div>
        <div class="stage-msg hide" id="msg"></div>
      </div>

      <div id="fin" class="hide"></div>
    </div>`;

  // Picking an option (allowed until the experiment ends)
  app.querySelectorAll(".opt").forEach((btn) => {
    btn.onclick = () => {
      if (revealed) return;
      chosen = Number(btn.dataset.k);
      app.querySelectorAll(".opt").forEach((b) => b.classList.toggle("sel", b === btn));

      if ($("x").classList.contains("hide")) {   // first pick: unlock the stage
        $("x").classList.remove("hide");
        $("s2").className = "on";
        setupDrag(idiom, showResult);
      }
    };
  });

  // Called after the drag is done: show answer, reply and meaning
  function showResult() {
    revealed = true;
    const correct = chosen === idiom.correct;
    const picked = idiom.options[chosen];
    const right = idiom.options[idiom.correct];

    app.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      b.classList.remove("sel");
      if (Number(b.dataset.k) === idiom.correct) b.classList.add("right");
    });
    if (!correct) app.querySelectorAll(".opt")[chosen].classList.add("wrong");

    if (correct && !finished.has(idiom.id)) {
      score++;
      scoreEl.textContent = score;
    }
    finished.add(idiom.id);
    $("s3").className = "on";
    if (correct) confetti();

    const headline = correct
      ? "Correct. We're as surprised as you are."
      : "The one that actually works: " + LETTERS[idiom.correct];
    const nextButton = next
      ? `<a class="btn pk" href="#${next.id}">Next ${next.emoji} →</a>`
      : `<a class="btn pk" href="#list">🎉 All done! Back to the list</a>`;

    $("fin").classList.remove("hide");
    $("fin").innerHTML = `
      <div class="note${correct ? "" : " shk"}">
        ${correct ? "🎉" : "😜"} ${picked.replyMl}
        <span class="en reply-en">${picked.replyEn}</span>
      </div>
      <div class="rev">
        <b>${headline}</b> ${right.textMl}<span class="en">${right.textEn}</span><br>
        💡 ${idiom.meaningMl}<span class="en">${idiom.meaningEn}</span>
      </div>
      <div class="cta">${nextButton}<a class="btn" href="#list">All experiments</a></div>`;
  }
}

/* ==========================================================
   Drag-and-drop experiment
   Flow: gentle guidance → drag → fly to target → suspense → reveal.
   Nothing on screen says "drag"; the guidance only hints.
   ========================================================== */
function setupDrag(idiom, onFinished) {
  const stage = $("st"), item = $("tk"), target = $("tg");
  const clue = $("clue"), msg = $("msg");

  let startX = 0, startY = 0, dx = 0, dy = 0;
  let limits = null;                 // how far the item may move inside the stage
  let dragging = false, moved = 0, done = false, frame = 0;
  const timers = [];
  let nudgeLoop = 0;

  /* ----- geometry helpers (all relative to the stage) ----- */
  function centerOf(el) {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
  }
  // Direction from the item to the target
  function vectorToTarget() {
    const a = centerOf(item), b = centerOf(target);
    return { x: b.x - a.x, y: b.y - a.y, from: a };
  }
  // Is the item close enough to the target (a little forgiving)?
  function isNear() {
    const i = item.getBoundingClientRect(), t = target.getBoundingClientRect(), pad = 14;
    return !(i.right < t.left - pad || i.left > t.right + pad ||
             i.bottom < t.top - pad || i.top > t.bottom + pad);
  }

  /* ----- gentle guidance while the player hasn't touched anything -----
     0s   target softly breathes
     4s   item hops toward the target (and again every 7s)
     5.5s faint dots lead from item to target
     7s   the clue text fades in
     12s  a ghost hand slides across the path                          */
  function nudge() {
    const v = vectorToTarget();
    item.style.setProperty("--nx", v.x * 0.18 + "px");
    item.style.setProperty("--ny", v.y * 0.18 + "px");
    item.classList.remove("nudge");
    void item.offsetWidth;            // restart the animation
    item.classList.add("nudge");
  }
  function showTrail() {
    const v = vectorToTarget();
    [0.3, 0.45, 0.6, 0.75].forEach((t, n) => {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.left = v.from.x + v.x * t - 5 + "px";
      dot.style.top = v.from.y + v.y * t - 5 + "px";
      dot.style.setProperty("--d", n);
      stage.appendChild(dot);
    });
  }
  function showHand() {
    const v = vectorToTarget();
    const hand = document.createElement("div");
    hand.className = "hand";
    hand.textContent = "👆";
    hand.style.left = v.from.x - 10 + "px";
    hand.style.top = v.from.y - 6 + "px";
    hand.style.setProperty("--hx", v.x * 0.8 + "px");
    hand.style.setProperty("--hy", v.y * 0.8 + "px");
    stage.appendChild(hand);
  }
  function startGuidance() {
    target.classList.add("breathe");
    timers.push(setTimeout(() => { nudge(); nudgeLoop = setInterval(nudge, 7000); }, 4000));
    timers.push(setTimeout(showTrail, 5500));
    timers.push(setTimeout(() => clue.classList.add("show"), 7000));
    timers.push(setTimeout(showHand, 12000));
  }
  function stopGuidance() {
    timers.forEach(clearTimeout);
    clearInterval(nudgeLoop);
    stage.querySelectorAll(".trail-dot, .hand").forEach((el) => el.remove());
    target.classList.remove("breathe");
    item.classList.remove("nudge");
  }

  /* ----- the experiment: fly in, build suspense, reveal ----- */
  function flyToTarget() {
    if (done) return;
    done = true;
    stopGuidance();
    target.classList.remove("glow");
    const v = vectorToTarget();
    item.classList.remove("back");
    item.classList.add("fly");
    item.style.transform = `translate3d(${dx + v.x}px, ${dy + v.y}px, 0) scale(.8)`;
    setTimeout(suspense, 420);
  }

  function suspense() {
    item.classList.add("hide");
    const c = centerOf(target);

    // "thinking" dots above the target
    const dots = document.createElement("div");
    dots.className = "dots";
    dots.textContent = "• • •";
    dots.style.left = c.x - 30 + "px";
    dots.style.top = c.y - target.offsetHeight / 2 - 34 + "px";
    stage.appendChild(dots);

    stage.classList.add("tense");        // the scene dims slightly
    target.classList.add("tremble");     // the target shakes harder and harder
    setTimeout(() => reveal(dots, c), 1800);
  }

  function reveal(dots, c) {
    dots.remove();
    stage.classList.remove("tense");
    target.classList.remove("tremble");

    // ring burst + the real result pops in
    const ring = document.createElement("div");
    ring.className = "burst";
    ring.style.left = c.x - 10 + "px";
    ring.style.top = c.y - 10 + "px";
    stage.appendChild(ring);
    setTimeout(() => ring.remove(), 800);

    target.textContent = idiom.resultEmoji;
    target.classList.add("reveal");

    // what people expected: faded and crossed out
    const ghost = document.createElement("div");
    ghost.className = "ghost";
    ghost.textContent = idiom.expectedEmoji;
    ghost.style.left = Math.max(8, target.offsetLeft - target.offsetWidth - 10) + "px";
    ghost.style.top = target.offsetTop + "px";
    stage.appendChild(ghost);

    // the message goes BELOW the stage so the scene stays visible
    msg.innerHTML = `${idiom.resultMl}<span class="en">${idiom.resultEn}</span>`;
    msg.classList.remove("hide");

    setTimeout(onFinished, 900);
  }

  /* ----- pointer handling (smooth: transform only, one update per frame) ----- */
  function applyMove() {
    frame = 0;
    item.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    target.classList.toggle("glow", isNear());
  }

  item.onpointerdown = (e) => {
    if (done) return;
    stopGuidance();
    dragging = true;
    moved = 0;
    startX = e.clientX - dx;          // continue from where the item currently is
    startY = e.clientY - dy;
    item.classList.remove("back");
    item.classList.add("held");
    item.style.transition = "none";
    item.setPointerCapture(e.pointerId);

    // keep the item inside the stage
    const s = stage.getBoundingClientRect(), r = item.getBoundingClientRect();
    limits = { minX: s.left - r.left + dx, maxX: s.right - r.right + dx,
               minY: s.top - r.top + dy,  maxY: s.bottom - r.bottom + dy };
  };

  item.onpointermove = (e) => {
    if (!dragging) return;
    const rawX = e.clientX - startX, rawY = e.clientY - startY;
    moved = Math.max(moved, Math.abs(rawX - dx) + Math.abs(rawY - dy));
    dx = Math.min(limits.maxX, Math.max(limits.minX, rawX));
    dy = Math.min(limits.maxY, Math.max(limits.minY, rawY));
    if (!frame) frame = requestAnimationFrame(applyMove);
  };

  item.onpointerup = () => {
    if (!dragging) return;
    dragging = false;
    item.classList.remove("held");
    item.style.transition = "";
    target.classList.remove("glow");

    if (isNear()) return flyToTarget();      // dropped on the target

    // A tap or a miss: spring back, then lead the player with a clue
    item.classList.add("back");
    dx = 0; dy = 0;
    item.style.transform = "translate3d(0, 0, 0)";
    setTimeout(() => { clue.classList.add("show"); nudge(); }, 450);
  };

  // Keyboard users: Enter or Space runs the experiment
  item.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flyToTarget(); }
  };

  startGuidance();
}

/* ==========================================================
   Router: pick the page from the URL hash
   ========================================================== */
function route() {
  const hash = location.hash.slice(1);
  const index = IDIOMS.findIndex((i) => i.id === hash);
  window.scrollTo(0, 0);

  if (index >= 0) renderIdiom(index);
  else if (hash === "list") renderList();
  else if (hash === "suggest") renderSuggest();
  else if (hash === "about") renderAbout();
  else renderHome();
}

buildBackground();
buildFooter();
window.addEventListener("hashchange", route);
route();