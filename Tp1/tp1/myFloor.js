/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class myFloor extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
  };

  display() {
    this.scene.pushMatrix();
    this.scene.scale(8, 0.1, 6);
    this.cube.display()
    this.scene.popMatrix();
  };
};
