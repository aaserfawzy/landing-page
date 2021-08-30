/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//the sections of page
const sections=document.querySelectorAll('section');
// the pageheader of page
const pageHeader=document.getElementsByTagName('header');
//this variable is for bar settime out before disapper
let disapper;
// the option for intersection observer 
const options ={
    rootMargin:"-22% 0px -20% 0px",
    threshold:0.37
    
};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
* @description this function is to give active section to nav bar section using for of loop
* @param {string} id - The id of the active section
*/
function sawpActiveNav(id){
    let anc=document.querySelector('.active');

    if(anc!=null){
    anc.classList.add('menu__link');
    anc.classList.remove('active');
    }

    let anchors=document.querySelectorAll('a');
    for(anchor of anchors){

        if(anchor.getAttribute('href').slice(1,)==id){
            flage=false;
            anchor.classList.remove('menu__link');
            anchor.classList.add('active');
            break;
        }
       
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description this function is for making the nav bar items and give them class the add them to the header using for loop
*/
function navBar(){
    const fragment = document.createDocumentFragment();
    let list,icon;
    for(item of sections){
        anc=document.createElement('a');
        anc.textContent=item.getAttribute("data-nav")+" ";
        anc.href="#"+item.id;
        anc.classList.add('menu__link');
        list=document.createElement('LI');
        list.appendChild(anc);
        fragment.appendChild(list)
        
   }
   anc=document.createElement('a');
   anc.href="javascript:void(0);";
   anc.classList.add('icon');
   icon=document.createElement('i');
   icon.classList.add('fa-bars');
   icon.classList.add('fa');
   anc.appendChild(icon);
   fragment.appendChild(anc);
   document.getElementById('navbar__list').appendChild(fragment);
}

/**
* @description this function is adding "your-active-class" to the section in the viewpoint and remove it from the in active
*/
// helping source MDN
const observer= new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add("your-active-class")
            sawpActiveNav(entry.target.id)
        
        }else{
            entry.target.classList.remove("your-active-class")
        }
    });


},options)

/**
* @description this function  for scroll to the section instead of jump to it using scrollTo
*/
function scrollIntoView(){
    let scrolls=document.getElementsByTagName('a');
    for(scrol of scrolls){
        let y=document.getElementById(scrol.getAttribute('href').slice(1,))
        if(!(y==null)){
        scrol.addEventListener("click",function (event){
            event.preventDefault();
            window.scrollTo({
                top:y.offsetTop,
                behavior: 'smooth'
            });
        })
        
    }
 }
}

/**
* @description this function for making the header disapper after 5sec of not scroll 
*/
function BarVisibility(){ 
    pageHeader[0].classList.remove('invisible');
    clearTimeout(disapper);
    disapper=setTimeout(function (){pageHeader[0].classList.add('invisible');},5000);
}

/**
* @description this function for making the header disapper after 5sec of not scroll 
*/

function responsive() {
    let x = document.getElementsByClassName("navbar__menu")[0];
    if (x.className === "navbar__menu") {
      x.classList.add("responsive");
    } else {
      x.className = "navbar__menu";
    }
  }

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBar();
// Scroll to section on link click
scrollIntoView();
// Set sections as active
sections.forEach(section => {
    observer.observe(section)

});
// heading get disappear
document.addEventListener("scroll",BarVisibility);
// apply the resonsive code to the header
document.getElementsByClassName('icon')[0].addEventListener("click",responsive);
