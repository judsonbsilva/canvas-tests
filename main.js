Canvas = {
	context: null,
	runner: function(){
		Canvas.draw();
		animationFrame( Canvas.runner );	
	},
	updateSize: function(){
		this.node.width = this.width = window.innerWidth;
		this.node.height = this.height = window.innerHeight;
	},
	init: function( domElement ){
		this.node = document.createElement('CANVAS');
		this.updateSize();
		document.getElementById(domElement).appendChild(this.node);
		this.context = this.node.getContext('2d');
		animationFrame(this.runner);
	},
	draw: function(){
		var self = this;

		self.context.clearRect(0, 0, self.width, self.height);
		self.draws.forEach(function( fn, index ){

			self.draws[index][1] = fn[0].call(
				self,
				self.context,
				fn[1]
			);
		});
	},
	draws: [
		[ball, { angle: Math.PI/1.2, color: '#0ba599' }],
		[ball, { angle: Math.PI/1.4, color: '#300f56' }],
		[ball, { angle: Math.PI/1.6, color: '#b82a36' }],
		[ball, { angle: Math.PI/1.8, color: '#e86012' }],
		[ball, { angle: Math.PI/2.0, color: '#ebbe4b' }],
		[ball, { angle: Math.PI/2.2, color: '#0ba599' }],
		[ball, { angle: Math.PI/2.4, color: '#300f56' }],	
		[ball, { angle: Math.PI/2.6, color: '#b82a36' }],
		[ball, { angle: Math.PI/2.8, color: '#e86012' }],
		[ball, { angle: Math.PI/3.0, color: '#ebbe4b' }],
		[ball, { angle: Math.PI/3.2, color: '#0ba599' }],
		[ball, { angle: Math.PI/3.4, color: '#300f56' }],
		[ball, { angle: Math.PI/3.6, color: '#b82a36' }],
		[ball, { angle: Math.PI/3.8, color: '#e86012' }],
		[ball, { angle: Math.PI/4.0, color: '#ebbe4b' }]
	]
};

function ball(context, data){

	data.initialTime = data.initialTime || (new Date()).getTime();
	data.velocity = data.velocity || 5;
	data.x = data.x || this.width/2;
	data.y = data.y || this.width/4;
	data.angle = data.angle || Math.PI/4;
	data.increment = data.increment || 0;
	data.radius = data.radius || 20;
			
	var time = ((new Date()).getTime() - data.initialTime ) * 0.1,
		posX = data.x + data.velocity * Math.cos( data.angle ) * time,
		posY = data.y + data.velocity * Math.sin( data.angle ) * time,
		colisionX = posX >= this.width || posX <= 0,
		colisionY = posY >= this.height|| posY <= 0;


	if( colisionY || colisionX ){
		data.initialTime = (new Date()).getTime();
		data.x = posX;
		data.y = posY;
		if( colisionY )
			data.angle = 2 * Math.PI - data.angle;
		if( colisionX )
			data.angle = Math.PI - data.angle;
	}
	
	data.velocity += data.increment;
	
	context.beginPath();
	context.arc(posX, posY, data.radius, 0, 2 * Math.PI, false);
	context.fillStyle = data.color;
	context.fill();
	contex.closePath();
	
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