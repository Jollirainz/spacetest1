var windowdrag=false;
var consolecount =0;
var idnum=0;
var connsq=[];
var project=[];
var currentm;
var currentm;
var squarecount;


window.onload = function(){
createwindow();
}

function objmodule(name,parent){
this.name=name;
if(parent){
this.parent=parent.name;}
}

function createwindow(){
var toolbox = document.createElement("div");
toolbox.className = "toolbox";
document.getElementById("o1").appendChild(toolbox);
createbar(toolbox);
dbentryform(toolbox);
}

function modulepropertyform(){
var form = document.createElement("div");
form.id="moduleproperty";
form.className = "toolbox";
createbar(form);
dbentryform(form);
document.getElementById("o1").appendChild(form);
}

function createbar(w){
var bar=document.createElement("div");
bar.className = "bar";
w.appendChild(bar);
bar.addEventListener("mousedown", dragwindowP,false);
}

function moveWithMouse(w){
alert(w.className);
}

function drag(w,event){
}

function dragwindowP(event){
var w=this.parentNode;
event = event || window.event;
document.addEventListener("mousemove",moveHandler,true);
document.addEventListener("mouseup",upHandler,true);
event.stopPropagation();
event.preventDefault();

function upHandler(e){
document.removeEventListener("mouseup",upHandler,true);
document.removeEventListener("mousemove",moveHandler,true);
e.stopPropagation();
}

function moveHandler(e){
//alert(e.clientX+window.pageXOffset);
w.style.left=e.clientX+window.pageXOffset;
w.style.top=e.clientY+window.pageYOffset;
if(e.stopPropagation) e.stopPropagation();
}
}


function dbentryform(w){
var size=4;
var f = document.createElement("form");
f.id="moduleform";
f.setAttribute('method',"post");
f.setAttribute('action',"submit.php");
var input= new Array(size);
for(var i=0;i<input.length;i++){
input[i]=document.createElement("input");
}
input[0].setAttribute('type',"text");
input[0].setAttribute('name',"name");
input[0].setAttribute('value',"name");
input[1].setAttribute('type',"text");
input[1].setAttribute('name',"function");
input[2].setAttribute('type',"textarea");
input[2].setAttribute('name',"description");
input[3].setAttribute('type',"submit");
input[3].setAttribute('value',"Edit");
for(var i=0;i<input.length;i++){
//f.innerHTML+="Entry "+i;
f.innerHTML+=input[i].name;
f.appendChild(input[i]);
f.innerHTML+="<br>";
}
w.appendChild(f);
//alert(w.form);
}

function mouseoverbox(event){
var w=this;
var box;
var cancreate=true;
if(cancreate){
showbox();
cancreate=false;
}
document.addEventListener("mouseout", outHandler, true);
document.addEventListener("mousedown",outHandler,true);
event.stopPropagation();
event.preventDefault();

function showbox(){
box=document.createElement("div");
box.className="tooltip";
box.style.left=parseInt(w.style.left+"px");
box.style.top=parseInt(w.style.top+"px");
//alert(w.box);
//if(w.box ===undefined && !(w.className==="square")){
addconsoletext("w:"+w.className+" box"+w.box);
//document.getElementById("diagramarea").appendChild(box);
w.appendChild(box);
//}
//box.addEventListener("mouseover", mouseoverbox, false);
}

function outHandler(e){
document.removeEventListener("mouseover",showbox,true);
document.removeEventListener("mouseout",outHandler,true);
if(!(w.className ==="tooltip")){
//document.getElementById("diagramarea").removeChild(box);
w.removeChild(box);
}
event.stopPropagation();
}
}


function isselected(w){
document.getElementById("moduleform").name.value=w.name;
document.getElementById("moduleform").function.value=w.function;
document.getElementById("moduleform").description.value=w.description;
}


function addconsoletext(string){
consolecount++;
//safeguard after 100 entries the console empties
if(consolecount>100){
//document.getElementById("console").value ="";
consolecount=0;
}else{
//document.getElementById("console").value = string+" \n"+document.getElementById("console").value;
}
}



function getbrowserinfo(){
var wh=$(window).height();   // returns height of browser viewport
var dh=$(document).height(); // returns height of HTML document
var ww=$(window).width();   // returns width of browser viewport
var dw=$(document).width(); // returns width of HTML document
var sh=screen.height;
var sw=screen.width;
}
