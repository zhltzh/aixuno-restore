import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const SUPPORT = [
  {
    slug: 'about',
    en: {
      title: 'About Aixuno Restore',
      desc: 'Aixuno Restore is a free online photo restoration tool with local browser fixes and AI deep restoration.',
      body: `<p>Aixuno Restore helps you bring old photos back to life. Faded prints, yellowed scans, light scratches and grain can all be improved in seconds, right in your browser.</p><h2>Local first, AI when you need it</h2><p>The instant fix uses Canvas processing that never leaves your device. When a photo needs more help, AI Enhance runs open-source models — GFPGAN for face enhancement and Real-ESRGAN for 2×–4× upscaling — on our server, with uploads and results deleted within 24 hours.</p><h2>Part of the Aixuno family</h2><p>Aixuno builds free, privacy-friendly browser tools: Markdown conversion, image tools, file compression, PDF utilities, background removal, document scanning, photo restoration and video watermark removal.</p>`,
    },
    zh: {
      title: '关于 Aixuno 老照片修复',
      desc: 'Aixuno 老照片修复是免费在线照片修复工具，支持浏览器本地修复与 AI 深度修复。',
      body: `<p>Aixuno 老照片修复帮助你让旧照片重获新生。褪色、泛黄的扫描件、轻度划痕与颗粒噪点，都可以在浏览器里几秒内改善。</p><h2>本地优先，需要时再用 AI</h2><p>即时修复使用 Canvas 在本地完成，不上传任何内容。当照片需要更多帮助时，AI 增强会在服务器上运行开源模型——GFPGAN 人脸增强与 Real-ESRGAN 2–4 倍超分，上传与结果均在 24 小时内删除。</p><h2>Aixuno 工具家族</h2><p>Aixuno 提供免费、注重隐私的浏览器工具：Markdown 转换、图片工具、文件压缩、PDF 工具、AI 抠图、文档扫描、老照片修复与视频去水印。</p>`,
    },
  },
  {
    slug: 'contact',
    en: {
      title: 'Contact Us',
      desc: 'Contact the Aixuno Restore team with questions, feedback or partnership ideas.',
      body: `<p>We read every message and usually reply within a few days.</p><h2>Email</h2><p><a href="mailto:hello@aixuno.com">hello@aixuno.com</a></p><h2>Feedback</h2><p>Found a bug or have a feature idea? Tell us which browser you used and attach a sample image if possible (please avoid sending private family photos).</p>`,
    },
    zh: {
      title: '联系我们',
      desc: '联系 Aixuno 老照片修复团队，反馈问题或提出建议。',
      body: `<p>我们会阅读每一条消息，通常在几天内回复。</p><h2>邮箱</h2><p><a href="mailto:hello@aixuno.com">hello@aixuno.com</a></p><h2>问题反馈</h2><p>发现 bug 或有功能建议？请告诉我们你使用的浏览器，并尽量附上示例图片（请勿发送私密家庭照片）。</p>`,
    },
  },
  {
    slug: 'changelog',
    en: {
      title: 'Changelog',
      desc: 'Release history of Aixuno Restore.',
      body: `<h2>v1.0.0 — 2026-11-17</h2><ul><li>Initial release: local fade correction, sharpening and scratch smoothing.</li><li>AI Enhance with GFPGAN face enhancement and Real-ESRGAN upscaling.</li><li>Before/after comparison slider and PNG download.</li><li>English and Chinese versions, guides, FAQ and full policy pages.</li></ul>`,
    },
    zh: {
      title: '更新日志',
      desc: 'Aixuno 老照片修复的版本记录。',
      body: `<h2>v1.0.0 — 2026-11-17</h2><ul><li>首次发布：本地褪色校正、锐化与划痕平滑。</li><li>AI 增强：GFPGAN 人脸增强与 Real-ESRGAN 超分。</li><li>前后对比滑块与 PNG 下载。</li><li>中英文版本、修复教程、FAQ 与完整政策页面。</li></ul>`,
    },
  },
  {
    slug: 'privacy',
    en: {
      title: 'Privacy Policy',
      desc: 'How Aixuno Restore handles your photos: local fixes never leave your device, cloud jobs are deleted within 24 hours.',
      body: `<p class="updated">Last updated: 2026-11-17</p><h2>Local tools — nothing leaves your device</h2><p>The instant photo fix runs entirely in your browser. Your images are never uploaded, and closing the tab discards everything.</p><h2>Cloud tools — temporary processing</h2><ul><li>Files you upload are stored only to run the job you requested.</li><li>Uploads and results are deleted automatically within 24 hours.</li><li>No account is required and we do not sell or share your files.</li><li>AI restoration sends your photo to our processing service solely to produce the restored image.</li></ul><h2>What we store</h2><p>Only the files needed to run your job, plus the job status record. Both are removed within 24 hours. Your language preference is stored locally in your browser.</p><h2>Questions</h2><p>Contact privacy@aixuno.com for any question about this policy.</p>`,
    },
    zh: {
      title: '隐私政策',
      desc: 'Aixuno 老照片修复如何处理你的照片：本地修复不离开设备，云端任务 24 小时内删除。',
      body: `<p class="updated">最后更新：2026-11-17</p><h2>本地工具——数据不离开你的设备</h2><p>照片即时修复完全在浏览器中完成，图片不会被上传，关闭页面即全部丢弃。</p><h2>云端工具——临时处理</h2><ul><li>你上传的文件只用于完成你请求的任务。</li><li>上传文件与结果都会在 24 小时内自动删除。</li><li>无需注册账号，我们不出售或共享你的文件。</li><li>AI 修复仅将照片发送给处理服务，用于生成修复后的图像。</li></ul><h2>我们存储什么</h2><p>只保存完成任务所需的文件与任务状态记录，两者都会在 24 小时内删除。语言偏好只保存在你的浏览器本地。</p><h2>有疑问？</h2><p>如对本政策有任何疑问，请联系 privacy@aixuno.com。</p>`,
    },
  },
  {
    slug: 'terms',
    en: {
      title: 'Terms of Service',
      desc: 'Terms for using Aixuno Restore.',
      body: `<p class="updated">Last updated: 2026-11-17</p><h2>The service</h2><p>Aixuno Restore provides free online photo restoration, including local browser processing and optional cloud AI enhancement. The service is provided "as is" without warranties of any kind.</p><h2>Acceptable use</h2><p>You agree to upload only photos you own or have the right to edit, and not to use the service for unlawful, infringing or harmful content.</p><h2>Fair use</h2><p>We may apply reasonable daily quotas or file-size limits to keep the free service available for everyone.</p><h2>Liability</h2><p>We are not liable for indirect damages, data loss or unsatisfactory restoration results. Always keep a copy of your original photos.</p>`,
    },
    zh: {
      title: '服务条款',
      desc: 'Aixuno 老照片修复的使用条款。',
      body: `<p class="updated">最后更新：2026-11-17</p><h2>服务内容</h2><p>Aixuno 老照片修复提供免费在线照片修复，包括浏览器本地处理与可选的云端 AI 增强。服务按"现状"提供，不作任何形式的保证。</p><h2>可接受使用</h2><p>你承诺只上传自己拥有或有权编辑的照片，不得将本服务用于违法、侵权或有害内容。</p><h2>公平使用</h2><p>为保证免费服务对所有人可用，我们可能设置合理的每日配额或文件大小限制。</p><h2>责任限制</h2><p>我们不对间接损失、数据丢失或修复效果不满意承担责任。请始终保留原始照片的副本。</p>`,
    },
  },
  {
    slug: 'disclaimer',
    en: {
      title: 'Disclaimer',
      desc: 'Disclaimer for Aixuno Restore results and copyright responsibility.',
      body: `<h2>Restoration results</h2><p>Photo restoration is an automated process. Results vary with image quality, and we do not guarantee that any photo will be restored to a particular standard. Light scratches, grain and fading respond best; torn or heavily damaged photos need manual retouching.</p><h2>Your responsibility</h2><p>You are responsible for the photos you upload and for having the right to edit them. Do not upload content that infringes copyright, privacy or other rights of third parties.</p><h2>No professional advice</h2><p>Nothing on this site constitutes professional archival or conservation advice.</p>`,
    },
    zh: {
      title: '免责声明',
      desc: 'Aixuno 老照片修复关于修复效果与版权责任的声明。',
      body: `<h2>修复效果</h2><p>照片修复是自动化过程，效果因图片质量而异，我们不保证任何照片都能达到特定标准。轻度划痕、颗粒与褪色效果最佳；撕裂或严重破损的照片需要人工修图。</p><h2>你的责任</h2><p>你需对上传的照片负责，并确保拥有编辑它们的权利。请勿上传侵犯第三方版权、隐私或其他权利的内容。</p><h2>非专业建议</h2><p>本站内容不构成专业的档案保存或修复建议。</p>`,
    },
  },
];

