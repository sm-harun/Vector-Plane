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
        
        this.context.moveTo(0, yOrigin);
        this.context.lineTo(maxWidth, yOrigin);
        
        this.context.moveTo(xOrigin, 0);
        this.context.lineTo(xOrigin, maxHeight);
        
        this.context.stroke();
        this.context.closePath();
    }
}

export default {Plane};