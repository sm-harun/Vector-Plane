class Plane {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        
        this.xOrigin = canvasWidth / 2;
        this.yOrigin = canvasHeight / 2;
        
        this.maxWidth = canvasWidth;
        this.maxHeight = canvasHeight;
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
}

let canvas = document.getElementById("main-canvas");
let cxt = canvas.getContext("2d");

let plane = new Plane(cxt, canvas.width, canvas.height);

plane.drawPlane();