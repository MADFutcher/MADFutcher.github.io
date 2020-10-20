class Ghost{
    constructor(posX,posY,path,speed){
        this.x = posX
        this.y = posY
        this.count = 0;
        this.speed = speed
        this.path = path;
        this.height = 50
        this.width = 50
    }

    createGhost(){
        if(this.count>0 && this.count < this.path.length-5){
            this.x = this.path[this.count-1].x
            this.y = this.path[this.count-1].y
        }else{
            this.getNewPath()
        }

        // //Boundary box - not visible when live!
        // ctx.beginPath();
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.stroke();

        ctx.strokeStyle="black";
        ctx.lineWidth="1";
        ctx.fillStyle="rgba(255, 255, 255, 0.4)";
        //upper part
        ctx.beginPath(); 
        let boxH = this.y+this.height-10
        let boxW = this.x+this.width
        ctx.moveTo(this.x, boxH);
        ctx.quadraticCurveTo(this.x + 23, this.y-40, boxW, boxH);

        // now the bottom part
        ctx.moveTo(this.x, boxH);
        ctx.quadraticCurveTo(this.x+5, boxH+10, this.x+10, boxH)
        ctx.moveTo(this.x+10, boxH);
        ctx.quadraticCurveTo(this.x+15, boxH+10, this.x+20, boxH)
        ctx.moveTo(this.x+20, boxH);
        ctx.quadraticCurveTo(this.x+25, boxH+10, this.x+30, boxH)
        ctx.moveTo(this.x+30, boxH);
        ctx.quadraticCurveTo(this.x+35, boxH+10, this.x+40, boxH)
        ctx.moveTo(this.x+40, boxH);
        ctx.quadraticCurveTo(this.x+45, boxH+10, this.x+50, boxH)
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle= this.colour
        ctx.fill();
        ctx.closePath();
        //eyes
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.x +19, this.y+15, 2, 0, Math.PI * 2, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x +29, this.y+15, 2, 0, Math.PI * 2, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.stroke();
        this.count ++
    }

    getNewPath(){
        let newCoords = getPathCoords(this.x, this.y, this.speed)
        this.path = this.path.concat(newCoords)
    }

}

class Food{
    constructor(posX, posY, radius){
        this.x = posX
        this.y = posY
        this.radius = radius
    }
    createFood(){
        ctx.strokeStyle = "#28A745";
        ctx.fillStyle = '#28A745';
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,'anticlockwise')
        ctx.stroke()
        ctx.fill()
    }
}


class Player{
    constructor(posX, posY, radius, health, level, xp, score,){
        this.x = posX
        this.y = posY
        this.health = health
        this.level = level 
        this.xp = xp 
        this.score = score
        this.height = height
        this.width = width
        this.radius = radius
    }
    createPlayer(){
        ctx.strokeStyle = "#DC3545";
        ctx.fillStyle = '#DC3545';
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.stroke()
        ctx.fill()
    }
}