const GUIDES = [
  {
    slug: 'restore-faded-family-photos',
    en: {
      title: 'How to Restore Faded Family Photos Online',
      desc: 'A practical workflow for yellowed, washed-out family prints: scan, correct, sharpen and upscale.',
      body: `<p>Old family prints usually fail in three ways: the paper yellows, contrast washes out, and grain creeps in. The good news is that all three respond well to automated correction.</p><h2>1. Get a good digital copy</h2><p>Scan at 300 dpi or higher if you can. No scanner? A phone photo taken in bright, even, indirect light works well — avoid flash and shadows.</p><h2>2. Start with the local fix</h2><p>Upload the photo to Aixuno Restore. Fade correction uses gray-world white balance to remove the yellow cast, and auto levels stretch the histogram back to full contrast. For most prints this alone is a dramatic improvement.</p><h2>3. Add sharpening carefully</h2><p>Keep sharpening moderate. Too much creates halos around faces and makes grain more visible. If the scan is noisy, turn on scratch & noise removal first, then sharpen.</p><h2>4. Use AI for faces and small prints</h2><p>When faces look soft or the original is small, click AI Enhance. GFPGAN rebuilds facial detail and Real-ESRGAN upscales 2×–4× so the photo can be printed again.</p><h2>5. Save and archive</h2><p>Download the PNG, keep the original scan untouched, and store both. Future tools will only get better.</p>`,
    },
    zh: {
      title: '如何在线修复褪色的全家福',
      desc: '泛黄、发白家庭老照片的实操修复流程：扫描、校正、锐化与放大。',
      body: `<p>家庭老照片通常有三种问题：纸张泛黄、对比度发白、颗粒变多。好消息是，这三类问题都很适合自动化校正。</p><h2>1. 获得清晰的数字副本</h2><p>有条件就用 300 dpi 以上扫描。没有扫描仪时，用手机在明亮、均匀、无直射光的环境下翻拍也可以，避免闪光灯和阴影。</p><h2>2. 先用本地修复</h2><p>把照片上传到 Aixuno 老照片修复。褪色校正通过灰世界白平衡去除黄色色偏，自动色阶把直方图拉回到完整对比度。对大多数照片来说，这一步就有明显改善。</p><h2>3. 适度锐化</h2><p>锐化保持适中，过度锐化会在人脸边缘产生光晕，并让颗粒更明显。扫描件噪点较多时，先开启划痕与噪点去除，再锐化。</p><h2>4. 人脸与小尺寸照片用 AI</h2><p>人脸模糊或原图尺寸较小时，点击 AI 增强。GFPGAN 重建面部细节，Real-ESRGAN 放大 2–4 倍，让照片可以再次冲印。</p><h2>5. 保存与归档</h2><p>下载 PNG，保留原始扫描件不动，两者一起保存。未来的工具只会更好。</p>`,
    },
  },
  {
    slug: 'scratch-and-dust-repair',
    en: {
      title: 'Fix Scratches, Dust and Grain in Old Photos',
      desc: 'When median smoothing is enough and when AI restoration is worth the wait.',
      body: `<p>Scratches and dust show up as thin bright or dark lines, while grain looks like uniform speckle. They need slightly different handling.</p><h2>How the local tool helps</h2><p>The scratch & noise slider applies a 3×3 median filter: every pixel is replaced by the median of its neighborhood, which removes isolated specks without blurring real edges as much as a blur would. Strength is blended with the original so detail is preserved.</p><h2>Use it sparingly</h2><p>Start at a low value and inspect the before/after slider. Too much median filtering gives skin a plastic look and can erase fine detail like hair and fabric texture.</p><h2>When to choose AI instead</h2><p>Deep scratches that cross faces, large stained areas, or cracks need content-aware reconstruction. AI Enhance with GFPGAN rebuilds facial features that simple filters cannot recover.</p><h2>Prevention for the next scan</h2><p>Wipe prints with a clean, dry, soft cloth before scanning and clean the scanner glass. Removing dust physically is always better than removing it digitally.</p>`,
    },
    zh: {
      title: '修复老照片的划痕、灰尘与颗粒',
      desc: '什么时候中值平滑足够，什么时候值得等待 AI 修复。',
      body: `<p>划痕和灰尘通常表现为细亮线或暗线，颗粒则像均匀的斑点。它们的处理方式略有不同。</p><h2>本地工具如何帮忙</h2><p>划痕与噪点滑块使用 3×3 中值滤波：每个像素被邻域的中值替换，可以去除孤立斑点，同时比模糊更好地保留真实边缘。强度会与原图混合，保留更多细节。</p><h2>少量使用</h2><p>从较低数值开始，拖动前后对比滑块检查。中值滤波过度会让皮肤有塑料感，并抹掉头发、织物纹理等细节。</p><h2>什么时候改用 AI</h2><p>穿过人脸的深划痕、大面积污渍或裂纹需要内容感知重建。AI 增强中的 GFPGAN 能重建简单滤镜无法恢复的面部特征。</p><h2>下次扫描前的预防</h2><p>扫描前用干净、干燥、柔软的布擦拭照片，并清洁扫描仪玻璃。物理除尘永远比数字除尘更好。</p>`,
    },
  },
  {
    slug: 'ai-restore-vs-local-fix',
    en: {
      title: 'AI Restore vs Local Fix: Which Should You Use?',
      desc: 'Compare speed, privacy and restoration quality between local browser fixes and AI Enhance.',
      body: `<p>Aixuno Restore offers two engines on purpose: an instant local fix and a heavier AI Enhance. Picking the right one saves time and protects privacy.</p><h2>Speed</h2><p>The local fix is nearly instant, even for large photos. AI Enhance typically takes 10–60 seconds because the models run on CPU.</p><h2>Privacy</h2><p>Local processing never uploads anything — ideal for sensitive family photos. AI Enhance uploads once and deletes both upload and result within 24 hours.</p><h2>What each is good at</h2><p>Local: yellowing, fading, low contrast, light grain, mild softness. AI: facial detail reconstruction, 2×–4× upscaling, deeper damage.</p><h2>A practical rule</h2><p>Try the local fix first and look at the before/after slider. If faces still lack detail or the print is too small to use, run AI Enhance on that photo.</p>`,
    },
    zh: {
      title: 'AI 修复与本地修复，该用哪一个？',
      desc: '对比本地浏览器修复与 AI 增强在速度、隐私与修复质量上的差异。',
      body: `<p>Aixuno 老照片修复特意提供两种引擎：即时的本地修复与更重的 AI 增强。选对工具既省时间又保护隐私。</p><h2>速度</h2><p>本地修复几乎即时完成，即使是大图。AI 增强通常需要 10–60 秒，因为模型使用 CPU 推理。</p><h2>隐私</h2><p>本地处理不上传任何内容，适合敏感的家庭照片。AI 增强只上传一次，上传与结果均在 24 小时内删除。</p><h2>各自擅长什么</h2><p>本地：泛黄、褪色、对比度低、轻度颗粒、轻微模糊。AI：面部细节重建、2–4 倍超分、更深的损伤。</p><h2>实用原则</h2><p>先用本地修复并查看前后对比。如果人脸细节仍然不足，或照片太小无法使用，再对该照片运行 AI 增强。</p>`,
    },
  },
  {
    slug: 'phone-photo-restore-tips',
    en: {
      title: 'Phone Photo Tips for Better Restoration',
      desc: 'How to photograph old prints with your phone so restoration works better.',
      body: `<p>The quality of your digital copy limits everything that follows. A few small habits make a big difference.</p><h2>Use even, indirect light</h2><p>Daylight near a window is ideal. Avoid direct sun, flash and mixed lighting, which cause glare and color casts that are hard to correct.</p><h2>Shoot straight down</h2><p>Hold the phone parallel to the print. Tilted shots stretch the image and reduce effective resolution on one side.</p><h2>Fill the frame, but do not crop into the photo</h2><p>Leave a small border around the print. You can crop later; you cannot recover detail that was never captured.</p><h2>Keep the print flat</h2><p>Place it on a flat surface and smooth curled corners gently with clean, dry hands or a heavy book for a few minutes.</p><h2>Then restore</h2><p>Upload to Aixuno Restore, start with the local fix, and use AI Enhance only when faces or small details still look soft.</p>`,
    },
    zh: {
      title: '手机翻拍技巧，让修复效果更好',
      desc: '如何用手机翻拍老照片，让后续修复事半功倍。',
      body: `<p>数字副本的质量决定了后续修复的上限。几个小习惯能带来很大差别。</p><h2>使用均匀、间接的光线</h2><p>窗边的自然光最理想。避免直射阳光、闪光灯和混合光源，它们会产生难以校正的反光与色偏。</p><h2>垂直向下拍摄</h2><p>让手机与照片保持平行。倾斜拍摄会拉伸画面，并降低一侧的有效分辨率。</p><h2>画面填满，但不要裁进照片</h2><p>在照片四周留一点边距。之后可以再裁剪，但未拍到的细节无法找回。</p><h2>保持照片平整</h2><p>把照片放在平面上，用干净干燥的双手或厚书轻压几分钟，抚平卷角。</p><h2>然后开始修复</h2><p>上传到 Aixuno 老照片修复，先用本地修复，仅当人脸或小细节仍然模糊时再使用 AI 增强。</p>`,
    },
  },
];

