/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyEndPoint extends CGFobject {
  constructor(scene, armlength) {
    super(scene);
    this.magnet = new MyCappedCillinder(scene, 32, 2);
    this.arm = new MyCappedCillinder(scene, 32, 2);
    this.joint = new MyCappedCillinder(scene, 32, 2);
    this.armlength = armlength;
  };

  display() {

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.joint.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.1, 0.1, this.armlength);
    this.scene.translate(0, 0, -0.5);
    this.arm.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -this.armlength, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(1, 1, 0.2);
    this.scene.translate(0, 0, 0.5);
    this.magnet.display();
    this.scene.popMatrix();
  };

  setRotationAngle(angle) {
    this.angle = angle;
  };

};
