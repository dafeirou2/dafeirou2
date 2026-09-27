'use strict';
/* Compact UI copy layer. Game data stays local; only the presentation language changes. */
const I18N={
 zh:{brand:'一口进化',brandSub:'吃出惊喜，收集你的伙伴',navPlay:'开始挑战',navCollection:'我的图鉴',navBoard:'现场挑战榜',localOnly:'现场试玩版 · 数据仅保存在此浏览器',tagline:'60 秒，养出一点不一样。',arenaTitle:'黑洞游乐场',arenaSpeed:'双向传送 · 落速 ×',portalReady:'走进黑洞 · 传送到另一侧',portalBusy:'黑洞充能中'},
 en:{brand:'ONE BITE',brandSub:'Eat a surprise. Collect your companion.',navPlay:'Play',navCollection:'My Dex',navBoard:'Challenge Board',localOnly:'Event demo · data stays in this browser',tagline:'60 seconds. Raise something unexpected.',arenaTitle:'BLACKHOLE PLAYGROUND',arenaSpeed:'TWO-WAY WARP · SPEED ×',portalReady:'ENTER THE HOLE · WARP ACROSS',portalBusy:'BLACKHOLE CHARGING'},
 de:{brand:'EIN BISS',brandSub:'Iss eine Überraschung. Sammle deinen Begleiter.',navPlay:'Spielen',navCollection:'Meine Sammlung',navBoard:'Bestenliste',localOnly:'Event-Demo · Daten bleiben in diesem Browser',tagline:'60 Sekunden. Zieh etwas Unerwartetes auf.',arenaTitle:'SCHWARZLOCH-SPIELPLATZ',arenaSpeed:'ZWEI-WEGE-WARP · TEMPO ×',portalReady:'INS LOCH · ZUR ANDEREN SEITE',portalBusy:'SCHWARZLOCH LÄDT'}
};
const PHRASES={
 zh:{'开始我的挑战 ↗':'开始我的挑战 ↗','一分钟 / 你的进化时刻':'一分钟 / 你的进化时刻','结束试玩':'结束试玩','剩余':'剩余','积分':'积分','鼠标':'鼠标','暂停 Esc':'暂停 Esc','正在长大':'正在长大','这局吃了什么':'这局吃了什么','初生体 · 第 0 / 3 次进化':'初生体 · 第 0 / 3 次进化','再吃 6 口，第一次进化。':'再吃 6 口，第一次进化。','移动鼠标飞行接食物，避开炸弹。':'移动鼠标飞行接食物，避开炸弹。','宠物会跟随位置飞行 · 键盘 WASD / 方向键也可微调':'宠物会跟随位置飞行 · 键盘 WASD / 方向键也可微调'},
 en:{'开始我的挑战 ↗':'Start my run ↗','每一口，长出一点不一样。':'Every bite grows something new.','接住每一口，':'Catch every bite,','养出你的':'raise your','小怪兽。':'tiny monster.','左右移动接食物、躲炸弹。':'Move freely, catch food, dodge bombs.','60 秒，穿过黑洞，看看它会长成什么样。':'60 seconds. Warp through blackholes. See what it becomes.','单人 · 60 秒':'Solo · 60 sec','3 次进化':'3 evolutions','每局一张收藏卡':'1 card every run','方向键 ← → / A D 移动 · 也可以用鼠标或触屏拖动':'Mouse / touch to fly · WASD or arrows also work','食物决定家族':'Food shapes your form','进化带来惊喜':'Evolve into surprise','把这一局收藏起来':'Collect this run','一分钟 / 你的进化时刻':'ONE MINUTE / EVOLVE', '结束试玩':'End demo','剩余':'TIME','积分':'SCORE','鼠标':'MOUSE','暂停 Esc':'Pause Esc','正在长大':'GROWING NOW','这局吃了什么':'EATEN THIS RUN','初生体 · 第 0 / 3 次进化':'Baby form · Evolution 0 / 3','再吃 6 口，第一次进化。':'Eat 6 more for evolution one.','移动鼠标飞行接食物，避开炸弹。':'Guide your pet with the mouse. Catch food. Avoid bombs.','宠物会跟随位置飞行 · 键盘 WASD / 方向键也可微调':'Free flight follows your mouse · WASD / arrows also work'},
 de:{'开始我的挑战 ↗':'Meine Runde starten ↗','一分钟 / 你的进化时刻':'EINE MINUTE / ENTWICKLUNG','结束试玩':'Demo beenden','剩余':'ZEIT','积分':'PUNKTE','鼠标':'MAUS','暂停 Esc':'Pause Esc','正在长大':'WÄCHST GERADE','这局吃了什么':'DIESE RUNDE GEGESSEN','初生体 · 第 0 / 3 次进化':'Babyform · Entwicklung 0 / 3','再吃 6 口，第一次进化。':'Noch 6 Happen bis Entwicklung eins.','移动鼠标飞行接食物，避开炸弹。':'Mit der Maus fliegen, Essen fangen, Bomben meiden.','宠物会跟随位置飞行 · 键盘 WASD / 方向键也可微调':'Freies Fliegen mit der Maus · WASD / Pfeiltasten gehen auch'}
};
let locale=localStorage.getItem('one-bite-language')||'zh';
if(!I18N[locale])locale='zh';
window.gameLocale=()=>locale;
window.uiText=(key)=>I18N[locale][key]||I18N.zh[key]||key;
window.localizeSpeech=(text)=>{if(locale==='zh')return text;const speech={en:{'移动鼠标，带宠物接住喜欢的食物。':'Move the mouse. Catch food. Avoid bombs.','穿过黑洞，换一边继续找吃的。':'Blackhole warp. Find more food on the other side.','小心炸弹！':'Watch the bomb!','旁白已开启。':'Narration is on.'},de:{'移动鼠标，带宠物接住喜欢的食物。':'Bewege die Maus. Fang Essen. Meide Bomben.','穿过黑洞，换一边继续找吃的。':'Schwarzes Loch. Suche auf der anderen Seite weiter.','小心炸弹！':'Vorsicht, Bombe!','旁白已开启。':'Erzählstimme ist an.'}};return speech[locale]?.[text]||text};
function applyLanguage(){
 document.documentElement.lang=locale==='zh'?'zh-CN':locale;
 document.title=locale==='zh'?'一口进化 · 像素宠物养成':locale==='en'?'ONE BITE · Pixel Pet Evolution':'EIN BISS · Pixel-Haustierentwicklung';
 document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;const text=window.uiText(key);if(el.querySelector('small')&&key==='brand'){el.childNodes[0].nodeValue=text;return}el.textContent=text});
 const walker=document.createTreeWalker(document.querySelector('#content'),NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){const raw=node.nodeValue,source=raw.trim(),replacement=PHRASES[locale][source];if(replacement&&replacement!==source)node.nodeValue=raw.replace(source,replacement)}
 const picker=document.querySelector('#language');if(picker)picker.value=locale;
 const arena=document.querySelector('.arena');if(arena&&!document.querySelector('.mobile-pad')){
  const pad=document.createElement('div');pad.className='mobile-pad';pad.setAttribute('aria-label','Touch controls');pad.innerHTML='<button data-key="ArrowUp">↑</button><button data-key="ArrowLeft">←</button><button data-key="ArrowDown">↓</button><button data-key="ArrowRight">→</button>';
  pad.querySelectorAll('button').forEach(btn=>{const down=e=>{e.preventDefault();window.dispatchEvent(new KeyboardEvent('keydown',{key:btn.dataset.key,bubbles:true}))},up=e=>{e.preventDefault();window.dispatchEvent(new KeyboardEvent('keyup',{key:btn.dataset.key,bubbles:true}))};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('pointerleave',up)});arena.after(pad);
 }
}
document.addEventListener('DOMContentLoaded',()=>{const picker=document.querySelector('#language');picker?.addEventListener('change',()=>{locale=picker.value;localStorage.setItem('one-bite-language',locale);applyLanguage()});applyLanguage();new MutationObserver(()=>requestAnimationFrame(applyLanguage)).observe(document.querySelector('#content'),{childList:true,subtree:true});});