function layout({ lang, title, desc, path, body, isGuide }) {
  const prefix = lang === 'zh' ? '/zh' : '';
  const canonical = `https://restore.aixuno.com${prefix}${path}`;
  const enUrl = `https://restore.aixuno.com${path}`;
  const zhUrl = `https://restore.aixuno.com/zh${path}`;
  const homeHref = lang === 'zh' ? '../index.html' : '../index.html';
  const cssHref = '/src/site.css';
  const brandSite = lang === 'zh' ? '老照片修复' : 'Restore';
  const navGuides = lang === 'zh' ? '修复教程' : 'Guides';
  const navTool = lang === 'zh' ? '修复工具' : 'Restore tool';
  const footerAbout = lang === 'zh' ? '关于' : 'About';
  const footerContact = lang === 'zh' ? '联系我们' : 'Contact';
  const footerPrivacy = lang === 'zh' ? '隐私' : 'Privacy';
  const footerTerms = lang === 'zh' ? '条款' : 'Terms';
  const footerDisclaimer = lang === 'zh' ? '免责声明' : 'Disclaimer';
  const footerChangelog = lang === 'zh' ? '更新日志' : 'Changelog';
  // 结构化数据：指南页 Article、指南索引 CollectionPage、其余 WebPage，统一附 BreadcrumbList
  const siteName = 'Aixuno Restore';
  const homeUrl = `https://restore.aixuno.com/${lang === 'zh' ? 'zh/' : ''}`;
  const isGuideIndex = path === '/guides/index.html';
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: lang === 'zh' ? '首页' : 'Home', item: homeUrl },
  ];
  if (isGuide || isGuideIndex) {
    crumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: lang === 'zh' ? '修复教程' : 'Guides',
      item: `https://restore.aixuno.com/${lang === 'zh' ? 'zh/' : ''}guides/`,
    });
    crumbs.push({ '@type': 'ListItem', position: 3, name: title, item: canonical });
  } else {
    crumbs.push({ '@type': 'ListItem', position: 2, name: title, item: canonical });
  }
  const ldGraph = [];
  if (isGuide && !isGuideIndex) {
    ldGraph.push({
      '@type': 'Article',
      headline: title,
      description: desc,
      url: canonical,
      image: 'https://restore.aixuno.com/og-image.png',
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      author: { '@type': 'Organization', name: 'Aixuno', url: 'https://aixuno.com/' },
      publisher: { '@type': 'Organization', name: siteName, url: 'https://restore.aixuno.com/' },
      datePublished: '2026-11-01',
      dateModified: '2026-11-22',
      mainEntityOfPage: canonical,
      isAccessibleForFree: true,
    });
  } else if (isGuideIndex) {
    ldGraph.push({
      '@type': 'CollectionPage',
      name: title,
      description: desc,
      url: canonical,
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      isPartOf: { '@type': 'WebSite', name: siteName, url: 'https://restore.aixuno.com/' },
    });
  } else {
    ldGraph.push({
      '@type': 'WebPage',
      name: title,
      description: desc,
      url: canonical,
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      isPartOf: { '@type': 'WebSite', name: siteName, url: 'https://restore.aixuno.com/' },
      publisher: { '@type': 'Organization', name: siteName, url: 'https://restore.aixuno.com/' },
    });
  }
  ldGraph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs });
  const structuredData = JSON.stringify({ '@context': 'https://schema.org', '@graph': ldGraph });
  const homeLink = path.startsWith('/guides') ? '../index.html' : './index.html';
  const guidesLink = path.startsWith('/guides') ? './index.html' : './guides/index.html';
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} | Aixuno Restore</title>
    <meta name="description" content="${desc}" />
    <meta name="theme-color" content="#4f46e5" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <meta property="og:type" content="${isGuide ? 'article' : 'website'}" />
    <meta property="og:site_name" content="Aixuno Restore" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%234f46e5'/%3E%3Cpath fill='%23fff' d='M12 4.5A5.5 5.5 0 0 0 6.5 10c0 1.2.4 2.3 1 3.2l-2 3.3h3.1l1.5 2.5 2.6-4.4A5.5 5.5 0 1 0 12 4.5Zm0 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z'/%3E%3C/svg%3E" />
    <link rel="stylesheet" href="${cssHref}" />
  <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ef887868142b18a0c32bd9e20da7d91f";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
