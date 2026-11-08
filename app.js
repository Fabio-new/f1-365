const state={news:[],calendar:[],drivers:[],constructors:[]};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toggleSearch(){const x=$('#searchBox');x.hidden=!x.hidden;if(!x.hidden)$('#searchInput').focus()}
function filterNews(q){const v=q.toLowerCase().trim();document.querySelectorAll('.news-card').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(v)?'flex':'none')}
function fmtDate(d){return new Intl.DateTimeFormat('it-IT',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(d))}
function flag(country){return ({Brazil:'🇧🇷',Italy:'🇮🇹',Qatar:'🇶🇦','United Arab Emirates':'🇦🇪',USA:'🇺🇸',Mexico:'🇲🇽',Australia:'🇦🇺',China:'🇨🇳',Japan:'🇯🇵',Spain:'🇪🇸',Austria:'🇦🇹',UK:'🇬🇧',Belgium:'🇧🇪',Hungary:'🇭🇺',Netherlands:'🇳🇱',Canada:'🇨🇦',Monaco:'🇲🇨',Azerbaijan:'🇦🇿',Malaysia:'🇲🇾',Singapore:'🇸🇬'}[country]||'🏁')}
async function loadF1(){
  try{
    const r=await fetch('/api/f1?season=2026'); if(!r.ok)throw Error('F1 API');
    const d=await r.json(); state.calendar=d.calendar||[];state.drivers=d.drivers||[];state.constructors=d.constructors||[];
    renderNext();renderCalendar();renderStandings('drivers');renderTeams();renderStats();
  }catch(e){console.error(e);$('#nextGp .gp-body').innerHTML='<div class="muted">Dati F1 temporaneamente non disponibili.</div>'}
}
async function loadNews(){
  try{
    const r=await fetch('/api/news');const d=await r.json();state.news=d.news||[];renderNews();
    if(state.news[0])renderHero(state.news[0]);
  }catch(e){$('#newsGrid').innerHTML='<div class="loading">News temporaneamente non disponibili.</div>'}
}
function renderHero(n){$('#heroStory').querySelector('h1').textContent=n.title;$('#heroStory').querySelector('p').textContent=`Fonte: ${n.source} · aggiornato automaticamente`;$('#heroStory').querySelector('.btn').href=n.url;$('#heroStory').querySelector('.btn').target='_blank';if(n.image)$('#heroStory .hero-bg').style.backgroundImage=`linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.2)),url("${n.image}")`;$('#heroStory .hero-bg').style.backgroundSize='cover';$('#heroStory .hero-bg').style.backgroundPosition='center'}
function renderNews(){const el=$('#newsGrid');el.innerHTML=state.news.slice(0,4).map(n=>`<article class="news-card"><a href="${esc(n.url)}" target="_blank" rel="noopener"><div class="news-img">${n.image?`<img loading="lazy" src="${esc(n.image)}" alt="">`:''}<span class="tag">${esc(n.source||'F1')}</span></div><h3>${esc(n.title)}</h3></a><div class="news-meta">${esc(n.date||'Aggiornato ora')} · ${esc(n.source||'Fonte primaria')}</div></article>`).join('')||'<div class="loading">Nessuna news disponibile.</div>'}
function renderNext(){const now=Date.now(),next=state.calendar.find(r=>new Date(`${r.date}T${r.time||'00:00:00Z'}`).getTime()>now)||state.calendar[0];if(!next)return;const t=new Date(`${next.date}T${next.time||'00:00:00Z'}`);$('#nextGp .gp-body').innerHTML=`<div class="city">${flag(next.country)}</div><h3>${esc(next.name.replace(' Grand Prix',' GP'))}</h3><div class="city">${esc(next.city)} · ${fmtDate(next.date)}</div><div class="countdown" data-time="${t.toISOString()}"><div><strong>—</strong><span>giorni</span></div><div><strong>—</strong><span>ore</span></div><div><strong>—</strong><span>min</span></div></div><div class="track"></div><a class="btn" href="calendar.html">Scopri il GP →</a>`;tickCountdown()}
function tickCountdown(){const c=document.querySelector('.countdown');if(!c)return;clearInterval(window.__timer);const run=()=>{let ms=new Date(c.dataset.time)-Date.now();if(ms<0)ms=0;const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);c.children[0].querySelector('strong').textContent=String(d).padStart(2,'0');c.children[1].querySelector('strong').textContent=String(h).padStart(2,'0');c.children[2].querySelector('strong').textContent=String(m).padStart(2,'0')};run();window.__timer=setInterval(run,1000)}
function showStandings(type,btn){document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderStandings(type)}
function renderStandings(type){const data=type==='drivers'?state.drivers:state.constructors;$('#standingsList').innerHTML=data.slice(0,5).map((x,i)=>{const name=type==='drivers'?`${x.Driver.givenName} ${x.Driver.familyName}`:x.Constructor.name;return `<div class="stand-row ${i===0?'top':''}"><strong>${i+1}</strong><span>${esc(name)}<small>${type==='drivers'?' · '+esc(x.Constructors?.[0]?.name||''):''}</small></span><strong>${esc(x.points)}<small> pts</small></strong></div>`}).join('')||'—'}
function renderCalendar(){const now=Date.now();const upcoming=state.calendar.filter(r=>new Date(`${r.date}T${r.time||'00:00:00Z'}`).getTime()>=now).slice(0,4);const list=upcoming.length?upcoming:state.calendar.slice(-4);$('#calendarList').innerHTML=list.map(r=>`<div class="race-row ${r===list[0]?'next':''}"><span class="flag">${flag(r.country)}</span><span><strong>${esc(r.name.replace(' Grand Prix',''))}</strong><br><small>${esc(r.city)}</small></span><span>${new Date(r.date).toLocaleDateString('it-IT',{day:'2-digit',month:'short'})}</span></div>`).join('')}
function renderTeams(){const names=[...new Set(state.constructors.map(x=>x.Constructor.name))].slice(0,8);const symbols={'Ferrari':'🏎️','Mercedes':'◼️','Red Bull':'🐂','McLaren':'🟠','Aston Martin':'🪽','Alpine F1 Team':'🔷','Williams':'🔵','Haas F1 Team':'⚫','Audi':'◉','Cadillac F1 Team':'⚜️'};$('#teamsGrid').innerHTML=names.map(n=>`<a class="team" href="teams.html"><span class="logo">${symbols[n]||'🏎️'}</span>${esc(n)}</a>`).join('')}
function renderStats(){const all=state.drivers;$('#races').textContent=state.calendar.length;$('#driverCount').textContent=all.length;$('#wins').textContent=all.reduce((a,x)=>a+Number(x.wins||0),0);$('#poles').textContent='—'}
document.querySelector('#today').textContent=new Intl.DateTimeFormat('it-IT',{dateStyle:'full',timeStyle:'short'}).format(new Date());
loadF1();loadNews();
