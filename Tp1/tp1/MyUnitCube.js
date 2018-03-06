/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				0.5, 0.5, 0.5, //0
				-0.5, 0.5, 0.5, //1
				0.5, -0.5, 0.5,	//2
				0.5, 0.5, -0.5,	//3
				-0.5, -0.5, 0.5,//4
				0.5, -0.5, -0.5,//5
				-0.5, 0.5, -0.5,//6
				-0.5, -0.5, -0.5//7
				];

		this.indices = [
				0, 2, 4,
				0, 4, 1,
				6, 3, 0,
				6, 0, 1,
				5, 0, 3,
				5, 2, 0,
				7, 4, 2,
				7, 2, 5,
				1, 7, 6,
				1, 4, 7,
				6, 7, 5,
				6, 5, 3 

			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
