const SystemDetectors = {
  os: () => {
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    
    if (ua.includes("Ubuntu")) return "Ubuntu";
    if (ua.includes("Debian")) return "Debian";
    if (ua.includes("Fedora")) return "Fedora";
    if (ua.includes("Arch")) return "Arch";
    if (ua.includes("Mint")) return "Linux Mint";
    if (ua.includes("Linux")) return "Linux";
    
    return "Web OS";
  },
  browser: () => {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("Chrome")) return "Google Chrome";
    if (ua.includes("Safari")) return "Apple Safari";
    return "Web Browser";
  },
  gpu: () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (!gl) return "WebGL Not Supported";
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) { return "Generic WebGL"; }
  },
  cpu: () => {
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "";
    let vendor = "";

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";

        if (renderer.includes("Apple")) {
          vendor = "Apple Silicon";
        } else if (renderer.includes("Adreno")) {
          vendor = "Qualcomm Snapdragon";
        } else if (renderer.includes("Mali")) {
          vendor = "ARM / MediaTek / Exynos";
        } else if (renderer.includes("AMD") || renderer.includes("Radeon")) {
          vendor = "AMD Processor";
        } else if (renderer.includes("Intel")) {
          vendor = "Intel Processor";
        }
      }
    } catch(e) {}

    if (!vendor) {
      const ua = navigator.userAgent;
      if (ua.includes("Mac OS") || ua.includes("Macintosh")) {
        vendor = "Apple Silicon / Intel Mac";
      } else if (ua.includes("Android")) {
        vendor = "ARM Mobile";
      } else {
        vendor = "x86-64 (Intel / AMD)";
      }
    }

    return cores ? `${vendor} (${cores})` : vendor;
  },
  ram: () => navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "N/A",
  screen: () => {
    const ratio = window.devicePixelRatio || 1;
    return `${Math.round(window.screen.width * ratio)}x${Math.round(window.screen.height * ratio)}`;
  },
  battery: async () => {
    if ('getBattery' in navigator) {
      try {
        const b = await navigator.getBattery();
        return `${Math.round(b.level * 100)}% ${b.charging ? '[Charging]' : ''}`;
      } catch(e) {}
    }
    return "Desktop / N/A";
  },
  uptime: () => {
    const sec = Math.floor(performance.now() / 1000);
    return `${Math.floor(sec / 60)}m ${sec % 60}s`;
  }
};

function generateAutoConfig() {
  return {
    "title": "user@webfetch",
    "logo": "auto",
    "keyColor": "var(--accent)",
    "valColor": "var(--text-main)",
    "logoColors": [
      "#1d1f21", "#cc6666", "#b5bd68", "#f0c674",
      "#81a2be", "#b294bb", "#8abeb7", "#c5c8c6"
    ],
    "modules": [
      { "type": "os", "key": "OS" },
      { "type": "browser", "key": "Browser" },
      { "type": "gpu", "key": "GPU" },
      { "type": "cpu", "key": "CPU" },
      { "type": "ram", "key": "Memory" },
      { "type": "screen", "key": "Resolution" },
      { "type": "battery", "key": "Battery" },
      { "type": "uptime", "key": "Uptime" },
      { "type": "colors" }
    ]
  };
}

function parseLogoColors(str, config = {}) {
  if (!str) return '';

  const defaultColors = [
    "#1d1f21", "#cc6666", "#b5bd68", "#f0c674",
    "#81a2be", "#b294bb", "#8abeb7", "#c5c8c6"
  ];
  const userColors = Array.isArray(config.logoColors) ? config.logoColors : [];

  let html = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/\$([1-9])/g, (match, num) => {
    const index = parseInt(num, 10) - 1;
    const color = userColors[index] || defaultColors[index] || '#c5c8c6';
    return `</span><span style="color: ${color};">`;
  });

  return `<span>${html}</span>`;
}

const themeStyleElem = document.getElementById('themeStyle');
const themeSelect = document.getElementById('themeSelect');
const windowStyleSelect = document.getElementById('windowStyleSelect');
const webfetchWindow = document.getElementById('webfetchWindow');
const windowHeader = document.getElementById('windowHeader');

function updateButtonTextColor() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.style.setProperty('--btn-text-color', isDark ? '#ffffff' : '#000000');
}

function applyTheme(themeName) {
  themeStyleElem.setAttribute('href', `themes/${themeName}.css`);
  localStorage.setItem('webfetch_theme', themeName);
  themeSelect.value = themeName;
  setTimeout(updateButtonTextColor, 50);
}

