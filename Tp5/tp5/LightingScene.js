var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.enableTextures(true);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new Plane(this);
		this.quadWall = new MyQuad(this, -0.6, 1.6, -0.6, 1.6);
		this.floor = new MyQuad(this, 0, 10, 0, 12);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		this.prism = new MyPrism(this, 20, 40);
		this.cilinder = new MyCilinder(this, 8, 20, 0, 1, 0, 1);
		this.lamp = new MyLamp(this, 8,20);

		this.clock = new MyClock(this, 12, 1);
		this.clock.setTime(3, 30, 45);
		// Materials
		this.materialDefault = new CGFappearance(this);

		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		//this.materialA.setShininess(10);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);

		this.wallMaterial = new CGFappearance(this);
		this.wallMaterial.setAmbient(1.000, 0.973, 0.863,1);
		this.wallMaterial.setDiffuse(1.000, 0.973, 0.863,1);
		this.wallMaterial.setSpecular(0.1,0.1,0.1,1);

		this.floorMaterial = new CGFappearance(this);
		this.floorMaterial.setAmbient(0.184, 0.310, 0.310,1);
		this.floorMaterial.setDiffuse(0.184, 0.310, 0.310,1);
		this.floorMaterial.setSpecular(0.1,0.1,0.1,1);

		this.tampo = new CGFappearance(this);
		this.tampo.setDiffuse(0.7, 0.7, 0.7,1);
		this.tampo.setSpecular(0.1,0.1,0.1,1);
		this.tampo.setShininess(10);
		this.tampo.loadTexture('../resources/images/table.png');


		this.perna = new CGFappearance(this);
		this.perna.setAmbient(0.737, 0.561, 0.561,1);
		this.perna.setDiffuse(0.737, 0.561, 0.561,1);
		this.perna.setSpecular(1,1,1,1);

		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture('../resources/images/floor.png');

		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.windowAppearance.loadTexture('../resources/images/window.png');

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setDiffuse(0.7, 0.7, 0.7,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(10);
		this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.slidesAppearance.loadTexture('../resources/images/slides.png');

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setDiffuse(0.3, 0.3, 0.3,1);
		this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
		this.boardAppearance.setShininess(120);
		this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.boardAppearance.loadTexture('../resources/images/board.png');

		this.columnAppearance = new CGFappearance(this);
		this.columnAppearance.setDiffuse(0.2,0.2,0.2,1);
		this.columnAppearance.setSpecular(0.3, 0.3, 0.3, 1);
		this.columnAppearance.setShininess(10);
		this.columnAppearance.loadTexture('../resources/images/stone.jpg');

		this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.loadTexture('../resources/images/clock.png');

		this.clockHandAppearance = new CGFappearance(this);
		this.clockHandAppearance.setAmbient(0, 0, 0,1);
		this.clockHandAppearance.setDiffuse(0, 0, 0,1);
		this.clockHandAppearance.setSpecular(0,0,0,1);


	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,1);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable();

		this.lights[4].setPosition(0, 4, 7.5);
		this.lights[4].setVisible(true);
		this.lights[4].setAmbient(1, 1, 1, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(0.2);
		this.lights[4].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
		this.lights[i].update();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
		//this.prism.display();

		//this.lamp.display();
		//this.boardA.display();

/*
		// Floor
		this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		//this.floorMaterial.apply();
		this.floorAppearance.apply();
		this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.quadWall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallMaterial.apply();
		this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
		this.popMatrix();

		//Column A
		this.pushMatrix();
		this.rotate(-90 * degToRad, 1,0,0);
		this.scale(1,1, 8);
		this.translate(14, -1.2, 0);
		this.columnAppearance.apply();
		this.cilinder.display();
		this.popMatrix();

		//Column B
		this.pushMatrix();
		this.rotate(-90 * degToRad, 1,0,0);
		this.scale(1,1, 8);
		this.translate(1, -1.2, 0);
		this.columnAppearance.apply();
		this.cilinder.display();
		this.popMatrix();
*/
		//clock
		this.pushMatrix();
		this.translate(7.25, 7.25, 0)
		this.scale(0.5,0.5, 0.1);
		this.clock.display();
		this.popMatrix();


		// ---- END Scene drawing section

	};

	update(currentTime) {

	}
};
