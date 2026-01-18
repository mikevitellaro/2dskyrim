import Phaser from "phaser";

export type Tile = 0 | 1 | 2; // 0=water, 1=grass, 2=mountain

export class WorldGenerator {
  // Simple seeded RNG
  private seed: number;
  constructor(seed: number = Date.now()) {
    this.seed = seed | 0;
  }

  private rand(): number {
    // xorshift32
    let x = (this.seed += 0x6d2b79f5);
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  }

  generate(width: number, height: number): Tile[][] {
    const map: Tile[][] = [];
    // base noise
    for (let y = 0; y < height; y++) {
      map[y] = [];
      for (let x = 0; x < width; x++) {
        const n = this.rand();
        let t: Tile = 1;
        if (n < 0.35) t = 0; // water
        else if (n > 0.85) t = 2; // mountain
        else t = 1; // grass
        map[y][x] = t;
      }
    }

    // Smooth with simple cellular averaging to form larger biomes
    const smoothed = this.smooth(map, 2);
    return smoothed;
  }

  private smooth(src: Tile[][], passes: number): Tile[][] {
    const h = src.length;
    const w = src[0].length;
    const out: Tile[][] = JSON.parse(JSON.stringify(src));
    for (let p = 0; p < passes; p++) {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const counts = new Map<number, number>();
          for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
              const nx = Phaser.Math.Wrap(x + ox, 0, w);
              const ny = Phaser.Math.Wrap(y + oy, 0, h);
              const t = src[ny][nx];
              counts.set(t, (counts.get(t) || 0) + 1);
            }
          }
          // choose majority
          let bestType = 1;
          let bestCount = -1;
          counts.forEach((c, type) => {
            if (c > bestCount) {
              bestCount = c;
              bestType = type;
            }
          });
          out[y][x] = bestType as Tile;
        }
      }
      // copy out -> src for next pass
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          src[y][x] = out[y][x];
        }
      }
    }
    return out;
  }
}
