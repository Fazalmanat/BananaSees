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
  const links = [
    `<a class="btn pk" href="#suggest">💡 Suggest an idiom</a>`,
    SITE.email ? `<a class="btn" href="mailto:${SITE.email}">✉ Email us</a>` : "",
    SITE.instagram ? `<a class="btn" href="${SITE.instagram}" target="_blank" rel="noopener">📸 Instagram</a>` : "",
    SITE.website ? `<a class="btn" href="${SITE.website}" target="_blank" rel="noopener">🌐 Website</a>` : ""
  ].join("");

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
          <div class="hint">${idiom.hint}</div>
          <div class="tgt" id="tg">${idiom.dragTarget}</div>
          <div class="tok" id="tk">${idiom.dragItem}</div>
        </div>
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
   Drop the item on the target (or just tap it) to run it.
   ========================================================== */
function setupDrag(idiom, onFinished) {
  const stage = $("st"), item = $("tk"), target = $("tg");
  let startX, startY, originLeft, originTop;
  let dragging = false, moved = 0, done = false;

  function runExperiment() {
    if (done) return;
    done = true;
    item.classList.add("hide");
    stage.insertAdjacentHTML("beforeend", `
      <div class="res">
        <span>${idiom.resultEmoji}</span>
        <span class="g">${idiom.expectedEmoji}</span>
      </div>
      <div class="cap">${idiom.resultMl}<span class="en">${idiom.resultEn}</span></div>`);
    onFinished();
  }

  item.onpointerdown = (e) => {
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startY = e.clientY;
    originLeft = item.offsetLeft;
    originTop = item.offsetTop;
    item.setPointerCapture(e.pointerId);
    item.style.animation = "none";
    item.style.bottom = "auto";
    item.style.left = originLeft + "px";
    item.style.top = originTop + "px";
  };

  item.onpointermove = (e) => {
    if (!dragging) return;
    target.classList.toggle("glow", overlaps(item, target));   // glow when close
    const dx = e.clientX - startX, dy = e.clientY - startY;
    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    item.style.left = originLeft + dx + "px";
    item.style.top = originTop + dy + "px";
  };

  item.onpointerup = () => {
    dragging = false;
    target.classList.remove("glow");

    if (overlaps(item, target) || moved < 6) {   // dropped on target, or a simple tap
      runExperiment();
    } else {                                      // missed: slide back to the start
      item.style.transition = "all .3s";
      item.style.left = "8%";
      item.style.top = stage.clientHeight * 0.55 + "px";
      setTimeout(() => {
        item.style.transition = "";
        item.style.animation = "";
      }, 320);
    }
  };
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
window.addEventListener("hashchange", route);
route();