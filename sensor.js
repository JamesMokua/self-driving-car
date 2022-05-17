class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings=[];
  }
  update(roadBorders) {
    this.#castRays();
    this.readings=[];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(roadBorders, this.rays[i]));
    }
   
  }
 #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
       this.rayCount==1?0.5:i / (this.rayCount - 1)
      )+this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
          
        x: start.x - Math.sin(rayAngle) * this.rayLength,
        y: start.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([ start, end ]);
    } 
  }
  #getReading(ray,roadBorders){
    let touches=[];

    for(let i=0;i<roadBorders.length;i++){
        const border=roadBorders[i];
        const intersection=getIntersection(border[0],border[1],ray[0],ray[1]);
        if(intersection){
            touches.push({  
                border:border,    
                intersection:intersection
            });
        }
      
    }

    if(intersection.length==0){
        return null;
    }else{
        const offsets=intersection.map(e=>e.offset);
        const minOffset=Math.min(...offsets);
        return intersection.find(e=>e.offset==minOffset);
    }
}
 
  draw(ctx){
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    for (let i = 0; i < this.rays.length; i++) {
      const [start, end] = this.rays[i];
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
