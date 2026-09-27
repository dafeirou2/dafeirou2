const PERSONAS = [
 {id:0,family:0,food:0,name:'苹果抱抱兔',en:'APPLE BUN',style:'治愈系',tag:'把可爱吃出来',color:'#f2b6ae',names:['小果团','垂耳苹果兔','云朵抱抱兔','巨绒苹果兔'],lore:'苹果、牛油果和胡萝卜会让耳朵都变甜。最大的烦恼：别人总想把它当抱枕。特长是用巨大绒毛把坏心情挤出去。'},
 {id:1,family:1,food:1,name:'炸鸡暴走熊',en:'CRUNCH RIOT',style:'朋克系',tag:'蛋白质与摇滚',color:'#f49b69',names:['小肉丸','刺头小熊','机车暴走熊','重装摇滚熊'],lore:'鸡腿从不分你，耳机可以分一只。满身肌肉不是为了打架，是为了一次抱走整桶炸鸡。'},
 {id:2,family:2,food:2,name:'芝士机甲喵',en:'CHEESE ZERO',style:'二次元系',tag:'芝士就是反应堆',color:'#d6bbff',names:['芝士球','见习机甲喵','双翼机甲喵','终式芝士机神'],lore:'相信披萨的第八片藏着变身密码。披风是拉丝芝士，机甲靠热量充能——请不要切断它的夜宵。'},
 {id:4,family:0,food:4,name:'香蕉冲浪猴',en:'BANANA WAVE',style:'街头系',tag:'快乐不需要刹车',color:'#f5d373',names:['小蕉球','卷尾小猴','长臂冲浪猴','巨尾街头猴王'],lore:'吃香蕉补充的不是能量，是多余的自信。尾巴兼任滑板，路过每个黑洞都觉得自己帅炸了。'},
 {id:5,family:0,food:5,name:'西兰花博士',en:'BROCCOLI IQ',style:'眼镜学者系',tag:'脑袋比饭量还大',color:'#a4cf87',names:['菜菜球','圆镜小鸮','书翼猫头鹰','巨脑森林博士'],lore:'每天三份西兰花，坚持相信智商可以嚼出来。头越来越大，眼镜越来越厚，但还是算不清外卖满减。'},
 {id:6,family:1,food:6,name:'鱼鱼星海灵',en:'TIDAL DREAM',style:'幻想系',tag:'把晚餐吃成银河',color:'#86d4e3',names:['小鱼泡','鳍耳幼灵','长尾星海灵','六鳍银河游龙'],lore:'鲜鱼吃多了，连梦都自带海浪声。长出六片星鳍之后，正式宣布：所有水族箱都是它的分公司。'},
 {id:3,family:1,food:9,name:'寿司柴犬',en:'SUSHI SHIBA',style:'日系',tag:'饭团能量',color:'#f0b37d',names:['寿司团','饭团柴','寿司武士','究极寿司将军'],lore:'对寿司的虔诚，让它把尾巴卷成了饭团。'},
 {id:7,family:0,food:7,name:'牛油果龟',en:'AVO TURTLE',style:'自然系',tag:'慢慢变强',color:'#93c77f',names:['果核龟','青壳龟','森甲陆龟','古树巨龟'],lore:'走得慢，却永远不会错过下一口牛油果。'},
 {id:8,family:0,food:8,name:'葡萄蝙蝠',en:'GRAPE BAT',style:'暗夜系',tag:'夜行动物',color:'#a789d3',names:['葡萄球','小翼蝠','紫晶夜蝠','月影蝠王'],lore:'白天睡觉，晚上偷偷把葡萄串当耳环。'},
 {id:9,family:2,food:10,name:'甜甜圈羊',en:'DONUT RAM',style:'甜酷系',tag:'糖分冲刺',color:'#f3a5bb',names:['糖圈团','卷角羊','霜糖公羊','彩虹羊王'],lore:'角不是武器，是两枚永远吃不完的甜甜圈。'},
 {id:10,family:1,food:11,name:'塔可狐',en:'TACO FOX',style:'街头系',tag:'脆皮侦探',color:'#dfac65',names:['小脆狐','塔可狐','火椒灵狐','辣焰九尾'],lore:'耳朵能听见三条街外塔可皮碎裂的声音。'},
 {id:11,family:2,food:12,name:'冰淇淋企鹅',en:'GELATO PENGUIN',style:'清凉系',tag:'零度飞行',color:'#aad7ed',names:['雪团啾','小企鹅','冰冠企鹅','极光帝企鹅'],lore:'每次打滑都说自己是在排练滑冰。'},
 {id:12,family:0,food:13,name:'胡萝卜鹿',en:'CARROT DEER',style:'森林系',tag:'跃过烦恼',color:'#e8a466',names:['芽芽鹿','胡萝卜鹿','角枝奔鹿','森野鹿王'],lore:'鹿角会跟着胡萝卜的甜味开花。'},
 {id:13,family:1,food:14,name:'汉堡狗',en:'BURGER HOUND',style:'美式',tag:'双层热情',color:'#d68757',names:['面包狗','肉饼犬','双层猎犬','巨无霸犬王'],lore:'闻到汉堡就会自动开启飞奔模式。'},
 {id:14,family:0,food:15,name:'草莓蛙',en:'BERRY FROG',style:'俏皮系',tag:'粉红跳跃',color:'#ef7981',names:['莓莓蛙','草莓蛙','荷叶跳蛙','莓果蛙王'],lore:'跳得越高，脸颊上的草莓籽越亮。'},
 {id:15,family:1,food:16,name:'拉面蛇',en:'RAMEN SERPENT',style:'和风',tag:'热汤盘旋',color:'#e6bd75',names:['面条蛇','拉面蛇','汤纹灵蛇','龙汤长蛇'],lore:'自称是面条，其实只是很怕冷。'},
 {id:16,family:2,food:17,name:'可颂龙猫',en:'CROISSANT CAT',style:'慵懒系',tag:'黄油午睡',color:'#e8b96d',names:['酥皮猫','可颂猫','月牙龙猫','黄油猫神'],lore:'蓬松的尾巴像一块刚出炉的可颂。'},
 {id:17,family:2,food:20,name:'星爆爆米花龙',en:'POPSTAR WYRM',style:'稀有 / 霓虹',tag:'SSS 星爆异变',color:'#ffd878',names:['星爆龙','星爆龙','星爆龙','星爆龙'],lore:'黑洞将一粒爆米花压缩成了会唱歌的小龙。',rare:true},
 {id:18,family:1,food:19,name:'黑洞章鱼王',en:'VOID OCTO',style:'稀有 / 虚空',tag:'SSS 黑洞异变',color:'#ad9aed',names:['虚空章鱼','虚空章鱼','虚空章鱼','虚空章鱼'],lore:'触手摸到哪里，哪里就会变成舞台。',rare:true},
 {id:19,family:0,food:23,name:'极光蓝莓九尾',en:'AURORA NINE',style:'稀有 / 极光',tag:'SSS 极光异变',color:'#87a8f5',names:['极光九尾','极光九尾','极光九尾','极光九尾'],lore:'尾巴扫过夜空时，会留下蓝莓色的极光。',rare:true}
];
const personaById=id=>PERSONAS.find(p=>p.id===Number(id))||PERSONAS[0];
function dominantPersona(types,family=0){if(!types||!types.some(n=>n>0))return [0,1,2][family]||0;return PERSONAS.reduce((best,p)=>{const score=FOODS.reduce((n,f,i)=>n+(f.persona===p.id?(types[i]||0):0),0),bestScore=FOODS.reduce((n,f,i)=>n+(f.persona===best.id?(types[i]||0):0),0);return score>bestScore?p:best},PERSONAS[0]).id}
function personaFor(c){return personaById(c.persona??dominantPersona(c.types,c.family))}
function collectibleKey(c){return 'p'+personaFor(c).id}
function petLore(c){const p=personaFor(c),n=c.types?.[p.food]||0;return (n?'本局吃了 '+n+' 份'+FOODS[p.food].name+'。':'最爱'+FOODS[p.food].name+'。')+p.lore+(c.variant?'稀有异变：星核觉醒，连出场都要自带灯光。':'')}
function drawFood(ctx,type,x,y,size=48){ctx.save();ctx.font=size+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='#0009';ctx.shadowBlur=3;ctx.shadowOffsetY=2;ctx.fillText(['🍎','🍗','🍕','💣','🍌','🥦','🐟','🥑','🍇','🍣','🍩','🌮','🍦','🥕','🍔','🍓','🍜','🥐','🍒','🐙','🍿','🍄','🧀','🫐'][type],x+size/2,y+size/2+size*.035);ctx.restore()}
function drawPersonality(ctx,id,stage,rare,x,y,size,blink=0){
 const p=personaById(id),d='#272a35',light='#f4e9cd';ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(size/64,size/64);ctx.imageSmoothingEnabled=false;
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)},poly=(pts,c)=>{ctx.fillStyle=c;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill()},eye=(x,y)=>{r(x,y,3,blink===1?1:4,d);if(blink!==1)r(x,y,1,1,'#fff')};
 // Each path has a different anatomy, not a common body with different accessories.
 if(stage===0){r(23,24,18,3,d);r(19,27,26,20,d);r(23,47,18,4,d);r(22,28,20,18,p.color);r(25,30,14,10,light);eye(27,33);eye(34,33);r(21,49,6,3,p.color);r(37,49,6,3,p.color);ctx.restore();return}
 if(id>=7){
  // Thirteen additional collectible silhouettes: turtle, bat, ram, fox, penguin, deer, hound, frog, serpent, cat, and three rare creatures.
  const kind=id-7, wide=stage>=2?5:0; r(18-wide,25,28+wide*2,26,d);r(21-wide,27,22+wide*2,20,p.color);eye(26,34);eye(37,34);r(30,41,5,2,light);
  if(kind===0){r(14,19,36,14,d);r(16,20,32,12,'#587b64');r(22,22,20,8,p.color);r(9,33,9,9,p.color);r(47,33,9,9,p.color);r(13,48,8,8,p.color);r(45,48,8,8,p.color)}
  else if(kind===1){poly([[18,28],[4,13],[7,8],[25,22]],d);poly([[44,28],[59,12],[61,17],[39,27]],d);poly([[18,28],[7,13],[11,12],[25,24]],p.color);poly([[44,28],[57,15],[57,19],[39,25]],p.color);r(24,14,5,12,p.color);r(36,14,5,12,p.color)}
  else if(kind===2){r(16,12,8,18,d);r(40,12,8,18,d);r(18,13,5,15,p.color);r(41,13,5,15,p.color);r(18,49,9,10,p.color);r(39,49,9,10,p.color)}
  else if(kind===3){poly([[18,27],[8,7],[16,9],[25,24]],d);poly([[40,26],[49,7],[56,9],[45,28]],d);r(12,10,8,13,p.color);r(46,10,8,13,p.color);poly([[43,40],[61,35],[56,47],[43,48]],p.color)}
  else if(kind===4){r(22,8,18,19,d);r(24,10,14,15,'#e9f2ef');r(27,15,3,3,d);r(35,15,3,3,d);r(18,49,10,10,p.color);r(37,49,10,10,p.color);r(17,25,5,22,d);r(42,25,5,22,d)}
  else if(kind===5){poly([[21,27],[13,5],[20,9],[29,23]],d);poly([[39,26],[48,5],[53,9],[44,28]],d);r(16,8,7,17,p.color);r(46,8,6,17,p.color);r(14,47,11,12,p.color);r(41,47,11,12,p.color)}
  else if(kind===6){r(15,13,10,12,d);r(41,13,10,12,d);r(17,15,7,8,p.color);r(42,15,7,8,p.color);r(9,35,10,13,p.color);r(46,35,10,13,p.color);r(16,50,10,8,p.color);r(39,50,10,8,p.color)}
  else if(kind===7){r(16,20,32,25,p.color);r(12,38,8,12,p.color);r(44,38,8,12,p.color);r(22,11,7,12,p.color);r(36,11,7,12,p.color);r(11,48,11,7,'#7eb67c');r(43,48,11,7,'#7eb67c')}
  else if(kind===8){poly([[31,20],[12,8],[7,15],[21,29],[8,43],[17,47],[27,35],[35,53],[42,51],[39,35],[57,45],[59,37],[43,25],[53,10],[45,8]],p.color);r(28,21,8,27,d);r(30,23,4,22,p.color)}
  else if(kind===9){poly([[20,18],[13,5],[23,9],[31,16],[41,6],[50,9],[44,22]],d);r(15,9,10,11,p.color);r(42,10,8,11,p.color);poly([[20,49],[42,49],[48,58],[15,58]],p.color);r(8,30,8,8,p.color);r(48,30,8,8,p.color)}
  else if(kind===10){for(let i=0;i<3;i++){poly([[31,26],[4+i*4,10+i*11],[11+i*4,17+i*11],[27,32+i*2]],'#f2cf77');poly([[34,26],[60-i*4,10+i*11],[53-i*4,17+i*11],[39,32+i*2]],'#f2cf77')}r(23,6,18,12,'#ffe68b')}
  else if(kind===11){for(let i=0;i<4;i++){r(4+i*15,47,8,13,p.color);r(7+i*15,42,4,6,'#c9b7ed')}r(22,11,20,12,'#c7b4e8');r(14,24,36,21,p.color);r(29,5,5,9,'#f8e2a1')}
  else {for(let i=0;i<5;i++){poly([[31,27],[4+i*11,8+(i%2)*8],[12+i*10,17+(i%2)*8],[27,32]],'#91b5ff');poly([[34,27],[60-i*11,8+(i%2)*8],[52-i*10,17+(i%2)*8],[38,32]],'#91b5ff')}r(25,4,14,10,'#d5e6ff')}
  if(stage===3){r(3,3,3,15,'#ffe59a');r(58,4,3,15,'#ffe59a');r(22,57,20,2,'#ffe59a')}ctx.restore();return;
 }else if(id===0){
  // Soft rabbit, very long floppy ears, widening fluffy cloud body.
  poly([[14,27],[9,22],[7,5],[12,2],[18,7],[21,25]],d);poly([[43,26],[44,9],[51,3],[56,7],[55,26],[49,30]],d);r(10,7,6,14,'#ead6c5');r(12,9,3,10,'#e9a9b2');r(47,10,6,15,'#ead6c5');r(49,11,3,11,'#e9a9b2');
  const ex=stage>=2?4:0;poly([[17,22],[44,22],[50+ex,30],[50+ex,48],[44,55],[17,55],[10-ex,48],[10-ex,31]],d);r(15-ex,30,34+ex*2,18,'#e8d6c1');r(20,25,23,25,'#f4e6d5');r(19,47,27,6,'#f4e6d5');eye(24,33);eye(38,33);r(30,39,4,2,'#bd8a8b');r(17,40,5,2,'#dfa5a4');r(42,40,5,2,'#dfa5a4');r(13,53,12,5,'#e8d6c1');r(39,53,12,5,'#e8d6c1');if(stage===3){r(2,35,8,15,'#f4e6d5');r(54,33,8,17,'#f4e6d5');r(26,17,10,6,'#e9746b');r(32,14,3,4,'#89b971')}
 }else if(id===1){
  // Broad bear, heavy forearms, muscular torso and a stepped mohawk.
  r(16,10,9,9,d);r(42,10,9,9,d);r(21,13,27,20,d);r(23,15,23,16,'#bb956f');r(29,7,5,9,'#ff935a');r(34,3,5,12,'#ffb265');r(39,7,4,8,'#ff935a');
  const ex=stage>=2?5:0;r(15-ex,31,38+ex,21,d);r(18,32,28,18,'#4d4d5c');r(20,35,9,10,'#caa17a');r(34,35,9,10,'#caa17a');r(8-ex,32,10+ex,17,d);r(10-ex,34,9+ex,12,'#ba956f');r(49,31,10+ex,19,d);r(51,33,8+ex,14,'#ba956f');eye(26,21);eye(39,21);r(29,28,11,2,'#e8cfaa');r(15,50,12,9,d);r(37,50,13,9,d);r(14,56,14,4,'#b1afb8');r(37,56,15,4,'#b1afb8');if(stage===3){r(2,30,10,4,'#dcddd6');r(1,25,3,6,'#dcddd6');r(7,24,3,6,'#dcddd6');r(53,27,10,4,'#dcddd6');r(55,22,3,6,'#dcddd6');r(61,22,2,6,'#dcddd6');r(29,38,6,9,'#f19a64')}
 }else if(id===2){
  // Angular cat mecha with mechanical legs, long scarf and unfolding energy wings.
  if(stage>=2){poly([[21,29],[5,12],[2,14],[6,39],[18,44]],'#7765ad');poly([[42,29],[59,10],[63,12],[58,41],[46,45]],'#7765ad');poly([[17,30],[5,18],[8,32]],'#e1c8ff');poly([[46,30],[59,17],[56,33]],'#e1c8ff')}
  poly([[20,21],[17,5],[29,16],[37,16],[47,4],[46,24],[42,31],[23,31]],d);poly([[22,20],[21,12],[28,19],[39,19],[43,12],[43,26],[23,27]],'#d3c4e8');r(24,21,6,3,'#87f2db');r(36,21,6,3,'#87f2db');r(21,31,23,17,d);r(25,32,16,11,'#bbb6d6');r(29,33,8,7,'#f4ce74');r(15,32,7,16,'#d3c4e8');r(44,31,7,17,'#d3c4e8');poly([[25,45],[31,45],[28,57],[18,57]],'#cfcee2');poly([[35,45],[41,45],[47,57],[37,57]],'#cfcee2');poly([[44,28],[57,26],[59,32],[49,35],[56,44],[46,38]],'#f1ac7b');if(stage===3){r(0,8,3,30,'#95f5e0');r(61,6,3,34,'#95f5e0');r(26,9,14,2,'#f6d783')}
 }else if(id===4){
  // Monkey with oversized spiral tail, long arms, narrow torso and a board.
  poly([[41,40],[50,40],[55,34],[55,20],[49,15],[44,17],[44,23],[48,25],[51,22],[51,31],[47,34],[40,34]],d);poly([[43,38],[49,38],[53,33],[53,21],[49,18],[46,19],[46,22],[49,23],[51,21],[51,32],[47,36],[43,36]],'#d4a765');
  r(12,15,8,10,d);r(35,15,8,10,d);r(18,11,20,21,d);r(20,13,16,18,'#b38a60');r(21,19,14,10,light);eye(23,21);eye(31,21);r(22,32,14,17,d);r(24,33,10,14,'#e7bb64');r(12,29,7,21,'#b38a60');r(38,29,6,22,'#b38a60');r(18,33,5,6,'#b38a60');r(34,32,5,6,'#b38a60');r(21,47,5,8,'#b38a60');r(32,47,5,8,'#b38a60');r(12,56,38,3,'#98cbbb');r(17,59,6,3,d);r(40,59,6,3,d);if(stage===3){r(7,30,6,24,'#b38a60');r(44,30,6,24,'#b38a60');r(15,15,24,4,'#64b6a5');r(20,16,5,2,'#d9f7e9');r(30,16,5,2,'#d9f7e9')}
 }else if(id===5){
  // Professor owl: head-heavy silhouette, full spectacle disks, feathered wings.
  const ex=stage>=2?4:0;poly([[14,15],[20,9],[43,9],[50,16],[50+ex,35],[44,43],[20,43],[12-ex,35]],d);r(16-ex,17,32+ex*2,18,'#91a376');r(21,13,21,25,'#b9c298');r(15,20,14,14,'#e9dbab');r(34,20,14,14,'#e9dbab');r(16,22,11,9,d);r(36,22,11,9,d);r(18,24,7,5,'#c8e5de');r(38,24,7,5,'#c8e5de');r(27,25,9,2,d);r(30,33,5,4,'#dcb373');poly([[20,41],[43,41],[44,53],[19,53]],'#667e67');poly([[16,36],[7,40],[4,52],[17,47]],'#9bad84');poly([[47,36],[58,40],[60,53],[46,47]],'#9bad84');r(21,53,7,5,'#d9ba7c');r(36,53,7,5,'#d9ba7c');if(stage===3){r(15,5,10,7,'#91b379');r(25,2,15,10,'#b6ce8b');r(40,5,10,8,'#91b379');r(0,44,8,12,'#7b6886');r(55,45,9,12,'#7b6886');r(1,47,5,7,'#e7dabb');r(57,48,5,6,'#e7dabb')}
 }else{
  // Axolotl/sea dragon, extended tail and six feathery side fins.
  if(stage>=2){poly([[35,37],[48,41],[54,49],[53,54],[45,55],[43,51],[48,50],[45,46],[34,45]],'#81b5c7')}
  for(let i=0;i<(stage===3?3:2);i++){poly([[20,20+i*6],[9-i*2,10+i*11],[6,15+i*11],[15,26+i*5]],'#c0a3d6');poly([[41,20+i*6],[54+i*2,10+i*11],[59,15+i*11],[47,26+i*5]],'#c0a3d6')}
  poly([[24,14],[38,14],[44,20],[44,32],[37,38],[24,38],[18,32],[18,21]],d);r(22,20,19,14,'#a4d9df');r(26,16,11,20,'#c2e8df');eye(25,24);eye(35,24);r(29,30,5,1,'#628592');r(26,38,13,13,'#8cbacb');r(22,43,5,8,'#a4d9df');r(38,42,5,8,'#a4d9df');if(stage===3){r(29,4,3,9,'#f1e1a3');r(25,8,11,2,'#f1e1a3');r(46,53,10,3,'#c0a3d6')}
 }
 // Signature accessories make each food personality readable in motion.
 if(stage>=1&&id===0){r(18,23,7,3,'#ec7891');r(16,21,4,6,'#ec7891');r(25,21,4,6,'#ec7891');r(21,23,2,2,'#ffe6a0')}
 if(stage>=1&&id===1){r(20,18,27,2,'#3e4652');r(19,19,3,7,'#3e4652');r(45,19,3,7,'#3e4652');r(23,20,8,4,'#f3cc72');r(36,20,8,4,'#f3cc72')}
 if(stage>=1&&id===2){r(18,14,3,10,'#7bf4da');r(43,13,3,10,'#7bf4da');r(16,12,6,2,'#f6d986');r(42,11,6,2,'#f6d986')}
 if(stage>=1&&id===4){r(18,14,23,3,'#ee7569');r(16,17,6,5,'#ee7569');r(38,17,6,5,'#ee7569')}
 if(stage>=1&&id===5){r(14,20,36,2,'#504e55');r(14,19,3,8,'#504e55');r(47,19,3,8,'#504e55')}
 if(stage>=1&&id===6){r(22,39,3,5,'#ffe39a');r(28,42,3,5,'#ffe39a');r(34,42,3,5,'#ffe39a');r(40,39,3,5,'#ffe39a')}
 if(rare){r(18,0,26,1,'#ffe9a0');r(15,2,3,1,'#ffe9a0');r(44,2,3,1,'#ffe9a0');r(1,4,2,7,'#ffe9a0');r(0,7,6,2,'#ffe9a0');r(60,43,2,7,'#d5bbff');r(57,46,6,2,'#d5bbff')}
 ctx.restore();
}
const PORTALS=[{x:78,y:358,to:1,color:'#bf95ff'},{x:682,y:148,to:0,color:'#8becdf'}];
function updatePortals(g,dt){g.portalCooldown=Math.max(0,(g.portalCooldown||0)-dt);g.portalFlash=Math.max(0,(g.portalFlash||0)-dt);if(g.elapsed<3||g.portalCooldown>0)return;for(const p of PORTALS){if(Math.hypot(g.x-p.x,g.y-p.y)<38){const target=PORTALS[p.to];g.portalFrom={x:g.x,y:g.y};g.x=target.x+(target.x>380?-50:50);g.y=target.y+(target.y<260?42:-42);g.targetX=g.x;g.targetY=g.y;g.portalCooldown=2.2;g.portalFlash=.6;g.portalTrips=(g.portalTrips||0)+1;g.inv=Math.max(g.inv,.6);delete g.pointer;burst(p.x,p.y,p.color);burst(g.x,g.y,target.color);sfx('portal');speak('穿过黑洞，换一边继续找吃的。');break}}}
function drawPortals(ctx,g){for(const p of PORTALS){ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=g.elapsed<3?.35:1;ctx.strokeStyle=p.color;ctx.shadowBlur=reduced?0:15;ctx.shadowColor=p.color;ctx.fillStyle='#070613';ctx.beginPath();ctx.ellipse(0,0,24,46,0,0,Math.PI*2);ctx.fill();for(let i=0;i<4;i++){ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,26+i*4,46+i*3,Math.sin(g.elapsed*2+i)*.18,0,Math.PI*2);ctx.stroke()}ctx.restore()}if(g.portalFlash>0){ctx.save();ctx.globalAlpha=g.portalFlash/.6;ctx.strokeStyle='#c5b1ff';ctx.setLineDash([5,15]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(g.portalFrom.x,g.portalFrom.y);ctx.quadraticCurveTo(380,240,g.x,g.y);ctx.stroke();ctx.restore()}}
