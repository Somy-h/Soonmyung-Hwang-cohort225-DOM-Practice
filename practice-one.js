
//----------------------------------------------------------------
// Searching Elements : element.closest, element.match, getElement*, querySelector*
// 1. elem.closest(cssSelector) => the nearest ancestor
//    elem.sytle.backgroundColor, elem.sytle.color
let chapter = document.querySelector('.chapter');
chapter.closest('.contents').style.backgroundColor = 'black'; // select ancestor <div></div>
chapter.closest('.contents').style.color = 'white';


// creating ul tag by createElement()
let bookUl = document.querySelector('.book');
for (let i = 0; i < 10; i++) {
  let li = document.createElement('li');
  li.innerText = 'Chapter ' + (i + 4) + ' created by createElement()';
  li.classList.add('chapter');
  if (i % 2 === 0) { 
    li.classList.add('highlight');
  }
  bookUl.appendChild(li);
}


// 2. matches with link ending with "com"
for (let elem of document.querySelectorAll('.chapter-link')) {
  if (elem.matches('a[href$="com"]')) {
    elem.style.color = 'red';
  }
} 


// 3. Search by ID
const btnHeaderStyle = document.getElementById("btn-header-style");
btnHeaderStyle.addEventListener("click", headerStyle);

function headerStyle() {
  // 4. Search by Tag name getElementsByTagName()
  let h1s = document.getElementsByTagName('h1');
  for (headerElement of h1s) {
    headerElement.style.fontSize = '2rem';
    
    headerElement.style.color = btnHeaderStyle.classList.contains('active') ? 'black' : 'red';
  };

  // classList.toggle
  btnHeaderStyle.classList.toggle('active');
}


// console.log vs. console.dir
console.log(document.body); // show the element DOM tree
console.dir(document.body); // show the element as a DOM object


// sytle.cssText
document.getElementById('blank-p').style.cssText = `background-color: pink;
      text-align: center;
      padding: 0.5rem;`;
document.getElementById('blank-p').style.color = 'blue';


// 5. Search by querySelector
// innerHTML vs textContent
// button click event handler
document.querySelector('#btn-createHTML').addEventListener('click', () => {
  document.querySelector('.blank-container').innerHTML = 
      '<p style="font-size: 2rem">Created by innerHTML</p><small>small section created by innerHTML</small>';
  document.querySelector('.blank-container').style.color = "blue";
  document.querySelector('#blank-div').textContent = "Changed by textContent"
  document.querySelector('#blank-div').style.color = "green";
});
document.querySelector('#blank-div').style.margin = "1rem 0";


// DOM Node class
console.log(document.body instanceof HTMLBodyElement); // true
console.log(document.body instanceof HTMLElement); // true
console.log(document.body instanceof Element); // true
console.log(document.body instanceof Node); // true
console.log(document.body instanceof EventTarget); // true => root "abstract" class for everything
console.log(document.body instanceof Document); // false
console.log(document.body instanceof CharacterData); // false


// nodeType - document, element, text
// nodeName
console.log(document.body.nodeType); // 1 -> element
console.log(document.body.nodeName); // BODY
console.log(document.body.firstChild.nodeType); // 8 -> comment
console.log(document.body.firstChild.nodeName); // #comment
console.log(document.nodeType); // 9 -> document
console.log(document.nodeName); // #document


// nextSibling 
console.log(document.body.firstChild.nextSibling.nodeType); // 3 -> text
console.log(document.body.firstChild.nextSibling.nodeName); // #text
console.log(document.body.firstChild.nextSibling.nextSibling.nodeType); // 1 -> element
console.log(document.body.firstChild.nextSibling.nextSibling.nodeName); // H1


// firstElementChild with hidden property
// make blinking with hidden property : same effect with style="display: none"
const h1Elm = document.body.firstChild.nextSibling.nextSibling.firstElementChild; // span
console.log(h1Elm.nodeName); // SPAN
setInterval( () => h1Elm.hidden = ! h1Elm.hidden, 1000); // every 1sec blinking


// attributes of element
// set attribute
btnHeaderStyle.setAttribute('test', 'button-test');
btnHeaderStyle.setAttribute('style', 'border-radius: 20px');
// get attributes
for (let attr of btnHeaderStyle.attributes) {
  console.log(`Button attributes: ${attr.name} = ${attr.value}`); // id, class, test, style
}

// check for existence & remove of attribute
if (btnHeaderStyle.hasAttribute('test')) {
  btnHeaderStyle.removeAttribute('test');  // remove attribute
}

// get attributes
for (let attr of btnHeaderStyle.attributes) {
  console.log(`Button attributes: ${attr.name} = ${attr.value}`); // id, class, style
}