<script type="application/ld+json">${structuredData}</script>
</head>
  <body>
    <div id="network" class="network"></div>
    <header class="site-header">
      <div class="site-header__inner container">
        <a class="brand" href="${homeLink}"><span class="brand__mark">A</span>Aixuno <span class="brand__site">${brandSite}</span></a>
        <nav class="mini-nav">
          <a href="${homeLink}#workspace">${navTool}</a>
          <a href="${guidesLink}">${navGuides}</a>
        </nav>
        <div class="lang-switch" id="lang-switch" role="group" aria-label="Language"></div>
      </div>
    </header>
    <main id="main-content">
      <section class="section">
        <div class="container prose">
          <h1>${title}</h1>
          ${body}
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span>© 2026 Aixuno</span>
        <span class="footer-links">
          <a href="${homeLink.replace('index.html', 'about.html')}">${footerAbout}</a>
          <a href="${homeLink.replace('index.html', 'contact.html')}">${footerContact}</a>
          <a href="${homeLink.replace('index.html', 'privacy.html')}">${footerPrivacy}</a>
          <a href="${homeLink.replace('index.html', 'terms.html')}">${footerTerms}</a>
          <a href="${homeLink.replace('index.html', 'disclaimer.html')}">${footerDisclaimer}</a>
          <a href="${homeLink.replace('index.html', 'changelog.html')}">${footerChangelog}</a>
        </span>
      </div>
    </footer>
    <script type="module">
      import { initPage } from '/src/main.js';
      initPage('restore');
    </script>
  </body>
