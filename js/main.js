//get item from localStorage
const getItem = (item)=>localStorage.getItem(item);
//set item in localStorage
const setItem = (key,item)=>localStorage.setItem(key,item);

//backgroundInterval
let backgroundInterval;
//backgroundOption
let backgroundOption = true;

/* Setting box */
const settingBox = document.getElementById('setting-box');
const settingGear = settingBox.firstElementChild;
settingGear.addEventListener('click',()=>{
    settingGear.firstElementChild.classList.toggle('fa-spin')
    settingBox.classList.toggle('active')
});
/* Switch Color */
const listColors = document.querySelectorAll('.colors-list li');
//get the color from localStorage
if(getItem('color_option') !== null){
    //set the color into the root
    document.documentElement.style.setProperty("--second-color",getItem('color_option'));
    //remove class active from all elements
    document.querySelectorAll('.colors-list > li').forEach(element=>{
        element.classList.remove('active');
        //add class active to the item that has the data color === color_option in localStorage
        if(element.dataset.color === getItem('color_option')){
            element.classList.add('active');
        }
    });
    
}
//loop throught the list item
listColors.forEach(item=>{
    item.addEventListener('click',(e)=>{
        //get the color from data attribute 
        const color = e.target.dataset.color;
        //set the color into localStorage
        setItem('color_option',color)
        //set the color into the root
        document.documentElement.style.setProperty("--second-color",color);
        console.log(document.documentElement.style)
        //remove class active from all elements
        e.target.parentElement.querySelectorAll('.active').forEach(element=>{
            element.classList.remove('active');
        })
        //add class active to the target element
        e.target.classList.add('active');
    });
});

/* Home carouser */
const homeImg = ["home1","home2","home3"]
const home = document.querySelector('.home');
const homeContent = document.querySelector('.home-content')
let i = 0;
//get the Btn contorll carouser
const btnControlls = document.querySelectorAll('.random-background span');
//check if the localStorage is not empty
if(getItem('background_option') !== null){
    backgroundOption = getItem('background_option');
    //remove the active class from the spans
    btnControlls.forEach(element=>{
        element.classList.remove('active');
        });
    if(backgroundOption === 'true'){
        backgroundOption = true;
        document.querySelector('.random-background .yes').classList.add('active')

    }else{
        backgroundOption = false;
        document.querySelector('.random-background .no').classList.add('active')
    }
}
console.log(backgroundOption);

//loop throught the btnControlls
btnControlls.forEach(item=>{
    item.addEventListener('click',(e)=>{
        //remove the active class form all children
        e.target.parentElement.querySelectorAll('.active').forEach(element=>{
            element.classList.remove('active');
        });
        //add the active class to the target element
        e.target.classList.add('active');
        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            setItem('background_option',true);
            backgroundCarouser();
        }else{
            backgroundOption = false;
            setItem('background_option',false);
            clearInterval(backgroundInterval);
        }
    });
});

const backgroundCarouser = ()=>{
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{
            if(i >= homeImg.length){
                i = 0;
            }
            home.style.backgroundImage = `url('images/${homeImg[i]}.jpg')`;
            i++    
        },3000);
    }else{
        clearInterval(backgroundInterval);
    }
}
backgroundCarouser();

/* toggle navbar */
const toggleMenu = document.getElementById('toggle-menu');
const navList = document.getElementById('nav-list');
toggleMenu.addEventListener('click',()=>{
    navList.classList.toggle('active');
});
/* Toggle DropDown Menu */
const navListLi = document.querySelectorAll('.nav-List > li');

