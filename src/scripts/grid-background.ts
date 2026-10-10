// Animated grid background.
// A faint square grid is drawn on a canvas; a handful of runners move from
// node to node along the grid lines, occasionally turning 90°, and leave a
// tapering trail behind them. Runners eventually fade out and respawn.

type Dir = 0 | 1 | 2 | 3; // right, down, left, up
type Node = { c: number; r: number };

const RUNNER_COUNT = 4;
const STEP_MS = 380; // time to cross one cell
const TRAIL_NODES = 30; // max trail length, in cells
const TURN_CHANCE = 0.08; // per node reached
const FADE_MS = 1400; // fade-out duration before respawn
const MIN_LIFE = 50; // steps a runner lives before fading
const MAX_LIFE = 140;

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

type Palette = {
  grid: string;
  trail: (a: number) => string;
  head: string;
  glow: string | null;
};

const LIGHT: Palette = {
  grid: 'rgba(0, 0, 0, 0.04)',
  trail: (a) => `rgba(24, 24, 25, ${a * 0.35})`,
  head: 'rgba(24, 24, 25, 0.55)',
  glow: null,
};

const DARK: Palette = {
  grid: 'rgba(255, 255, 255, 0.04)',
  trail: (a) => `rgba(255, 255, 255, ${a * 0.45})`,
  head: 'rgba(255, 255, 255, 0.85)',
  glow: 'rgba(255, 255, 255, 0.5)',
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

class Runner {
  path: Node[] = [];
  dir: Dir = 0;
  t = 0;
  stepsLeft = 0;
  fadeMs = 0; // > 0 while fading out
  alpha = 1;

  constructor(private grid: { cols: number; rows: number }) {
    this.spawn();
  }

  spawn() {
    const { cols, rows } = this.grid;
    this.path = [{ c: randInt(1, cols - 2), r: randInt(1, rows - 2) }];
    this.dir = randInt(0, 3) as Dir;
    this.t = Math.random();
    this.stepsLeft = randInt(MIN_LIFE, MAX_LIFE);
    this.fadeMs = 0;
    this.alpha = 1;
  }

  get head(): Node {
    return this.path[this.path.length - 1];
  }

  private canMove(d: number) {
    const { c, r } = this.head;
    const nc = c + DX[d];
    const nr = r + DY[d];
    return nc >= 0 && nr >= 0 && nc < this.grid.cols && nr < this.grid.rows;
  }

  private pickDir() {
    const left = ((this.dir + 3) % 4) as Dir;
    const right = ((this.dir + 1) % 4) as Dir;
    const turns = Math.random() < 0.5 ? [left, right] : [right, left];

    if (Math.random() < TURN_CHANCE) {
      const d = turns.find((d) => this.canMove(d));
      if (d !== undefined) return (this.dir = d);
    }
    if (this.canMove(this.dir)) return;
    const d = turns.find((d) => this.canMove(d));
    this.dir = d ?? (((this.dir + 2) % 4) as Dir);
  }

  update(dt: number) {
    if (this.fadeMs > 0) {
      this.fadeMs -= dt;
      this.alpha = Math.max(0, this.fadeMs / FADE_MS);
      if (this.fadeMs <= 0) this.spawn();
      return;
    }

    this.t += dt / STEP_MS;
    while (this.t >= 1) {
      this.t -= 1;
      const { c, r } = this.head;
      this.path.push({ c: c + DX[this.dir], r: r + DY[this.dir] });
      if (this.path.length > TRAIL_NODES) this.path.shift();
      this.pickDir();

      if (--this.stepsLeft <= 0) {
        this.fadeMs = FADE_MS;
        this.t = 0;
        break;
      }
    }
  }
}

export function startGridBackground(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let palette = darkQuery.matches ? DARK : LIGHT;
  let width = 0;
  let height = 0;
  let cell = 40;
  const grid = { cols: 0, rows: 0 };
  let runners: Runner[] = [];
  let last = 0;
  let frame = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    cell = Math.max(30, Math.min(50, Math.floor(Math.min(width, height) / 20)));
    grid.cols = Math.ceil(width / cell) + 1;
    grid.rows = Math.ceil(height / cell) + 1;
    runners = Array.from({ length: RUNNER_COUNT }, () => new Runner(grid));
  }

  function drawGrid() {
    ctx!.strokeStyle = palette.grid;
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    for (let c = 0; c < grid.cols; c++) {
      const x = c * cell + 0.5;
      ctx!.moveTo(x, 0);
      ctx!.lineTo(x, height);
    }
    for (let r = 0; r < grid.rows; r++) {
      const y = r * cell + 0.5;
      ctx!.moveTo(0, y);
      ctx!.lineTo(width, y);
    }
    ctx!.stroke();
  }

  function drawRunner(run: Runner) {
    const pts = run.path.map((n) => ({ x: n.c * cell, y: n.r * cell }));
    const h = run.head;
    const moving = run.fadeMs <= 0;
    const tip = {
      x: (h.c + (moving ? DX[run.dir] * run.t : 0)) * cell,
      y: (h.r + (moving ? DY[run.dir] * run.t : 0)) * cell,
    };
    pts.push(tip);

    ctx!.lineCap = 'round';
    ctx!.lineWidth = palette === DARK ? 1.2 : 1;
    const n = pts.length - 1;
    for (let i = 0; i < n; i++) {
      // Older segments are fainter.
      const a = ((i + 1) / n) * run.alpha;
      ctx!.strokeStyle = palette.trail(a);
      ctx!.beginPath();
      ctx!.moveTo(pts[i].x, pts[i].y);
      ctx!.lineTo(pts[i + 1].x, pts[i + 1].y);
      ctx!.stroke();
    }

    ctx!.save();
    ctx!.globalAlpha = run.alpha;
    if (palette.glow) {
      ctx!.shadowColor = palette.glow;
      ctx!.shadowBlur = 10;
    }
    ctx!.fillStyle = palette.head;
    ctx!.beginPath();
    ctx!.arc(tip.x, tip.y, palette === DARK ? 2.5 : 2.2, 0, Math.PI * 2);
    ctx!.fill();
    ctx!.restore();
  }

  function render() {
    ctx!.clearRect(0, 0, width, height);
    drawGrid();
    runners.forEach(drawRunner);
  }

  function tick(now: number) {
    // Clamp so returning to a background tab doesn't teleport runners.
    const dt = Math.min(now - (last || now), 100);
    last = now;
    runners.forEach((r) => r.update(dt));
    render();
    frame = requestAnimationFrame(tick);
  }

  function start() {
    cancelAnimationFrame(frame);
    last = 0;
    if (motionQuery.matches) render();
    else frame = requestAnimationFrame(tick);
  }

  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      start();
    }, 150);
  });
  darkQuery.addEventListener('change', (e) => {
    palette = e.matches ? DARK : LIGHT;
    if (motionQuery.matches) render();
  });
  motionQuery.addEventListener('change', start);

  resize();
  start();
}
