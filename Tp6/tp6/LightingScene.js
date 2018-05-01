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
    this.curve = new BezierTrans(this, 5, [0, 0, 1], [1, 0, 0], [1, 1, 0], [-1, 1, 0], [-1, 0, 0], 0.001)
    this.curve_rot = new BezierRot(this, 64, Math.PI / 32, [1, 1.2, 0], [1.5, 2.5, 0], [-1.5, 2.5, 0], [-1, 1.2, 0], 0.001, 1);


    this.floorAppearance = new CGFappearance(this);
    //TODO - Why does this error occurr
    //Error: WebGL warning: drawElements: Active texture 0 for target 0x0de1
    //is 'incomplete', and will be rendered as RGBA(0,0,0,1), as per the
    //GLES 2.0.24 $3.8.2: Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE.
    //
    //ANSWER: The texture size has to be a power of 2.
    //this.floorAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
    this.floorAppearance.loadTexture('../resources/images/rubber.jpg');

    this.oldtime = 0;
    this.setUpdatePeriod(100);


  };

  initCameras() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
  };

  initLights() {
    this.setGlobalAmbientLight(1, 1, 1, 1.0);
    this.lights[0].setPosition(5, 5, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    //this.lights[0].setVisible(true);


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

    //this.materialDefault.apply();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Scene drawing section

    this.floorAppearance.apply();
    this.curve.display();
    //this.curve_rot.display();
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