navListLi.forEach(item=>{
    item.addEventListener('click',(e)=>{
        const itemLi = e.target.parentNode;
        itemLi.classList.toggle('active');
    })
});
/* home link accordion */
const homeLinkItem = document.querySelectorAll('.home-link-item');
homeLinkItem.forEach(item=>{
    item.addEventListener('click',e=>{
        const homeLinkDesc = e.currentTarget.lastElementChild;
        if(homeLinkDesc.classList.contains('active')){
            
            homeLinkDesc.classList.remove('active')
        }else{
            //remove all the active class
            homeLinkItem.forEach(element=>{
                element.lastElementChild.classList.remove('active')
            });
           homeLinkDesc.classList.add('active')
            
        }
    });
   
});
homeLinkItem.forEach(item=>{
    let homeDesc = item.lastElementChild.firstElementChild.innerHTML;
    let p = '';
    if(homeDesc.length >= 100){
        p = homeDesc.substr(0 , 99) + '...';
    }else{
        p = homeDesc
    }
    item.lastElementChild.firstElementChild.innerHTML = p;
});
/* card  */
//get the card controller items
const cardControllerItems = document.querySelectorAll('.card-controller-item');
//get the card content
const cardContentItem = document.querySelectorAll('.card-item');
cardControllerItems.forEach(item=>{
    item.addEventListener('click',(e)=>{
        //remove all the active class from card controller items
        cardControllerItems.forEach(ele=>{
            ele.classList.remove('active');
        });
        //remove all the active class from card content
        cardContentItem.forEach(item=>{
            item.classList.remove('active');
        });
        //add active class to the target element
        e.currentTarget.classList.add('active')
        //print the index in the console
        console.log(e.currentTarget.dataset)
        const index = parseInt(e.currentTarget.dataset.index)
        cardContentItem[index].classList.add('active');
    })
})

/* CountDown Timer */
//the timer item
const dayItem = document.querySelector('.days');
const hourItem = document.querySelector('.hours');
const minuteItem = document.querySelector('.minutes');
const secondItem = document.querySelector('.seconds');
const countTimer = document.querySelector('.timer-content');
function countDownTimer(){
    const now = new Date().getTime()
    const countDate = new Date('01/01/2023').getTime();
    const gap =  countDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24

    const getDays = Math.floor(gap / day);
    const getHours = Math.floor((gap % day)/hour);
    const getMinuts = Math.floor((gap % hour)/minute)
    const getSecond = Math.floor((gap % minute)/second)
    if(getDays <= 0 && getHours <=  0 && getMinuts <=  0 && getSecond <=  0 ){
        countTimer.innerHTML = '<h2 style="color:white">Time Up</h2>'
    }else{
        dayItem.innerHTML = `<strong>${getDays}</strong><span>days</span>`
        hourItem.innerHTML = `<strong>${getHours}</strong><span>hours</span>`
        minuteItem.innerHTML = `<strong>${getMinuts}</strong><span>minutes</span>`
        secondItem.innerHTML = `<strong>${getSecond}</strong><span>seconds</span>`
    }
}
setInterval(countDownTimer,1000);



//Popup for new courses
const newCourses = document.querySelectorAll('.new-course-item')
newCourses.forEach(item=>{
    item.addEventListener('click',(e)=>{
        popup = true
        //create popup-overlay
        const popupOverlay = document.createElement('div')
        //add a class 
        popupOverlay.className = "popup-overlay"
        //add popup-overlay in the body
        document.body.appendChild(popupOverlay);
        //create popup-box-content
        const popupBoxContent = document.createElement('div')
        //add a class
        popupBoxContent.className = `popup-box-content ${getItem('animation')}`
        //add popup box content in the popupoverlay
        popupOverlay.appendChild(popupBoxContent)
        //create image element
        const img = document.createElement('img')
        //add src image
        img.src=e.currentTarget.firstElementChild.src
        console.log(e.currentTarget.firstElementChild.src)
        //create heading
        const header = document.createElement('h3')
        header.className='popup-box-header'
        //create description elemnt
        const desc = document.createElement('p')
        desc.className='popup-box-desc'
        //add text to the  header
        const textHeader = document.createTextNode(e.currentTarget.lastElementChild.firstElementChild.textContent)
        //add textHeader to the header
        header.appendChild(textHeader)
        //add description
        const textDescription = document.createTextNode(document.querySelector('.new-couse-item-content p').textContent)
        //add the textDescription to desc elemnt
        desc.appendChild(textDescription)
        popupBoxContent.appendChild(img)
        popupBoxContent.appendChild(header)
        popupBoxContent.appendChild(desc)
        //create the close button
        const closeButton = document.createElement('span')
        closeButton.className = 'close-popup-btn'
        closeButton.textContent = 'X'

        popupBoxContent.appendChild(closeButton)
    })
})

