document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.site-nav');
  const year=document.getElementById('year');
  year.textContent=new Date().getFullYear();

  if(navToggle){
    navToggle.addEventListener('click',()=>nav.classList.toggle('open'))
  }

  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      alert('Thanks! This is a demo form — replace with your backend or mailto.');
      form.reset();
    })
  }
});