</html>
`;
}

function writePage(lang, slug, data, isGuide) {
  const path = `${isGuide ? '/guides' : ''}/${slug}.html`;
  const html = layout({ lang, title: data.title, desc: data.desc, path, body: data.body, isGuide });
  const file = join(root, lang === 'zh' ? 'zh' : '', isGuide ? 'guides' : '', `${slug}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return path;
}

const written = [];

for (const page of SUPPORT) {
  for (const lang of ['en', 'zh']) {
    written.push(writePage(lang, page.slug, page[lang], false));
  }
}

for (const guide of GUIDES) {
  for (const lang of ['en', 'zh']) {
    written.push(writePage(lang, guide.slug, guide[lang], true));
  }
}

for (const lang of ['en', 'zh']) {
  const data = {
    en: {
      title: 'Photo Restoration Guides',
      desc: 'Step-by-step guides for restoring old photos: fading, scratches, AI vs local fixes and phone scanning tips.',
      body: `<p>Practical walkthroughs for the most common restoration tasks.</p><ul>${GUIDES.map((g) => `<li><a href="./${g.slug}.html">${g.en.title}</a> — ${g.en.desc}</li>`).join('')}</ul>`,
    },
    zh: {
      title: '照片修复教程',
      desc: '老照片修复实操指南：褪色、划痕、AI 与本地修复对比、手机翻拍技巧。',
      body: `<p>针对常见修复任务的实操指南。</p><ul>${GUIDES.map((g) => `<li><a href="./${g.slug}.html">${g.zh.title}</a> — ${g.zh.desc}</li>`).join('')}</ul>`,
    },
  }[lang];
  written.push(writePage(lang, 'index', data, true));
}