//remove the popup elemnt
document.addEventListener('click',(e)=>{
    if(e.target.className == "close-popup-btn"){
        e.target.parentElement.parentElement.remove()
    }
})

//change animation popup
const animationList = document.querySelectorAll(".animation")
animationList.forEach(item=>{
    item.addEventListener('click',(e)=>{
        //remove all the animation class from animation list
        animationList.forEach(item=>{
            item.classList.remove('scale-up-center')
            item.classList.remove('scale-up-bl')
            item.classList.remove('scale-up-center')
        })
        //remove the active class
        animationList.forEach(item=>{
            item.classList.remove('active')
        })
        setItem("animation",e.target.dataset.animation)
        //add the active class and the animation class
        e.target.setAttribute('class',`active ${e.target.dataset.animation}`)
    })
})
//check if the animation item in localstorege
if(getItem('animation') !== null ){
    //remove the active class
    animationList.forEach(item=>{
        item.classList.remove('active')
        if(getItem('animation')== item.dataset.animation){
            item.classList.add('active')
        }
    })
    
}

//New Course Slider
//get the new course content elements
const newCourseContent = document.querySelectorAll('.new-course-content')
//get the slidet bullets 
const sliderBullets = document.querySelectorAll('.slider-bullets span')
sliderBullets.forEach(item=>{
    item.addEventListener('click',(e)=>{
        sliderBullets.forEach(element=>{
            element.classList.remove('active')
        })
        newCourseContent.forEach(ele=>{
            ele.classList.remove('active')
        })
        item.classList.add('active')
        newCourseContent[item.dataset.index].classList.add('active')
    })
})

/* popup video */
const presentationVideo = document.querySelector('.presentation-video')

    presentationVideo.addEventListener('click',(e)=>{
        popup = true
        //create popup-overlay
        const popupOverlay = document.createElement('div')
        //add a class 
        popupOverlay.className = "popup-overlay"
        //add popup-overlay in the body
        document.body.appendChild(popupOverlay);
        //create popup-box-content
        const popupBoxContent = document.createElement('div')
        //add a class
        popupBoxContent.className = `${getItem('animation')}`
        //add popup box content in the popupoverlay
        popupOverlay.appendChild(popupBoxContent)
        //create a video
        const video = document.createElement('video')
        video.src = 'presentation.mp4'
        
        video.setAttribute('style','width: 300px;height: 200px;margin: 100px auto;display: block;')
        video.setAttribute('controls',null)
        //add video to the pop-box-content
        popupBoxContent.appendChild(video)

        video.parentElement.setAttribute('style','width: 100%;height: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;')
        //create the close button
        const closeButton = document.createElement('span')
        closeButton.className = 'close-popup-btn'
        closeButton.textContent = 'X'

        popupBoxContent.appendChild(closeButton)
    })
/* animation when the page load */
const logo = document.querySelector('.logo')
window.onload=()=>{
    logo.classList.add('slide-in')
    navListLi.forEach(item=>{
        item.classList.add('slide-in')
    })
    toggleMenu.classList.add('slide-in')
    homeContent.classList.add('slide-in')
    homeLinkItem.forEach(item=>{
        item.classList.add('slide-in')
    })
}



/* scroll down animation */

