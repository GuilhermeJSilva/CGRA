/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
  };

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 3.5 + 0.3 / 2, 0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display()
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-5.0 / 2 + 0.3, 3.5 / 2, 3.0 / 2 - 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display()
    this.scene.popMatrix();

		this.scene.pushMatrix();
    this.scene.translate(5.0 / 2 - 0.3, 3.5 / 2, - 3.0 / 2 + 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display()
    this.scene.popMatrix();

		this.scene.pushMatrix();
    this.scene.translate(5.0 / 2 - 0.3, 3.5 / 2, 3.0 / 2 - 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display()
    this.scene.popMatrix();

		this.scene.pushMatrix();
    this.scene.translate( - 5.0 / 2 + 0.3, 3.5 / 2, - 3.0 / 2 + 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display()
    this.scene.popMatrix();
  };
};
