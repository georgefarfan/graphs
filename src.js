const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.scale(2,2);
const days = [ 
              {day:1, mega:"5Mb"},
              {day:2, mega:"10Mb"},
              {day:3, mega:"25Mb"},
              {day:4, mega:"10Mb"},
              {day:5, mega:"10Mb"},
              {day:6, mega:"50Mb"},
              {day:7, mega:"100Mb"},
              {day:8, mega:"50Mb"},
              {day:9, mega:"5Mb"},
              {day:10, mega:"50Mb"},
              {day:11, mega:"10Mb"},
              {day:12, mega:"25Mb"},
              {day:13, mega:"5Mb"},
              {day:14, mega:"5Mb"},
              {day:15, mega:"10Mb"},
              {day:16, mega:"25Mb"},
              {day:17, mega:"10Mb"},
              {day:18, mega:"10Mb"},
              {day:19, mega:"50Mb"},
              {day:20, mega:"100Mb"},
			  {day:21, mega:"50Mb"},
              {day:22, mega:"10Mb"},
              {day:23, mega:"25Mb"},
              {day:24, mega:"5Mb"},
              {day:25, mega:"5Mb"},
              {day:26, mega:"10Mb"},
              {day:27, mega:"25Mb"},
              {day:28, mega:"10Mb"},
              {day:29, mega:"10Mb"},
              {day:30, mega:"50Mb"}
              ];
const megas = ['100Mb', '50Mb', '25Mb', '10Mb', '5Mb'];
const width = 600;
let separate = 40;
let lineForMegas = []

// Draw Days
days.forEach(DAY => {
  ctx.font='bold 10px Arial';
	ctx.fillText(DAY.day, separate ,300);
  separate += 18;
})

//Draw megas

let separateY = 25;
megas.forEach(MEGA => {
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

drawLinesGraph();
drawMegaLines();
drawBarLine();

function drawBarLine() {
  let posXBarLine = 45;
  let pos = 0;
	days.forEach( DAY => {
  	let selectedMega = searchPosYMegas(DAY.mega);
    if (pos+1 < days.length) {
    		let nextMega = searchPosYMegas(days[pos+1].mega);
    		drawLine(posXBarLine, selectedMega, nextMega);
    }
    drawDot(posXBarLine, selectedMega.pos.y);
    posXBarLine += 18;
    pos+=1;
  })
}

function drawLine(posXBarLine,previousMega, nextMega) {
    ctx.beginPath();
    ctx.moveTo(posXBarLine, previousMega.pos.y);
    ctx.lineTo(posXBarLine+18, nextMega.pos.y);
    ctx.lineWidth = 1;
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

function drawDot(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX,posY, 3,10, 0, Math.PI * 2);
  ctx.strokeStyle = '#74ace5';
  ctx.stroke();
  ctx.fillStyle = "#74ace5";
  ctx.fill();
  ctx.closePath();
}




 