function applyWindowStyle(style) {
  webfetchWindow.className = `webfetch-window window-style-${style}`;
  localStorage.setItem('webfetch_window_style', style);
  windowStyleSelect.value = style;

  if (style === 'macos') {
    windowHeader.style.paddingLeft = "15px";
    windowHeader.innerHTML = `
      <div class="mac-dots">
        <div class="mac-dot dot-red"></div>
        <div class="mac-dot dot-yellow"></div>
        <div class="mac-dot dot-green"></div>
      </div>
      <span style="font-size: 12px; opacity: 0.6;" class="mac-title-spacing">WebFetch</span>
      <button class="menu-btn mac-btn-spacing" onclick="openModal()" title="Settings">⋮</button>
    `;
  } else if (style === 'windows') {
    windowHeader.style.paddingLeft = "15px";
    windowHeader.innerHTML = `
      <div style="display:flex; align-items:center;">
        <span style="font-size: 12px;">WebFetch</span>
      </div>
      <div style="display:flex; align-items:center; height:100%; gap: 5px;">
        <button class="menu-btn" onclick="openModal()" title="Settings">⋮</button>
        <div class="win-controls">
          <div class="win-btn" title="Minimize">—</div>
          <div class="win-btn" title="Maximize">▢</div>
          <div class="win-btn close" title="Close">✕</div>
        </div>
      </div>
    `;
  } else {
    windowHeader.innerHTML = '';
  }
}

async function renderTerminal(config) {
  const logoBox = document.getElementById('logoBox');
  const infoBox = document.getElementById('infoBox');
  const detectedOS = SystemDetectors.os();

  let finalLogo = "";
  if (!config.logo || config.logo === "auto") {
    finalLogo = getLogoForOS(detectedOS);
  } else if (typeof getLogoForOS === "function" && OS_LOGOS[config.logo.toLowerCase()]) {
    finalLogo = getLogoForOS(config.logo);
  } else {
    finalLogo = config.logo;
  }

  logoBox.innerHTML = `<pre>${parseLogoColors(finalLogo, config)}</pre>`;

  const globalKeyColor = config.keyColor || 'var(--accent)';
  const globalValColor = config.valColor || 'var(--text-main)';

  let html = '';
  if (config.title) {
    html += `<div class="title-line">${config.title}</div>`;
    html += `<div class="separator">${'-'.repeat(config.title.length + 4)}</div>`;
  }

  if (Array.isArray(config.modules)) {
    for (const mod of config.modules) {
      if (mod.type === 'colors') {
        const blocks = mod.colors || [
          '#1d1f21', '#cc6666', '#b5bd68', '#f0c674',
          '#81a2be', '#b294bb', '#8abeb7', '#c5c8c6'
        ];
        html += `<div class="color-blocks">`;
        blocks.forEach(c => { html += `<div class="block" style="background: ${c}"></div>`; });
        html += `</div>`;
        continue;
      }

      let val = mod.value;
      if (!val && SystemDetectors[mod.type]) {
        val = await SystemDetectors[mod.type]();
      } else if (!val) {
        val = "N/A";
      }

      const label = mod.key || (mod.type ? mod.type.toUpperCase() : "Info");
      const itemKeyColor = mod.keyColor || globalKeyColor;
      const itemValColor = mod.valColor || globalValColor;

      html += `
        <div class="info-row">
          <span class="info-key" style="color: ${itemKeyColor};">${label}</span>
          <span class="info-val" style="color: ${itemValColor};">${val}</span>
        </div>`;
    }
  }
  infoBox.innerHTML = html;
}

const modal = document.getElementById('modalOverlay');
const configInput = document.getElementById('configInput');

function loadConfig() {
  const saved = localStorage.getItem('webfetch_config');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return generateAutoConfig();
}

let currentConfig = loadConfig();

function openModal() {
  configInput.value = JSON.stringify(currentConfig, null, 2);
  modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }

const savedTheme = localStorage.getItem('webfetch_theme') || 'neutral';
const savedStyle = localStorage.getItem('webfetch_window_style') || 'macos';

updateButtonTextColor();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateButtonTextColor);

applyTheme(savedTheme);
applyWindowStyle(savedStyle);

themeSelect.onchange = (e) => applyTheme(e.target.value);
windowStyleSelect.onchange = (e) => applyWindowStyle(e.target.value);

