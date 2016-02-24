Canvas = {
	context: null,
	init: function( domElement ){
		var container = document.getElementById(domElement);
		
		this.node = document.createElement('CANVAS');
		
		this.node.width = this.width = window.innerWidth || 800;
		this.node.height= this.height = window.innerHeight || 600;

		container.appendChild(this.node);

		this.context = this.node.getContext('2d');

		var self = this,
			initialTime = (new Date()).getTime();

		function letsGo(){
			self.draw(initialTime, Canvas.counter++);
			window.requestAnimationFrame(letsGo);	
		};

		window.requestAnimationFrame(letsGo);
	},
	draw: function(initialTime){
		var self = this;

		self.context.clearRect(0, 0, self.width, self.height);
		self.draws.forEach(function( fn, index ){
			var currentTime = (new Date()).getTime();
			self.draws[index][1] = fn[0].call(
				self,
				self.context,
				currentTime - initialTime,
				fn[1]
			);
		});
	},
	draws: [
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 2,
			color: '#0ba599'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 3,
			color: '#300f56'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 4,
			color: '#b82a36'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 5,
			color: '#e86012'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY: 10,
			radius: 20, angle: Math.PI / 6,
			color: '#ebbe4b'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 7,
			color: '#0ba599'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 8,
			color: '#300f56'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 9,
			color: '#b82a36'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY:10,
			radius: 20, angle: Math.PI / 10,
			color: '#e86012'
		}],
		[ball, {
			x: 20, y:20,
			incX: 10, incY: 10,
			radius: 20, angle: Math.PI / 11,
			color: '#ebbe4b'
		}]
	]
};

function ball(context, time, data){
			
	var posX = data.x * Math.cos( data.angle ),
		posY = data.y * Math.sin( data.angle );

	if( posX <= 0 ) posX *= -1;
	if( posY <= 0 ) posY *= -1;
	if( posY >= this.height ) data.incY *= -1;
	if( posX >= this.width ) data.incX *= -1;



	context.beginPath();
	context.arc(posX, posY, data.radius, 0, 2 * Math.PI, false);
	
	if(data.counter > 500 ) data.counter = 1;
	
	context.fillStyle = data.color;
	context.fill();
	

	data.x += data.incX;
	data.y += data.incY;

	return data;
};