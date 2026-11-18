export const MAX_DIM = 2600;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

export async function loadImageFile(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('decode failed'));
      el.src = url;
    });
    const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function canvasToUrl(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('encode failed'));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, 'image/png');
  });
}

export function enhance(sourceCanvas, opts = {}) {
  const { defade = 100, sharpen = 45, denoise = 0 } = opts;
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  const sctx = sourceCanvas.getContext('2d', { willReadFrequently: true });
  const src = sctx.getImageData(0, 0, w, h);
  let px = new Uint8ClampedArray(src.data);
  if (denoise > 0) px = medianBlend(px, w, h, denoise / 100);
  if (defade > 0) px = fadeCorrect(px, w, h, defade / 100);
  if (sharpen > 0) px = unsharp(px, w, h, (sharpen / 100) * 0.85);
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const octx = out.getContext('2d');
  octx.putImageData(new ImageData(px, w, h), 0, 0);
  return out;
}

function medianBlend(px, w, h, strength) {
  const out = new Uint8ClampedArray(px);
  const win = new Uint8Array(9);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - 1);
    const y2 = Math.min(h - 1, y + 1);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - 1);
      const x2 = Math.min(w - 1, x + 1);
      const i = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        win[0] = px[(y0 * w + x0) * 4 + c];
        win[1] = px[(y0 * w + x) * 4 + c];
        win[2] = px[(y0 * w + x2) * 4 + c];
        win[3] = px[(y * w + x0) * 4 + c];
        win[4] = px[i + c];
        win[5] = px[(y * w + x2) * 4 + c];
        win[6] = px[(y2 * w + x0) * 4 + c];
        win[7] = px[(y2 * w + x) * 4 + c];
        win[8] = px[(y2 * w + x2) * 4 + c];
        out[i + c] = px[i + c] + (median9(win) - px[i + c]) * strength;
      }
    }
  }
  return out;
}

function median9(a) {
  for (let i = 1; i < 9; i++) {
    const v = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > v) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = v;
  }
  return a[4];
}

function fadeCorrect(px, w, h, strength) {
  const n = w * h;
  const hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = 0; i < px.length; i += 4) {
    hist[0][px[i]]++;
    hist[1][px[i + 1]]++;
    hist[2][px[i + 2]]++;
    sumR += px[i];
    sumG += px[i + 1];
    sumB += px[i + 2];
  }
  const gAvg = Math.max(1, sumG / n);
  const gainR = clampGain(gAvg / Math.max(1, sumR / n));
  const gainB = clampGain(gAvg / Math.max(1, sumB / n));
  const gains = [gainR, 1, gainB];
  const luts = [];
  for (let c = 0; c < 3; c++) {
    const lo = percentile(hist[c], n, 0.02);
    const hi = Math.max(lo + 1, percentile(hist[c], n, 0.98));
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      const gained = v * gains[c];
      lut[v] = ((gained - lo) / (hi - lo)) * 255;
    }
    luts.push(lut);
  }
  const out = new Uint8ClampedArray(px);
  for (let i = 0; i < px.length; i += 4) {
    out[i] = px[i] + (luts[0][px[i]] - px[i]) * strength;
    out[i + 1] = px[i + 1] + (luts[1][px[i + 1]] - px[i + 1]) * strength;
    out[i + 2] = px[i + 2] + (luts[2][px[i + 2]] - px[i + 2]) * strength;
  }
  return out;
}

function clampGain(g) {
  return Math.min(1.35, Math.max(0.75, g));
}

function percentile(hist, n, p) {
  const target = n * p;
  let acc = 0;
  for (let v = 0; v < 256; v++) {
    acc += hist[v];
    if (acc >= target) return v;
  }
  return 255;
}

function unsharp(px, w, h, amount) {
  const blurred = boxBlur(px, w, h, 2);
  const out = new Uint8ClampedArray(px);
  for (let i = 0; i < px.length; i += 4) {
    out[i] = px[i] + (px[i] - blurred[i]) * amount;
    out[i + 1] = px[i + 1] + (px[i + 1] - blurred[i + 1]) * amount;
    out[i + 2] = px[i + 2] + (px[i + 2] - blurred[i + 2]) * amount;
  }
  return out;
}

function boxBlur(px, w, h, r) {
  const tmp = new Uint8ClampedArray(px.length);
  const dst = new Uint8ClampedArray(px.length);
  blurPass(px, tmp, w, h, r, true);
  blurPass(tmp, dst, w, h, r, false);
  return dst;
}

function blurPass(src, dst, w, h, r, horizontal) {
  const outer = horizontal ? h : w;
  const inner = horizontal ? w : h;
  const stepIn = horizontal ? 4 : w * 4;
  const stepOut = horizontal ? w * 4 : 4;
  for (let o = 0; o < outer; o++) {
    const base = o * stepOut;
    for (let i = 0; i < inner; i++) {
      let s0 = 0;
      let s1 = 0;
      let s2 = 0;
      let count = 0;
      for (let d = -r; d <= r; d++) {
        const j = i + d;
        if (j < 0 || j >= inner) continue;
        const idx = base + j * stepIn;
        s0 += src[idx];
        s1 += src[idx + 1];
        s2 += src[idx + 2];
        count++;
      }
      const idx = base + i * stepIn;
      dst[idx] = s0 / count;
      dst[idx + 1] = s1 / count;
      dst[idx + 2] = s2 / count;
    }
  }
}