document.getElementById('saveBtn').onclick = () => {
  try {
    const parsed = JSON.parse(configInput.value);
    currentConfig = parsed;
    localStorage.setItem('webfetch_config', JSON.stringify(parsed));
    renderTerminal(currentConfig);
    closeModal();
  } catch (err) {
    alert('JSON Error\n\nDetails: ' + err.message);
  }
};

document.getElementById('eraseBtn').onclick = () => {
  currentConfig = generateAutoConfig();
  localStorage.removeItem('webfetch_config');
  configInput.value = JSON.stringify(currentConfig, null, 2);
  renderTerminal(currentConfig);
};

const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');

exportBtn.onclick = () => {
  try {
    const configText = configInput.value;
    JSON.parse(configText);
    const blob = new Blob([configText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webfetch_config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert('Invalid JSON! Cannot export configuration.');
  }
};

importBtn.onclick = () => fileInput.click();
fileInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      configInput.value = JSON.stringify(parsed, null, 2);
      alert('Configuration imported into editor! Click "Save" to apply.');
    } catch (err) {
      alert('Error parsing JSON file. Make sure it has a valid format.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
};

const handles = webfetchWindow.querySelectorAll('.resize-handle');
let currentResizer = null;
let originalWidth = 0, originalHeight = 0, originalMouseX = 0, originalMouseY = 0;

handles.forEach(handle => {
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    currentResizer = handle;
    const rect = webfetchWindow.getBoundingClientRect();
    originalWidth = rect.width;
    originalHeight = rect.height;
    originalMouseX = e.clientX;
    originalMouseY = e.clientY;
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);
  });
});

function handleResize(e) {
  if (!currentResizer) return;
  const dx = e.clientX - originalMouseX;
  const dy = e.clientY - originalMouseY;
  const minW = 380, minH = 220;

  if (currentResizer.classList.contains('resizer-br')) {
    webfetchWindow.style.width = Math.max(minW, originalWidth + dx) + 'px';
    webfetchWindow.style.height = Math.max(minH, originalHeight + dy) + 'px';
  } else if (currentResizer.classList.contains('resizer-bl')) {
    webfetchWindow.style.width = Math.max(minW, originalWidth - dx) + 'px';
    webfetchWindow.style.height = Math.max(minH, originalHeight + dy) + 'px';
  } else if (currentResizer.classList.contains('resizer-tr')) {
    webfetchWindow.style.width = Math.max(minW, originalWidth + dx) + 'px';
    webfetchWindow.style.height = Math.max(minH, originalHeight - dy) + 'px';
  } else if (currentResizer.classList.contains('resizer-tl')) {
    webfetchWindow.style.width = Math.max(minW, originalWidth - dx) + 'px';
    webfetchWindow.style.height = Math.max(minH, originalHeight - dy) + 'px';
  }
}

function stopResize() {
  currentResizer = null;
  window.removeEventListener('mousemove', handleResize);
  window.removeEventListener('mouseup', stopResize);
}

