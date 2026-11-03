/* Лёгкий слайдер карточек (замена скрипту postnikovmd swiper): scroll-snap + стрелки + мышь + клавиши + счётчик. Без зависимостей. */
(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function init(rec){
 var slides=rec.querySelectorAll('.slide'); if(slides.length<2)return;
 var track=slides[0].parentElement;
 var nextA=rec.querySelector('a[href="#next"]'),prevA=rec.querySelector('a[href="#prev"]');
 var cur=rec.querySelector('.current .tn-atom'),tot=rec.querySelector('.total .tn-atom');
 track.classList.add('ps-track');
 track.setAttribute('tabindex','0');track.setAttribute('role','region');
 track.setAttribute('aria-roledescription','карусель');track.setAttribute('aria-label','Примеры работ: листайте стрелками или свайпом');
 function step(){return slides[1].offsetLeft-slides[0].offsetLeft||1;}
 function total(){return Math.max(1,Math.round((track.scrollWidth-track.clientWidth)/step())+1);}
 function index(){return Math.min(total()-1,Math.max(0,Math.round(track.scrollLeft/step())));}
 function go(i){i=Math.min(total()-1,Math.max(0,i));track.scrollTo({left:i*step(),behavior:reduce?'auto':'smooth'});}
 function ui(){
  var i=index(),n=total();
  if(cur)cur.textContent=i+1; if(tot)tot.textContent=n;
  [[prevA,i<=0],[nextA,i>=n-1]].forEach(function(p){if(!p[0])return;p[0].classList.toggle('ps-off',p[1]);p[0].setAttribute('aria-disabled',p[1]?'true':'false');});
 }
 var raf=0;track.addEventListener('scroll',function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(ui);},{passive:true});
 window.addEventListener('resize',ui);window.addEventListener('load',ui);
 [[prevA,-1,'Назад'],[nextA,1,'Дальше']].forEach(function(p){
  var a=p[0];if(!a)return;a.classList.add('ps-arrow');a.setAttribute('role','button');a.setAttribute('aria-label',p[2]);
  a.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();go(index()+p[1]);});
 });
 track.addEventListener('keydown',function(e){
  var k=e.key,d=k==='ArrowRight'?1:k==='ArrowLeft'?-1:0;
  if(d){e.preventDefault();go(index()+d);}
  else if(k==='Home'){e.preventDefault();go(0);} else if(k==='End'){e.preventDefault();go(total()-1);}
 });
 /* перетаскивание мышью (на касании работает нативная прокрутка со «зацепом») */
 var down=null,moved=false;
 track.addEventListener('pointerdown',function(e){
  if(e.pointerType!=='mouse'||e.button!==0)return;
  down={x:e.clientX,left:track.scrollLeft,t:Date.now()};moved=false;
 });
 window.addEventListener('pointermove',function(e){
  if(!down)return;var dx=e.clientX-down.x;
  if(!moved&&Math.abs(dx)>5){moved=true;track.classList.add('ps-drag');}
  if(moved)track.scrollLeft=down.left-dx;
 });
 window.addEventListener('pointerup',function(e){
  if(!down)return;var dx=e.clientX-down.x,d=down;down=null;
  if(!moved)return;
  track.classList.remove('ps-drag');
  var i=index(),fast=Date.now()-d.t<350&&Math.abs(dx)>40;
  go(fast?(dx<0?Math.floor(d.left/step())+1:Math.ceil(d.left/step())-1):i);
  setTimeout(function(){moved=false;},0);
 });
 track.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();}},true);
 track.addEventListener('dragstart',function(e){e.preventDefault();});
 ui();
}
document.querySelectorAll('.uc-swiper').forEach(init);
})();