const home = readFileSync(join(root, 'index.html'), 'utf8');
const zhHome = home
  .replace('<html lang="en">', '<html lang="zh-CN">')
  .replace(/<title>[^<]*<\/title>/, '<title>老照片修复在线免费 — AI 照片修复 | Aixuno 老照片修复</title>')
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="免费在线老照片修复。浏览器本地修复褪色、泛黄、划痕与模糊，或用 GFPGAN 与 Real-ESRGAN 进行 AI 深度修复。无需注册，文件 24 小时自动删除。" />')
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://restore.aixuno.com/zh/" />')
  .replace(/content="Old Photo Restoration Online Free \| Aixuno Restore"/, 'content="老照片修复在线免费 | Aixuno 老照片修复"')
  .replace(/content="Fix fading, scratches and blur in seconds\. Local browser fixes plus AI deep restoration\. Free, no sign-up\."/, 'content="几秒修复褪色、划痕与模糊。本地浏览器修复 + AI 深度修复，免费无需注册。"')
  .replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://restore.aixuno.com/zh/" />');
mkdirSync(join(root, 'zh'), { recursive: true });
writeFileSync(join(root, 'zh', 'index.html'), zhHome);

const allPaths = ['/', ...written.filter((p, i) => i % 2 === 0).map((p) => p.replace(/\.html$/, '').replace(/\/index$/, '/'))];