const courseEvaluation  = document.querySelectorAll('.course-evaluation > span');
const bestCourse = document.querySelector('.best-course');
const bestCourseItem = document.querySelectorAll('.course-item-box')
const card = document.querySelector('.card')
const onlineCourse = document.querySelector('.online-course')
const timerContent = countTimer.parentElement
const registerForm = document.querySelector('.register')
const newCourse = document.querySelector('.new-course')
const presentation = document.querySelector('.presentation')
const presentationContent = document.querySelector('.presentaion-content')
const contact = document.querySelector('footer');
const contactForm = document.querySelector('.contact-form')
const map = document.querySelector('.map')
const copyRight = document.querySelector('.copy-right')
window.onscroll = function(){
    
    //bestCourse offsetTop ==> get the height of all the elements above the target element
    let bestCourseOffsetTop = bestCourse.offsetTop
    //cardContent offsetTop
    let cardOffsetTop = card.offsetTop
    //onlineCourse offsetTop
    let onlineCourseOffsetTop = onlineCourse.offsetTop
    //newCourse offsetTop
    let newCourseOffsetTop = newCourse.offsetTop;
    //presentation
    let presentationOffsetTop = presentation.offsetTop
    //contact
    let contactOffsetTop = contact.offsetTop
    //bestCourse outer height ==> get the height of an element, including vertical padding and borders
    let bestCourseOffsetHeight = bestCourse.offsetHeight
    let cardOffsetHeight = card.offsetHeight
    let onlineCourseOffsetHeight = onlineCourse.offsetHeight
    let newCourseOffsetHeight = newCourse.offsetHeight
    let presentationOffsetHeight = presentation.offsetHeight
    let contactOffsetHeight = contact.offsetHeight
    //window height ==> innerHeight get the view height of the screen of the computer
    let windowHeight = this.innerHeight
    //window scrollTop ==> get the number of pixels the document is currently scrolled along the vertical axis
    let windowScrollTop = this.pageYOffset;
    console.log((onlineCourseOffsetTop + onlineCourseOffsetHeight  ) - windowHeight)
    console.log(windowScrollTop)
    if(windowScrollTop > (bestCourseOffsetTop + bestCourseOffsetHeight) - windowHeight - 200){
        bestCourse.firstElementChild.firstElementChild.classList.add('slide-in')
        bestCourseItem.forEach(item=>{
            item.classList.add('slide-in')
        })
        courseEvaluation.forEach(e=>{
            let width = e.dataset.progress;
            e.style.width = width;
            e.innerHTML = width;
        })
    }
    if(windowScrollTop > (cardOffsetTop + cardOffsetHeight) - windowHeight - 300){
        card.firstElementChild.firstElementChild.classList.add('slide-in')
        cardControllerItems.forEach(item=>item.classList.add('slide-in'))
        cardContentItem.forEach(item=>{
            item.firstElementChild.classList.add('slide-right')
            item.lastElementChild.classList.add('slide-left')
        })
    }
    if(windowScrollTop > (onlineCourseOffsetTop + onlineCourseOffsetHeight  ) - windowHeight - 300 ){
        timerContent.classList.add('slide-right')
        registerForm.classList.add('slide-left')
    }
    if(windowScrollTop > (newCourseOffsetTop + newCourseOffsetHeight) - windowHeight - 300){
        newCourse.firstElementChild.firstElementChild.classList.add('slide-in')
        newCourses.forEach(item=>{
            item.classList.add('slide-in')
        })
    }
    if(windowScrollTop > (presentationOffsetTop + presentationOffsetHeight) - windowHeight - 300){
        presentationContent.firstElementChild.classList.add('slide-right')
        presentationContent.lastElementChild.classList.add('slide-left')
    }
    if(windowScrollTop > (contactOffsetTop + contactOffsetHeight) - windowHeight - 300)
    {
        contact.firstElementChild.firstElementChild.classList.add('slide-in')
        contactForm.classList.add('slide-right')
        map.classList.add('slide-left')
        copyRight.classList.add('slide-in')
    }
}