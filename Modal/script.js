'use strict';

function removeClass(inObj, classname) {
  inObj.classList.remove(classname);
  return inObj;
}
const btns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overBlack = document.querySelector('.overlay');

for (let item of btns) {
  item.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overBlack.classList.remove('hidden');
  });
}

modal.addEventListener('click', function () {
  {
    modal.classList.add('hidden');
    overBlack.classList.add('hidden');
  }
});
overBlack.addEventListener('click', function () {
  {
    modal.classList.add('hidden');
    overBlack.classList.add('hidden');
  }
});
document.addEventListener("click",function(){
    console.log(this);
    // alert("da")
    
})