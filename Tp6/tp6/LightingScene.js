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

    this.gl.clearColor(173 / 255, 216 / 255, 230 / 255, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.light0 = true;
    this.light1 = true;
    this.light2 = true;
    this.light3 = true;
    this.light4 = true;

    this.dis_axis = true;
    this.currSpeed = 3;
    this.torque = 40;

    this.axis = new CGFaxis(this);
    this.altimetry = [
            [2.0, 1.8, 1.5, 0.0, 0.0, 2.8, 3.3, 2.3],
            [1.8, 2.0, 1.0, 0.0, 0.0, 3.0, 3.3, 2.8],
            [0.3, 0.0, 0.0, 0.0, 0.0, 3.0, 3.3, 3.3],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.6],
            [1.8, 1.3, 0.0, 0.0, 0.0, 0.0, 0.0, 1.8],
            [2.5, 0.5, 0.0, 0.0, 0.0, 0.0, 1.6, 1.6],
            [1.7, 1.3, 1.3, 1.3, 1.3, 0.0, 1.6, 1.6],
            [0.9, 0.0, 0.0, 0.0, 1.3, 0.9, 0.0, 0.0]
        ];

    // Scene elements
    this.car = new MyCar(this);
    this.initialCarPos = [0, 5, 0];
    this.floor = new MyTerrain(this, 8, this.altimetry);
    this.crane = new MyCrane(this, this.car, [-10, 0, 8]);
    this.mirror = new MyRearviewMirror(this);

    this.rimAppearances = new Array();
    this.rimAppearancesCurrIndex = 0;

    this.carAppearances = new Array();
    this.carAppearancesCurrIndex = 0;

    // Scene Appearances

    this.vintageRimAppearance = new CGFappearance(this);
    this.vintageRimAppearance.loadTexture('../resources/images/vintage_rim.png');

    this.newRimAppearance = new CGFappearance(this);
    this.newRimAppearance.loadTexture('../resources/images/wheel.png');

    this.rimAppearances.push(this.vintageRimAppearance, this.newRimAppearance);

    this.tireAppearance = new CGFappearance(this);
    this.tireAppearance.loadTexture('../resources/images/rubber.jpg');

    this.vwLogoAppearance = new CGFappearance(this);
    this.vwLogoAppearance.loadTexture('../resources/images/vw_logo.png');

    this.windShieldAppearance = new CGFappearance(this);
    this.windShieldAppearance.loadTexture('../resources/images/front.png');

    this.headlightAppearance = new CGFappearance(this);
    this.headlightAppearance.loadTexture('../resources/images/headlight.png');

    this.blinkerAppearance = new CGFappearance(this);
    this.blinkerAppearance.loadTexture('../resources/images/blinker.png');

    let tempArray = new Array();

    this.blueMetalAppearance = new CGFappearance(this);
    this.blueMetalAppearance.loadTexture('../resources/images/blue_metal.png');

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

    this.defaultAppearance = new CGFappearance(this);

    this.shadowAppearance = new CGFappearance(this);
    this.shadowAppearance.setSpecular(0, 0, 0, 1);
    this.shadowAppearance.setDiffuse(0, 0, 0, 1);
    this.shadowAppearance.setAmbient(0.1, 0.1, 0.1, 1);

    this.sideFrontLeftAppearance = new CGFappearance(this);
    this.sideFrontLeftAppearance.loadTexture('../resources/images/side_front_left.png');

    this.sideRearRightAppearance = new CGFappearance(this);
    this.sideRearRightAppearance.loadTexture('../resources/images/side_rear_right.png');

    this.sideRearLeftAppearance = new CGFappearance(this);
    this.sideRearLeftAppearance.loadTexture('../resources/images/side_rear_left.png');

    this.carAppearances.push(new Array(
      this.blueMetalAppearance, this.frontAppearance,
      this.sideMidLeftAppearance, this.sideMidRightAppearance,
      this.sideHighLeftAppearance, this.sideRearLeftAppearance,
      this.sideHighRightAppearance, this.sideLowLeftAppearance,
      this.sideLowRightAppearance, this.sideFrontRightAppearance,
      this.sideFrontLeftAppearance, this.sideRearRightAppearance));

    this.camoAppearance = new CGFappearance(this);
    this.camoAppearance.loadTexture('../resources/images/camouflage.jpg');

    this.mirrorAppearance = new CGFappearance(this);
    this.mirrorAppearance.loadTexture('../resources/images/mirror.jpg');

    this.carAppearances.push(new Array(this.camoAppearance));
    this.defaultAppearance = new CGFappearance(this);
  };

  initCameras() {
    this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(-50, 50, -50), vec3.fromValues(0, 0, 0));
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
    if (this.light0)
      this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    if (this.light1)
      this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setQuadraticAttenuation(0);
    if (this.light2)
      this.lights[2].enable();

    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
    this.lights[3].setConstantAttenuation(0);
    this.lights[3].setLinearAttenuation(0);
    this.lights[3].setQuadraticAttenuation(0.2);
    if (this.light3)
      this.lights[3].enable();

    this.lights[4].setPosition(0, 0, 5);
    this.lights[4].setVisible(true);
    this.lights[4].setAmbient(0.7, 0.7, 0.7, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
    //this.lights[4].setConstantAttenuation(0);
    //this.lights[4].setLinearAttenuation(1);
    this.lights[4].setQuadraticAttenuation(0.2);
    if (this.light4)
      this.lights[4].enable();

    this.oldtime = 0;
    this.setUpdatePeriod(10);
  };

  updateLights() {
    for (var i = 0; i < this.lights.length; i++)
      this.lights[i].update();
  }


  display() {

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
    if (this.dis_axis)
      this.axis.display();

    for (var i = 0; i < this.lights.length; i++) {
      this.lights[i].disable();
    }
    if (this.light4)
      this.lights[4].enable();
    if (this.light3)
      this.lights[4].enable();
    if (this.light2)
      this.lights[2].enable();
    if (this.light1)
      this.lights[1].enable();
    if (this.light0)
      this.lights[0].enable();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Scene drawing section

    this.pushMatrix();
    this.car.display();
    this.popMatrix();

    this.pushMatrix();
    this.floor.display();
    this.popMatrix();

    this.pushMatrix();
    this.blueMetalAppearance.apply();
    this.crane.display();
    this.popMatrix();
    // ---- END Scene drawing section

    this.checkKeys();
  };

  update(currentTime) {
    if (this.oldtime == 0) {
      this.oldtime = currentTime;
      return;
    }
    var elapsedTime = currentTime - this.oldtime;
    this.car.updatePosition(elapsedTime / 1000);
    this.oldtime = currentTime;

    this.currSpeed = this.car.velocity;

    this.crane.update(elapsedTime);

  }

  checkKeys() {

    if (this.gui.isKeyPressed("KeyW")) {
      this.car.setMotorForce(this.torque);
    } else if (this.gui.isKeyPressed("KeyS")) {
      this.car.setMotorForce(-this.torque);
    } else {
      this.car.setMotorForce(0);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      this.car.incTurningAngle(0.03);
      this.car.setTurning(true);
    } else if (this.gui.isKeyPressed("KeyD")) {
      this.car.incTurningAngle(-0.03);
      this.car.setTurning(true);
    } else {
      this.car.setTurning(false);

    }
  }

  toggleAxis() {
    this.dis_axis = !this.dis_axis;
  };
};
