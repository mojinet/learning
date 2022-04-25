const leftElt = document.getElementById('left')
const rightElt = document.getElementById('right')
const controlElts = document.getElementById('controls').children
const slideImgElt = document.getElementById('slider-img')
const img = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
]

// init
controlElts[0].classList.add('controlSelect')
let indexImg = 1
let infiniteLoop;

// infinite loop for display all img
function runInterval(){
    infiniteLoop = setInterval(()=>{
        console.log(indexImg)
        slideImgElt.setAttribute('src', `imgs/${img[indexImg]}`)
        updateControlSelect()
        updateIndex()
    },1000)
}


// update index of next img to display
function updateIndex(difference= 1, value = -1){
    if (value !== -1){
        indexImg = value
    }else if (difference === 1 && indexImg === img.length - 1){
        indexImg = 0
    }else if((indexImg + difference) < 0){
        indexImg = img.length - 1
    }else{
        indexImg += difference
    }
}

// update control selected
function updateControlSelect(){
    for (control in controlElts){
        if (control == indexImg){
            controlElts[control].classList.add('controlSelect')
        }else if(control == 0 || control == 1 || control == 2){
            controlElts[control].classList.remove('controlSelect')
        }
    }
}

// refresh with new value
function refreshRender(value = -1){
    updateControlSelect()
    slideImgElt.setAttribute('src', `imgs/${img[indexImg]}`)
    clearInterval(infiniteLoop)
    runInterval()
}

leftElt.addEventListener('click',()=>{
    updateIndex(-1)
    refreshRender()
})
rightElt.addEventListener('click',()=>{
    updateIndex()
    refreshRender()
})
for (let i = 0; i < controlElts.length; i++) {
    controlElts[i].addEventListener('click', (e) =>{
        indexImg = parseInt(e.target.getAttribute('data-id'))
        refreshRender()
    })
}

// start
runInterval()