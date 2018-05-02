/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    slices = typeof slices !== 'undefined' ? slices : 32;
    stacks = typeof stacks !== 'undefined' ? stacks : 2;

    this.Tire = new MyCilinder(this.scene, slices, stacks);
    this.Rim = new MyCircle(this.scene, slices);

    this.forwardAngle = 0;
    this.turningAngle = 0;

  };

  setTurningAngle(angle) {
    this.turningAngle = angle;
  }

  setForwardAngle(angle) {
    this.forwardAngle = angle;
  }

  incForwardAngle(angle) {
    this.forwardAngle += angle;
  }

  incTurningAngle(angle) {
    this.turningAngle += angle;

    if (this.turningAngle > Math.PI / 4)
      this.turningAngle = Math.PI / 4;
    else if (this.turningAngle < -Math.PI / 4)
      this.turningAngle = -Math.PI / 4;

  }

  display() {
    let rimSize = 0.7;

    console.log(this.turningAngle);
    console.log(this.forwaAngle);
    this.scene.rotate(this.turningAngle, 0, 1, 0);
    this.scene.rotate(this.forwardAngle, 0, 0, 1);
    this.scene.pushMatrix();
    this.scene.tireAppearance.apply();
    this.Tire.display();

    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.rimAppearance.apply();
    this.Rim.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();


    this.scene.translate(0, 0, 0.5);
    this.Rim.display();

    this.scene.popMatrix();

  }
};