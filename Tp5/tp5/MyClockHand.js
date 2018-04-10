/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, height, width)
	{
		super(scene);

		height = typeof height !== 'undefined' ? height : 1;
		width = typeof width !== 'undefined' ? width : 1;

		this.height = height;
		this.width = width;
		this.angle = 0;
		this.clockHand = new MyQuad(scene);

	};

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0,0,1);
		this.scene.translate(0, this.height/2,0.001);
		this.scene.scale(this.width, this.height, 1);


		this.scene.clockHandAppearance.apply();
		this.clockHand.display();

		this.scene.popMatrix();
	}

	setAngle(angle) {
		this.angle = -angle*Math.PI/180;
	}


};
