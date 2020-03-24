const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); 
//ctx.scale(2,2);
const days = [ 
              {day:1,  type: 'day',mega:"5Mb"},
              {day:'13 hs',  type: 'time',mega:"10Mb"},
              {day:'15 hs',  type: 'time',mega:"25Mb"},
              {day:'16 hs',  type: 'time',mega:"10Mb"},
              {day:'20 hs',  type: 'time',mega:"10Mb"},
              {day:6,  type: 'day',mega:"50Mb"},
              {day:'10 hs',  type: 'time',mega:"100Mb"},
              {day:'13 hs',  type: 'time',mega:"50Mb"},
              {day:'18 hs',  type: 'time',mega:"5Mb"},
              {day:'19 hs', type: 'time', mega:"50Mb"},
              {day:'20 hs', type: 'time', mega:"10Mb"},
              {day:12, type: 'day', mega:"25Mb"},
              {day:'9 hs', type: 'time', mega:"5Mb"},
              {day:'11 hs', type: 'time', mega:"5Mb"},
              {day:'13 hs', type: 'time', mega:"10Mb"},
              {day:'16 hs', type: 'time', mega:"25Mb"},
              {day:17, type: 'day', mega:"10Mb"},
              {day:'8:30 hs', type: 'time', mega:"10Mb"},
              {day:'10:30 hs', type: 'time', mega:"50Mb"},
              {day:'17:30 hs', type: 'time', mega:"100Mb"},
			        {day:21, type: 'day', mega:"50Mb"},
              {day:'11:30 hs', type: 'time', mega:"10Mb"},
              {day:'13:30 hs', type: 'time', mega:"25Mb"},
              {day:'20:30 hs', type: 'time', mega:"5Mb"},
              {day:'22:30 hs', type: 'time', mega:"5Mb"},
              {day:26, type: 'day', mega:"10Mb"},
              {day:'8:30 hs', type: 'time', mega:"25Mb"},
              {day:'11:30 hs', type: 'time', mega:"10Mb"},
              {day:'22:30 hs', type: 'time', mega:"10Mb"},
              {day:'23:30 hs', type: 'time', mega:"50Mb"},
   
              ];
const megas = ['100Mb', '50Mb', '25Mb', '10Mb', '5Mb'];
let lineForMegas = [];
const separateInc = ((1200 - 40)/ days.length) - 20;
let DAYS_DOTS = [];



CanvasRenderingContext2D.prototype.dotTooltip = function () {
  return this;
}

CanvasRenderingContext2D.prototype.dotRounded = function () {
  return this;
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

// Draw all Graph and components
drawGraph();


canvas.addEventListener('mousemove', function(e) {
  let x = e.pageX - canvas.offsetLeft;
  let y = e.pageY - canvas.offsetTop;
 
  let selectedDayDot = searchDayDot(x, y);
  if(selectedDayDot) {
    drawGraph();
    createTooltip(selectedDayDot.day.mega, selectedDayDot.pos_x.rad_x1, selectedDayDot.pos_y.rad_y1)
  } else {
    drawGraph();
  }
}, 0);

function createTooltip(text, posX, posY) {
  ctx.fillStyle = '#ddd';
  //or .fill() for a filled rect
  ctx.roundRect(posX - 20, posY - 20, 80, 40, 10).fill(); 

  // Title
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px verdana';
  ctx.fillText(text,  posX - 10 , posY );

  // Description

  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px verdana';
  ctx.fillText(text,  posX - 10 , posY +10);
}

function drawGraph() {
  resetGraph();
  drawDayAxisX()
  drawMegasAxixY();
  drawLinesGraph();
  drawMegaLines();
  drawBarLine();
}

function resetGraph() {
  DAYS_DOTS = [];
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1200, 640)
  
}

function drawMegasAxixY() {
    //Draw megas
    let separateY = 25;
    megas.forEach(MEGA => {
      ctx.fillStyle = "black";
      ctx.font = "bold 10px Arial ";
      ctx.fillText(MEGA, 5 , separateY);
      lineForMegas.push({
        mega: MEGA,
        pos: {
          x: 42,
          y: separateY
        }
      });
      separateY += 50;
    })
}

function drawDayAxisX() {
    // Draw Days
    let separate = 40;
    days.forEach(DAY => {
      ctx.fillStyle = DAY.type === 'day' ? 'black' : 'grey';
      ctx.font= DAY.type === 'day' ? 'bold 10px Arial' : '10px Arial';
      let text = DAY.type === 'day' ? DAY.day : '' ;
      ctx.fillText(text, separate ,300);
      separate += separateInc;
    })
}

function drawBarLine() {
  let posXBarLine = 45;
  let pos = 0;
	days.forEach( DAY => {
  	let selectedMega = searchPosYMegas(DAY.mega);
    if (pos+1 < days.length) {
    		let nextMega = searchPosYMegas(days[pos+1].mega);
    		drawLine(posXBarLine, selectedMega, nextMega);
    }
    drawDot(DAY,posXBarLine, selectedMega.pos.y);
    posXBarLine += separateInc;
    pos+=1;
  })
}

function drawLine(posXBarLine,previousMega, nextMega) {
    ctx.beginPath();
    ctx.moveTo(posXBarLine, previousMega.pos.y);
    let nextMegaValue = Number(nextMega.mega.split('M')[0]) ;
    let prevMegaValue = Number(previousMega.mega.split('M')[0]);
    if( nextMegaValue === prevMegaValue) {
      ctx.lineTo(posXBarLine+separateInc, nextMega.pos.y);
    } else {
      if (nextMegaValue > prevMegaValue) {
        ctx.bezierCurveTo(posXBarLine+separateInc- 5, nextMega.pos.y, posXBarLine+separateInc  , nextMega.pos.y, posXBarLine+separateInc, nextMega.pos.y);  
      } else {
        ctx.bezierCurveTo(posXBarLine+separateInc - 5, nextMega.pos.y - 40   , posXBarLine+separateInc , nextMega.pos.y, posXBarLine+separateInc, nextMega.pos.y);  
      }
    }
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#28d9e1';
    ctx.stroke();  
}

function searchPosYMegas(mega) {
	return lineForMegas.find(lineMega => lineMega.mega === mega)
}

function drawLinesGraph() {
  // Line
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, 280);
  ctx.lineTo(580, 280);
  ctx.lineWidth = 0.15;
  ctx.strokeStyle = '#2b2b2b';
  ctx.stroke();
}

function drawMegaLines() {
  lineForMegas.forEach(line => {
    ctx.beginPath();
    ctx.moveTo(line.pos.x, line.pos.y);
    ctx.lineTo(580, line.pos.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f3f3f3';
    ctx.stroke();
  })
}

function drawDot(day, posX, posY) {
  DAYS_DOTS.push({
    pos_x : {
      rad_x1: Math.round(posX-5),
      rad_x2: Math.round(posX+5),
    },
    pos_y : {
      rad_y1: Math.round(posY-10),
      rad_y2: Math.round(posY+10),
    },
    day: day
  });
  ctx.beginPath();
  ctx.arc(posX,posY, 3,10, 0, Math.PI * 2);
  ctx.strokeStyle = '#74ace5';
  ctx.stroke();
  ctx.fillStyle = "#74ace5";
  ctx.fill();
  ctx.closePath();
}

function searchDayDot(posX, posY) {
  return DAYS_DOTS.find(dayDot => 
   (posX >= dayDot.pos_x.rad_x1  && posX <= dayDot.pos_x.rad_x2  ) &&
   (posY >= dayDot.pos_y.rad_y1  && posY <= dayDot.pos_y.rad_y2  )
 );
}