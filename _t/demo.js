(function(){
var m=document.createElement('div');m.className='demo-modal';
m.innerHTML='<div><p>Здесь квиз Marquiz — подключается тем же кодом.</p><p>Демо-копия: заявки не отправляются.</p><button type="button">Закрыть</button></div>';
document.body.appendChild(m);
m.addEventListener('click',function(e){if(e.target===m||e.target.tagName==='BUTTON')m.classList.remove('on');});
var n=document.createElement('div');n.className='demo-note';n.textContent='демо-копия: заявки не отправляются';document.body.appendChild(n);
function note(){n.style.display='block';clearTimeout(note.t);note.t=setTimeout(function(){n.style.display='none'},3000);}
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a[href*="popup:marquiz"],a[href*="marquiz"]');
 if(a){e.preventDefault();e.stopImmediatePropagation();m.classList.add('on');return;}
 var b=e.target.closest&&e.target.closest('form button,form [type=submit],.t-submit');
 if(b){e.preventDefault();e.stopImmediatePropagation();note();}
},true);
document.addEventListener('submit',function(e){e.preventDefault();e.stopImmediatePropagation();note();},true);
document.querySelectorAll('.t-submit').forEach(function(b){b.textContent='демо-копия: заявки не отправляются';});
})();
