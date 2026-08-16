const body=document.body;
const progress=document.getElementById('progress');
const nav=document.getElementById('nav');
const menuToggle=document.getElementById('menuToggle');
const themeToggle=document.getElementById('themeToggle');
const cursorGlow=document.getElementById('cursorGlow');

document.getElementById('year').textContent=new Date().getFullYear();

menuToggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',open);
});

document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));

const savedTheme=localStorage.getItem('rakib-theme');
if(savedTheme==='dark'){body.classList.add('dark');themeToggle.textContent='☀';}
themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  const dark=body.classList.contains('dark');
  localStorage.setItem('rakib-theme',dark?'dark':'light');
  themeToggle.textContent=dark?'☀':'☾';
});

window.addEventListener('scroll',()=>{
  const scrollTop=window.scrollY;
  const height=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${height?scrollTop/height*100:0}%`;
});

window.addEventListener('pointermove',e=>{
  cursorGlow.style.left=`${e.clientX}px`;
  cursorGlow.style.top=`${e.clientY}px`;
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav a')];
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(a=>a.style.color='');
      const active=links.find(a=>a.getAttribute('href')===`#${entry.target.id}`);
      if(active)active.style.color='var(--ink)';
    }
  });
},{rootMargin:'-40% 0px -55% 0px',threshold:0});
sections.forEach(s=>activeObserver.observe(s));