// Create, insert, remove nodes 
document.getElementById('btn-createElms').addEventListener('click', () => {
  let divElm = document.createElement('div');
  divElm.style.padding = '1rem';
  divElm.style.backgroundColor = '#F5AFAA';
  let textNode = document.createTextNode('Created by createElement()');
  let p1elm = document.createElement('p');
  p1elm.innerText = "createElement with append() p1";
  divElm.append(p1elm);
 
  let p2elm = document.createElement('p');
  p2elm.innerText = "createElement with prepend() p2. Will be removed soon."
  divElm.prepend(p2elm);
  divElm.appendChild(textNode);
  document.body.appendChild(divElm);

  // insert before() and after()
  divElm.before('inserted div.before. Will be removed in 5sec -->', document.createElement('hr'));
  divElm.after('inserted div.after', document.createElement('hr'));

  // remove node
  //setTimeout(() => p2elm.remove(), 1000);
  setTimeout(() => divElm.remove(), 5000); // delete div in 5sec => before, after parts are left
});


// getComputedStyle()
console.log('style node:' + document.body.firstChild.nextSibling.nextSibling.nodeName); // H1 
console.log('sytle.color:' + document.body.firstChild.nextSibling.nextSibling.style.color + 'value is null. it should use getComputedStyle()'); // H1 
// SHOULD use getComputedStyle() instead of style.color
console.log('getComputedSytle().color:' + getComputedStyle(document.body.firstChild.nextSibling.nextSibling).color); // H1 


// Element size and scrolling
const exampleDiv = document.getElementById('example');
const divBlankSize = document.getElementById('blank-size');
console.log(exampleDiv.offsetLeft  + ', ' + exampleDiv.offsetTop);
divBlankSize.innerHTML = '<p>parent: ' + exampleDiv.offsetParent.nodeName;
divBlankSize.innerHTML += 'offsetLeft: ' + exampleDiv.offsetLeft;
divBlankSize.innerHTML += ', offsetTop: ' + exampleDiv.offsetTop;
divBlankSize.innerHTML += ', offsetWidth: ' + exampleDiv.offsetWidth;
divBlankSize.innerHTML += ', offsetHeight: ' + exampleDiv.offsetHeight;


divBlankSize.innerHTML += '<br>clientLeft: ' + exampleDiv.clientLeft;
divBlankSize.innerHTML += ', clientTop: ' + exampleDiv.clientTop;
divBlankSize.innerHTML += ', clientWidth: ' + exampleDiv.clientWidth;
divBlankSize.innerHTML += ', clientHeight: ' + exampleDiv.clientHeight;

divBlankSize.innerHTML += '<br>getBoundingClientRect().left: ' + exampleDiv.getBoundingClientRect().left;
divBlankSize.innerHTML += ', getBoundingClientRect().top: ' + exampleDiv.getBoundingClientRect().top;
divBlankSize.innerHTML += ', getBoundingClientRect().width: ' + exampleDiv.getBoundingClientRect().width;
divBlankSize.innerHTML += ', getBoundingClientRect().height: ' + exampleDiv.getBoundingClientRect().height;
document.body.append(divBlankSize);

let divInfoElm = null;
exampleDiv.addEventListener('scroll', (e) => {
  if (e.target.id === 'example') {
  let message = 'scrollLeft: ' + exampleDiv.scrollLeft;
  message += ', scrollTop: ' + exampleDiv.scrollTop;
  message += ', scrollWidth: ' + exampleDiv.scrollWidth;
  message += ', scrollHeight: ' + exampleDiv.scrollHeight;
  message += ', scroll bottom: ' + (exampleDiv.scrollHeight - exampleDiv.scrollTop - exampleDiv.clientHeight);
  document.body.append(createScrollInformation(e.target, message));
  }
});

// elementFromPoint(x, y)
let elem = document.elementFromPoint(exampleDiv.offsetLeft, exampleDiv.offsetTop);
console.log(elem.nodeName); // DIV
console.log(elem.id); // example

// create div of absoute position about scroll information
function createScrollInformation(elem, message) {
  if (divInfoElm == null || divInfoElm.id != 'info') {
    divInfoElm = document.createElement('div');
    divInfoElm.id = "info";
  } 
  divInfoElm.style.cssText = "position: absolute; color: blue";
  //console.log("client:" + elem.offsetLeft + "," + elem.offsetTop);
  //console.log("Boundingclient:" + elem.getBoundingClientRect().left + "," + elem.getBoundingClientRect().bottom);
  divInfoElm.style.left = (elem.offsetLeft) + 'px';
  divInfoElm.style.top = (elem.offsetTop) + 'px';
  divInfoElm.innerText = message;
  return divInfoElm;
}