const OS_LOGOS = {
  linux: `
            $7#####
           $7#######
           $7##$8O$7#$8O$7##
           $7#$3#####$7#
         $7##$8##$3###$8##$7##
        $7#$8###########$7#
        $7#$8###########$7#
        $7#$8###########$7#
      $3##$7#$8###########$7##$3##
    $3######$7#$8#######$7#$3######
    $3#######$7#$8#####$7#$3#######
      $3#####$7#######$3#####  
`,

  arch: `
                    $7-\`
                   .o+\`
                  \`ooo/
                 \`+oooo:
                \`+oooooo:
                -+oooooo+:
              \`/:-:++oooo+:
             \`/++++/+++++++:
            \`/++++++++++++++:
           \`/+++o$6oooooooo$7oooo/\`
          ./$5ooosssso++osssssso$5+\`
         .oossssso-\`\`\`\`/ossssss+\`
         -osssssso.      :ssssssso.
        :osssssss/        ossso+++.
       /ossssssss/        +ssssooo/-
     \`/ossssso+/:-        -:/+osssso+-
     \`+sso+:-\`                \`.-/+oso:
    \`++:.                      \`-/+/
    .\`                        \`/
`,

  ubuntu: `
                            $2....
                  $4.',:clooo:  $2.:looooo:.
               $4.;looooooooc  $2.oooooooooo'
            $4.;looooool:,''.  $2:ooooooooooc
           $4;looool;.         $2'oooooooooo,
          $4;clool'            $2.cooooooc.  $4,,
             $4...                $2......  $4.:oo,
     $2.;clol:,.                         $4.loooo'
    $2:ooooooooo,                         $4'ooool
   $2'ooooooooooo.                         $4loooo.
   $2'ooooooooool                          $4coooo.
    $2,loooooooc.                         $4.loooo.
       $2.,;;;'.                          $4;ooooc
            $4...                         $4,ooool.
         $4.cooooc.               $2..',,'.  $4.cooo.
           $4;ooooo:.            $2;oooooooc.  $4:l.
            $4.coooooc,..      $2coooooooooo.
               $4.:ooooooolc:. $2.ooooooooooo'
                 $4.':loooooo;  $2,oooooooooc
                    $4..';::c'  $2.;loooo:'
`,

  debian: `
            $6_,met$$$$$$$$$$gg.
         ,g$$$$$$$$$$$$$$$$$$$$P.
       ,g$$$$P""         """Y$$$$.".
      ,$$$$P'               \`$$$$$$.
    ',\`$$$$P        ,ggs.     \`$$$$b:
    \`d$$$$'      ,$P"'   $2.$6    $$$$$$
     $$$$P      d$'     $2,$6     $$$$P
     $$$$:      $$$.   $2-$6    ,d$$$$'
     $$$$;      Y$b._    _,d$P'
     Y$$$$.    $2\`.$6\`"Y$$$$$$$$P"'
     \`$$$$b      $2"-.__
      $6\`Y$$$$b
       \`Y$$$$.
         \`$$$$b.
           \`Y$$$$b.
              \`"Y$$b._
                 \`""""
`,

  fedora: `
                 .,;::::;,'.
             .';:cccccccccccc:;,.
          .;cccccccccccccccccccccc;.
        .:cccccccccccccccccccccccccc:.
     .;ccccccccccccc;$5.:dddl:.$8;ccccccc;.
     .:ccccccccccccc;$5OWMKOOXMWd$8;ccccccc:.
    .:ccccccccccccc;$5KMMc$8;cc;$5xMMc$8;ccccccc:.
    ,cccccccccccccc;$5MMM.$8;cc;$5;WW:$8;cccccccc,
    :cccccccccccccc;$5MMM.$8;cccccccccccccccc:
    :ccccccc;$5oxOOOo$8;$5MMM000k.$8;cccccccccccc:
    cccccc;$50MMKxdd:$8;$5MMMkddc.$8;cccccccccccc;
    ccccc;$5XMO'$8;cccc;$5MMM.$8;cccccccccccccccc'
    ccccc;$5MMo$8;ccccc;$5MMW.$8;ccccccccccccccc;
    ccccc;$50MNc.$8ccc$5.xMMd$8;ccccccccccccccc;
    cccccc;$5dNMWXXXWM0:$8;cccccccccccccc:,
    cccccccc;$5.:odl:.$8;cccccccccccccc:,.
    ccccccccccccccccccccccccccccc:'.
    :ccccccccccccccccccccccc:;,..
     ':cccccccccccccccc::;,.
`,

  mint: `
                $3_.-ppOOOOOOqq-._
             .oOOOOPPPPPPPPPPOOOOo.
          .oOOOO$3.=oOOOOOOOOOOo=.$8OOOOo.
        .:OOO$3.=oOOOOOOOOOOOOOOOOo=.$8OOO:.
        .OOO$3.OOOOOOOOOOOOOOOOOOOOOOOO.$8OOO.
       .OOO$3.OO     OOO:´    \`::´    \`:OOO.$8OO:
      .OOO$3.OOO     OO          O     OOO.$8OOO:
      OOO$3.OOOO     OO    oo    oo    OOOO.$8OOO
     :OOO$3:OOOO     OO    OO    OO    OOOO:$8OOO:
     :OOO$3:OOOO     OO    OO    OO    OOOO:$8OOO:
     'OOO$3'OOOO     OO    OO    OO    OOOO'$8OOO'
      OOO$3'OOOO     OO____OO____OO    OOOO'$8OOO'
      'OOO$3'OOO     'OOOOOOOOOOOO'    OOOO'$8OOO
       'OOO$3'OOO                     .OOO'$8OOO'
        'OOO$3'OOOO:ooooooooooooooo:OOOO'$8OOO'
         ':OOOo$3'=OOOOOOOOOOOOOOOOO='$8oOOO:'
           ':OOOOo$3'=OOOOOOOOOOO='$8oOOOO:'
              \`\`-OOOOooooooooooOOOO-´´
                 \`\`\`-=:OOOO:=-´´´
`,

  nixos: `
         $1_      $2___    _      
        $1+o\   $2\  \  / \     
        $1\oo\   $2\  \/  /     
      $1,oo+oo+ooo$2\   ,/ $1+\   
     $1<ooooooooooo$2\  \ $1/os;  
         $2/''/     \  ,$1oo/   
    $2,───'  /       \,$1oooooo,
    $2\__   ;$1s       /oo/sss>'
      $2/  /$1so\$2_____$1/ss/$2____  
     $2', / $1\oo\    $2'''     / 
      \/ $1/sooo\$2───.  .───'  
        $1/so/\oo\   $2\  \     
        $1\o/  \s+\   $2\__\    
              $1'''      
  `,

  windows: `
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////

    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////  
  `,

  macos: `
                     ..'
                 ,xNMM.
               .OMMMMo
               lMM"
         .;loddo:.  .olloddol;.
       cKMMMMMMMMMMNWMMMMMMMMMM0:
     $2.KMMMMMMMMMMMMMMMMMMMMMMMWd.
     XMMMMMMMMMMMMMMMMMMMMMMMX.
    $3;MMMMMMMMMMMMMMMMMMMMMMMM:
    :MMMMMMMMMMMMMMMMMMMMMMMM:
    $4.MMMMMMMMMMMMMMMMMMMMMMMMX.
     kMMMMMMMMMMMMMMMMMMMMMMMMWd.
     $5'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
     'XMMMMMMMMMMMMMMMMMMMMMMMMK.
        $6kMMMMMMMMMMMMMMMMMMMMMMd
         ;KMMMMMMMWXXWMMMMMMMk.
            "cooc*"    "*coo'"  
`,

  android: `
             -o         o-
             +hydNNNNdyh+
           +m$3MMMMMMMMMMMMm+
         \`dMM$3m:$8NMMMMMMN$3:m$3MMd\`
         h$3MMMMMMMMMMMMMMMMMMh
     ..  yyyyyyyyyyyyyyyyyyyy  ..
   .m$3MMm\`$3MMMMMMMMMMMMMMMMMMMM\`$3mMMm.
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   -$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM-
    +yy+ $3MMMMMMMMMMMMMMMMMMM +yy+
         $3m$3MMMMMMMMMMMMMMMMMMm
         \`/++$3MMMMh++h$3MMMM++/\`
             $3MMMMo  o$3MMMM
             $3MMMMo  o$3MMMM
             oNMm-  -mMNs
`,

  ios: `
                     ..'
                 ,xNMM.
               .OMMMMo
               lMM"
         .;loddo:.  .olloddol;.
       cKMMMMMMMMMMNWMMMMMMMMMM0:
     $2.KMMMMMMMMMMMMMMMMMMMMMMMWd.
     XMMMMMMMMMMMMMMMMMMMMMMMX.
    $3;MMMMMMMMMMMMMMMMMMMMMMMM:
    :MMMMMMMMMMMMMMMMMMMMMMMM:
    $4.MMMMMMMMMMMMMMMMMMMMMMMMX.
     kMMMMMMMMMMMMMMMMMMMMMMMMWd.
     $5'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
     'XMMMMMMMMMMMMMMMMMMMMMMMMK.
        $6kMMMMMMMMMMMMMMMMMMMMMMd
         ;KMMMMMMMWXXWMMMMMMMk.
            "cooc*"    "*coo'"  
`
};

function getLogoForOS(osName) {
  if (!osName) return OS_LOGOS.linux;

  const str = osName.toLowerCase();

  if (str.includes("arch")) return OS_LOGOS.arch;
  if (str.includes("ubuntu")) return OS_LOGOS.ubuntu;
  if (str.includes("debian")) return OS_LOGOS.debian;
  if (str.includes("fedora")) return OS_LOGOS.fedora;
  if (str.includes("mint")) return OS_LOGOS.mint;
  if (str.includes("nix")) return OS_LOGOS.nixos;
  if (str.includes("win")) return OS_LOGOS.windows;
  if (str.includes("mac") || str.includes("darwin")) return OS_LOGOS.macos;
  if (str.includes("android")) return OS_LOGOS.android;
  if (str.includes("ios") || str.includes("iphone") || str.includes("ipad")) return OS_LOGOS.ios;
  if (str.includes("linux")) return OS_LOGOS.linux;

  if (OS_LOGOS[str]) return OS_LOGOS[str];

  return OS_LOGOS.linux;
}

renderTerminal(currentConfig);
