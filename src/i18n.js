const STRINGS = {
  en: {
    brand_site: 'Restore',
    nav_tool: 'Restore tool',
    nav_guides: 'Guides',
    nav_faq: 'FAQ',
    lang_label: 'Language',

    hero_eyebrow: 'Free · No sign-up · Local & AI options',
    hero_title: 'Restore Old Photos Online, Free',
    hero_lead: 'Fix fading, yellowing, scratches and blur in seconds. Instant local fixes in your browser, plus AI deep restoration with GFPGAN and Real-ESRGAN when you need it.',
    hero_cta_primary: 'Restore a photo now',
    hero_cta_secondary: 'Read the guides',
    hero_badge_1: 'Free to use',
    hero_badge_2: 'No account needed',
    hero_badge_3: 'Files auto-deleted in 24h',

    ws_eyebrow: 'Online photo restoration',
    ws_title: 'Upload your old photo',
    ws_sub: 'JPG, PNG or WebP up to 20MB. The instant fix runs locally in your browser — nothing is uploaded unless you choose AI Enhance.',
    r_dz_main_strong: 'Drop an old photo here',
    r_dz_main_rest: 'or click to browse',
    r_dz_hint: 'JPG · PNG · WebP · up to 20MB',
    r_local_badge: 'Local processing · nothing is uploaded',
    r_controls_h2: 'Enhancement',
    r_ctl_defade: 'Fade correction',
    r_ctl_defade_auto: 'Auto',
    r_ctl_sharpen: 'Sharpen',
    r_ctl_denoise: 'Scratch & noise removal',
    r_ctl_denoise_off: 'Off',
    r_processing: 'Processing…',
    r_compare_hint: 'Drag to compare before / after',
    r_compare_before: 'Before',
    r_compare_after: 'After',
    r_btn_reset: 'Choose another photo',
    r_btn_download: 'Download restored photo',
    r_ai_h2: 'AI Deep Restore',
    r_ai_desc: 'Face enhancement, 2×–4× upscaling, deep scratch repair and colorization — processed on our server with open-source models (GFPGAN + Real-ESRGAN).',
    r_ai_btn: 'AI Enhance',
    r_ai_note: 'Cloud processing · your photo is auto-deleted after 24h',
    r_ai_coming: 'AI Enhance is coming online soon — local restore works right now.',
    r_toast_too_large: 'Image is larger than 20MB',
    r_toast_not_image: 'Please choose an image file',
    r_toast_read_failed: 'Failed to read this image',
    r_toast_failed: 'AI restore failed — please try again',
    r_toast_saved: 'Restored photo saved',

    ex_eyebrow: 'Before / after',
    ex_title: 'See what restoration looks like',
    ex_sub: 'Demo images showing the kind of improvement you can expect from fade correction, denoising and sharpening.',
    ex1_title: 'Yellowed, faded print',
    ex1_desc: 'White-balance correction removes the yellow cast and auto levels restore contrast.',
    ex2_title: 'Noisy, low-contrast scan',
    ex2_desc: 'Median filtering calms grain and scratches while unsharp masking brings edges back.',
    ex_before: 'Before',
    ex_after: 'After',

    steps_eyebrow: 'How it works',
    steps_title: 'From old print to restored photo in three steps',
    steps_sub: 'No software to install, no account to create. Everything happens right on this page.',
    step1_title: 'Upload your photo',
    step1_desc: 'Drag in a scanned print or a phone photo of an old picture. The local preview appears instantly.',
    step2_title: 'Tune or go AI',
    step2_desc: 'Adjust fade correction, sharpening and scratch smoothing — or click AI Enhance for deep restoration with GFPGAN and Real-ESRGAN.',
    step3_title: 'Compare & download',
    step3_desc: 'Drag the before/after slider to inspect the result, then download your restored photo. Cloud files are deleted within 24 hours.',

    feat_eyebrow: 'Why Aixuno Restore',
    feat_title: 'A restoration studio that respects your privacy',
    feat1_title: 'Local-first processing',
    feat1_desc: 'The instant fix runs entirely in your browser with Canvas. Your family photos never leave your device unless you opt into AI.',
    feat2_title: 'Real AI models',
    feat2_desc: 'GFPGAN restores faces and Real-ESRGAN upscales 2×–4× — the same open-source models used by professional tools.',
    feat3_title: 'Before/after compare',
    feat3_desc: 'A draggable slider lets you inspect every change before you download, so there are no surprises.',
    feat4_title: 'No account, no watermark',
    feat4_desc: 'Use the full tool without signing up. Downloads are clean PNG files with no watermark added.',
    feat5_title: 'Private by default',
    feat5_desc: 'Local fixes never upload. Cloud jobs are processed once and both uploads and results are deleted within 24 hours.',
    feat6_title: 'Works on your phone',
    feat6_desc: 'The layout is fully responsive, so you can restore photos straight from your mobile browser.',

    use_eyebrow: 'Use cases',
    use_title: 'Made for the photos that matter',
    use1_title: 'Family albums',
    use1_desc: 'Bring faded prints of parents and grandparents back to life for sharing and archiving.',
    use2_title: 'ID & document photos',
    use2_desc: 'Clean up old portrait photos for applications, memorials and family records.',
    use3_title: 'Creator archives',
    use3_desc: 'Refresh old scans for blog posts, documentaries and social media throwbacks.',
    use4_title: 'Print & framing',
    use4_desc: 'Upscale small prints with AI so they look sharp again in a frame or photo book.',

    guides_eyebrow: 'Learn',
    guides_title: 'Photo restoration guides',
    guides_sub: 'Practical walkthroughs for common restoration tasks.',
    guide1_title: 'Restore faded family photos',
    guide1_desc: 'A step-by-step workflow for yellowed, washed-out prints.',
    guide2_title: 'Fix scratches and dust',
    guide2_desc: 'When median smoothing is enough and when to call the AI.',
    guide3_title: 'AI restore vs local fix',
    guide3_desc: 'Choose the right tool for each photo and privacy need.',
    guides_all: 'Browse all restoration guides',

    faq_eyebrow: 'FAQ',
    faq_title: 'Frequently asked questions',
    faq1_q: 'Is Aixuno Restore really free?',
    faq1_a: 'Yes. Both the local fix and AI Enhance are free at launch. Heavy cloud usage may get fair-use daily quotas later.',
    faq2_q: 'Are my photos uploaded to a server?',
    faq2_a: 'Only if you click AI Enhance. The instant local fix runs entirely in your browser and never uploads anything.',
    faq3_q: 'Which formats and sizes are supported?',
    faq3_a: 'JPG, PNG and WebP up to 20MB per image. Very large images are scaled down to a working resolution for speed.',
    faq4_q: 'How long does AI Enhance take?',
    faq4_a: 'Typically 10–60 seconds depending on image size and server load, since the models run on CPU. You can watch progress on the page.',
    faq5_q: 'Can it fix torn or heavily damaged photos?',
    faq5_a: 'Light scratches, grain and fading are handled well. Tears, missing pieces and severe damage need manual retouching beyond this tool.',
    faq6_q: 'Do you keep my photos?',
    faq6_a: 'No. Local fixes stay on your device. Cloud uploads and results are automatically deleted within 24 hours and are never sold or shared.',
    faq7_q: 'Does it work on mobile?',
    faq7_a: 'Yes, the tool is fully responsive and works in modern mobile browsers.',

    eco_eyebrow: 'Aixuno ecosystem',
    eco_title: 'More free tools from Aixuno',
    eco_site_md: 'Markdown',
    eco_desc_md: 'Turn AI answers into Word, PDF and clean Markdown.',
    eco_site_img: 'Pixkit Images',
    eco_desc_img: 'Convert, resize and optimize images in your browser.',
    eco_site_zip: 'File Compress',
    eco_desc_zip: 'Shrink images and documents for faster sharing.',
    eco_site_pdf: 'PDF Tools',
    eco_desc_pdf: 'Focused, browser-based PDF utilities.',
    eco_site_bg: 'AI Cutout',
    eco_desc_bg: 'Remove image backgrounds with AI.',
    eco_site_scan: 'Document Scan',
    eco_desc_scan: 'Phone photos into crisp scanned PDFs with local OCR.',
    eco_site_restore: 'Photo Restore',
    eco_desc_restore: 'Restore old photos free — local fixes plus AI deep restoration.',
    eco_site_watermark: 'Watermark Remover',
    eco_desc_watermark: 'Remove watermarks from videos you own.',

    footer_rights: 'Your photos, processed with care.',
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_disclaimer: 'Disclaimer',
    footer_changelog: 'Changelog',
  },
  zh: {
    brand_site: '老照片修复',
    nav_tool: '修复工具',
    nav_guides: '修复教程',
    nav_faq: '常见问题',
    lang_label: '语言',

    hero_eyebrow: '免费 · 无需注册 · 本地与 AI 双模式',
    hero_title: '老照片修复，免费在线完成',
    hero_lead: '几秒内修复褪色、泛黄、划痕与模糊。浏览器本地即时修复，也可选择 GFPGAN + Real-ESRGAN 开源模型进行 AI 深度修复。',
    hero_cta_primary: '立即修复照片',
    hero_cta_secondary: '查看修复教程',
    hero_badge_1: '免费使用',
    hero_badge_2: '无需账号',
    hero_badge_3: '文件 24 小时自动删除',

    ws_eyebrow: '在线照片修复',
    ws_title: '上传你的老照片',
    ws_sub: '支持 JPG、PNG、WebP，单张不超过 20MB。即时修复在浏览器本地完成，只有点击 AI 增强时才会上传。',
    r_dz_main_strong: '拖拽老照片到此处',
    r_dz_main_rest: '或点击选择文件',
    r_dz_hint: 'JPG · PNG · WebP · 最大 20MB',
    r_local_badge: '本地处理 · 不上传任何内容',
    r_controls_h2: '增强调节',
    r_ctl_defade: '褪色校正',
    r_ctl_defade_auto: '自动',
    r_ctl_sharpen: '清晰度',
    r_ctl_denoise: '划痕与噪点',
    r_ctl_denoise_off: '关闭',
    r_processing: '处理中…',
    r_compare_hint: '拖动对比处理前后',
    r_compare_before: '处理前',
    r_compare_after: '处理后',
    r_btn_reset: '换一张照片',
    r_btn_download: '下载修复后的照片',
    r_ai_h2: 'AI 深度修复',
    r_ai_desc: '人脸增强、2–4 倍超分、深度划痕修复与上色——由服务器上的开源模型（GFPGAN + Real-ESRGAN）处理。',
    r_ai_btn: 'AI 增强',
    r_ai_note: '云端处理 · 照片 24 小时后自动删除',
    r_ai_coming: 'AI 增强即将上线——本地修复现在即可使用。',
    r_toast_too_large: '图片超过 20MB',
    r_toast_not_image: '请选择图片文件',
    r_toast_read_failed: '无法读取该图片',
    r_toast_failed: 'AI 修复失败——请重试',
    r_toast_saved: '修复后的照片已保存',

    ex_eyebrow: '修复前后',
    ex_title: '看看修复能带来什么变化',
    ex_sub: '演示图片展示褪色校正、去噪与锐化可以带来的典型改善。',
    ex1_title: '泛黄、褪色的老照片',
    ex1_desc: '白平衡校正去除黄色色偏，自动色阶恢复画面对比度。',
    ex2_title: '噪点多、对比度低的扫描件',
    ex2_desc: '中值滤波抚平颗粒与划痕，反锐化掩模让边缘重新清晰。',
    ex_before: '修复前',
    ex_after: '修复后',

    steps_eyebrow: '使用流程',
    steps_title: '三步，把老照片变成新照片',
    steps_sub: '无需安装软件，无需注册账号，一切都在这个页面完成。',
    step1_title: '上传照片',
    step1_desc: '拖入扫描的老照片，或手机翻拍的旧照片。本地预览即时出现。',
    step2_title: '手动微调或 AI 增强',
    step2_desc: '调节褪色校正、锐化与划痕平滑，或点击 AI 增强，使用 GFPGAN 与 Real-ESRGAN 进行深度修复。',
    step3_title: '对比并下载',
    step3_desc: '拖动前后对比滑块检查效果，满意后下载修复照片。云端文件 24 小时内自动删除。',

    feat_eyebrow: '为什么选择 Aixuno 修复',
    feat_title: '尊重隐私的照片修复工作室',
    feat1_title: '本地优先处理',
    feat1_desc: '即时修复完全在浏览器中用 Canvas 完成。除非主动选择 AI，家庭照片不会离开你的设备。',
    feat2_title: '真实 AI 模型',
    feat2_desc: 'GFPGAN 修复人脸，Real-ESRGAN 提供 2–4 倍超分——与专业工具相同的开源模型。',
    feat3_title: '前后对比滑块',
    feat3_desc: '可拖动的对比滑块让你在下载前检查每一处变化，效果尽在掌握。',
    feat4_title: '无账号、无水印',
    feat4_desc: '无需注册即可使用完整功能，下载为干净的 PNG 文件，不添加任何水印。',
    feat5_title: '默认保护隐私',
    feat5_desc: '本地修复不上传；云端任务只处理一次，上传与结果均在 24 小时内删除。',
    feat6_title: '手机上也能用',
    feat6_desc: '页面完全响应式，可直接在手机浏览器中修复照片。',

    use_eyebrow: '使用场景',
    use_title: '为那些重要的照片而生',
    use1_title: '家庭相册',
    use1_desc: '让父母与祖辈褪色的照片重新鲜活，便于分享与长期保存。',
    use2_title: '证件与档案照片',
    use2_desc: '清理老旧人像照片，用于申请、纪念与家庭档案。',
    use3_title: '创作者素材库',
    use3_desc: '为博客、纪录片与社交媒体怀旧内容翻新老旧扫描图。',
    use4_title: '打印与装裱',
    use4_desc: '用 AI 放大小尺寸照片，让它们在相框或照片书中重新清晰。',

    guides_eyebrow: '学习',
    guides_title: '照片修复教程',
    guides_sub: '针对常见修复任务的实操指南。',
    guide1_title: '修复褪色的全家福',
    guide1_desc: '泛黄、发白老照片的完整修复流程。',
    guide2_title: '处理划痕与灰尘',
    guide2_desc: '什么时候中值平滑足够，什么时候该用 AI。',
    guide3_title: 'AI 修复与本地修复的区别',
    guide3_desc: '根据照片状况与隐私需求选择合适的工具。',
    guides_all: '浏览全部修复教程',

    faq_eyebrow: '常见问题',
    faq_title: '你可能想问',
    faq1_q: 'Aixuno 修复真的免费吗？',
    faq1_a: '是的。本地修复与 AI 增强在上线阶段均免费。后续对重度云端使用可能加入每日公平使用配额。',
    faq2_q: '我的照片会被上传到服务器吗？',
    faq2_a: '只有点击 AI 增强时才会上传。即时本地修复完全在浏览器中运行，不上传任何内容。',
    faq3_q: '支持哪些格式和大小？',
    faq3_a: 'JPG、PNG、WebP，单张不超过 20MB。超大图片会缩放到工作分辨率以保证处理速度。',
    faq4_q: 'AI 增强需要多久？',
    faq4_a: '通常 10–60 秒，取决于图片大小与服务器负载（模型使用 CPU 推理）。页面会显示处理进度。',
    faq5_q: '破损、撕裂严重的照片能修吗？',
    faq5_a: '轻度划痕、颗粒与褪色处理效果较好。撕裂、缺损与严重损伤需要人工修图，超出本工具能力范围。',
    faq6_q: '你们会保留我的照片吗？',
    faq6_a: '不会。本地修复留在你的设备上；云端上传与结果均在 24 小时内自动删除，从不出售或共享。',
    faq7_q: '手机上能用吗？',
    faq7_a: '可以，工具完全响应式，支持现代手机浏览器。',

    eco_eyebrow: 'Aixuno 工具生态',
    eco_title: '更多 Aixuno 免费工具',
    eco_site_md: 'Markdown 转换',
    eco_desc_md: '将 AI 回答转换为 Word、PDF 与干净的 Markdown。',
    eco_site_img: 'Pixkit 图片',
    eco_desc_img: '在浏览器中转换、缩放与优化图片。',
    eco_site_zip: '文件压缩',
    eco_desc_zip: '压缩图片与文档，分享更快。',
    eco_site_pdf: 'PDF 工具',
    eco_desc_pdf: '专注、易用的浏览器 PDF 工具。',
    eco_site_bg: 'AI 抠图',
    eco_desc_bg: '用 AI 快速移除图片背景。',
    eco_site_scan: '文档扫描',
    eco_desc_scan: '手机拍照变清晰扫描件，本地 OCR 生成 PDF。',
    eco_site_restore: '老照片修复',
    eco_desc_restore: '免费修复老照片——本地即时修复 + AI 深度修复。',
    eco_site_watermark: '视频去水印',
    eco_desc_watermark: '去除你自有视频中的水印。',

    footer_rights: '你的照片，用心处理。',
    footer_about: '关于',
    footer_contact: '联系我们',
    footer_privacy: '隐私',
    footer_terms: '条款',
    footer_disclaimer: '免责声明',
    footer_changelog: '更新日志',
  },
};

export const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
];

const STORAGE_KEY = 'aixuno-restore-lang';
let current = detectLanguage();

function detectLanguage() {
  const fromPath = typeof location !== 'undefined' && location.pathname.startsWith('/zh/');
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch (err) {
    // ignore
  }
  if (fromPath) return 'zh';
  const nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export function t(key, params) {
  let text = (STRINGS[current] && STRINGS[current][key]) || STRINGS.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}

export function getLang() {
  return current;
}

export function setLang(lang) {
  if (!STRINGS[lang] || lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (err) {
    // ignore
  }
  applyStaticTexts();
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function applyStaticTexts() {
  document.documentElement.lang = current === 'zh' ? 'zh-CN' : 'en';
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const value = t(el.dataset.i18n);
    if (value != null) el.textContent = value;
  }
  for (const el of document.querySelectorAll('[data-i18n-aria]')) {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  }
}
