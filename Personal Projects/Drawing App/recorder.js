// place your javascript code here

'use strict';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var sideLength = 5;
let color = "red";
let isDrawing = false; 
let list = null; 
let recorder = null;
ctx.joinCap = "round";
ctx.lineJoin = "round";
let i=100;
let saveList = null; 


function Recorder(){
    this.record = null; 
    
}


Recorder.prototype.play = function (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(this.record !== null){
        let curr = this.record.first; 

        isDrawing = true; 
        while(curr){
       
            draw(curr.pageX,curr.pageY,this.record); 
            curr = curr.next; 
        }
        isDrawing = false; 

    }
}

function startRec(){
    recorder = new Recorder(); 
    recorder.record = new LinkedList(); 
  
}

function stopRec(){
  
    let curr = list.first; 

    while(curr){
        recorder.record.add(curr.pageX,curr.pageY,curr.color);
        curr = curr.next;
       
    }


}

function play(){
    
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   let curr = recorder.record.first; 
   
    let intervalId = setInterval(function(){
    //isDrawing = true; 
    if(curr === null){
      clearInterval(intervalId);
   }
   
   if(curr !== null){
    drawRecording(curr.pageX,curr.pageY, curr.color)
      
    curr = curr.next; 

    }

    }, 40);

  // isDrawing = false; 

}

function drawRecording(xPos, yPos, clr) {
        ctx.fillStyle = clr;
        ctx.fillRect(xPos, yPos, sideLength, sideLength);
}

/************************************************************************************************ */
function Node(pageX, pageY, clr){
    this.pageX = pageX;
    this.pageY = pageY; 
    this.next = null; 
    this.color = clr; 
}

function LinkedList(){

    this.first = null; 
    this.last = null; 
    this.size = 0; 
}

LinkedList.prototype.add = function(pageX, pageY, clr) {
    let node = new Node(pageX,pageY,clr);
   //node.color = clr; 
    let currentNode = this.first;

    if(!currentNode){
        this.first = node; 
        this.last = node; 
        this.size ++; 
    } else {
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        this.size++;    
        this.last = node; 
    }
}

LinkedList.prototype.find = function(pageX,pageY,clr){
    let curr = this.first; 

    while(curr){
        if(curr.pageX == pageX && curr.pageY == pageY && curr.color == clr){
            return curr; 
        }

        curr = curr.next; 
    }

    return null; 
}




function draw(xPos, yPos, lst) {
    if(isDrawing == true){
        
        lst.add(xPos,yPos,color);
     
        let context = document.getElementById("canvas").getContext("2d");
        context.fillStyle = color;
        context.fillStyle = color;
        context.fillRect(xPos, yPos, sideLength, sideLength);
        
    }
    
}

canvas.addEventListener("mousedown", function(evt){

    isDrawing = true; 
    initOrAdd(evt);

    
    canvas.onmousemove = function(e){
        
        draw(e.pageX, e.pageY,list); 
    }

}); 

canvas.addEventListener("mouseup", function(){
    isDrawing = false; 
}); 

canvas.addEventListener("mouseover", function(){
    isDrawing = false; 
}); 

function initOrAdd(evt){
    if (list == null){
        list = new LinkedList();
    } 
        draw(evt.pageX,evt.pageY,list);
    
    
}

function changeBlue(){
    color = "blue"
}
function changeRed(){
    color = "red"
}
function changeGreen(){
    color = "green"
}
function changeYellow(){
    color = "yellow"
}

function clearCanvas(){
    list = null ; 
    if(recorder != null){
        recorder.record = null; 
    }
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function instructions(){
    alert("Welcome to Canvas Drawing recorder!\n You can use this application to free hand draw whatever you like.\n If you wish to start a recording of your drawing, press the Start button and proceed to draw.\nOnce finished drawing, press the Stop button, followed by the play button! \nYou will be shown an animation of the drawing you just created.\nIf you would like to save a particular drawing to local storage, use the Save button. \n When wanting to play this saved recording, use the Retrieve Saved button, and press play afterwards \n If you want to clear the canvas to start fresh as well as delete last recording that's NOT saved, use the Clear Canvas Button. \n\n ENJOY!");
}

function save(){
    saveList = new LinkedList();
    let curr = recorder.record.first; 

    while(curr){
        saveList.add(curr.pageX,curr.pageY,curr.color);
        curr = curr.next; 
    }

    
    localStorage.setItem("save", JSON.stringify(saveList));
}

function retrieve(){

    recorder.record = JSON.parse(localStorage.getItem("save")); 
    
    

}
/*
problem 22 answer .
let {promise} = require ("./promises");

async function examAnswer(){
    let result = await promise; 
    console.log(result);
}

examAnswer(); 
*/