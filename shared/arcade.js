(() => {
  const svgns = "http://www.w3.org/2000/svg";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const hit = (a, b, pad = 0) => {
    const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
    return ar.left + pad < br.right && ar.right - pad > br.left && ar.top + pad < br.bottom && ar.bottom - pad > br.top;
  };

  const Icons = {
    ui(name) {
      const path = {
        start: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
        pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>',
        restart: '<path d="M6 7a7 7 0 1 1-1.4 8.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M5 3v5h5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
        music: '<path d="M9 18a3 3 0 1 1-2-2.83V6l10-2v10a3 3 0 1 1-2-2.83V7.2l-6 1.2z" fill="currentColor"/>',
        sound: '<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8c1.5 2 1.5 6 0 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        home: '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" fill="currentColor"/>',
        next: '<path d="M7 5l8 7-8 7zM16 5h2v14h-2z" fill="currentColor"/>',
        up: '<path d="M12 6 5 14h14z" fill="currentColor"/>',
        down: '<path d="M12 18 5 10h14z" fill="currentColor"/>',
        left: '<path d="M6 12 14 5v14z" fill="currentColor"/>',
        right: '<path d="M18 12 10 5v14z" fill="currentColor"/>',
        shield: '<path d="M12 3 5 6v5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V6z" fill="currentColor"/>'
      }[name] || "";
      return '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg>';
    },
    hud(name) {
      const path = {
        score: '<path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9z" fill="#FFD34F" stroke="#F5B82E" stroke-width="1.2"/><path d="M8.5 10.2 12 5.7" stroke="#fff7c8" stroke-width="1.5" stroke-linecap="round"/>',
        target: '<circle cx="12" cy="12" r="8.5" fill="#FF8FC7"/><circle cx="12" cy="12" r="5.6" fill="#fff"/><circle cx="12" cy="12" r="3" fill="#FF8FC7"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>',
        lives: '<path d="M12 20s-7.5-4.5-7.5-9.5A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.5 2.7C19.5 15.5 12 20 12 20z" fill="#FF8FC7"/><path d="M8 9.8c.5-1.2 1.5-1.8 2.7-1.6" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>'
      }[name] || "";
      return '<span class="hud-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg></span>';
    },
    item(name) {
      const items = {
        book: '<rect x="5" y="4" width="12" height="16" rx="3" fill="#89c8ff"/><path d="M9 4v16" stroke="#fff" stroke-width="1.6"/><path d="M11 8h4M11 12h4" stroke="#36506a" stroke-width="1.3" stroke-linecap="round"/>',
        choco: '<rect x="5" y="6" width="14" height="12" rx="3" fill="#b87862"/><path d="M5 10h14M10 6v12M15 6v12" stroke="#fff7e8" stroke-width="1.2"/><path d="M7 4h10l-2 3H9z" fill="#ff9fc5"/>',
        heart: '<path d="M12 19s-7-4.2-7-9a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 4.8-7 9-7 9z" fill="#ff8fbd"/><path d="M8 9.4c.4-1.2 1.4-1.7 2.4-1.5" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>',
        pin: '<path d="M12 21s6-6.3 6-11a6 6 0 0 0-12 0c0 4.7 6 11 6 11z" fill="#77d7b2"/><circle cx="12" cy="10" r="2.4" fill="#fff"/>',
        food: '<circle cx="12" cy="12" r="7" fill="#fff7e8" stroke="#89c8ff" stroke-width="1.8"/><path d="M8 12h8M10 9h4M10 15h4" stroke="#ff9fc5" stroke-width="1.7" stroke-linecap="round"/>',
        brain: '<path d="M9 6a3 3 0 0 0-3 3v6a3 3 0 0 0 5 2 3 3 0 0 0 5-2V8a3 3 0 0 0-5-2 3 3 0 0 0-2 0z" fill="#ffd7e7"/><path d="M11 6v12M7 11h4M13 10h4M13 14h4" stroke="#36506a" stroke-width="1.1" stroke-linecap="round"/>',
        store: '<path d="M5 10h14v9H5z" fill="#fff"/><path d="M4 7h16l-2 4H6z" fill="#ff9fc5"/><path d="M8 19v-5h4v5M14 14h3" stroke="#36506a" stroke-width="1.3" stroke-linecap="round"/>',
        word: '<rect x="4" y="6" width="16" height="12" rx="4" fill="#ffffff"/><path d="M8 10h8M8 14h5" stroke="#4f9ee8" stroke-width="1.7" stroke-linecap="round"/>',
        bad: '<circle cx="12" cy="12" r="8" fill="#ff8f9c"/><path d="M9 10l6 5M15 10l-6 5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
        calm: '<circle cx="12" cy="12" r="8" fill="#bfe3ff"/><path d="M8 12c2-2 6-2 8 0M9 15c1.6 1.4 4.4 1.4 6 0" stroke="#36506a" stroke-width="1.3" stroke-linecap="round"/>'
      };
      return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (items[name] || items.heart) + '</svg>';
    },
    girl() {
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="58" rx="16" ry="4" fill="rgba(54,80,106,.18)"/><path d="M17 26c0-15 30-18 34-2 2 9-3 18-3 18H16s-3-9 1-16z" fill="#544c83"/><circle cx="32" cy="29" r="14" fill="#ffe2cf"/><path d="M20 25c6 1 13-4 15-10 3 6 8 8 11 9-3-13-24-15-26 1z" fill="#544c83"/><circle cx="27" cy="30" r="2.1" fill="#36506a"/><circle cx="38" cy="30" r="2.1" fill="#36506a"/><circle cx="24" cy="34" r="2.6" fill="#ffbfd3"/><circle cx="41" cy="34" r="2.6" fill="#ffbfd3"/><path d="M28 38c2.4 2 5.8 2 8.2 0" stroke="#d86e8d" stroke-width="2.1" fill="none" stroke-linecap="round"/><path d="M20 56c1.5-12 22.5-12 24 0z" fill="#ff8fbd"/><path d="M24 48h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="30" r="5" fill="#ffcfdf"/><circle cx="46" cy="30" r="5" fill="#ffcfdf"/></svg>';
    }
  };

  class AudioTiny {
    constructor() {
      this.ctx = null; this.musicOn = true; this.soundOn = true; this.buffers = {}; this.bgm = null;
      this.master = null; this.musicGain = null; this.soundGain = null; this.ready = false; this.loading = {}; this.retryTimer = null;
      this.basePath = location.pathname.includes("/games/") ? "../../assets/audio/" : "assets/audio/";
      this.version = "audio-v3";
      this.files = { bgm: "bgm.mp3", click: "click.wav", collect: "collect.wav", hit: "hit.wav", win: "win.wav", lose: "lose.wav" };
    }
    init() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.master = this.ctx.createGain(); this.master.gain.value = .9; this.master.connect(this.ctx.destination);
        this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = 0; this.musicGain.connect(this.master);
        this.soundGain = this.ctx.createGain(); this.soundGain.gain.value = .55; this.soundGain.connect(this.master);
      }
      if (this.ctx.state === "suspended") this.ctx.resume();
      this.preload();
    }
    preload() {
      if (this.ready) return;
      this.ready = true;
      Object.entries(this.files).forEach(([name, file]) => {
        this.loading[name] = true;
        fetch(this.basePath + file + "?" + this.version)
          .then(r => { if (!r.ok) throw new Error("audio not found"); return r.arrayBuffer(); })
          .then(b => this.ctx.decodeAudioData(b))
          .then(buf => { this.buffers[name] = buf; this.loading[name] = false; })
          .catch(() => { this.loading[name] = false; });
      });
    }
    play(name, fallback = 520) {
      if (!this.soundOn) return;
      this.init();
      const buf = this.buffers[name];
      if (!buf) return this.beep(fallback, .07, "triangle", .035);
      const src = this.ctx.createBufferSource();
      src.buffer = buf; src.connect(this.soundGain); src.start();
    }
    beep(freq = 420, dur = .08, type = "sine", gain = .05) {
      if (!this.soundOn) return;
      this.init();
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq; g.gain.value = gain;
      o.connect(g); g.connect(this.soundGain); o.start();
      g.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime + dur);
      o.stop(this.ctx.currentTime + dur);
    }
    startMusic() {
      this.init();
      if (!this.musicOn || this.bgm) return;
      const buf = this.buffers.bgm;
      if (!buf) {
        if (!this.retryTimer) this.retryTimer = setTimeout(() => { this.retryTimer = null; this.startMusic(); }, 120);
        return;
      }
      const src = this.ctx.createBufferSource();
      src.buffer = buf; src.loop = true; src.connect(this.musicGain); src.start();
      this.bgm = src;
      this.fadeMusic(.28, .35);
    }
    fadeMusic(target, dur = .22) {
      if (!this.musicGain) return;
      const t = this.ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(t);
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, t);
      this.musicGain.gain.linearRampToValueAtTime(target, t + dur);
    }
    stopMusic() {
      if (!this.ctx || !this.bgm) return;
      const src = this.bgm; this.fadeMusic(0, .25);
      setTimeout(() => { try { src.stop(); } catch (_) {} if (this.bgm === src) this.bgm = null; }, 270);
    }
  }

  class Arcade {
    constructor(cfg) {
      this.cfg = cfg; this.audio = new AudioTiny(); this.score = 0; this.goal = cfg.goal || 10; this.lives = cfg.lives || 3;
      this.time = cfg.time || 60; this.running = false; this.paused = false; this.objects = []; this.keys = {};
      this.last = 0; this.spawn = 0; this.moveAcc = 0; this.state = {}; this.swipe = { x: 0, y: 0, active: false, px: 0, py: 0 };
      this.$ = (id) => document.getElementById(id);
      this.field = this.$("field"); this.overlay = this.$("overlay"); this.toast = this.$("toast"); this.wrap = document.querySelector(".game-wrap");
      this.hintText = cfg.hint || this.defaultHint(cfg.mode, cfg.intro);
      this.goalText = document.querySelector(".goal")?.textContent || cfg.intro;
      this.bindUI(); this.bindGestures(); this.renderHud();
      if (cfg.mode === "finalNote") {
        this.setupFinalNote();
      } else {
        this.addHint();
        this.showOverlay("Siap Bermain?", "Tujuan: " + this.goalText, "Mulai", this.startDetails(cfg.mode));
      }
      const unlock = () => { this.audio.init(); this.audio.startMusic(); };
      document.addEventListener("pointerdown", unlock, { once: true, passive: true });
      document.addEventListener("touchstart", unlock, { once: true, passive: true });
    }
    bindUI() {
      document.querySelectorAll("[data-ui]").forEach(btn => {
        btn.innerHTML = Icons.ui(btn.dataset.ui);
        btn.title = btn.getAttribute("aria-label") || btn.dataset.ui;
      });
      this.decorateHud();
      this.$("btnStart").addEventListener("click", () => { this.audio.play("click", 520); this.start(); });
      this.$("btnPause").addEventListener("click", () => { this.audio.play("click", 520); this.togglePause(); });
      this.$("btnRestart").addEventListener("click", () => { this.audio.play("click", 520); this.restart(); });
      this.$("btnMusic").addEventListener("click", () => { this.audio.play("click", 520); this.audio.musicOn = !this.audio.musicOn; this.audio.musicOn ? this.audio.startMusic() : this.audio.stopMusic(); this.flash(this.audio.musicOn ? "Music on" : "Music off"); });
      this.$("btnSound").addEventListener("click", () => { this.audio.soundOn = !this.audio.soundOn; this.audio.play("click", 520); this.flash(this.audio.soundOn ? "Sound on" : "Sound off"); });
      this.$("btnHome").addEventListener("click", () => { this.audio.play("click", 520); location.href = "../../index.html"; });
      if (this.$("btnNext")) this.$("btnNext").addEventListener("click", () => { this.audio.play("click", 520); location.href = this.cfg.next || "../../index.html"; });
      document.querySelectorAll("[data-dir]").forEach(btn => {
        const dir = btn.dataset.dir;
        const down = (e) => {
          e.preventDefault();
          this.keys[dir] = true;
          if (this.running && this.grid && (this.cfg.mode === "maze" || this.cfg.mode === "service" || this.cfg.mode === "journey")) {
            this.moveAcc = 0;
            this.stepGrid(dir);
          } else {
            this.nudge(dir);
          }
        };
        const up = () => { this.keys[dir] = false; };
        btn.addEventListener("pointerdown", down); btn.addEventListener("pointerup", up); btn.addEventListener("pointercancel", up); btn.addEventListener("pointerleave", up);
      });
      document.querySelectorAll("[data-lane]").forEach(btn => btn.addEventListener("click", () => this.setLane(+btn.dataset.lane)));
    }
    decorateHud() {
      const cards = [
        ["score", "Skor", "score"],
        ["goal", "Target", "target"],
        ["lives", "Nyawa", "lives"]
      ];
      document.querySelectorAll(".hud-pill").forEach((card, i) => {
        const [id, label, icon] = cards[i];
        card.innerHTML = Icons.hud(icon) + '<span class="hud-label">' + label + '</span><span id="' + id + '">0</span>';
      });
    }
    addHint() {
      if (!document.querySelector(".game-hint")) {
        const hint = document.createElement("div");
        hint.className = "game-hint";
        hint.textContent = this.hintText;
        const progress = document.querySelector(".progress");
        progress ? progress.insertAdjacentElement("afterend", hint) : this.wrap?.insertAdjacentElement("beforebegin", hint);
      }
    }
    defaultHint(mode, fallback) {
      return {
        maze: "Geser Amanda untuk ambil ikon.",
        catchBooks: "Geser Amanda untuk tangkap buku.",
        ingredients: "Tap bahan Chocolova yang benar.",
        service: "Antar pesanan ke meja menyala.",
        bubble: "Tap hati, hindari negatif.",
        defense: "Geser shield, blokir bubble negatif.",
        runner: "Geser jalur, ambil ikon toko.",
        chase: "Swipe menjauh, ambil hati maaf.",
        hidden: "Tap huruf A-M-A-N-D-A.",
        memory: "Tap kartu untuk cari pasangan.",
        wordCatch: "Geser Amanda, tangkap kata baik.",
        journey: "Geser Amanda menuju hati akhir.",
        finalNote: "Tap layar sekali."
      }[mode] || fallback;
    }
    startDetails(mode) {
      return {
        maze: ["Geser/D-pad satu langkah per ritme.", "Ambil semua ikon, hindari jalan buntu."],
        catchBooks: ["Geser Amanda ke kiri atau kanan.", "Tangkap buku, hindari tinta gelap."],
        ingredients: ["Tap bahan yang cocok untuk Chocolova.", "Salah bahan mengurangi nyawa."],
        service: ["Gerakkan Amanda ke meja berikon makanan.", "Layani semua meja sampai target penuh."],
        bubble: ["Tap Hati, Tenang, atau Diri.", "Jangan tap bubble Negatif."],
        defense: ["Geser shield mengikuti bubble negatif.", "Tahan sampai target waktu penuh."],
        runner: ["Swipe kiri/kanan untuk ganti jalur.", "Ambil ikon toko, hindari rintangan."],
        chase: ["Swipe menjauh dari Salah Paham.", "Ambil hati Maaf untuk bonus skor."],
        hidden: ["Tap kartu huruf yang terlihat jelas.", "Kumpulkan semua huruf AMANDA."],
        memory: ["Buka dua kartu dalam satu giliran.", "Cocokkan pasangan ikon yang sama."],
        wordCatch: ["Geser Amanda ke kata baik.", "Hindari kata bising/negatif."],
        journey: ["Ikuti jalur dengan D-pad atau swipe.", "Kumpulkan ikon sampai akhir."],
        finalNote: ["Tap layar sekali.", "Ada pesan kecil setelah itu."]
      }[mode] || ["Ikuti hint singkat saat bermain.", "Capai target sebelum nyawa habis."];
    }
    bindGestures() {
      if (this.cfg.mode === "finalNote") return;
      const tappable = ".item,.bubble,.card,.falling,.runner-item,button";
      const start = (e) => {
        if (e.target.closest(tappable)) return;
        this.swipe.active = true; this.swipe.px = e.clientX; this.swipe.py = e.clientY; this.field.setPointerCapture?.(e.pointerId);
      };
      const move = (e) => {
        if (!this.swipe.active) return;
        const dx = e.clientX - this.swipe.px, dy = e.clientY - this.swipe.py;
        this.swipe.x = clamp(dx / 42, -1, 1); this.swipe.y = clamp(dy / 42, -1, 1);
        if (this.cfg.mode === "runner" && Math.abs(dx) > 34) { this.setLane(this.state.lane + (dx > 0 ? 1 : -1)); this.swipe.px = e.clientX; }
      };
      const end = () => { this.swipe.active = false; this.swipe.x = 0; this.swipe.y = 0; };
      this.field.addEventListener("pointerdown", start);
      this.field.addEventListener("pointermove", move);
      this.field.addEventListener("pointerup", end);
      this.field.addEventListener("pointercancel", end);
    }
    showOverlay(title, text, cta, details) {
      this.overlay.classList.remove("hidden");
      this.overlay.querySelector("h2").textContent = title;
      this.overlay.querySelector("p").textContent = text;
      const panel = this.overlay.querySelector(".panel");
      let list = panel.querySelector(".modal-list");
      if (!list) {
        list = document.createElement("ul");
        list.className = "modal-list";
        panel.insertBefore(list, this.$("btnStart"));
      }
      if (details && details.length) {
        list.innerHTML = details.slice(0, 2).map(item => "<li>" + item + "</li>").join("");
        list.classList.remove("hidden");
      } else {
        list.classList.add("hidden");
      }
      this.$("btnStart").textContent = cta || "Start";
    }
    hideOverlay() { this.overlay.classList.add("hidden"); }
    flash(t) { this.toast.textContent = t; this.toast.classList.add("show"); setTimeout(() => this.toast.classList.remove("show"), 650); }
    bindTap(el, handler) {
      const run = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (el._gone || el._tapBusy) return;
        el._tapBusy = true;
        handler(e);
        setTimeout(() => { el._tapBusy = false; }, 280);
      };
      el.addEventListener("pointerdown", run);
      el.addEventListener("click", run);
    }
    renderHud() {
      const score = Math.floor(this.score), lives = Math.max(0, Math.ceil(this.lives)), pct = Math.floor(clamp((this.score / this.goal) * 100, 0, 100));
      if (this._hudScore !== score) { this.$("score").textContent = score; this._hudScore = score; }
      if (this._hudGoal !== this.goal) { this.$("goal").textContent = this.goal; this._hudGoal = this.goal; }
      if (this._hudLives !== lives) { this.$("lives").textContent = lives; this._hudLives = lives; }
      if (this._hudPct !== pct) { this.$("bar").style.width = pct + "%"; this._hudPct = pct; }
    }
    start() { if (this.cfg.mode === "finalNote") return this.setupFinalNote(); this.audio.init(); this.audio.startMusic(); this.audio.fadeMusic(.28, .25); if (!this.running) this.resetMode(); this.running = true; this.paused = false; this.hideOverlay(); this.last = performance.now(); requestAnimationFrame((t) => this.loop(t)); }
    restart() { if (this.cfg.mode === "finalNote") return this.setupFinalNote(); this.clear(); this.score = 0; this.lives = this.cfg.lives || 3; this.time = this.cfg.time || 60; this.running = false; this.paused = false; this.renderHud(); this.start(); }
    togglePause() { if (!this.running) return; this.paused = !this.paused; this.paused ? (this.audio.fadeMusic(.18, .18), this.showOverlay("Pause", "Ambil napas sebentar.", "Lanjut")) : (this.audio.fadeMusic(.28, .18), this.hideOverlay()); if (!this.paused) { this.last = performance.now(); requestAnimationFrame((t) => this.loop(t)); } }
    clear() { this.field.innerHTML = ""; this.objects = []; this.player = null; }
    loop(t) {
      if (!this.running || this.paused) return;
      const dt = Math.min(.033, (t - this.last) / 1000 || .016); this.last = t;
      this.update(dt); this.renderHud();
      if (this.score >= this.goal) return this.win();
      if (this.lives <= 0) return this.lose();
      requestAnimationFrame((n) => this.loop(n));
    }
    makeEl(cls, icon, label, size = 42) {
      const el = document.createElement("div"); el.className = cls; el.style.width = size + "px"; el.style.height = size + "px"; el.innerHTML = '<span class="sprite-icon">' + Icons.item(icon) + '</span>' + (label ? '<span class="label">' + label + '</span>' : "");
      this.field.appendChild(el); return el;
    }
    makeGirl(size = 48) { const el = document.createElement("div"); el.className = "entity girl"; el.style.width = size + "px"; el.style.height = size + "px"; el.innerHTML = Icons.girl(); this.field.appendChild(el); return el; }
    place(el, x, y) { el.style.transform = "translate3d(" + x + "px," + y + "px,0)"; el.style.setProperty("--x", x + "px"); el.style.setProperty("--y", y + "px"); el._x = x; el._y = y; }
    resetMode() {
      this.clear(); this.score = 0; this.lives = this.cfg.lives || 3; this.time = this.cfg.time || 60; this.state = {}; this.renderHud();
      const m = this.cfg.mode;
      if (m === "maze") this.initMaze();
      if (m === "catchBooks" || m === "wordCatch") this.initCatch(m);
      if (m === "ingredients") this.initIngredients();
      if (m === "service") this.initService();
      if (m === "bubble") this.initBubble();
      if (m === "defense") this.initDefense();
      if (m === "runner") this.initRunner();
      if (m === "chase") this.initChase();
      if (m === "hidden") this.initHidden();
      if (m === "memory") this.initMemory();
      if (m === "journey") this.initJourney();
    }
    update(dt) {
      const m = this.cfg.mode;
      this.smoothPlayer(dt);
      if (m === "maze" || m === "service" || m === "journey") this.updateGrid(dt);
      if (m === "catchBooks" || m === "wordCatch") this.updateCatch(dt);
      if (m === "ingredients") this.updateIngredients(dt);
      if (m === "bubble") this.updateBubble(dt);
      if (m === "defense") this.updateDefense(dt);
      if (m === "runner") this.updateRunner(dt);
      if (m === "chase") this.updateChase(dt);
      if (m === "hidden") this.updateHidden(dt);
    }
    inputDir() {
      if (this.keys.up) return "up"; if (this.keys.down) return "down"; if (this.keys.left) return "left"; if (this.keys.right) return "right";
      if (Math.abs(this.swipe.x) > .45 || Math.abs(this.swipe.y) > .45) return Math.abs(this.swipe.x) > Math.abs(this.swipe.y) ? (this.swipe.x > 0 ? "right" : "left") : (this.swipe.y > 0 ? "down" : "up");
      return "";
    }
    smoothPlayer(dt) {
      if (!this.player || this.player._tx === undefined) return;
      const k = Math.min(1, dt * 16);
      const x = this.player._x + (this.player._tx - this.player._x) * k;
      const y = this.player._y + (this.player._ty - this.player._y) * k;
      this.place(this.player, x, y);
    }
    win() { this.running = false; this.audio.play("win", 760); this.audio.fadeMusic(.18, .25); this.showOverlay("Selesai!", "Bab ini terbuka manis. Lanjut ke bab berikutnya.", "Main Lagi"); }
    lose() { this.running = false; this.audio.play("lose", 180); this.audio.fadeMusic(.12, .25); this.shake(); this.showOverlay("Coba Lagi", "Ritmenya hampir dapat. Ulang dari awal ya.", "Restart"); }
    nudge(dir) { if (this.cfg.mode === "runner") { if (dir === "left") this.setLane(this.state.lane - 1); if (dir === "right") this.setLane(this.state.lane + 1); } }
    setLane(lane) { if (!this.state || this.state.lane === undefined) return; const next = clamp(lane, 0, 2); if (next !== this.state.lane) this.audio.play("click", 360); this.state.lane = next; }
    shake() { if (!this.wrap) return; this.wrap.classList.remove("shake"); void this.wrap.offsetWidth; this.wrap.classList.add("shake"); }
    collect(o, points = 1) {
      if (!o || o._gone) return;
      o._gone = true; this.score += points; this.audio.play("collect", 620); o.classList.add("collected");
      this.popScore(o._x + 12, o._y - 4, "+" + points);
      setTimeout(() => o.remove(), 180);
      this.objects = this.objects.filter(v => v !== o);
    }
    popScore(x, y, text) {
      const el = document.createElement("div");
      el.className = "score-pop"; el.textContent = text;
      el.style.setProperty("--x", x + "px"); el.style.setProperty("--y", y + "px");
      this.field.appendChild(el); setTimeout(() => el.remove(), 440);
    }
    damage(amount = 1) { this.lives -= amount; this.audio.play("hit", 170); this.shake(); }

    initMaze() { this.grid = { cols: 7, rows: 9, x: 0, y: 0, cells: [] }; this.makeGrid(["1111111","1000001","1011101","1000101","1110101","1000101","1011101","1000001","1111111"]); this.addGridPlayer(1,1); [["book","Buku",5,1],["heart","Hati",1,3],["pin","Lokasi",5,3],["choco","Cokelat",1,5],["brain","Diri",5,5],["store","Toko",3,7]].forEach(a=>this.addGridItem(...a)); }
    makeGrid(rows) { this.field.className = "playfield grid-field"; this.field.style.gridTemplateColumns = "repeat(" + rows[0].length + ",1fr)"; this.field.style.gridTemplateRows = "repeat(" + rows.length + ",1fr)"; this.grid.cells = rows; rows.join("").split("").forEach(c => { const d=document.createElement("div"); d.className="cell "+(c==="1"?"wall":""); this.field.appendChild(d); }); }
    addGridPlayer(cx, cy) { this.state.cx = cx; this.state.cy = cy; this.player = this.makeGirl(42); this.field.appendChild(this.player); this.snapGrid(); }
    addGridItem(icon,label,cx,cy) { const el=this.makeEl("item",icon,label,34); el._cx=cx; el._cy=cy; this.objects.push(el); this.snapItem(el); return el; }
    snapGrid() { const r=this.field.getBoundingClientRect(), cw=r.width/this.grid.cols, ch=r.height/this.grid.rows; const x=this.state.cx*cw+cw/2-21, y=this.state.cy*ch+ch/2-21; this.player._tx=x; this.player._ty=y; if(this.player._x===undefined) this.place(this.player,x,y); }
    snapItem(el) { const r=this.field.getBoundingClientRect(), cw=r.width/this.grid.cols, ch=r.height/this.grid.rows; this.place(el, el._cx*cw+cw/2-17, el._cy*ch+ch/2-17); }
    stepGrid(dir) { let x=this.state.cx, y=this.state.cy; if(dir==="up")y--; if(dir==="down")y++; if(dir==="left")x--; if(dir==="right")x++; if(this.grid.cells[y] && this.grid.cells[y][x] === "0") { this.state.cx=x; this.state.cy=y; this.snapGrid(); this.audio.play("click",300); } if(this.cfg.mode==="service") return this.checkServiceTable(); this.objects.slice().forEach(o=>{ if(o._cx===this.state.cx && o._cy===this.state.cy) this.collect(o); }); }
    updateGrid(dt) { this.moveAcc += dt; if (this.moveAcc < .22) return; const dir = this.inputDir(); if (!dir) return; this.moveAcc=0; this.stepGrid(dir); }

    initCatch(mode) { this.field.className = "playfield"; this.player = this.makeGirl(48); this.state.px = this.field.clientWidth/2-24; this.state.mode=mode; this.place(this.player,this.state.px,this.field.clientHeight-66); }
    updateCatch(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; const vx=(this.keys.left?-1:0)+(this.keys.right?1:0)+this.swipe.x; this.state.px+=vx*260*dt; this.state.px=clamp(this.state.px,8,w-56); this.place(this.player,this.state.px,h-66); this.spawn+=dt; if(this.spawn>.72 && this.objects.length<12){ this.spawn=0; const good=Math.random()>.22; const icon=this.state.mode==="wordCatch"?(good?"word":"bad"):(good?"book":"bad"); const label=this.state.mode==="wordCatch"?(good?["Jujur","Lembut","Berani","Rindu"][Math.floor(rand(0,4))]:"Bising"):(good?"Buku":"Tinta"); const el=this.makeEl("falling",icon,label,40); this.place(el,rand(8,w-48),-42); el._vy=rand(115,180); el._good=good; this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o._good?this.collect(o): (o.remove(), this.objects=this.objects.filter(v=>v!==o), this.damage()); } else if(o._y>h+50){ o.remove(); this.objects=this.objects.filter(v=>v!==o); if(o._good)this.damage(.5); }}); }

    initIngredients() { this.field.className = "playfield"; this.state.need = ["choco","heart","food"]; this.spawnIngredients(); }
    spawnIngredients() { this.field.innerHTML=""; this.objects=[]; const w=this.field.clientWidth,h=this.field.clientHeight; const icons=["choco","book","heart","food","pin","brain"]; for(let i=0;i<6;i++){ const icon=icons[i]; const el=this.makeEl("item",icon,icon==="choco"?"Cokelat":icon==="heart"?"Hati":icon==="food"?"Susu":icon==="book"?"Buku":icon==="pin"?"Lokasi":"Ide",58); this.place(el,rand(22,w-80),rand(34,h-96)); this.bindTap(el,()=>{ if(this.state.need.includes(icon)){ this.audio.play("collect",650); this.score++; this.popScore(el._x+18,el._y-4,"+1"); this.spawnIngredients(); } else this.damage(); }); this.objects.push(el);} }
    updateIngredients(dt) { this.spawn+=dt; if(this.spawn>2){ this.spawn=0; this.objects.forEach((o,i)=>this.place(o,o._x+Math.sin(Date.now()/500+i)*.4,o._y)); } }

    initService() { this.grid={cols:5,rows:7,cells:["00000","00000","00000","00000","00000","00000","00000"]}; this.makeGrid(this.grid.cells); this.addGridPlayer(2,6); this.state.serviceTables=[]; [[0,1],[2,1],[4,1],[0,3],[2,3],[4,3]].forEach((p,i)=>{ const table=this.addGridItem("food","Meja "+(i+1),p[0],p[1]); table._service=true; table._served=false; this.state.serviceTables.push(table); }); this.setActiveServiceTable(0); }
    setActiveServiceTable(index) { this.state.serviceIndex=index; (this.state.serviceTables||[]).forEach((table,i)=>{ const active=i===index && !table._served; table.classList.toggle("service-active",active); table.classList.toggle("service-done",!!table._served); table.style.opacity=table._served?".42":active?"1":".68"; }); }
    checkServiceTable() { const table=(this.state.serviceTables||[])[this.state.serviceIndex]; if(!table || table._served || table._cx!==this.state.cx || table._cy!==this.state.cy) return; table._served=true; this.score++; this.audio.play("collect",640); this.popScore(table._x+10,table._y-4,"+1"); const next=(this.state.serviceTables||[]).findIndex(t=>!t._served); if(next>=0) this.setActiveServiceTable(next); else this.setActiveServiceTable(-1); }

    initBubble() { this.field.className="playfield"; this.state.target=["calm","heart","brain"]; }
    updateBubble(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; this.spawn+=dt; if(this.spawn>.48 && this.objects.length<14){ this.spawn=0; const good=Math.random()>.28; const icon=good?["calm","heart","brain"][Math.floor(rand(0,3))]:"bad"; const el=this.makeEl("bubble",icon,good?["Tenang","Hati","Diri"][Math.floor(rand(0,3))]:"Negatif",46); this.place(el,rand(10,w-58),h+48); el._vy=rand(45,88); el._good=good; this.bindTap(el,()=>{ good?this.collect(el): (el.remove(), this.objects=this.objects.filter(v=>v!==el), this.damage()); }); this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y-o._vy*dt); if(o._y<-60){ o.remove(); this.objects=this.objects.filter(v=>v!==o); }}); }

    initDefense() { this.field.className="playfield"; this.player=this.makeEl("entity", "calm", "Tameng", 56); this.state.px=this.field.clientWidth/2-28; this.place(this.player,this.state.px,this.field.clientHeight-78); }
    updateDefense(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; const vx=(this.keys.left?-1:0)+(this.keys.right?1:0)+this.swipe.x; this.state.px+=vx*270*dt; this.state.px=clamp(this.state.px,8,w-64); this.place(this.player,this.state.px,h-78); this.spawn+=dt; if(this.spawn>.55 && this.objects.length<12){ this.spawn=0; const el=this.makeEl("falling","bad","Negatif",42); this.place(el,rand(8,w-50),-45); el._vy=rand(110,185); this.objects.push(el);} this.score += dt; this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o.remove(); this.objects=this.objects.filter(v=>v!==o); this.audio.play("click",430);} else if(o._y>h){ o.remove(); this.objects=this.objects.filter(v=>v!==o); this.damage(); }}); }

    initRunner() { this.field.className="playfield"; this.player=this.makeGirl(48); this.state.lane=1; this.state.dist=0; }
    updateRunner(dt) { const w=this.field.clientWidth,h=this.field.clientHeight,lw=w/3; const tx=this.state.lane*lw+lw/2-24; this.state.px=this.state.px===undefined?tx:this.state.px+(tx-this.state.px)*Math.min(1,dt*12); this.place(this.player,this.state.px,h-72); this.spawn+=dt; if(this.spawn>.62 && this.objects.length<12){ this.spawn=0; const good=Math.random()>.25; const el=this.makeEl("runner-item",good?"store":"bad",good?"Gramedia":"Macet",42); el._lane=Math.floor(rand(0,3)); this.place(el,el._lane*lw+lw/2-21,-44); el._vy=rand(145,225); el._good=good; this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o._good?this.collect(o): (o.remove(), this.objects=this.objects.filter(v=>v!==o), this.damage()); } else if(o._y>h+50){ o.remove(); this.objects=this.objects.filter(v=>v!==o); }}); }

    initChase() { this.field.className="playfield"; this.player=this.makeGirl(46); this.enemy=this.makeEl("entity","bad","Salah paham",50); this.state.px=60; this.state.py=160; this.state.ex=10; this.state.ey=40; }
    updateChase(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; const s=210; const vx=(this.keys.left?-1:0)+(this.keys.right?1:0)+this.swipe.x, vy=(this.keys.up?-1:0)+(this.keys.down?1:0)+this.swipe.y; this.state.px+=vx*s*dt;this.state.py+=vy*s*dt; this.state.px=clamp(this.state.px,8,w-54);this.state.py=clamp(this.state.py,8,h-64); let dx=this.state.px-this.state.ex,dy=this.state.py-this.state.ey,d=Math.hypot(dx,dy)||1; const wobble=Math.sin(performance.now()/420)*18; this.state.ex+=(dx/d*94 + Math.cos(performance.now()/500)*wobble)*dt;this.state.ey+=(dy/d*94 + Math.sin(performance.now()/560)*wobble)*dt; this.place(this.player,this.state.px,this.state.py);this.place(this.enemy,this.state.ex,this.state.ey); this.score+=dt; if(hit(this.player,this.enemy,10)){this.lives-=dt*2.2; if(Math.random()<.08)this.shake();} this.spawn+=dt; if(this.spawn>1.1&&this.objects.length<5){this.spawn=0;const el=this.makeEl("item","heart","Maaf",36);this.place(el,rand(10,w-46),rand(20,h-70));this.objects.push(el);} this.objects.slice().forEach(o=>{ if(hit(o,this.player,4)) this.collect(o,2); }); }

    initHidden() {
      this.field.className="playfield name-field";
      const title=document.createElement("div");
      title.className="word-target";
      title.textContent="AMANDA";
      this.field.appendChild(title);
      const letters=["A","M","A","N","D","A"], icons=["heart","book","choco","brain","pin","store"];
      const w=this.field.clientWidth,h=this.field.clientHeight,size=58;
      letters.forEach((letter,i)=>{
        const col=i%3,row=Math.floor(i/3);
        const el=this.makeEl("item word-tile",icons[i],"Tap",size);
        el.insertAdjacentHTML("beforeend",'<span class="letter-badge">'+letter+'</span>');
        const x=(w-size)/2+(col-1)*Math.min(88,w*.26), y=Math.max(74,h*.24)+row*Math.min(106,h*.26);
        this.place(el,x,y);
        this.bindTap(el,()=>this.collect(el));
        this.objects.push(el);
      });
    }
    updateHidden(dt) { this.objects.forEach((o,i)=>this.place(o,o._x,o._y+Math.sin(Date.now()/650+i)*.18)); }

    initMemory() { this.field.className="playfield"; const wrap=document.createElement("div"); wrap.className="memory-grid"; this.field.appendChild(wrap); const icons=["book","choco","heart","pin","brain","store"]; const deck=[...icons,...icons].sort(()=>Math.random()-.5); this.state.open=[]; deck.forEach(icon=>{ const c=document.createElement("button"); c.className="card memory-card"; c.type="button"; c.innerHTML='<span class="card-face">'+Icons.item("heart")+'</span>'; c._icon=icon; this.bindTap(c,()=>{ if(c.classList.contains("done")||this.state.open.includes(c)||this.state.open.length>=2)return; this.audio.play("click",520); c.classList.add("open"); c.innerHTML='<span class="card-face">'+Icons.item(icon)+'</span>'; this.state.open.push(c); if(this.state.open.length===2){ const [a,b]=this.state.open; setTimeout(()=>{ if(a._icon===b._icon){ a.classList.add("done"); b.classList.add("done"); a.style.opacity=b.style.opacity=.48; this.score++; this.audio.play("collect",640); this.popScore(a.offsetLeft+18,a.offsetTop+4,"+1"); } else { a.classList.remove("open"); b.classList.remove("open"); a.innerHTML=b.innerHTML='<span class="card-face">'+Icons.item("heart")+'</span>'; this.damage(.25); } this.state.open=[]; },460); }}); wrap.appendChild(c); }); }

    initJourney() { this.grid={cols:7,rows:9,cells:["0000000","0111010","0001010","1011010","1000010","1011110","1000000","0111110","0000000"]}; this.makeGrid(this.grid.cells); this.addGridPlayer(0,8); [["heart","Hati",2,6],["book","Buku",4,4],["choco","Cokelat",2,2],["pin","Tujuan",6,0],["brain","Diri",0,0],["store","Akhir",6,8]].forEach(a=>this.addGridItem(...a)); }
    setupFinalNote() {
      document.body.classList.add("final-note-mode");
      this.running=false; this.paused=false; this.score=0; this.lives=1; this.goal=1; this.clear(); this.hideOverlay();
      const hint=document.querySelector(".game-hint"); if(hint) hint.remove();
      this.field.className="playfield final-field";
      const card=document.createElement("div");
      card.className="final-note";
      card.innerHTML='<span class="final-heart">'+Icons.item("heart")+'</span><p>Tap layar sekali.</p>';
      this.field.appendChild(card);
      const reveal=(e)=>{
        e.preventDefault();
        this.audio.init(); this.audio.play("win",760); this.audio.fadeMusic(.45,.25);
        card.classList.add("revealed");
        card.innerHTML='<span class="final-heart">'+Icons.item("heart")+'</span><p>kamu suka sama gamenya?<br>kalo aku si suka kamunya</p>';
      };
      this.field.addEventListener("pointerup", reveal, { once:true });
    }
  }

  window.AmandaArcade = { Arcade, Icons, AudioTiny };
})();
