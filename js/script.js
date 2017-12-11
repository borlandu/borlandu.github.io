/*NAV SHOW-HIDE*/
document.querySelector('.nav-menu').onclick = _ => {
  let nav = document.querySelector('.nav');
  nav.classList.toggle('nav-show');
}
document.onclick = e => {
  let nav = document.querySelector('nav');
  if(e.target !== nav && !Array.from(nav.children).includes(e.target) && nav.classList.contains('nav-show')) nav.classList.toggle('nav-show');
};


/*SYSTEM*/
// let [sys_version, sys_update] = [1, 2];
// document.querySelector('.copyright').innerHTML = `v.${sys_version} u.${sys_update} © ${new Date().getFullYear()}`;