// lastmod 取页面对应 HTML 文件的实际修改时间（yyyy-MM-dd，本地时区）
function lastmod(relFile) {
  const d = statSync(join(root, relFile)).mtime;
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const urls = [];
for (const p of allPaths) {
  const clean = p.endsWith('/') ? p : `${p}.html`;
  const rel = clean === '/' ? 'index.html' : clean.endsWith('/') ? `${clean.slice(1)}index.html` : clean.slice(1);
  const enUrl = `https://restore.aixuno.com${clean}`;
  const zhUrl = `https://restore.aixuno.com/zh${clean}`;
  // 每个页面都有中英双语版本，因此两条 URL 都附带完整的 hreflang 交替标注
  for (const [loc, relFile] of [[enUrl, rel], [zhUrl, `zh/${rel}`]]) {
    urls.push(
      [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod(relFile)}</lastmod>`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
        '  </url>',
      ].join('\n')
    );
  }
}
writeFileSync(
  join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
);

// 国内搜索引擎与通用搜索蜘蛛：显式允许抓取，仅屏蔽 API 与跟踪参数。
const SEO_BOTS = [
  'Baiduspider',
  'Baiduspider-mobile',
  'Baiduspider-image',
  'Baiduspider-video',
  'Baiduspider-news',
  '360Spider',
  'HaosouSpider',
  'Sogou web spider',
  'Sogou inst spider',
  'Sogou Pic Spider',
  'YisouSpider',
  'Bytespider',
  'Bingbot',
  'msnbot',
  'Googlebot',
  'Googlebot-Image',
];

const robotGroup = (ua) =>
  `User-agent: ${ua}\nAllow: /\nDisallow: /api/\nDisallow: /*?*utm_\nDisallow: /*?*from=\n`;

writeFileSync(
  join(root, 'public', 'robots.txt'),
  [robotGroup('*'), '# 国内搜索引擎\n', ...SEO_BOTS.map(robotGroup), 'Sitemap: https://restore.aixuno.com/sitemap.xml\n'].join(
    '\n'
  )
);

writeFileSync(
  join(root, 'public', 'llms.txt'),
  `# Aixuno Restore\n\nFree online old photo restoration. Local browser fixes (fade correction, sharpening, scratch smoothing) plus AI Enhance with GFPGAN and Real-ESRGAN. No sign-up. Cloud uploads and results auto-deleted within 24 hours.\n\n## Pages\n- Home: https://restore.aixuno.com/\n- Chinese home: https://restore.aixuno.com/zh/\n- Guides: https://restore.aixuno.com/guides/\n- Privacy: https://restore.aixuno.com/privacy.html\n\n## Aixuno tool ecosystem\n- Markdown conversion: https://aixuno.com/\n- Image tools: https://image.aixuno.com/\n- File compression: https://compress.aixuno.com/\n- PDF tools: https://pdf.aixuno.com/\n- AI background removal: https://bg.aixuno.com/\n- Document scanner: https://scan.aixuno.com/\n- Video watermark removal: https://watermark.aixuno.com/\n`
);

console.log(`generated ${written.length + 1} pages + sitemap/robots/llms`);
