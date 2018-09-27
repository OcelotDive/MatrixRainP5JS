let symbolSize = 20;
let streams = [];



function setup() {

	createCanvas(
		1920,
		1024
	);
	background(0);
	let x = 0;
	for(let i = 0; i <= width / symbolSize; i++) {
	let stream = new Stream();
	stream.generateSymbols(x, random(-1000, 0));
	streams.push(stream);
	x += symbolSize;
	}
	
	textSize(symbolSize)

}

function draw() {
	background(0, 150);
	
	streams.map((stream) => {
		stream.render();
	})
}

//class to create symbol
function Symbol(x, y, velocity, first) {

	this.x = x;
	this.y = y;
	this.value;
	this.velocity = velocity;
	this.switchInterval = round(random(1, 5));
	this.first = first;

	this.setToRandomSymbol = () => {
		if (frameCount % this.switchInterval === 0) {


			this.value = String.fromCharCode(
				0x30A0 + round(random(0, 96))
			);
		}
	}



	this.rain = () => {
		this.y >= height ? this.y = 0 : this.y += this.velocity;

	}


}





function Stream() {

	this.symbols = [];
	this.totalSymbols = round(random(20, 50));
	this.speed = random(15, 20);

	this.generateSymbols = (x, y) => {
		let first = round(random(0, 4)) == 1;

		for (let i = 0; i <= this.totalSymbols; i++) {
			symbol = new Symbol(x, y, this.speed, first);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}
	}


	this.render = () => {
		this.symbols.forEach((symbol)=> {
			if(symbol.first) {
				fill(180, 255, 255);
				textStyle(BOLD);
		
			}
			else {
			fill(0, 255, 70);
				textStyle(BOLD);
			
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
			
		});
		
	}
}
