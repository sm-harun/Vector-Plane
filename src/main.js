class Plane {
    
    // this.vectorA = {
    //     xPos: null,
    //     yPos: null,
    // }
    
    // this.vectorB = {
    //     xPos: null,
    //     yPos: null,
    // }
    
    constructor(context, canvasWidth, canvasHeight, divisions) {
        this.context = context;
        
        this.xOrigin = canvasWidth / 2;
        this.yOrigin = canvasHeight / 2;
        
        this.maxWidth = canvasWidth;
        this.maxHeight = canvasHeight;
        
        // This sets how much space one magnitude holds.
        this.divisions = this.maxHeight/divisions;
    }
    
    drawPlane() {
        this.context.beginPath();
        this.context.strokeStyle = "white";
        
        this.context.moveTo(0, this.yOrigin);
        this.context.lineTo(this.maxWidth, this.yOrigin);
        
        this.context.moveTo(this.xOrigin, 0);
        this.context.lineTo(this.xOrigin, this.maxHeight);
        
        this.context.stroke();
        this.context.closePath();
    }
    
    drawVector(x, y, vector) {
        
        this.context.beginPath();
        
        if (vector == "A") {
            this.context.strokeStyle = "red";
        } else if (vector == "B") {
            this.context.strokeStyle = "blue";
        }
        
        this.context.moveTo(this.xOrigin, this.yOrigin);
        this.context.lineTo(this.xOrigin + x*this.divisions, this.yOrigin - y*this.divisions);
        
        // It saves the coords of the vector to erase them easily later.
        // if (vector == "A") {
        //     vectorA.xPos = this.xOrigin + x*this.divisions;
        //     vectorA.yPos = this.yOrigin - y*this.divisions;
        // } else if (vector == "B") {
        //     vectorA.xPos = this.xOrigin + x*this.divisions;
        //     vectorA.yPos = this.yOrigin - y*this.divisions;
        // }
        
        this.context.stroke();
        this.context.closePath();
    }
}

let canvas = document.getElementById("main-canvas");
let cxt = canvas.getContext("2d");

canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight;

let plane = new Plane(cxt, canvas.width, canvas.height, 20);

plane.drawPlane();

let firstVectorButton = document.getElementById("first-vector-button");
let secondVectorButton = document.getElementById("second-vector-button");

firstVectorButton.addEventListener("click", function() {
    
    let xCord = document.getElementById("first-vector-x").value;
    let yCord = document.getElementById("first-vector-y").value;
    
    plane.drawVector(xCord, yCord, "A");
    
    let text = document.getElementById("first-vector-text");
    text.textContent = xCord + "i + " + yCord + "j";
});

secondVectorButton.addEventListener("click", function() {
    let xCord = document.getElementById("second-vector-x").value;
    let yCord = document.getElementById("second-vector-y").value;
    
    plane.drawVector(xCord, yCord, "B");
    
    let text = document.getElementById("second-vector-text");
    text.textContent = xCord + "i + " + yCord + "j";
});