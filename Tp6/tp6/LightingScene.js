var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene {
  constructor() {
    super();
  };

  init(application) {
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
    this.car = new MyCar(this);
    this.floor = new Plane(this);

    // Scene Appearances

    this.rimAppearance = new CGFappearance(this);
    this.rimAppearance.loadTexture('../resources/images/wheel.png');

    this.tireAppearance = new CGFappearance(this);
    this.tireAppearance.loadTexture('../resources/images/rubber.jpg');

    this.vwLogoAppearance = new CGFappearance(this);
    this.vwLogoAppearance.loadTexture('../resources/images/vw_logo.png');

    this.windShieldAppearance = new CGFappearance(this);
    this.windShieldAppearance.loadTexture('../resources/images/front.png');

    this.frontAppearance = new CGFappearance(this);
    this.frontAppearance.loadTexture('../resources/images/front_low.png');

    this.sideMidLeftAppearance = new CGFappearance(this);
    this.sideMidLeftAppearance.loadTexture('../resources/images/side_mid_left.png');

    this.sideMidRightAppearance = new CGFappearance(this);
    this.sideMidRightAppearance.loadTexture('../resources/images/side_mid_right.png');

    this.sideHighLeftAppearance = new CGFappearance(this);
    this.sideHighLeftAppearance.loadTexture('../resources/images/side_high_left.png');

    this.sideHighRightAppearance = new CGFappearance(this);
    this.sideHighRightAppearance.loadTexture('../resources/images/side_high_right.png');

    this.sideLowLeftAppearance = new CGFappearance(this);
    this.sideLowLeftAppearance.loadTexture('../resources/images/side_low_left.png');

    this.sideLowRightAppearance = new CGFappearance(this);
    this.sideLowRightAppearance.loadTexture('../resources/images/side_low_right.png');

    this.sideFrontRightAppearance = new CGFappearance(this);
    this.sideFrontRightAppearance.loadTexture('../resources/images/side_front_right.png');

    this.sideFrontLeftAppearance = new CGFappearance(this);
    this.sideFrontLeftAppearance.loadTexture('../resources/images/side_front_left.png');

    this.sideRearRightAppearance = new CGFappearance(this);
    this.sideRearRightAppearance.loadTexture('../resources/images/side_rear_right.png');

    this.sideRearLeftAppearance = new CGFappearance(this);
    this.sideRearLeftAppearance.loadTexture('../resources/images/side_rear_left.png');

    this.headlightAppearance = new CGFappearance(this);
    this.headlightAppearance.loadTexture('../resources/images/headlight.png');

    this.blinkerAppearance = new CGFappearance(this);
    this.blinkerAppearance.loadTexture('../resources/images/blinker.png');

    this.blueMetalAppearance = new CGFappearance(this);
    this.blueMetalAppearance.loadTexture('../resources/images/blue_metal.png');

    this.defaultAppearance = new CGFappearance(this);
  };

  initCameras() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
  };

  initLights() {
    this.setGlobalAmbientLight(0, 0, 0, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(-5, -6.0, -5.0, 1.0);
    this.lights[2].setVisible(true); // show marker on light position (different from enabled)
    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[3].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 1, 0, 1);
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
    //	this.lights[3].enable();

    this.lights[4].setPosition(0, 0, 5);
    this.lights[4].setVisible(true);
    this.lights[4].setAmbient(0.7, 0.7, 0.7, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
    //this.lights[4].setConstantAttenuation(0);
    //this.lights[4].setLinearAttenuation(1);
    this.lights[4].setQuadraticAttenuation(0.2);
    this.lights[4].enable();

    this.oldtime = 0;
    this.setUpdatePeriod(100);
  };

  updateLights() {
    for (var i = 0; i < this.lights.length; i++)
      this.lights[i].update();
  }


  display() {
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

    // ---- END Background, camera and axis setup

    // ---- BEGIN Scene drawing section

    this.car.display();

    this.pushMatrix();
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(50, 50, 1);

    this.floor.display();
    this.popMatrix();
    // ---- END Scene drawing section

  };

  update(currentTime) {
    if (this.oldtime == 0) {
      this.oldtime = currentTime;
      return;
    }
    var elapsedTime = currentTime - this.oldtime;

    this.oldtime = currentTime;
  }
};