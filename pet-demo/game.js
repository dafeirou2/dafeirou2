'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const FAMILY=[{id:'seed',cn:'林芽家族',pet:'栗栗',en:'SPROUT',food:'水果 / 蔬菜',color:'#b79a6d',light:'#d8c398',accent:'#9cab69'},{id:'dragon',cn:'岩龙家族',pet:'石豆',en:'PEBBLE',food:'肉类 / 鲜鱼',color:'#728e88',light:'#a6beb0',accent:'#d1b679'},{id:'blob',cn:'团灵家族',pet:'糯米',en:'MOCHI',food:'披萨',color:'#958599',light:'#c5b4c6',accent:'#cec08b'}];
const LEVELS=[0,6,15,27],KEY='one-bite-demo-v1';
let db={players:[],current:null},view='home',chosen=-1,homeFamily=0,filter=-1,lastCard=null,pendingStart=false,muted=false,voiceOn=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=0,session=null,audioCtx=null,musicTimer=null,musicStep=0,toastTimer;
try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw&&Array.isArray(raw.players)){db.players=raw.players.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&Array.isArray(p.cards));db.current=raw.current;}}catch{}
const player=()=>db.players.find(p=>p.id===db.current);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));}catch{toast('本机存储不可用，本次数据仅在页面打开时保留。')}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function uid(){return crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`}
function audio(){audioCtx??=new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume();return audioCtx}
function tone(freq=440,dur=.08,type='triangle',volume=.045,slide=0){if(muted)return;try{const a=audio(),o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(freq,a.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,freq+slide),a.currentTime+dur);g.gain.setValueAtTime(volume,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+dur);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+dur)}catch{}}
function noise(dur=.1,volume=.018){if(muted)return;try{const a=audio(),b=a.createBuffer(1,a.sampleRate*dur,a.sampleRate),data=b.getChannelData(0),src=a.createBufferSource(),g=a.createGain();for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);src.buffer=b;g.gain.setValueAtTime(volume,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+dur);src.connect(g);g.connect(a.destination);src.start()}catch{}}
function sfx(kind){if(muted)return;const table={bite:()=>{tone(520,.06,'square',.035,170);setTimeout(()=>tone(760,.07,'square',.025,80),55)},bomb:()=>{noise(.22,.06);tone(120,.32,'sawtooth',.05,-70)},portal:()=>{tone(180,.32,'sine',.05,700);setTimeout(()=>tone(660,.18,'triangle',.03,320),110)},evolve:()=>[440,554,659,880].forEach((f,i)=>setTimeout(()=>tone(f,.16,'square',.04,50),i*70)),card:()=>[330,494,659,988].forEach((f,i)=>setTimeout(()=>tone(f,.25,'sine',.05,80),i*115)),rare:()=>[440,554,659,880,1108,1318].forEach((f,i)=>setTimeout(()=>tone(f,.26,'triangle',.06,120),i*68))};table[kind]?.()}
function speak(text){if(muted||!voiceOn||!('speechSynthesis'in window))return;try{text=window.localizeSpeech?.(text)||text;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=gameLocale?.()==='de'?'de-DE':gameLocale?.()==='en'?'en-US':'zh-CN';u.rate=1.22;u.pitch=1.16;u.volume=.55;speechSynthesis.speak(u)}catch{}}
function startMusic(){if(muted||musicTimer||!session?.active)return;const bass=[55,55,65,55,73,65,55,49,55,55,65,73,82,73,65,49],lead=[0,330,392,494,0,392,330,262,0,330,392,523,494,392,330,262];musicTimer=setInterval(()=>{if(muted||!session?.active)return;const i=musicStep++%16;tone(bass[i],.15,'triangle',.019);if(lead[i])tone(lead[i],.105,'square',.016,24);if(i===3||i===7||i===11||i===15)noise(.022,.007)},170)}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}musicStep=0}
function pet(ctx,family=0,stage=0,variant=false,x=0,y=0,size=160,frame=0,morph=0,persona=null){drawPersonality(ctx,persona??[0,1,2][family],stage,variant,x,y,size,frame)}
function food(ctx,type,x,y,size=42){drawFood(ctx,type,x,y,size)}
function canvases(){document.querySelectorAll('canvas[data-pet]').forEach(c=>{const [f,s,v,m,p]=c.dataset.pet.split(',').map(Number);c.width=320;c.height=320;pet(c.getContext('2d'),f,s,!!v,0,0,320,0,m||0,p)});document.querySelectorAll('canvas[data-food]').forEach(c=>{c.width=32;c.height=32;food(c.getContext('2d'),+c.dataset.food,0,0,32)})}
function sprite(f=0,s=0,v=0,cls='',m=0,p=[0,1,2][f]){return `<canvas class="${cls}" data-pet="${f},${s},${v},${m},${p}" aria-label="${FAMILY[f].pet}像素宠物"></canvas>`}
function syncNav(){const p=player();$('#identity').textContent=p?`${p.name} · 换人 ↗`:'建立玩家身份 ↗';$('#nav-count').textContent=p?new Set(p.cards.map(collectibleKey)).size:0;$$('nav button').forEach(b=>b.classList.toggle('selected',b.dataset.view===view));document.documentElement.classList.toggle('reduced',reduced)}
function render(next='home'){if(session?.active&&next!=='game'){pause();if(!confirm('离开将结束本次挑战，不保存未完成的成绩。确定离开吗？'))return;session.active=false;cancelAnimationFrame(raf)}view=next;syncNav();if(view==='home')home();if(view==='collection')collection();if(view==='board')board();if(view==='result')result();canvases()}
function home(){const f=FAMILY[homeFamily];$('#content').innerHTML=`<section class="home-grid"><div class="intro"><span class="eyebrow">每一口，长出一点不一样。</span><h1>接住每一口，<br>养出你的<em>小怪兽。</em></h1><p>左右移动接食物、躲炸弹。<br>60 秒，穿过黑洞，看看它会长成什么样。</p><div class="tag-row"><span class="tag">单人 · 60 秒</span><span class="tag">3 次进化</span><span class="tag">每局一张收藏卡</span></div><button class="primary big" id="start">${player()?'开始我的挑战':'取个名字，开始挑战'} <span>↗</span></button><p class="hint">方向键 ← → / A D 移动 · 也可以用鼠标或触屏拖动</p>${chosen>=0?`<p class="notice">本局偏好：${FAMILY[chosen].cn} · 对应食物更常出现，难度与分数不变。</p>`:''}</div><div class="home-art"><div class="specimen-top"><span>初始伙伴 / 00${homeFamily+1}</span><b>等待第一口投喂</b></div>${sprite(homeFamily,0,0,'hero-pet')}<div class="specimen-name"><strong>${f.pet}</strong><small>${f.cn} / 等待与你相遇</small></div><div class="pet-select">${FAMILY.map((v,i)=>`<button class="pet-option ${i===homeFamily?'active':''}" data-preview="${i}">${sprite(i)}${v.cn}</button>`).join('')}</div></div></section><section class="steps"><div><b>01</b><span><strong>食物决定家族</strong><small>香蕉、蔬菜、肉与披萨，各有偏爱。</small></span></div><div><b>02</b><span><strong>进化带来惊喜</strong><small>吃得越多越大，也越要小心。</small></span></div><div><b>03</b><span><strong>把这一局收藏起来</strong><small>收集变种，挑战现场最高分。</small></span></div></section>`;$('#start').onclick=()=>requestStart();$$('[data-preview]').forEach(b=>b.onclick=()=>{homeFamily=+b.dataset.preview;home();canvases()})}
function openPlayerDialog(start=false){pendingStart=start;$('#nickname').value='';$('#profile-dialog').showModal();setTimeout(()=>$('#nickname').focus(),30)}
function requestStart(){if(!player()){openPlayerDialog(true);return}startGame()}
$('#profile-form').onsubmit=e=>{e.preventDefault();const name=$('#nickname').value.trim();if(!name){$('#nickname').setCustomValidity('请输入昵称');$('#nickname').reportValidity();return}let p=db.players.find(p=>p.name===name);if(!p){p={id:uid(),name,cards:[],best:0,bestCard:null};db.players.push(p)}db.current=p.id;save();$('#profile-dialog').close();if(pendingStart)startGame();else render('home')};$('#nickname').oninput=()=>$('#nickname').setCustomValidity('');$('#cancel-profile').onclick=()=>$('#profile-dialog').close();$('#identity').onclick=()=>{if(session?.active){pause();toast('请先结束本局，再更换玩家。');return}openPlayerDialog()};$$('nav button').forEach(b=>b.onclick=()=>render(b.dataset.view));$('.brand').onclick=e=>{e.preventDefault();render('home')};$('#close-card').onclick=()=>$('#card-dialog').close();$('#sound').onclick=()=>{muted=!muted;$('#sound').textContent=`音效与音乐：${muted?'关闭':'开启'}`;if(muted){stopMusic();if('speechSynthesis'in window)speechSynthesis.cancel()}else{tone(660,.08);startMusic()}};$('#voice').onclick=()=>{voiceOn=!voiceOn;$('#voice').textContent=`旁白：${voiceOn?'开启':'关闭'}`;if(!voiceOn&&'speechSynthesis'in window)speechSynthesis.cancel();else if(session?.active)speak('旁白已开启。')};$('#motion').onclick=()=>{reduced=!reduced;$('#motion').textContent=`动效：${reduced?'减少':'开启'}`;syncNav()};
let keys=new Set();window.addEventListener('keydown',e=>{if(view!=='game'||/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s','A','D','W','S',' '].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase());if(e.key==='Escape')pause()});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>{keys.clear();if(session?.active)pause()});document.addEventListener('visibilitychange',()=>{if(document.hidden&&session?.active)pause()});
function startGame(){cancelAnimationFrame(raf);keys.clear();view='game';syncNav();session={persona:chosen>=0?[0,1,2][chosen]:0,portalTrips:0,portalCooldown:0,portalFlash:0,ownerId:db.current,world:0,nextWorld:0,warp:0,elapsed:0,speed:125,x:380,y:350,targetX:380,targetY:350,types:Array(FOODS.length).fill(0),active:true,paused:false,countdown:3,time:60,items:[],particles:[],foods:[0,0,0],score:0,eaten:0,stage:0,hp:3,inv:0,spawn:0,last:0,family:chosen>=0?chosen:0,flash:0,combo:0,notice:'',noticeTime:0};$('#content').innerHTML=`<div class="section-heading"><div><span class="eyebrow">一分钟 / 你的进化时刻</span><h1>开饭了，${esc(player().name)}。</h1></div><button id="quit" class="ghost">结束试玩</button></div><div class="game-grid"><section><div class="game-hud"><div><small>剩余</small><span class="time" id="timer">60</span><small> 秒</small></div><span class="hearts" id="hearts">♥ ♥ ♥</span><div><small>积分</small><span class="points" id="score">0</span></div></div><div class="arena"><canvas id="game" width="760" height="480" aria-label="移动鼠标引导宠物接食物，避开炸弹"></canvas><div id="game-overlay" class="arena-overlay"><strong class="countdown">3</strong><span>移动鼠标飞行接食物，避开炸弹。</span></div></div><div class="arena-controls"><kbd>鼠标</kbd><span>宠物会跟随位置飞行 · 键盘 WASD / 方向键也可微调</span><button id="pause">暂停 Esc</button></div><div class="touch-controls"><button id="left" aria-label="向左移动">←</button><button id="right" aria-label="向右移动">→</button></div></section><aside class="side-panel"><h3>正在长大</h3><span class="stage-label" id="stage">初生体 · 第 0 / 3 次进化</span><div class="meter"><i id="growth" style="width:0%"></i></div><p id="growth-text">再吃 6 口，第一次进化。</p><hr><h3>这局吃了什么</h3>${FAMILY.map((f,i)=>`<div class="food-row"><canvas data-food="${i}"></canvas><span>${f.food}</span><b id="food-${i}">0</b></div>`).join('')}<hr><p>移动鼠标自由飞行，食物偏好会塑造外形。<br>食物越多样，越容易解锁不同性格。</p><p>飞进场景两端的黑洞可快速传送。<br>后半局掉落会更密、更快。</p></aside></div>`;canvases();startMusic();speak('移动鼠标，带宠物接住喜欢的食物。');$('#pause').onclick=pause;$('#quit').onclick=()=>{if(session.active){pause();if(confirm('提前结束并生成当前宠物卡？'))finish('early')}};
 const c=$('#game');c.onpointermove=e=>movePointer(e,c);c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);movePointer(e,c)};for(const [id,key] of [['left','arrowleft'],['right','arrowright']]){$('#'+id).onpointerdown=e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);keys.add(key)};$('#'+id).onpointerup=$('#'+id).onpointercancel=()=>keys.delete(key)}
 raf=requestAnimationFrame(loop);
}
function movePointer(e,c){if(!session||session.paused)return;const box=c.getBoundingClientRect();session.pointer={x:(e.clientX-box.left)/box.width*760,y:(e.clientY-box.top)/box.height*480}}
function pause(){if(!session?.active||session.paused)return;session.paused=true;keys.clear();delete session.pointer;stopMusic();$('#game-overlay').style.display='flex';$('#game-overlay').innerHTML='<strong>休息一口。</strong><p>时间已暂停，准备好再继续。</p><button class="primary" id="resume">继续挑战 →</button>';$('#resume').onclick=()=>{session.paused=false;session.last=0;$('#game-overlay').style.display='none';startMusic()}}
function spawnItem(g){
 const isBomb=Math.random()<.17,available=chosen>=0&&Math.random()<.52?FOODS.map((f,i)=>f.family===chosen?i:-1).filter(i=>i>=0):FOODS.map((f,i)=>f.family>=0?i:-1).filter(i=>i>=0);
 const type=isBomb?3:available[Math.floor(Math.random()*available.length)];
 let x=40+Math.random()*680;
 // Warning and spacing prevent simultaneous bomb walls.
 if(isBomb&&g.items.some(i=>i.type===3&&i.y<160&&Math.abs(i.x-x)<120))return;
 g.items.push({x,y:isBomb?-45:-30,type,speed:g.speed+(Math.random()-.5)*24,warn:isBomb?.65:0,spin:Math.random()*6,size:isBomb?56:44+Math.random()*20});
}
function burst(x,y,color){if(reduced)return;for(let i=0;i<12;i++)session.particles.push({x,y,vx:(Math.random()-.5)*180,vy:-Math.random()*160,life:.65,color})}
function loop(now){
 const g=session;if(!g?.active)return;const dt=Math.min(.04,g.last?(now-g.last)/1000:0);g.last=now;
 const c=$('#game'),ctx=c.getContext('2d');
 if(!g.paused){
  if(g.countdown>0){g.countdown-=dt;$('#game-overlay strong').textContent=Math.max(1,Math.ceil(g.countdown));if(g.countdown<=0){$('#game-overlay').style.display='none';tone(660,.15)}}
  else{
   g.time=Math.max(0,g.time-dt);g.elapsed=60-g.time;g.speed=125+g.elapsed*4.4+Math.pow(g.elapsed/60,2)*55;
   g.inv=Math.max(0,g.inv-dt);g.noticeTime-=dt;
   {
    const keyX=(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0),keyY=(keys.has('arrowdown')||keys.has('s')?1:0)-(keys.has('arrowup')||keys.has('w')?1:0);
    if(keyX||keyY){delete g.pointer;g.targetX=g.x+keyX*210;g.targetY=g.y+keyY*210}
    else if(g.pointer){g.targetX=g.pointer.x;g.targetY=g.pointer.y}
    const radius=22+g.stage*7;g.targetX=Math.max(radius+8,Math.min(752-radius,g.targetX));g.targetY=Math.max(radius+38,Math.min(445-radius,g.targetY));
    g.x+=(g.targetX-g.x)*Math.min(1,dt*8);g.y+=(g.targetY-g.y)*Math.min(1,dt*8);updatePortals(g,dt);g.spawn-=dt;
    if(g.spawn<=0){spawnItem(g);g.spawn=.60-g.elapsed*.0038}
    for(const item of g.items){
     if(item.warn>0){item.warn-=dt;continue}
     item.speed+=(g.speed-item.speed)*dt*2;const oldY=item.y;item.y+=item.speed*dt;
     
     
     item.x=Math.max(25,Math.min(735,item.x));
     if(Math.hypot(item.x-g.x,item.y-g.y)<radius+(item.size||50)*.34){
      item.dead=true;
      if(item.type===3){if(g.inv===0){g.hp--;g.inv=1.4;g.combo=0;burst(g.x,g.y,'#df9989');sfx('bomb');speak('小心炸弹！')}}
      else{const family=FOODS[item.type].family;g.foods[family]++;g.types[item.type]++;g.eaten++;g.combo++;g.score+=100+Math.min(5,Math.floor(g.combo/5))*10;g.family=g.foods.indexOf(Math.max(...g.foods));g.persona=dominantPersona(g.types,g.family);burst(item.x,item.y,FOODS[item.type].color);sfx('bite');
       const stage=LEVELS.reduce((s,n,i)=>g.eaten>=n?i:s,0);if(stage>g.stage){g.stage=stage;g.notice=personaById(g.persona).names[stage]+' · 进化！';g.noticeTime=2.5;sfx('evolve');speak(g.notice)}
      }
     }
     if(item.y>510){item.dead=true;if(item.type!==3)g.combo=0}
    }
    g.items=g.items.filter(i=>!i.dead);
   }
   g.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=400*dt;p.life-=dt});g.particles=g.particles.filter(p=>p.life>0);
   $('#timer').textContent=Math.ceil(g.time);$('#hearts').textContent='♥ '.repeat(g.hp)+'♡ '.repeat(3-g.hp);$('#score').textContent=g.score.toLocaleString();
   $('#stage').textContent=personaById(g.persona).names[g.stage]+' · 第 '+g.stage+' / 3 次进化';$('#growth').style.width=Math.min(100,g.eaten/27*100)+'%';
   $('#growth-text').textContent=g.stage<3?'再吃 '+(LEVELS[g.stage+1]-g.eaten)+' 口，下次进化。':'三次进化完成！继续挑战最高分。';
   g.foods.forEach((n,i)=>$('#food-'+i).textContent=n);
   if(g.hp<=0||g.time<=0){finish(g.hp<=0?'hit':'time');return}
  }
 }
 ctx.clearRect(0,0,760,480);drawWorld(ctx,g);drawPortals(ctx,g);
 for(const i of g.items){
  if(i.warn>0){ctx.fillStyle='#e39a8533';ctx.fillRect(i.x-22,0,44,90);ctx.fillStyle='#ffab95';ctx.font='bold 22px monospace';ctx.fillText('!',i.x-5,78)}
  else{food(ctx,i.type,i.x-(i.size||52)/2,i.y-(i.size||52)/2,i.size||52)}
 }
 g.particles.forEach(p=>{ctx.globalAlpha=p.life/.65;ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4)});ctx.globalAlpha=1;
 const size=[70,108,145,180][g.stage];
 if(!g.warp&&(g.inv===0||Math.floor(now/100)%2))pet(ctx,g.family,g.stage,false,g.x-size/2,g.y-size/2,size,Math.floor(now/2500)%4===0?1:0,0,g.persona);
 if(g.combo>=5&&!g.warp){ctx.fillStyle='#d4ef92';ctx.font='bold 15px sans-serif';ctx.textAlign='center';ctx.fillText(g.combo+' 连击',g.x,g.y-size);ctx.textAlign='left'}
 if(g.noticeTime>0&&!g.warp){ctx.fillStyle='#0d141bcc';ctx.fillRect(190,104,380,64);ctx.fillStyle=WORLDS[g.world].color;ctx.font='bold 23px sans-serif';ctx.textAlign='center';ctx.fillText(g.notice,380,132);ctx.font='13px sans-serif';ctx.fillText('食物改变身体，冒险留下印记。',380,155);ctx.textAlign='left'}
 raf=requestAnimationFrame(loop)
}
function finish(reason){
 const g=session;if(!g?.active)return;g.active=false;stopMusic();cancelAnimationFrame(raf);
 const p=db.players.find(p=>p.id===g.ownerId)||player(),family=g.family,variant=g.stage===3&&Math.random()<.25;
 const morph=g.stage>0?(g.types[4]+g.types[5]>=4?1:g.types[1]+g.types[2]>=4?2:g.world>=1?3:0):0,stage=variant?4:g.stage;
 const card={persona:variant?17+Math.floor(Math.random()*3):g.persona,portalTrips:g.portalTrips,id:uid(),family,stage:g.stage,variant,morph,key:family+'-'+stage,score:g.score,foods:[...g.foods],types:[...g.types],world:g.world,date:Date.now(),name:p.name,reason,completed:g.stage===3,seconds:Math.round(60-g.time)};
 p.cards.push(card);if(card.score>p.best||!p.bestCard){p.best=card.score;p.bestCard=card}
 card.key=collectibleKey(card);lastCard=card;save();render('result');window.scrollTo({top:0,behavior:'instant'});revealCard(card);
}
function cardName(c){return (c.variant?'星核·':'')+personaFor(c).names[c.stage]}
function cardMarkup(c){
 const rank=cardRank(c),f=FAMILY[c.family],p=personaFor(c);
 return `<div class="trading-card tier-${rank.toLowerCase()} ${c.variant?'rare':''}"><div class="card-inner"><div class="card-top"><span>NO. ${String(c.family*5+c.stage+(c.variant?2:1)).padStart(3,'0')}</span><span>${p.style} / ${c.variant?'SECRET RARE':'COLLECTIBLE'}</span></div><div class="card-stage"><span class="card-rank">${rank}</span><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>${sprite(c.family,c.stage,+c.variant,'card-art',cardMorph(c),personaFor(c).id)}<span class="card-edition">${c.variant?'ASTRAL SECRET RARE':'EVOLUTION COLLECTION'}</span></div><div class="card-title-row"><h2 class="card-name">${p.en}</h2><span class="rarity">${rank}</span></div><span class="card-sub">${['LITTLE BEGINNINGS','GROWING WILD','AWAKENED FORM','FINAL EVOLUTION'][c.stage]}</span><h3 class="card-cn-name">${cardName(c)}</h3><p class="card-lore">${petLore(c)}</p><div class="card-origin"><span>进化 ${c.stage} / 3</span><span>${p.style}</span><span>偏爱${FOODS[p.food].name}</span></div><div class="card-bottom"><span>${esc(c.name)}</span><span>SCORE ${c.score.toLocaleString()}</span></div></div></div>`;
}
function result(){if(!lastCard){home();return}const c=lastCard,f=FAMILY[c.family],p=player(),count=new Set(p.cards.filter(a=>personaFor(a).id===personaFor(c).id).map(collectibleKey)).size;$('#content').innerHTML=`<section class="result-grid">${cardMarkup(c)}<div class="result-copy"><span class="eyebrow">${c.variant?'遇见稀有变种':'你的宠物 / 你的故事'}</span><h1>${c.completed?'进化成功，认识一下':'这次相遇，也值得收藏'}<br>${cardName(c)}。</h1><p>${petLore(c)}</p><p class="hint">${c.reason==='hit'?'三颗心用完了，下次记得给炸弹让路。':c.reason==='early'?'本次试玩提前结束，已保留当前形态。':c.completed?'60 秒结束，三次进化全部完成！':'60 秒结束，再多接几口就能继续进化。'}<br>宠物卡已自动加入 ${esc(p.name)} 的本机收藏。</p><div class="stats"><div><small>本局积分 / 最高 ${p.best.toLocaleString()}</small><strong>${c.score.toLocaleString()}</strong></div><div><small>${personaFor(c).style}收集进度</small><strong>${count} / 5</strong></div></div><div class="actions"><button class="primary" id="same">继续收集${f.cn} →</button><button class="ghost" id="download">保存电子卡 ↓</button></div><div class="secondary-actions"><button class="text-button" id="other">探索其他家族</button><button class="text-button" id="rank-link">查看积分榜 ↗</button></div><p class="hint">稀有度不加分。每位玩家只展示单局最高成绩。</p></div></section>`;$('#same').onclick=()=>{chosen=c.family;requestStart()};$('#download').onclick=()=>downloadCard(c);$('#other').onclick=()=>{filter=-1;render('collection')};$('#rank-link').onclick=()=>render('board')}
function collection(){
 const p=player(),tiles=PERSONAS.filter(q=>filter===-1||filter===q.family).map(q=>{
  const key='p'+q.id,cards=p?.cards.filter(c=>collectibleKey(c)===key)||[],c=cards.at(-1);
  return `<button class="collection-tile ${c?'':'locked'} ${q.rare?'rare-tile':''}" data-key="${key}"><span class="tile-number">${q.style} / ${q.rare?'SSS':'NORMAL'}</span>${c?`<span class="badge">已获得 × ${cards.length}</span>`:''}${sprite(q.family,3,+q.rare,'',0,q.id)}<h3>${c?cardName(c):q.names[3]}</h3><p>${c?'点击查看收藏卡':q.rare?'终局进化时有概率从黑洞获得':'尚未发现 · 偏爱 '+FOODS[q.food].name}</p></button>`;
 }).join('');
 $('#content').innerHTML=`<div class="section-heading"><div><span class="eyebrow">20 张目标卡</span><h1>${p?esc(p.name)+' 的':'我的'}宠物图鉴</h1><p>17 张普通卡与 3 张独立 SSS 稀有卡。吃到最多的食物，决定这一局的最终形象。</p></div></div><div class="family-tabs"><button data-filter="-1" class="${filter===-1?'active':''}">全部风格</button>${FAMILY.map((f,i)=>`<button data-filter="${i}" class="${filter===i?'active':''}">${f.cn}</button>`).join('')}</div><div class="collection-grid">${tiles}</div><div class="actions"><button class="primary" id="collection-start">开始收集 →</button></div>`;
 $$('[data-filter]').forEach(b=>b.onclick=()=>{filter=+b.dataset.filter;render('collection')});$$('[data-key]').forEach(b=>b.onclick=()=>{const c=p?.cards.filter(c=>collectibleKey(c)===b.dataset.key).at(-1);if(c){$('#card-detail').innerHTML=cardMarkup(c);canvases();$('#card-dialog').showModal()}else toast('吃到最多的食物，会决定你的进化路线。')});$('#collection-start').onclick=()=>{chosen=filter;requestStart()}
}
function revealCard(c){
 const old=document.querySelector('.reveal-layer');if(old)old.remove();
 const layer=document.createElement('div');layer.className='reveal-layer tier-'+cardRank(c).toLowerCase();layer.innerHTML=`<div class="reveal-rays"></div><p class="reveal-heading">${c.variant?'星核异变 · SSS 降临':'你的饮食人格，觉醒了'}</p><div class="reveal-object"><div class="reveal-back">✦<small>一口进化</small></div><div class="reveal-front">${cardMarkup(c)}</div></div><p class="reveal-caption">${FOODS[personaFor(c).food].name} → ${personaFor(c).style} · ${cardName(c)}</p><button class="ghost reveal-skip">跳过动画</button>`;
 document.body.appendChild(layer);canvases();sfx(c.variant?'rare':'card');speak(c.variant?'星核异变，SSS 稀有卡降临。':cardName(c)+'，已经加入图鉴。');let timer;const close=()=>{clearTimeout(timer);layer.remove()};layer.querySelector('button').onclick=close;timer=setTimeout(close,reduced?1200:4700);
}
function board(){const rows=db.players.filter(p=>p.bestCard).sort((a,b)=>b.best-a.best||a.bestCard.date-b.bestCard.date);$('#content').innerHTML=`<div class="section-heading"><div><span class="eyebrow">大家的挑战，记在这里。</span><h1>现场挑战榜</h1><p>同一台电脑，一人一个最佳成绩。下一次进化，由你刷新纪录。</p></div><button class="primary" id="board-start">挑战一局 ↗</button></div><div class="board"><div class="board-row board-head"><span>排名</span><span>宠物</span><span>玩家 / 最佳搭档</span><span class="board-score">积分</span></div>${rows.length?rows.map((p,i)=>`<div class="board-row ${p.id===db.current?'me':''}"><span class="rank">${String(i+1).padStart(2,'0')}</span>${sprite(p.bestCard.family,p.bestCard.stage,+p.bestCard.variant,'',cardMorph(p.bestCard),personaFor(p.bestCard).id)}<div class="board-name">${esc(p.name)} ${p.id===db.current?'<span style="color:var(--lime);font-size:11px">你</span>':''}<small>${cardName(p.bestCard)} · ${FAMILY[p.bestCard.family].cn}</small></div><span class="board-score">${p.best.toLocaleString()}</span></div>`).join(''):'<div class="empty"><strong>第一名的位置，还空着。</strong>完成第一局挑战，你的宠物和成绩就会出现在这里。</div>'}</div><p class="hint">仅显示本机真实游戏成绩，无预置玩家。相同积分按首次达成时间排序。</p>`;$('#board-start').onclick=()=>requestStart()}
function downloadCard(c){
 const out=document.createElement('canvas');out.width=700;out.height=1000;const ctx=out.getContext('2d'),rank=cardRank(c),w=WORLDS[c.world||0];
 const foil=ctx.createLinearGradient(0,0,700,1000);['#a6ded7','#ded1a4','#b69be0','#749fa4','#f4d994'].forEach((v,i)=>foil.addColorStop(i/4,v));ctx.fillStyle=['B','A'].includes(rank)?'#76818d':foil;ctx.fillRect(0,0,700,1000);ctx.fillStyle='#181e2b';ctx.fillRect(12,12,676,976);
 ctx.strokeStyle='#b9cdb580';ctx.strokeRect(25,25,650,950);ctx.fillStyle='#c5d5d0';ctx.font='18px monospace';ctx.fillText('NO. '+String(c.family*5+c.stage+(c.variant?2:1)).padStart(3,'0'),45,64);ctx.textAlign='right';ctx.fillText(personaFor(c).style,650,64);ctx.textAlign='left';
 const glow=ctx.createRadialGradient(350,310,15,350,310,260);glow.addColorStop(0,c.variant?'#765393':'#32444c');glow.addColorStop(1,'#181e2b');ctx.fillStyle=glow;ctx.fillRect(35,82,630,435);
 ctx.strokeStyle=c.variant?'#e2d19d':'#8caebb';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(350,315,175+i*25,75+i*16,-.5+i*.5,0,Math.PI*2);ctx.stroke()}
 ctx.fillStyle='#f6df9b';ctx.font='bold 72px monospace';ctx.fillText(rank,48,154);
 pet(ctx,c.family,c.stage,c.variant,175,158,350,0,cardMorph(c),personaFor(c).id);
 ctx.fillStyle='#e5dcab';ctx.font='15px monospace';ctx.textAlign='center';ctx.fillText(c.variant?'ASTRAL SECRET RARE':'EVOLUTION COLLECTION',350,540);ctx.textAlign='left';
 ctx.fillStyle='#f1f1de';ctx.font='bold 48px monospace';ctx.font='bold 40px monospace';ctx.fillText(personaFor(c).en,45,605);ctx.font='bold 25px sans-serif';ctx.fillText(cardName(c),45,649);
 ctx.font='21px sans-serif';ctx.fillStyle='#b9c9cd';let line='',y=699;for(const ch of petLore(c)){if(ctx.measureText(line+ch).width>595){ctx.fillText(line,48,y);line='';y+=33}line+=ch}ctx.fillText(line,48,y);
 ctx.strokeStyle='#51606a';ctx.beginPath();ctx.moveTo(45,825);ctx.lineTo(655,825);ctx.stroke();ctx.fillStyle='#bfcfae';ctx.font='19px sans-serif';ctx.fillText('进化 '+c.stage+' / 3 · 偏爱'+FOODS[personaFor(c).food].name,48,862);ctx.fillText('养育者：'+c.name,48,902);ctx.textAlign='right';ctx.font='bold 25px monospace';ctx.fillStyle='#f1e2b2';ctx.fillText('SCORE '+c.score.toLocaleString(),651,902);ctx.textAlign='left';ctx.font='14px monospace';ctx.fillStyle='#8e9eab';ctx.fillText('ONE BITE / EVERY JOURNEY LEAVES A MARK',48,951);
 const a=document.createElement('a');a.download=FAMILY[c.family].en+'-'+rank+'-'+c.score+'.png';a.href=out.toDataURL('image/png');a.click();toast('含宠物介绍的收藏卡已生成，正在下载。')
}
render();
