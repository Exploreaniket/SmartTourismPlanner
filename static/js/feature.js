const cards = document.querySelectorAll(".feature-card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const centerX=rect.width/2;

const centerY=rect.height/2;

const rotateX=((y-centerY)/20)*-1;

const rotateY=(x-centerX)/20;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-12px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});