import '../css/elementLess.less'
import '../css/element.css'
import '../js/element'
import '../font/iconfont.css'

import img from '../img/bg.png'

const divEle = document.createElement('div')
divEle.className = 'title'
divEle.innerHTML='Hello webpack'

const bgDivEle = document.createElement('div')
bgDivEle.className = 'bg-img'

const imgEle = document.createElement('img')
imgEle.src = img;

const iEle = document.createElement('i')
iEle.className = "iconfont icon-ashbin"


document.body.appendChild(divEle)
document.body.appendChild(bgDivEle)
document.body.appendChild(imgEle)
document.body.appendChild(iEle)
