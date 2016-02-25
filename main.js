Canvas = {
	context: null,

	defaults: {
		ball: {
			velocity:1, x:0, y:0,
			angle: Math.PI/4, alpha: 0.2,
			increment: 0, radius:100
		}
	},
	runner: function(){
		Canvas.draw();
		Canvas.runnerCode = animationFrame( Canvas.runner );
	},
	updateSize: function(){
		this.node.width = this.width = window.innerWidth;
		this.node.height = this.height = window.innerHeight;
	},
	init: function( domElement ){
		this.node = document.createElement('CANVAS');
		this.updateSize();
		this.container = document.getElementById(domElement);
		this.container.appendChild(this.node);
		this.context = this.node.getContext('2d');
		this.runnerCode = animationFrame(this.runner);
	},
	draw: function(){
		var self = this;
		self.context.clearRect(0, 0, self.width, self.height);
		self.draws.forEach(function( fn, index ){
			self.draws[index][1] = fn[0].call(self,self.context,fn[1]);
		});
	},
	resetData:function(){
		this.container.removeChild( this.node );
		var self = this;
		this.draws.forEach(function( fn, index ){
			self.draws[index][1] = {
				angle: fn[1].angle,
				color: fn[1].color,
				text: fn[1].text
			};
		});
		window.setTimeout(function(){
			console.log("Run Forrest, run!");
			self.init('container');
		}, 50);
	},
	draws: [
		[ball, { angle: Math.PI/6, color: '#0ba599' }],
		[ball, { angle: Math.PI/4, color: '#300f56' }],
		[ball, { angle: Math.PI/3, color: '#b82a36' }],
		[ball, { angle: 2*Math.PI/3, color: '#e86012' }],
		[ball, { angle: 3*Math.PI/4, color: '#ebbe4b' }],
		[ball, { angle: 5*Math.PI/6, color: '#0ba599' }],
		[ball, { angle: 7*Math.PI/6, color: '#300f56' }],	
		[ball, { angle: 5*Math.PI/4, color: '#b82a36' }],
		[ball, { angle: 4*Math.PI/3, color: '#e86012' }],
		[ball, { angle: 5*Math.PI/3, color: '#ebbe4b' }],
		[ball, { angle: 7*Math.PI/4, color: '#0ba599' }],
		[ball, { angle: 11*Math.PI/6, color: '#300f56' }],
		/*[ball, { angle: Math.PI/3.6, color: '#b82a36' }],
		[ball, { angle: Math.PI/3.8, color: '#e86012' }],
		[ball, { angle: Math.PI/4.0, color: '#ebbe4b' }],
		[ball, { angle: Math.PI/0.1, color: '#0ba599' }],
		[ball, { angle: Math.PI/0.2, color: '#300f56' }],	
		[ball, { angle: Math.PI/0.3, color: '#b82a36' }],
		[ball, { angle: Math.PI/0.4, color: '#e86012' }],
		[ball, { angle: Math.PI/0.5, color: '#ebbe4b' }],
		[ball, { angle: Math.PI/0.6, color: '#0ba599' }],
		[ball, { angle: Math.PI/0.7, color: '#300f56' }],
		[ball, { angle: Math.PI/0.8, color: '#b82a36' }],
		[ball, { angle: Math.PI/0.9, color: '#e86012' }],*/
		[text, { text: 'Clique para mudar a animação' }]
	]
};

function text(context, data){

	var ratio = 40 / 1000,
		fontSize = this.width * ratio;

	context.beginPath();
	context.font = fontSize + 'px Helvetica, Arial';
	context.fillStyle = '#000';
	context.textAlign = 'center';
	context.globalAlpha = 0.6;
	context.fillText(data.text, this.width/2, this.height/2);
	context.closePath();
	context.globalAlpha = 1;
	return data;
}

function ball(context, data){

	data.initialTime = data.initialTime || (new Date()).getTime();
	data.lastTime = data.lastTime || data.initialTime;
	data.velocity = data.velocity || this.defaults.ball.velocity;
	data.radius = data.radius || this.defaults.ball.radius;
	data.x = data.x || this.width /2;
	data.y = data.y || this.height/2;
	data.alpha = data.alpha || this.defaults.ball.alpha;
	data.angle = data.angle || this.defaults.ball.angle;
	data.increment = data.increment || this.defaults.ball.increment;
			
	var time = ((new Date()).getTime() - data.lastTime ) * 0.1,
		posX = data.x + data.velocity * Math.cos( data.angle ) * time;
		posY = data.y + data.velocity * Math.sin( data.angle ) * time,
		colisionX = posX >= this.width || posX <= 0,
		colisionY = posY >= this.height|| posY <= 0;

	if( posX < 0 ) posX = 1;
	if( posY < 0 ) posY = 1;
	if( posX > this.width ) posX = this.width - 1;
	if( posY > this.height ) posY = this.height - 1;


	if( colisionY || colisionX ){
		data.lastTime = (new Date()).getTime();
		data.x = posX;
		data.y = posY;
		if( colisionY )
			data.angle = 2 * Math.PI - data.angle;
		if( colisionX )
			data.angle = Math.PI - data.angle;
	}
	
	if( data.velocity > 1 )
		data.velocity += data.increment;
	else
		data.velocity = 1;
	
	context.beginPath();
	context.globalAlpha = data.alpha;
	context.arc(posX, posY, data.radius, 0, 2 * Math.PI, false);
	context.fillStyle = data.color;
	context.fill();
	context.closePath();
	
	return data;
};

window.animationFrame = (function(){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000 / 60) };
})();

window.addEventListener('resize', function(){
	Canvas.updateSize.call(Canvas);
});

var newDefault = {
	velocity: 5,
	radius: 20,
	alpha: 1,
	angle: Math.PI/4,
	increment: 0
};

function changeAnimation(){
	var temp = Object.create(newDefault);
	newDefault = Object.create(Canvas.defaults.ball);
	Canvas.defaults.ball = temp;
	Canvas.resetData();
}

window.addEventListener('click',changeAnimation);
window.addEventListener('touchstart',changeAnimation);
