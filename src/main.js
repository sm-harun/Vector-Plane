function Plane(context, canvasWidth, canvasHeight, sections) {
    
    this.context = context;
    
    this.xOrigin = canvasWidth / 2;
    this.yOrigin = canvasHeight / 2;
    
    this.maxWidth = canvasWidth;
    this.maxHeight = canvasHeight;
    
    // These will store the values of the vectors for redrawing.
    this.aX = 0;
    this.aY = 0;
    
    this.bX = 0;
    this.bY = 0;
    
    this.additionResultantVector = {
        x: this.aX + this.bX,
        y: this.aY + this.bY
    }
    
    // This sets how much space one unit holds.
    this.divisions = this.maxHeight/sections;
    this.sections = sections;
    
    this.drawPlane = function() {
        
        // This draws the main two axis.
        this.context.beginPath();
        this.context.strokeStyle = "white";
        this.context.lineWidth = 2;
        
        this.context.moveTo(0, this.yOrigin);
        this.context.lineTo(this.maxWidth, this.yOrigin);
        this.context.moveTo(this.xOrigin, 0);
        this.context.lineTo(this.xOrigin, this.maxHeight);
        
        this.context.stroke();
        this.context.closePath();
        
        // This draws the grid.
        this.context.beginPath();
        this.context.strokeStyle = "white";
        this.context.lineWidth = 0.5;
        
        for (let i = 0; i < sections*2; i++) {
            
            // Addeds lines after y-axis.
            this.context.moveTo(this.xOrigin + i*this.divisions, 0);
            this.context.lineTo(this.xOrigin + i*this.divisions, this.maxHeight);
            
            // Addeds lines before y-axis.
            this.context.moveTo(this.xOrigin - i*this.divisions, 0);
            this.context.lineTo(this.xOrigin - i*this.divisions, this.maxHeight);
            
            this.context.moveTo(0, this.yOrigin + i*this.divisions);
            this.context.lineTo(this.maxWidth, this.yOrigin + i*this.divisions);
            
            this.context.moveTo(0, this.yOrigin - i*this.divisions);
            this.context.lineTo(this.maxWidth, this.yOrigin - i*this.divisions);
        }
        
        this.context.stroke();
        this.context.closePath();
    }
    
    this.drawVector = function(x, y, vector) {
        
        this.context.beginPath();
        
        if (vector == "A") {
            this.context.strokeStyle = "red";
        } else if (vector == "B") {
            this.context.strokeStyle = "green";
        }
        this.context.lineWidth = 3;
        
        this.context.moveTo(this.xOrigin, this.yOrigin);
        this.context.lineTo(this.xOrigin + x*this.divisions, this.yOrigin - y*this.divisions);
        
        this.context.stroke();
        this.context.closePath();
    }
    
    this.update = function(aXCord, aYCord, bXCord, bYCord) {
        
        this.aX = aXCord;
        this.aY = aYCord;
        this.bX = bXCord;
        this.bY = bYCord;
        
        // This saves the resulant addition vector always instead of recalculating each time.
        this.additionResultantVector = {
            x: parseFloat(aXCord) + parseFloat(bXCord),
            y: parseFloat(aYCord) + parseFloat(bYCord)
        }
        
        this.context.clearRect(0, 0, this.maxWidth, this.maxHeight);
        
        this.drawPlane();
        
        this.drawVector(this.aX, this.aY, "A");
        this.drawVector(this.bX, this.bY, "B");
    }
    
    this.additionResultant = function(showShadow) {
        
        let realVectorAPosition = {
            x: this.xOrigin + this.aX*this.divisions,
            y: this.yOrigin - this.aY*this.divisions
        }
        
        let realVectorBPosition = {
            x: this.xOrigin + this.bX*this.divisions,
            y: this.yOrigin - this.bY*this.divisions
        }
        
        // This section draws the resulant vector itself.
        this.context.beginPath();
        this.context.strokeStyle = "white";
        this.context.lineWidth = 2;
        
        this.context.moveTo(this.xOrigin, this.yOrigin);
        this.context.lineTo(this.xOrigin + this.additionResultantVector.x * this.divisions,
                            this.yOrigin - this.additionResultantVector.y * this.divisions);
        
        this.context.stroke();
        this.context.closePath();
        
        // Checks if the show shadow setting is on.
        if (showShadow) {
            
            // This draws the shadow for vector B.
            this.context.beginPath();
            this.context.strokeStyle = ("rgba(0, 255, 0, 0.3)");
            this.context.lineWidth = 2;
            
            this.context.moveTo(realVectorAPosition.x, realVectorAPosition.y);
            this.context.lineTo(this.xOrigin + this.additionResultantVector.x * this.divisions,
                                this.yOrigin - this.additionResultantVector.y * this.divisions);
            
            this.context.stroke();
            this.context.closePath();
            
            // This draws the shadow for vector A.
            this.context.beginPath();
            this.context.strokeStyle = ("rgba(255, 0, 0, 0.3)");
            this.context.lineWidth = 2;
            
            this.context.moveTo(realVectorBPosition.x, realVectorBPosition.y);
            this.context.lineTo(this.xOrigin + this.additionResultantVector.x * this.divisions,
                                this.yOrigin - this.additionResultantVector.y * this.divisions);
            
            this.context.stroke();
            this.context.closePath();
        }
        
    }
}

let canvas = document.getElementById("main-canvas");
let cxt = canvas.getContext("2d");

canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight;

// This will create a cartesian plane with the speified properties.
let plane = new Plane(cxt, canvas.width, canvas.height, 20);
plane.drawPlane();

function updateUI() {
    
    let aXCord = document.getElementById("first-vector-x").value;
    let aYCord = document.getElementById("first-vector-y").value;
    
    let bXCord = document.getElementById("second-vector-x").value;
    let bYCord = document.getElementById("second-vector-y").value;
    
    // Redraws the entire plane with the new info.
    plane.update(aXCord, aYCord, bXCord, bYCord);
    
    if(document.querySelector('input[name=resultant-operation]:checked')) {
        
        switch(document.querySelector('input[name="resultant-operation"]:checked').value) {
            
            case "addition":
                plane.additionResultant(document.querySelector('input[name="show-shadow"]:checked'));
                
                //Set the text of the resultant-vector too.
                let arv = plane.additionResultantVector;
                document.querySelector("#resultant-vector p").textContent = arv.x + "i + " + arv.y + "j";
                break;
                
            case "subtraction":
                
                break;
        }
    }
    
    let firstVectorText = document.getElementById("first-vector-text");
    let secondVectorText = document.getElementById("second-vector-text");
    
    firstVectorText.textContent = aXCord + "i + " + aYCord + "j";
    secondVectorText.textContent = bXCord + "i + " + bYCord + "j";
    
    requestAnimationFrame(updateUI);
}

updateUI();