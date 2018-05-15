/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyArticulation extends CGFobject {
  constructor(scene, axis, angle, armlength, armAngle) {
    super(scene);
    this.rotationBase = new MyCappedCillinder(scene, 32, 2);
    this.arm = new MyCappedCillinder(scene, 32, 2);
    this.angle = angle;
    this.axis = axis;
    this.armlength = armlength;
    this.armAngle = armAngle;
  };

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(this.angle, this.axis[0], this.axis[1], this.axis[2])
    this.scene.rotate(Math.PI / 2, this.axis[1], this.axis[0], this.axis[2]);
    this.rotationBase.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(this.angle, this.axis[0], this.axis[1], this.axis[2]);
    this.scene.rotate(Math.PI * 2 - this.armAngle, 1, 0, 0);
    this.scene.scale(0.5, 0.5, this.armlength);
    this.scene.translate(0, 0, 0.5);
    this.arm.display();
    this.scene.popMatrix();
  };

  setRotationAngle(angle) {
    this.angle = angle;
  };

};
