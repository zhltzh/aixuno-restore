import { t } from './i18n.js';
import { initPage, showToast, setBusy } from './main.js';
import { initCompare } from './compare.js';
import { enhance, loadImageFile, canvasToUrl, MAX_FILE_BYTES } from './enhance.js';
import { apiAvailable, uploadFile, createJob, pollJob } from './api.js';

initPage('restore');

const els = {
  empty: document.getElementById('restore-empty'),
  editor: document.getElementById('restore-editor'),
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  compare: document.getElementById('compare'),
  cmpBefore: document.getElementById('cmp-before'),
  cmpAfter: document.getElementById('cmp-after'),
  cmpAfterClip: document.getElementById('cmp-after-clip'),
  cmpHandle: document.getElementById('cmp-handle'),
  defade: document.getElementById('ctl-defade'),
  sharpen: document.getElementById('ctl-sharpen'),
  denoise: document.getElementById('ctl-denoise'),
  outDefade: document.getElementById('out-defade'),
  outSharpen: document.getElementById('out-sharpen'),
  outDenoise: document.getElementById('out-denoise'),
  btnDownload: document.getElementById('btn-download'),
  btnReset: document.getElementById('btn-reset'),
  btnAi: document.getElementById('btn-ai'),
  procStatus: document.getElementById('proc-status'),
};

if (els.dropzone) {
  const compare = initCompare(els.compare, els.cmpAfterClip, els.cmpHandle);
  let sourceCanvas = null;
  let originalFile = null;
  let beforeUrl = null;
  let afterUrl = null;
  let busy = false;
  let pending = false;
  let timer = 0;

  els.dropzone.addEventListener('click', () => els.fileInput.click());
  els.dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      els.fileInput.click();
    }
  });
  els.fileInput.addEventListener('change', () => handleFile(els.fileInput.files[0]));
  els.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    els.dropzone.classList.add('dragover');
  });
  els.dropzone.addEventListener('dragleave', () => els.dropzone.classList.remove('dragover'));
  els.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    els.dropzone.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
  });

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast(t('r_toast_not_image'));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      showToast(t('r_toast_too_large'));
      return;
    }
    setBusy(true, t('r_processing'));
    try {
      sourceCanvas = await loadImageFile(file);
      originalFile = file;
      beforeUrl = await canvasToUrl(sourceCanvas);
      els.cmpBefore.src = beforeUrl;
      els.empty.hidden = true;
      els.editor.hidden = false;
      compare.set(50);
      await queueEnhance();
    } catch (err) {
      showToast(t('r_toast_read_failed'));
    } finally {
      setBusy(false);
    }
  }

  function getOpts() {
    return {
      defade: Number(els.defade.value),
      sharpen: Number(els.sharpen.value),
      denoise: Number(els.denoise.value),
    };
  }

  function updateOutputs() {
    const defade = Number(els.defade.value);
    const denoise = Number(els.denoise.value);
    els.outDefade.textContent = defade === 100 ? t('r_ctl_defade_auto') : String(defade);
    els.outSharpen.textContent = els.sharpen.value;
    els.outDenoise.textContent = denoise === 0 ? t('r_ctl_denoise_off') : String(denoise);
  }

  for (const slider of [els.defade, els.sharpen, els.denoise]) {
    slider.addEventListener('input', () => {
      updateOutputs();
      scheduleEnhance();
    });
  }

  window.addEventListener('langchange', updateOutputs);

  function scheduleEnhance() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (sourceCanvas) queueEnhance();
    }, 240);
  }

  async function queueEnhance() {
    if (busy) {
      pending = true;
      return;
    }
    busy = true;
    els.procStatus.textContent = t('r_processing');
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
    try {
      const out = enhance(sourceCanvas, getOpts());
      const url = await canvasToUrl(out);
      if (afterUrl) URL.revokeObjectURL(afterUrl);
      afterUrl = url;
      els.cmpAfter.src = url;
      els.procStatus.textContent = '';
    } catch (err) {
      els.procStatus.textContent = t('r_toast_read_failed');
    } finally {
      busy = false;
      if (pending) {
        pending = false;
        queueEnhance();
      }
    }
  }

  els.btnDownload.addEventListener('click', () => {
    if (!sourceCanvas) return;
    const a = document.createElement('a');
    a.href = afterUrl || beforeUrl;
    a.download = 'aixuno-restored.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(t('r_toast_saved'));
  });

  function resetEditor() {
    sourceCanvas = null;
    originalFile = null;
    if (beforeUrl) URL.revokeObjectURL(beforeUrl);
    if (afterUrl) URL.revokeObjectURL(afterUrl);
    beforeUrl = null;
    afterUrl = null;
    els.cmpBefore.removeAttribute('src');
    els.cmpAfter.removeAttribute('src');
    els.editor.hidden = true;
    els.empty.hidden = false;
    els.procStatus.textContent = '';
    els.fileInput.value = '';
  }

  els.btnReset.addEventListener('click', resetEditor);

  els.btnAi.addEventListener('click', async () => {
    if (!originalFile) return;
    els.btnAi.disabled = true;
    try {
      if (!(await apiAvailable())) {
        showToast(t('r_ai_coming'));
        return;
      }
      const fileKey = await uploadFile(originalFile, 'image');
      const { id } = await createJob({ type: 'restore', fileKey, params: { scale: 2 } });
      setBusy(true, t('r_processing'));
      const job = await pollJob(id, () => {});
      if (job.status === 'done' && job.resultUrl) {
        const res = await fetch(job.resultUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (afterUrl) URL.revokeObjectURL(afterUrl);
        afterUrl = url;
        els.cmpAfter.src = url;
        showToast(t('r_toast_saved'));
      } else {
        showToast(t('r_toast_failed'));
      }
    } catch (err) {
      showToast(t('r_toast_failed'));
    } finally {
      setBusy(false);
      els.btnAi.disabled = false;
    }
  });

  updateOutputs();
}
