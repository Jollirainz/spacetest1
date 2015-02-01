// kynd.info 2014

function onMouseUp(event){
if(counter){
balls[counter].vector = mousevel;
	counter = NaN;
	}
	isdragging =false;
}

function onMouseDown(event){
counter =checkcontains(event.point);
isdragging =true;
}

function checkcontains(point){
for(var i=0;i<balls.length; i++){
if(balls[i].path.contains(point)==true){
return i;
}
}
}

function renewmousevel(point){
mouseold=mousenew;
mousenew=point;
mousevel=new Point(-mouseold+mousenew);
}

var ismousevelcalculating=false;

function mousevelconstcalc(point){
if(isdragging=true){
if(ismousevelcalculating==false){
ismousevelcalculating =true;
mousenew = point; 
var mousevel=new Point(0,0);
}
else{
renewmousevel(point);
}
}
}

function stopmousevelconstcalc(){
ismousevelcalculating=false;
}

function onMouseMove(event){
mousevelconstcalc(event.point);
if(counter){
balls[counter].vector=0
balls[counter].point=event.point;
}
}

var mouseold;
var mousenew;
var mousevel;
var isdragging;
var counter;


function Ball(r, p, v) {
	this.radius = r;
	this.point = p;
	this.vector = v;
	this.maxVec = 15;
	this.numSegment = Math.floor(r / 3 + 2);
	this.boundOffset = [];
	this.boundOffsetBuff = [];
	this.sidePoints = [];
	this.path = new Path({
		/*
		fillColor: {
			hue: Math.random() * 360,
			saturation: 1,
			brightness: 1,
			
		}*/
		
		fillColor: {
			saturation: 1,
			brightness: 1,
		},
		fillColor: "white"
		,
		blendMode: 'screen',
		
	});
	this.path.strokeColor="black";
	this.path.strokeWidth=2;
	this.path.closed=true;

	for (var i = 0; i < this.numSegment; i ++) {
		this.boundOffset.push(this.radius);
		this.boundOffsetBuff.push(this.radius);
		this.path.add(new Point());
		this.sidePoints.push(new Point({
			angle: 360 / this.numSegment * i,
			length: 1
			
		}));
	}
	
}


Ball.prototype = {
	iterate: function() {
		this.checkBorders();
		if (this.vector.length > this.maxVec)
			this.vector.length = this.maxVec;
		this.point += this.vector;
		this.updateShape();
	},

	checkBorders: function() {
		var size = view.size;
		if (this.point.x < -this.radius)
			this.point.x = size.width + this.radius;
		if (this.point.x > size.width + this.radius)
			this.point.x = -this.radius;
		if (this.point.y < -this.radius)
			this.point.y = size.height + this.radius;
		if (this.point.y > size.height + this.radius)
			this.point.y = -this.radius;
	},

	updateShape: function() {
		var segments = this.path.segments;
		for (var i = 0; i < this.numSegment; i ++)
			segments[i].point = this.getSidePoint(i);

		this.path.smooth();
		for (var i = 0; i < this.numSegment; i ++) {
			if (this.boundOffset[i] < this.radius / 4)
				this.boundOffset[i] = this.radius / 4;
			var next = (i + 1) % this.numSegment;
			var prev = (i > 0) ? i - 1 : this.numSegment - 1;
			var offset = this.boundOffset[i];
			offset += (this.radius - offset) / 15;
			offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
			this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
		}
	},

	react: function(b) {
		var dist = this.point.getDistance(b.point);
		if (dist < this.radius + b.radius && dist != 0) {
			var overlap = this.radius + b.radius - dist;
			var direc = (this.point - b.point).normalize(overlap * 0.015);
			this.vector += direc;
			b.vector -= direc;

			this.calcBounds(b);
			b.calcBounds(this);
			this.updateBounds();
			b.updateBounds();
		}
	},

	getBoundOffset: function(b) {
		var diff = this.point - b;
		var angle = (diff.angle + 180) % 360;
		return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
	},

	calcBounds: function(b) {
		for (var i = 0; i < this.numSegment; i ++) {
			var tp = this.getSidePoint(i);
			var bLen = b.getBoundOffset(tp);
			var td = tp.getDistance(b.point);
			if (td < bLen) {
				this.boundOffsetBuff[i] -= (bLen  - td) / 2;
			}
		}
	},

	getSidePoint: function(index) {
		return this.point + this.sidePoints[index] * this.boundOffset[index];
	},

	updateBounds: function() {
		for (var i = 0; i < this.numSegment; i ++)
			this.boundOffset[i] = this.boundOffsetBuff[i];
	}
};

//--------------------- main ---------------------

var balls = [];
var numBalls = 7;
for (var i = 0; i < numBalls; i++) {
	var position = Point.random() * view.size;
	var vector = new Point({
		angle: 360 * Math.random(),
		length: Math.random() * 0
	});
	var radius = Math.random() * 60 + 60;
	balls.push(new Ball(radius, position, vector));
}

function onFrame() {
	for (var i = 0; i < balls.length - 1; i++) {
		for (var j = i + 1; j < balls.length; j++) {
			balls[i].react(balls[j]);
		}
	}
	for (var i = 0, l = balls.length; i < l; i++) {
		balls[i].iterate();
	}
}