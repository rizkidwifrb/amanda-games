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
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="15" fill="#5f5b88"/><path d="M18 25c0-12 28-12 28 0v10H18z" fill="#5f5b88"/><circle cx="32" cy="27" r="13" fill="#ffe3cf"/><circle cx="27" cy="27" r="1.8" fill="#36506a"/><circle cx="37" cy="27" r="1.8" fill="#36506a"/><path d="M28 34c2.4 2 5.6 2 8 0" stroke="#d86e8d" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20 54c2-10 22-10 24 0z" fill="#ff9fc5"/><circle cx="20" cy="25" r="5" fill="#ffd7e7"/><circle cx="44" cy="25" r="5" fill="#ffd7e7"/></svg>';
    }
  };

  class AudioTiny {
    constructor() { this.ctx = null; this.musicOn = true; this.soundOn = true; this.loop = null; }
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); if (this.ctx.state === "suspended") this.ctx.resume(); }
    beep(freq = 420, dur = .08, type = "sine", gain = .05) {
      if (!this.soundOn) return;
      this.init();
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq; g.gain.value = gain;
      o.connect(g); g.connect(this.ctx.destination); o.start();
      g.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime + dur);
      o.stop(this.ctx.currentTime + dur);
    }
    startMusic() {
      this.init();
      if (this.loop || !this.musicOn) return;
      let i = 0; const notes = [262, 330, 392, 523, 392, 330];
      this.loop = setInterval(() => { if (this.musicOn) this.beep(notes[i++ % notes.length], .055, "triangle", .018); }, 420);
    }
    stopMusic() { clearInterval(this.loop); this.loop = null; }
  }

  class Arcade {
    constructor(cfg) {
      this.cfg = cfg; this.audio = new AudioTiny(); this.score = 0; this.goal = cfg.goal || 10; this.lives = cfg.lives || 3;
      this.time = cfg.time || 60; this.running = false; this.paused = false; this.objects = []; this.keys = {};
      this.last = 0; this.spawn = 0; this.moveAcc = 0; this.state = {};
      this.$ = (id) => document.getElementById(id);
      this.field = this.$("field"); this.overlay = this.$("overlay"); this.toast = this.$("toast");
      this.bindUI(); this.renderHud(); this.showOverlay("Siap Bermain?", cfg.intro, "Start");
    }
    bindUI() {
      document.querySelectorAll("[data-ui]").forEach(btn => {
        btn.innerHTML = Icons.ui(btn.dataset.ui);
        btn.title = btn.getAttribute("aria-label") || btn.dataset.ui;
      });
      this.$("btnStart").addEventListener("click", () => this.start());
      this.$("btnPause").addEventListener("click", () => this.togglePause());
      this.$("btnRestart").addEventListener("click", () => this.restart());
      this.$("btnMusic").addEventListener("click", () => { this.audio.musicOn = !this.audio.musicOn; this.audio.musicOn ? this.audio.startMusic() : this.audio.stopMusic(); this.flash(this.audio.musicOn ? "Music on" : "Music off"); });
      this.$("btnSound").addEventListener("click", () => { this.audio.soundOn = !this.audio.soundOn; this.flash(this.audio.soundOn ? "Sound on" : "Sound off"); });
      this.$("btnHome").addEventListener("click", () => location.href = "../../index.html");
      this.$("btnNext").addEventListener("click", () => location.href = this.cfg.next || "../../index.html");
      document.querySelectorAll("[data-dir]").forEach(btn => {
        const dir = btn.dataset.dir;
        const down = (e) => { e.preventDefault(); this.keys[dir] = true; this.nudge(dir); };
        const up = () => { this.keys[dir] = false; };
        btn.addEventListener("pointerdown", down); btn.addEventListener("pointerup", up); btn.addEventListener("pointercancel", up); btn.addEventListener("pointerleave", up);
      });
      document.querySelectorAll("[data-lane]").forEach(btn => btn.addEventListener("click", () => this.setLane(+btn.dataset.lane)));
    }
    showOverlay(title, text, cta) { this.overlay.classList.remove("hidden"); this.overlay.querySelector("h2").textContent = title; this.overlay.querySelector("p").textContent = text; this.$("btnStart").textContent = cta || "Start"; }
    hideOverlay() { this.overlay.classList.add("hidden"); }
    flash(t) { this.toast.textContent = t; this.toast.classList.add("show"); setTimeout(() => this.toast.classList.remove("show"), 650); }
    renderHud() { this.$("score").textContent = Math.floor(this.score); this.$("goal").textContent = this.goal; this.$("lives").textContent = Math.max(0, Math.ceil(this.lives)); this.$("bar").style.width = clamp((this.score / this.goal) * 100, 0, 100) + "%"; }
    start() { this.audio.init(); this.audio.startMusic(); if (!this.running) this.resetMode(); this.running = true; this.paused = false; this.hideOverlay(); this.last = performance.now(); requestAnimationFrame((t) => this.loop(t)); }
    restart() { this.clear(); this.score = 0; this.lives = this.cfg.lives || 3; this.time = this.cfg.time || 60; this.running = false; this.paused = false; this.renderHud(); this.start(); }
    togglePause() { if (!this.running) return; this.paused = !this.paused; this.paused ? this.showOverlay("Pause", "Ambil napas sebentar.", "Lanjut") : this.hideOverlay(); if (!this.paused) { this.last = performance.now(); requestAnimationFrame((t) => this.loop(t)); } }
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
    place(el, x, y) { el.style.transform = "translate3d(" + x + "px," + y + "px,0)"; el._x = x; el._y = y; }
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
      if (m === "maze" || m === "service" || m === "journey") this.updateGrid(dt);
      if (m === "catchBooks" || m === "wordCatch") this.updateCatch(dt);
      if (m === "ingredients") this.updateIngredients(dt);
      if (m === "bubble") this.updateBubble(dt);
      if (m === "defense") this.updateDefense(dt);
      if (m === "runner") this.updateRunner(dt);
      if (m === "chase") this.updateChase(dt);
      if (m === "hidden") this.updateHidden(dt);
    }
    win() { this.running = false; this.audio.beep(660,.16,"triangle",.07); this.showOverlay("Selesai!", "Bab ini terbuka manis. Lanjut ke bab berikutnya.", "Main Lagi"); }
    lose() { this.running = false; this.audio.beep(170,.18,"sawtooth",.04); this.showOverlay("Coba Lagi", "Ritmenya hampir dapat. Ulang dari awal ya.", "Restart"); }
    nudge(dir) { if (this.cfg.mode === "runner") { if (dir === "left") this.setLane(this.state.lane - 1); if (dir === "right") this.setLane(this.state.lane + 1); } }
    setLane(lane) { if (!this.state) return; this.state.lane = clamp(lane, 0, 2); this.audio.beep(360,.04,"sine",.025); }

    initMaze() { this.grid = { cols: 7, rows: 9, x: 0, y: 0, cells: [] }; this.makeGrid(["1111111","1000001","1011101","1000101","1110101","1000101","1011101","1000001","1111111"]); this.addGridPlayer(1,1); [["book","Buku",5,1],["heart","Hati",1,3],["pin","Lokasi",5,3],["choco","Cokelat",1,5],["brain","Diri",5,5],["store","Toko",3,7]].forEach(a=>this.addGridItem(...a)); }
    makeGrid(rows) { this.field.className = "playfield grid-field"; this.field.style.gridTemplateColumns = "repeat(" + rows[0].length + ",1fr)"; this.field.style.gridTemplateRows = "repeat(" + rows.length + ",1fr)"; this.grid.cells = rows; rows.join("").split("").forEach(c => { const d=document.createElement("div"); d.className="cell "+(c==="1"?"wall":""); this.field.appendChild(d); }); }
    addGridPlayer(cx, cy) { this.state.cx = cx; this.state.cy = cy; this.player = this.makeGirl(42); this.field.appendChild(this.player); this.snapGrid(); }
    addGridItem(icon,label,cx,cy) { const el=this.makeEl("item",icon,label,34); el._cx=cx; el._cy=cy; this.objects.push(el); this.snapItem(el); }
    snapGrid() { const r=this.field.getBoundingClientRect(), cw=r.width/this.grid.cols, ch=r.height/this.grid.rows; this.place(this.player, this.state.cx*cw+cw/2-21, this.state.cy*ch+ch/2-21); }
    snapItem(el) { const r=this.field.getBoundingClientRect(), cw=r.width/this.grid.cols, ch=r.height/this.grid.rows; this.place(el, el._cx*cw+cw/2-17, el._cy*ch+ch/2-17); }
    updateGrid(dt) { this.moveAcc += dt; if (this.moveAcc < .16) return; const dir = ["up","down","left","right"].find(d=>this.keys[d]); if (!dir) return; this.moveAcc=0; let x=this.state.cx, y=this.state.cy; if(dir==="up")y--; if(dir==="down")y++; if(dir==="left")x--; if(dir==="right")x++; if(this.grid.cells[y] && this.grid.cells[y][x] !== "1") { this.state.cx=x; this.state.cy=y; this.snapGrid(); this.audio.beep(300,.035,"sine",.02); } this.objects.slice().forEach(o=>{ if(o._cx===this.state.cx && o._cy===this.state.cy){ o.remove(); this.objects=this.objects.filter(v=>v!==o); this.score++; this.audio.beep(560,.06,"triangle",.05); }}); }

    initCatch(mode) { this.field.className = "playfield"; this.player = this.makeGirl(48); this.state.px = this.field.clientWidth/2-24; this.state.mode=mode; this.place(this.player,this.state.px,this.field.clientHeight-66); }
    updateCatch(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; if(this.keys.left) this.state.px-=260*dt; if(this.keys.right) this.state.px+=260*dt; this.state.px=clamp(this.state.px,8,w-56); this.place(this.player,this.state.px,h-66); this.spawn+=dt; if(this.spawn>.72 && this.objects.length<12){ this.spawn=0; const good=Math.random()>.22; const icon=this.state.mode==="wordCatch"?(good?"word":"bad"):(good?"book":"bad"); const label=this.state.mode==="wordCatch"?(good?["Jujur","Lembut","Berani","Rindu"][Math.floor(rand(0,4))]:"Bising"):(good?"Buku":"Tinta"); const el=this.makeEl("falling",icon,label,40); this.place(el,rand(8,w-48),-42); el._vy=rand(115,180); el._good=good; this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o.remove(); this.objects=this.objects.filter(v=>v!==o); if(o._good){this.score++;this.audio.beep(600,.05,"triangle",.05)}else{this.lives--;this.audio.beep(180,.08,"square",.035)}} else if(o._y>h+50){ o.remove(); this.objects=this.objects.filter(v=>v!==o); if(o._good)this.lives-=.5; }}); }

    initIngredients() { this.field.className = "playfield"; this.state.need = ["choco","heart","food"]; this.spawnIngredients(); }
    spawnIngredients() { this.field.innerHTML=""; this.objects=[]; const w=this.field.clientWidth,h=this.field.clientHeight; const icons=["choco","book","heart","food","pin","brain"]; for(let i=0;i<6;i++){ const icon=icons[i]; const el=this.makeEl("item",icon,icon==="choco"?"Cokelat":icon==="heart"?"Hati":icon==="food"?"Susu":icon==="book"?"Buku":icon==="pin"?"Lokasi":"Ide",58); this.place(el,rand(22,w-80),rand(34,h-96)); el.addEventListener("click",()=>{ if(this.state.need.includes(icon)){ this.score++; this.audio.beep(650,.06,"triangle",.06); this.spawnIngredients(); } else { this.lives--; this.audio.beep(160,.1,"square",.04); }}); this.objects.push(el);} }
    updateIngredients(dt) { this.spawn+=dt; if(this.spawn>2){ this.spawn=0; this.objects.forEach((o,i)=>this.place(o,o._x+Math.sin(Date.now()/500+i)*.4,o._y)); } }

    initService() { this.grid={cols:5,rows:7,cells:["00000","01010","00000","01010","00000","01010","00000"]}; this.makeGrid(this.grid.cells); this.addGridPlayer(2,6); [[1,1],[3,1],[1,3],[3,3],[1,5],[3,5]].forEach((p,i)=>this.addGridItem("food","Meja "+(i+1),p[0],p[1])); }

    initBubble() { this.field.className="playfield"; this.state.target=["calm","heart","brain"]; }
    updateBubble(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; this.spawn+=dt; if(this.spawn>.48 && this.objects.length<14){ this.spawn=0; const good=Math.random()>.28; const icon=good?["calm","heart","brain"][Math.floor(rand(0,3))]:"bad"; const el=this.makeEl("bubble",icon,good?["Tenang","Hati","Diri"][Math.floor(rand(0,3))]:"Negatif",46); this.place(el,rand(10,w-58),h+48); el._vy=rand(45,88); el._good=good; el.addEventListener("click",()=>{ el.remove(); this.objects=this.objects.filter(v=>v!==el); good?this.score++:this.lives--; this.audio.beep(good?620:160,.06,good?"triangle":"square",.05); }); this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y-o._vy*dt); if(o._y<-60){ o.remove(); this.objects=this.objects.filter(v=>v!==o); }}); }

    initDefense() { this.field.className="playfield"; this.player=this.makeEl("entity", "calm", "Tameng", 56); this.state.px=this.field.clientWidth/2-28; this.place(this.player,this.state.px,this.field.clientHeight-78); }
    updateDefense(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; if(this.keys.left)this.state.px-=270*dt; if(this.keys.right)this.state.px+=270*dt; this.state.px=clamp(this.state.px,8,w-64); this.place(this.player,this.state.px,h-78); this.spawn+=dt; if(this.spawn>.55 && this.objects.length<12){ this.spawn=0; const el=this.makeEl("falling","bad","Negatif",42); this.place(el,rand(8,w-50),-45); el._vy=rand(110,185); this.objects.push(el);} this.score += dt; this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o.remove(); this.objects=this.objects.filter(v=>v!==o); this.audio.beep(430,.04,"triangle",.04);} else if(o._y>h){ o.remove(); this.objects=this.objects.filter(v=>v!==o); this.lives--; }}); }

    initRunner() { this.field.className="playfield"; this.player=this.makeGirl(48); this.state.lane=1; this.state.dist=0; }
    updateRunner(dt) { const w=this.field.clientWidth,h=this.field.clientHeight,lw=w/3; this.place(this.player,this.state.lane*lw+lw/2-24,h-72); this.spawn+=dt; if(this.spawn>.62 && this.objects.length<12){ this.spawn=0; const good=Math.random()>.25; const el=this.makeEl("runner-item",good?"store":"bad",good?"Gramedia":"Macet",42); el._lane=Math.floor(rand(0,3)); this.place(el,el._lane*lw+lw/2-21,-44); el._vy=rand(145,225); el._good=good; this.objects.push(el);} this.objects.slice().forEach(o=>{ this.place(o,o._x,o._y+o._vy*dt); if(hit(o,this.player,8)){ o.remove(); this.objects=this.objects.filter(v=>v!==o); o._good?this.score++:this.lives--; this.audio.beep(o._good?610:150,.06,o._good?"triangle":"square",.05);} else if(o._y>h+50){ o.remove(); this.objects=this.objects.filter(v=>v!==o); }}); }

    initChase() { this.field.className="playfield"; this.player=this.makeGirl(46); this.enemy=this.makeEl("entity","bad","Salah paham",50); this.state.px=60; this.state.py=160; this.state.ex=10; this.state.ey=40; }
    updateChase(dt) { const w=this.field.clientWidth,h=this.field.clientHeight; const s=210; if(this.keys.left)this.state.px-=s*dt;if(this.keys.right)this.state.px+=s*dt;if(this.keys.up)this.state.py-=s*dt;if(this.keys.down)this.state.py+=s*dt; this.state.px=clamp(this.state.px,8,w-54);this.state.py=clamp(this.state.py,8,h-64); let dx=this.state.px-this.state.ex,dy=this.state.py-this.state.ey,d=Math.hypot(dx,dy)||1; this.state.ex+=dx/d*92*dt;this.state.ey+=dy/d*92*dt; this.place(this.player,this.state.px,this.state.py);this.place(this.enemy,this.state.ex,this.state.ey); this.score+=dt; if(hit(this.player,this.enemy,10)){this.lives-=dt*2.2;} this.spawn+=dt; if(this.spawn>1.1&&this.objects.length<5){this.spawn=0;const el=this.makeEl("item","heart","Maaf",36);this.place(el,rand(10,w-46),rand(20,h-70));this.objects.push(el);} this.objects.slice().forEach(o=>{ if(hit(o,this.player,4)){o.remove();this.objects=this.objects.filter(v=>v!==o);this.score+=2;this.audio.beep(650,.06,"triangle",.05);} }); }

    initHidden() { this.field.className="playfield"; const icons=["word","book","heart","pin","brain","store"]; const labels=["A","MAN","DA","Rasa","Bab","Toko"]; const w=this.field.clientWidth,h=this.field.clientHeight; for(let i=0;i<6;i++){ const el=this.makeEl("item",icons[i],labels[i],42); this.place(el,rand(18,w-60),rand(26,h-78)); el.style.opacity=.38; el.addEventListener("click",()=>{ if(el.style.opacity!== "1"){ el.style.opacity="1"; this.score++; this.audio.beep(620,.06,"triangle",.05); }}); this.objects.push(el);} }
    updateHidden(dt) { this.objects.forEach((o,i)=>this.place(o,o._x+Math.sin(Date.now()/700+i)*.25,o._y)); }

    initMemory() { this.field.className="playfield"; const wrap=document.createElement("div"); wrap.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:14px;height:100%;"; this.field.appendChild(wrap); const icons=["book","choco","heart","pin","brain","store"]; const deck=[...icons,...icons].sort(()=>Math.random()-.5); this.state.open=[]; deck.forEach(icon=>{ const c=document.createElement("button"); c.className="card"; c.innerHTML=Icons.item("heart"); c._icon=icon; c.addEventListener("click",()=>{ if(c.classList.contains("done")||this.state.open.includes(c)||this.state.open.length>=2)return; c.classList.add("open"); c.innerHTML=Icons.item(icon); this.state.open.push(c); if(this.state.open.length===2){ const [a,b]=this.state.open; setTimeout(()=>{ if(a._icon===b._icon){ a.classList.add("done"); b.classList.add("done"); a.style.opacity=b.style.opacity=.45; this.score++; this.audio.beep(640,.07,"triangle",.05); } else { a.classList.remove("open"); b.classList.remove("open"); a.innerHTML=b.innerHTML=Icons.item("heart"); this.lives-=.25; } this.state.open=[]; },420); }}); wrap.appendChild(c); }); }

    initJourney() { this.grid={cols:7,rows:9,cells:["0000000","0111010","0001010","1011010","1000010","1011110","1000000","0111110","0000000"]}; this.makeGrid(this.grid.cells); this.addGridPlayer(0,8); [["heart","Hati",2,6],["book","Buku",4,4],["choco","Cokelat",2,2],["pin","Tujuan",6,0],["brain","Diri",0,0],["store","Akhir",6,8]].forEach(a=>this.addGridItem(...a)); }
  }

  window.AmandaArcade = { Arcade, Icons };
})();
