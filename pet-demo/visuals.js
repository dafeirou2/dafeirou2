// All artwork stays on a low-resolution pixel grid, then scales with hard edges.
const FOODS = [
 {name:'苹果',family:0,persona:0,color:'#f97967'}, {name:'鸡腿',family:1,persona:1,color:'#da996a'},
 {name:'披萨',family:2,persona:2,color:'#ffd16b'}, {name:'炸弹',family:-1,persona:-1,color:'#ed827f'},
 {name:'香蕉',family:0,persona:4,color:'#ffe46b'}, {name:'西兰花',family:0,persona:5,color:'#8ad76e'},
 {name:'鲜鱼',family:1,persona:6,color:'#91ddeb'}, {name:'牛油果',family:0,persona:0,color:'#93c77f'},
 {name:'葡萄',family:0,persona:4,color:'#b58cde'}, {name:'寿司',family:1,persona:6,color:'#efb1b5'},
 {name:'甜甜圈',family:2,persona:2,color:'#f5a9bb'}, {name:'塔可',family:1,persona:1,color:'#e3bd65'},
 {name:'冰淇淋',family:2,persona:2,color:'#b9daf1'}, {name:'胡萝卜',family:0,persona:0,color:'#eea565'},
 {name:'汉堡',family:1,persona:1,color:'#d68b56'}, {name:'草莓',family:0,persona:0,color:'#f16d76'},
 {name:'拉面',family:1,persona:6,color:'#f3ca83'}, {name:'可颂',family:2,persona:2,color:'#dfa55d'},
 {name:'樱桃',family:0,persona:4,color:'#ef777b'}, {name:'章鱼烧',family:1,persona:6,color:'#d6a46d'},
 {name:'爆米花',family:2,persona:2,color:'#ffe5a0'}, {name:'蘑菇',family:0,persona:5,color:'#d67e69'},
 {name:'奶酪',family:2,persona:2,color:'#f1d95c'}, {name:'蓝莓',family:0,persona:5,color:'#8584cb'}
];
const WORLDS = [
 {name:'浮岛花园',en:'SKY GARDEN',sub:'在树冠之间，接住第一口。',color:'#acd999',bg:'#122c2b',bottom:'#36514a',effect:'浮岛起伏'},
 {name:'水晶裂谷',en:'CRYSTAL RIFT',sub:'横风会轻轻推走食物。',color:'#b7b0ff',bg:'#191c3b',bottom:'#37376a',effect:'横风漂移'},
 {name:'星环深空',en:'ORBITAL VOID',sub:'沿着星环，追上最后一次进化。',color:'#ffcb87',bg:'#18172d',bottom:'#403445',effect:'轨道摇摆'}
];
const FORMS = [['栗栗','叶耳栗','蓬尾灵狐','森冠灵狐'],['石豆','甲壳石豆','翼甲幼龙','穹翼岩龙'],['糯米','月耳团','浮游团灵','星纱月灵']];
function drawPet(ctx,family=0,stage=0,variant=false,x=0,y=0,size=160,frame=0,morph=0){
 const f=FAMILY[family], r=(a,b,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(a,b,w,h)},d='#302f34',b=f.color,l=f.light,a=f.accent;
 ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(size/48,size/48);ctx.imageSmoothingEnabled=false;
 const poly=(points,color)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.fill()};
 const face=(fx,fy,fw=14)=>{r(fx,fy,fw,9,'#f0dfba');r(fx+2,fy+3,2,frame===1?1:3,d);r(fx+fw-4,fy+3,2,frame===1?1:3,d);r(fx+1,fy+7,2,1,'#c68e78');r(fx+fw-3,fy+7,2,1,'#c68e78')};
 if(family===0){
  // Seed → leaf-eared seed → squirrel/fox silhouette → crowned fox with branching tail.
  if(stage>=2){poly([[28,34],[35,34],[35,27],[39,27],[39,15],[36,15],[36,8],[41,8],[41,13],[45,13],[45,33],[41,33],[41,38],[29,38]],d);poly([[31,33],[38,33],[38,26],[41,26],[41,15],[43,15],[43,31],[39,31],[39,35],[31,35]],a);r(38,12,3,10,l);if(stage===3){r(33,4,4,8,a);r(29,6,5,4,a);r(41,3,3,8,a)}}
  const top=stage<2?16:14;poly([[11,top],[29,top],[29,top+3],[33,top+3],[33,36],[29,36],[29,40],[11,40],[11,37],[7,37],[7,top+4],[11,top+4]],d);r(11,top+2,18,20,b);r(9,top+5,22,14,b);r(12,top+2,15,3,l);face(13,top+7);
  if(stage>=1){poly([[10,top+3],[8,5],[12,5],[17,top]],d);poly([[27,top],[31,5],[35,5],[31,top+5]],d);r(11,8,3,8,a);r(29,8,3,8,a)}else{r(20,9,2,7,d);r(16,8,5,3,a);r(22,5,5,5,a)}
  r(10,39,6,4,d);r(26,39,6,4,d);r(10,39,4,2,b);r(26,39,4,2,b);r(5,29,5,6,b);
  if(stage===3){r(17,10,12,3,'#d7bf79');r(17,7,3,4,'#d7bf79');r(22,5,3,6,'#d7bf79');r(26,7,3,4,'#d7bf79')}
 }else if(family===1){
  if(stage>=2){poly([[15,23],[8,18],[8,7],[5,7],[2,13],[1,28],[8,27],[8,31],[16,29]],d);poly([[32,23],[38,17],[38,7],[41,7],[46,14],[47,29],[40,27],[40,32],[31,29]],d);poly([[12,24],[6,21],[4,16],[4,24],[10,26]],'#9abec1');poly([[35,24],[40,15],[44,24],[39,26]],'#9abec1');if(stage===3){r(2,9,2,6,a);r(43,9,2,7,a)}}
  poly([[15,13],[31,13],[31,17],[35,17],[35,35],[31,35],[31,40],[16,40],[16,37],[12,37],[12,18],[15,18]],d);r(16,15,15,23,b);r(14,20,19,13,b);r(17,16,12,3,l);face(17,20,14);r(21,32,8,5,l);
  r(14,8,4,8,d);r(28,7,4,8,d);r(15,8,2,6,a);r(29,7,2,6,a);r(15,39,6,4,d);r(29,38,6,5,d);r(15,39,4,2,b);r(30,39,3,2,b);
  if(stage>=1){poly([[32,33],[39,33],[39,29],[42,29],[42,36],[38,36],[38,39],[31,39]],d);r(33,34,6,3,b);r(39,30,2,5,b);r(12,23,3,8,a);r(31,22,3,8,a)}
  if(stage===3){r(19,10,3,5,a);r(24,8,3,7,a);r(19,33,12,2,a)}
 }else{
  if(stage>=1){poly([[14,20],[10,17],[10,7],[14,7],[18,15],[18,21]],d);poly([[29,19],[33,6],[38,6],[37,17],[33,22]],d);r(12,9,2,7,l);r(34,8,2,9,l)}
  const lift=stage>=2?3:0;poly([[14,18-lift],[31,18-lift],[31,21-lift],[35,21-lift],[35,34-lift],[31,34-lift],[31,37-lift],[14,37-lift],[14,34-lift],[10,34-lift],[10,22-lift],[14,22-lift]],d);r(14,20-lift,17,15,b);r(12,24-lift,21,9,b);r(16,20-lift,11,3,l);face(16,24-lift,14);
  if(stage<2){r(12,35,5,4,b);r(29,35,5,4,b)}else{poly([[13,32],[32,32],[36,42],[29,40],[25,45],[21,41],[16,43],[11,41]],b);r(19,35,9,3,l);r(5,26,4,6,l);r(39,25,4,6,l)}
  if(stage===3){r(9,2,26,2,a);r(7,4,2,4,a);r(35,4,2,4,a);r(10,8,24,1,a);r(4,34,3,3,a);r(40,35,3,3,a)}
 }
 // A collected card is an actual morphological variant, not a hue swap.
 if(morph===1){for(const [px,py] of [[5,13],[38,12],[34,39]]){r(px,py,2,6,'#a4d182');r(px-2,py+2,6,2,'#a4d182')}}
 if(morph===2){r(19,12,9,2,'#f1d68c');r(21,8,2,6,'#f1d68c');r(26,9,2,5,'#f1d68c');r(33,33,5,2,'#f1d68c')}
 if(morph===3){r(3,20,4,8,'#cad3f0');r(40,19,4,8,'#cad3f0');r(1,24,3,3,'#a7b3da');r(44,23,3,3,'#a7b3da')}
 if(variant){r(15,0,18,1,'#fff0af');r(12,2,3,1,'#fff0af');r(33,2,3,1,'#fff0af');r(2,5,2,6,'#d6d9ff');r(0,7,6,2,'#d6d9ff');r(42,1,2,6,'#d6d9ff');r(40,3,6,2,'#d6d9ff')}
 ctx.restore();
}
function drawFood(ctx,type,x,y,size=42){
 ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(size/24,size/24);const r=(a,b,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(a,b,w,h)},p=(pts,c)=>{ctx.fillStyle=c;ctx.beginPath();pts.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();ctx.fill()};
 if(type===0){r(11,1,2,5,'#73552f');r(14,1,5,3,'#8ce07b');p([[5,6],[10,5],[12,7],[16,5],[21,8],[21,17],[17,22],[7,22],[3,17],[3,9]],'#642f36');p([[5,8],[10,7],[12,9],[17,7],[19,9],[19,17],[16,20],[7,20],[5,16]],'#f47169');r(7,9,3,6,'#ffb1a0')}
 if(type===1){p([[4,2],[13,2],[18,6],[18,13],[12,18],[6,17],[1,12],[1,6]],'#664232');p([[5,4],[12,4],[16,7],[16,12],[11,16],[6,15],[3,11],[3,7]],'#d9985b');r(5,6,6,3,'#f4c68c');p([[14,14],[16,12],[20,17],[22,17],[24,20],[21,23],[18,22],[18,20]],'#fff1d5');r(8,12,3,2,'#a9613a')}
 if(type===2){p([[2,4],[22,4],[12,23]],'#95552e');p([[4,6],[20,6],[12,20]],'#ffe177');r(2,2,20,4,'#d49655');r(4,2,16,2,'#f6c384');r(7,7,4,4,'#e76957');r(13,11,4,4,'#e76957');r(10,16,3,2,'#a95846');r(15,7,2,2,'#79a25d');r(7,12,2,2,'#79a25d')}
 if(type===3){r(10,3,7,4,'#8d7982');r(16,1,4,3,'#e4c796');r(21,0,2,4,'#ff9a68');p([[7,6],[17,6],[22,11],[22,18],[17,23],[7,23],[2,18],[2,11]],'#181b29');r(5,10,3,5,'#6c7790');r(10,12,6,2,'#ff8f83');r(12,10,2,6,'#ff8f83')}
 if(type===4){p([[2,3],[6,3],[6,10],[10,15],[16,16],[22,12],[22,18],[17,22],[10,22],[5,18],[2,12]],'#947136');p([[3,4],[5,4],[5,11],[10,17],[16,18],[21,14],[20,18],[16,20],[10,20],[6,17],[3,11]],'#ffe267');r(8,15,3,3,'#fff5ad');r(2,2,4,2,'#705441');r(20,11,3,3,'#705441')}
 if(type===5){p([[10,12],[15,12],[15,20],[18,22],[7,22],[10,18]],'#aace6d');r(4,8,6,7,'#4b955d');r(9,3,9,11,'#61bc6d');r(16,7,7,8,'#438858');r(1,6,8,7,'#69c978');r(7,1,9,7,'#8add83');r(15,4,7,5,'#78ce76');r(11,16,2,5,'#def2a0')}
 if(type===6){p([[1,11],[6,6],[15,6],[18,9],[24,5],[24,20],[18,16],[14,19],[6,18]],'#56828d');p([[3,12],[7,8],[15,8],[19,12],[15,17],[7,16]],'#9fdfdd');r(7,8,8,2,'#daf4e7');r(5,11,2,2,'#273946');r(11,3,5,3,'#86b6c3');r(12,18,4,3,'#86b6c3');r(21,9,2,7,'#b5dfd7')}
 ctx.restore();
}
function groundAt(world,x,t=0){return world===0?405+Math.sin(x/100)*12:world===1?389+Math.sin(x/96)*25:368+Math.pow((x-380)/380,2)*54+Math.sin(t*.9)*5}
function drawWorld(ctx,g){
 const w=WORLDS[g.world],t=g.elapsed||0;ctx.fillStyle=w.bg;ctx.fillRect(0,0,760,480);
 const rect=(x,y,a,b,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),a,b)};
 for(let i=0;i<46;i++){const x=(i*163+Math.sin(t*.15+i)*10)%760,y=(i*79)%360;rect(x,y,i%5===0?3:1,i%5===0?3:1,g.world===0?'#82b38b45':'#d7d3ef65')}
 if(g.world===0){for(let i=0;i<6;i++){const x=i*160-40,y=100+Math.sin(i*5)*48;rect(x,y,85,7,'#87a59725');rect(x+14,y-6,48,7,'#87a59725');rect(x+40,y+95,75,12,'#47625b');rect(x+49,y+107,57,18,'#29413d');rect(x+65,y+125,27,16,'#233834');rect(x+39,y+92,77,5,'#799775');rect(x+72,y+76,5,17,'#5e7954');rect(x+65,y+72,20,8,'#92ad77')}}
 if(g.world===1){for(let i=0;i<9;i++){const x=i*100+10,y=100+i%3*45;ctx.fillStyle=i%2?'#60518455':'#4b719955';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+19,y+50);ctx.lineTo(x+10,y+115);ctx.lineTo(x-15,y+50);ctx.closePath();ctx.fill();rect(x,y+9,2,76,'#acb6ec44')}}
 if(g.world===2){ctx.strokeStyle='#caa1e72f';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(580,120,95,29,-.4,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#827087';ctx.beginPath();ctx.arc(580,120,42,0,Math.PI*2);ctx.fill();rect(556,109,48,8,'#a88e9a');rect(563,135,31,5,'#6b5974');ctx.strokeStyle='#dec69e65';ctx.beginPath();ctx.ellipse(580,120,95,29,-.4,0,Math.PI);ctx.stroke()}
 // Separate hovering stepping-stones replace the old flat ground.
 for(let x=0;x<760;x+=40){const y=groundAt(g.world,x+20,t)+32;rect(x+2,y,36,5,w.color);rect(x+5,y+5,30,g.world===2?6:14,w.bottom);if(g.world!==2)rect(x+10,y+19,20,9,'#101925');if(g.world===2)rect(x+14,y+13,12,2,'#ffcb8744')}
 ctx.fillStyle='#0d141abf';ctx.fillRect(16,14,240,46);ctx.fillStyle=w.color;ctx.font='bold 15px sans-serif';ctx.fillText(uiText('arenaTitle'),30,34);ctx.font='11px sans-serif';ctx.fillStyle='#d5ddd7';ctx.fillText(`${uiText('arenaSpeed')}${(g.speed/125).toFixed(1)}`,30,51);
 ctx.textAlign='right';ctx.fillStyle='#cbbdf0';ctx.fillText(g.portalCooldown>0?uiText('portalBusy'):uiText('portalReady'),740,30);ctx.textAlign='left';
}
function drawPortal(ctx,g){const p=1-g.warp/1.8;ctx.save();ctx.fillStyle=`rgba(8,5,20,${.55+Math.sin(p*Math.PI)*.25})`;ctx.fillRect(0,0,760,480);ctx.translate(380,238);const radius=30+Math.sin(p*Math.PI)*210;
 for(let i=0;i<9;i++){ctx.strokeStyle=`hsla(${245+i*12},85%,${50+i*4}%,${.8-i*.06})`;ctx.lineWidth=2+i*.35;ctx.beginPath();ctx.ellipse(0,0,radius+i*8,(radius+i*8)*.42,p*5+i*.16,0,Math.PI*2);ctx.stroke()}
 ctx.fillStyle='#050510';ctx.beginPath();ctx.arc(0,0,radius*.56,0,Math.PI*2);ctx.fill();const s=Math.max(12,90*(1-p));drawPet(ctx,g.family,g.stage,false,-s/2+Math.cos(p*10)*40*(1-p),-s/2,s,0);ctx.restore();ctx.fillStyle='#f0e4ff';ctx.textAlign='center';ctx.font='bold 24px sans-serif';ctx.fillText(`穿越黑洞 · ${WORLDS[g.nextWorld].name}`,380,390);ctx.font='14px sans-serif';ctx.fillText(WORLDS[g.nextWorld].sub,380,419);ctx.textAlign='left'}
function cardRank(c){return c.variant?'SSS':['B','A','S','SS'][c.stage]}
function cardMorph(c){return c.morph||0}
function petLore(c){const stories=[['把第一口果香藏在叶芽里，正等着下一场冒险。','叶耳能听见成熟果实落下的声音。','蓬松尾巴储存了整个花园的阳光。','长出了枝叶王冠，用蓬尾为迷路的小伙伴指路。'],['抱着一块小石头，以为它是一颗还没孵化的蛋。','把吃下的能量变成背上的护甲。','第一次张开岩翼，飞得不高，却从不放弃。','岩翼能跨越裂谷，坚硬甲壳下仍是一颗温柔的心。'],['每吃一口，肚子里就亮起一颗小星星。','月耳会随着香味摆动，藏不住想吃的心情。','轻得可以飘起来，喜欢跟着披萨的香气旅行。','星纱化成披风，在没有重力的地方照顾每一个伙伴。']];const additions=['','果蔬让它长出了护身叶簇。','丰盛的食物凝成了能量额冠。','穿越留下了两片悬浮晶翼。'];return stories[c.family][c.stage]+additions[cardMorph(c)]+(c.variant?'黑洞赐予它罕见的星环形态。':'')}
