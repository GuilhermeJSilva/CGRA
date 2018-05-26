/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCar extends CGFobject {
  constructor(scene) {
    super(scene);

    let windowSize = 0.05;
    this.frontWheel = new MyWheel(this.scene);
    this.backWheel = new MyWheel(this.scene);
    this.quad = new MyQuad(this.scene);
    this.leftTrapezium = new MyTrapezium(this.scene, 0, windowSize);
    this.rightTrapezium = new MyTrapezium(this.scene, windowSize, 0);
    this.windowTrapezium = new MyTrapezium(this.scene, 0, 0.2);
    this.windowRightTrapezium = new MyTrapezium(this.scene, 0.2, 0);
    this.backTrapezium = new MyTrapezium(this.scene, 0.05, 0.05);
    this.lamp = new MyLamp(this.scene, 18, 20);
    this.cilinder = new MyCilinder(this.scene, 18, 20);
    this.circle = new MyCircle(this.scene, 18);
    this.mirror = new MyRearviewMirror(this.scene);
    this.rightMirror = new MyRearviewMirror(this.scene, 5 * Math.PI / 3);

    let incY = 0.7;
    let incZ = 0.7;
    let p1 = [1, 0.35, 2.14];
    let p4 = [1, 0.35, 1.1];
    let p2 = [1, 0.35 + incY, 1 * (p1[2] - p4[2]) / 3 + p4[2] + incZ];
    let p3 = [1, 0.35 + incY, 2 * (p1[2] - p4[2]) / 3 + p4[2] - incZ];

    let pp1 = [0.999, 0.35, 2.14];
    let pp4 = [0.999, 0.35, 1.1];
    let pp2 = [0.999, 0.35 + incY, 1 * (p1[2] - p4[2]) / 3 + p4[2] + incZ];
    let pp3 = [0.999, 0.35 + incY, 2 * (p1[2] - p4[2]) / 3 + p4[2] - incZ];

    this.tireGuardFront = new BezierTrans(this.scene, 10, [-0.7 / 10, 0, 0], p1, p2, p3, p4, 0.1);
    this.tireGuardFrontSide = new BezierTrans(this.scene, 10, [0, 0.5 / 10, 0], pp1, pp2, pp3, pp4, 0.1);

    /*let r1 = [2.5, 3, -1];
    let r2 = [2.5, 3, -0.5];
    let r3 = [2.5, 3, 0.5];
    let r4 = [2.5, 3, 1]; */
    let r1 = [-0.9, 0, 0];
    let r2 = [-0.6, 0.4, 0];
    let r3 = [0.6, 0.4, 0];
    let r4 = [0.9, 0, 0];

    let rm1 = [-0.9, 2, 2.11];
    let rm2 = [-0.6, 2.4, 2.11];
    let rm3 = [0.6, 2.4, 2.11];
    let rm4 = [0.9, 2, 2.11];

    let re1 = [-0.9, 0, 0];
    let re2 = [-0.6, 0.4, 0];
    let re3 = [0.6, 0.4, 0];
    let re4 = [0.9, 0, 0];

    this.roofFront = new BezierRot(this.scene, 10, Math.PI / 2 / 10, r4, r3, r2, r1, 0.1, 1);
    this.roofMiddle = new BezierTrans(this.scene, 10, [0, 0, -4.9 / 10], rm1, rm2, rm3, rm4, 0.1);
    this.roofEnd = new BezierRot(this.scene, 10, -Math.PI / 2 / 10, re1, re2, re3, re4, 0.1, 1);
    //scene, slices, trans_vector, p1, p2, p3, p4, step)

    //Physics variables
    this.angle = 0;
    this.angularVelocity = 0;

    this.moved = [0, 0, 0];
    this.velocity = 0;
    this.accelaration = 0;

    this.motorForce = 0;
    this.deltaZ = 2.5;
    this.wheelRadius = 0.35;

    this.turning = false;
    this.movementAllowed = true

  };

  restrictMovement() {
    this.movementAllowed = false;
    this.velocity = [0, 0];
    this.accelaration = [0, 0];
  }

  allowMovement() {
    this.movementAllowed = true;
  }

  setTurning(turning) {
    this.turning = turning;
  }

  incForwardAngle(angle) {
    this.frontWheel.incForwardAngle(angle);
    this.backWheel.incForwardAngle(angle);
  }

  incTurningAngle(angle) {
    this.frontWheel.incTurningAngle(angle);
  }

  setMotorForce(motorForce) {
    this.motorForce = motorForce;
  }

  updatePosition(elapsedTime) {
    if (this.movementAllowed) {
      this.normalizeVelocity();
      const windForce = 2;

      let air_resistance = this.velocity * Math.abs(this.velocity) * windForce;

      this.accelaration = this.motorForce - air_resistance;

      this.velocity += this.accelaration * elapsedTime;
      let turningAngle = this.angle;
      this.moved[0] += this.velocity * Math.sin(turningAngle) * elapsedTime;
      this.moved[2] += this.velocity * Math.cos(turningAngle) * elapsedTime;

      this.incForwardAngle(this.velocity * elapsedTime / this.wheelRadius);
      this.angularVelocity = 1 * this.deltaZ * this.velocity * Math.sin(this.frontWheel.getTurningAngle()) / 10;

      this.angle += this.angularVelocity * elapsedTime;
      this.updateTurningAngle(elapsedTime);
    } else {
      this.accelaration = 0;
      this.velocity = 0;
    }
  };

  updateTurningAngle(elapsedTime) {
    if (!this.turning) {
      if (this.frontWheel.getTurningAngle() != 0)
        this.incTurningAngle(-this.frontWheel.getTurningAngle() / Math.abs(this.frontWheel.getTurningAngle()) * 0.01);
      if (Math.abs(this.frontWheel.getTurningAngle()) < 0.05)
        this.incTurningAngle(-this.frontWheel.getTurningAngle());
    }
  };

  normalizeVelocity() {
    let velocityError = 0.25;
    if (Math.abs(this.velocity) < velocityError)
      this.velocity = 0;
  };

  auxTextIndex(scene, textIndex) {
    if (scene.carAppearancesCurrIndex == 1)
      return scene.carAppearances[1][0];
    else {
      return scene.carAppearances[0][textIndex];
    }
  };

  display() {

    let wheelThickness = 0.3;
    let wheelSpeed = 0.5;


    this.scene.pushMatrix();
    this.scene.translate(this.moved[0], this.moved[1], this.moved[2]);
    this.scene.rotate(this.angle, 0, 1, 0);
    this.scene.scale(1, 0.83, 0.99);
    //Front Left Wheel
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.35, 1.65);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.frontWheel.display();

    this.scene.popMatrix();
    this.scene.shadowAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.4, 0.65, 1.6);
    this.scene.scale(1, 0.6, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.auxTextIndex(this.scene, 0).apply();
    this.scene.pushMatrix();

    this.scene.translate(0.7, 0.6, 1.1);
    this.scene.scale(0.6, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.7, 0.6, 2.1);
    this.scene.scale(0.6, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.tireGuardFront.display();
    this.tireGuardFrontSide.display();

    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.35, 1.65);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.frontWheel.display();

    this.scene.popMatrix();
    this.scene.shadowAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.4, 0.65, 1.6);
    this.scene.scale(1, 0.6, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.auxTextIndex(this.scene, 0).apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.7, 0.6, 1.1);
    this.scene.scale(0.6, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.7, 0.6, 2.1);
    this.scene.scale(0.6, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0, +1.62);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.translate(0, 0, -1.62);
    this.tireGuardFront.display();
    this.tireGuardFrontSide.display();
    this.scene.popMatrix();

    //Rear Right Wheel
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.35, -1.5 - 0.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.backWheel.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1, 0.7, -1.85);
    this.scene.scale(1, 0.3, 0.9);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 0).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.shadowAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.4, 0.6, -1.85);
    this.scene.scale(1, 0.5, 0.9);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.7, 0.6, -2.3);
    this.scene.scale(0.6, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.7, 0.6, -1.4);
    this.scene.scale(0.6, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.7, 0.85, -1.85);
    this.scene.scale(0.6, 0.4, 0.9);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    //Rear Left Wheel
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.35, -1.5 - 0.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.backWheel.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(1, 0.7, -1.85);
    this.scene.scale(1, 0.3, 0.9);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 0).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.shadowAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.4, 0.6, -1.85);
    this.scene.scale(1, 0.5, 0.9);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0.7, 0.6, -2.3);
    this.scene.scale(0.6, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.7, 0.6, -1.4);
    this.scene.scale(0.6, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.7, 0.85, -1.85);
    this.scene.scale(0.6, 0.4, 0.9);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();

    //Roof
    this.scene.pushMatrix();

    this.scene.translate(0, 2, -0.13);
    this.scene.scale(1.8, 1, 4.75);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 2.1);
    this.scene.defaultAppearance.apply();
    this.roofFront.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.roofMiddle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 2, -2.3);
    this.roofEnd.display();

    this.scene.popMatrix();

    //Left Lower Body
    this.scene.pushMatrix();

    this.scene.translate(1, 1.15, 0);
    this.scene.scale(1, 0.6, 5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 2).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, -0.15);
    this.scene.scale(1, 0.5, 2.6);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 6).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();


    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, 2.3);
    this.scene.scale(1, 0.5, 0.4);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 9).apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, -2.4);
    this.scene.scale(1, 0.5, 0.2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 4).apply();
    this.quad.display();

    this.scene.popMatrix();

    //Left Upper Body
    this.scene.pushMatrix();

    this.scene.translate(0.95, 1.724, 0);
    this.scene.scale(1, 0.552, 5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.auxTextIndex(this.scene, 5).apply();
    //this.scene.defaultAppearance.apply();
    this.leftTrapezium.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 1.3, 2.3);
    this.mirror.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.955, 1.713, 1.865);
    this.scene.scale(1, 0.522, 1.25);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.scene.windowAppearance.apply();
    this.windowTrapezium.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.955, 1.713, 0.7);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.955, 1.713, -0.2);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.955, 1.713, -1.1);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.955, 1.713, -2);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    //Right Lower Body
    this.scene.pushMatrix();

    this.scene.translate(-1, 1.15, 0);
    this.scene.scale(1, 0.6, 5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 3).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, -0.15);
    this.scene.scale(1, 0.5, 2.6);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 7).apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();


    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, 2.3);
    this.scene.scale(1, 0.5, 0.4);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 8).apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, -2.4);
    this.scene.scale(1, 0.5, 0.2);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.auxTextIndex(this.scene, 10).apply();
    this.quad.display();

    this.scene.popMatrix();

    //Right Upper Body
    this.scene.pushMatrix();

    this.scene.translate(-0.95, 1.724, 0);
    this.scene.scale(1, 0.552, 5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.auxTextIndex(this.scene, 5).apply();
    //this.scene.defaultAppearance.apply();
    this.rightTrapezium.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 1.3, 2.3);
    this.rightMirror.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.955, 1.713, 1.865);
    this.scene.scale(1, 0.522, 1.25);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.scene.windowAppearance.apply();
    this.windowRightTrapezium.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.955, 1.713, 0.7);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.955, 1.713, -0.2);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.955, 1.713, -1.1);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.955, 1.713, -2);
    this.scene.scale(1, 0.522, 0.7);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    //Back
    this.scene.pushMatrix();

    this.scene.translate(0, 0.9, -2.5);
    this.scene.scale(2, 1.1, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.auxTextIndex(this.scene, 0).apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0, 1.724, -2.5);
    this.scene.scale(2, 0.552, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.auxTextIndex(this.scene, 0).apply();
    this.backTrapezium.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 1.724, -2.51);
    this.scene.scale(1, 0.4, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.windowAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0.8, -2.51);
    this.scene.scale(0.4, 0.15, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.plateAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.82, 0.7, -2.5);
    this.scene.scale(0.035, 0.035, 0.025);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.blinkerAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.82, 0.7, -2.5);
    this.scene.scale(0.05, 0.05, 0.015);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.82, 0.7, -2.505);
    this.scene.scale(0.05, 0.05, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.circle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 0.7, -2.5);
    this.scene.scale(0.035, 0.035, 0.025);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.blinkerAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 0.7, -2.5);
    this.scene.scale(0.05, 0.05, 0.015);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 0.7, -2.505);
    this.scene.scale(0.05, 0.05, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.circle.display();

    this.scene.popMatrix();

    //Front
    this.scene.pushMatrix();

    this.scene.translate(0, 0.9, 2.5);
    this.scene.scale(2, 1.1, 1);
    this.auxTextIndex(this.scene, 1).apply();
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0, 1.72, 2.368);
    this.scene.scale(2, 0.578, 1);
    this.scene.rotate(-0.25, 1, 0, 0);
    this.scene.windShieldAppearance.apply();
    this.backTrapezium.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.75, 0.8, 2.5);
    this.scene.scale(0.15, 0.15, 0.05);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.headlightAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.75, 0.8, 2.5);
    this.scene.scale(0.17, 0.17, 0.035);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.75, 0.8, 2.515);
    this.scene.scale(0.17, 0.17, 1);
    this.circle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 1.1, 2.5);
    this.scene.scale(0.035, 0.035, 0.025);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.blinkerAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.75, 0.80, 2.5);
    this.scene.scale(0.15, 0.15, 0.05);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.headlightAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 1.1, 2.5);
    this.scene.scale(0.05, 0.05, 0.015);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.82, 1.1, 2.505);
    this.scene.scale(0.05, 0.05, 1);
    this.circle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.75, 0.80, 2.5);
    this.scene.scale(0.17, 0.17, 0.035);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.75, 0.80, 2.515);
    this.scene.scale(0.17, 0.17, 1);
    this.circle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.85, 1.1, 2.5);
    this.scene.scale(0.035, 0.035, 0.025);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.blinkerAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.85, 1.1, 2.5);
    this.scene.scale(0.05, 0.05, 0.015);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.85, 1.1, 2.505);
    this.scene.scale(0.05, 0.05, 1);
    this.circle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.025, 1.1, 2.5);
    this.scene.scale(0.24, 0.24, 0.01);
    this.cilinder.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0.025, 1.1, 2.53);
    this.scene.scale(0.24, 0.24, 1);
    this.scene.vwLogoAppearance.apply();
    this.circle.display();

    this.scene.popMatrix();
    //Floor
    this.scene.defaultAppearance.apply();

    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, 0);
    this.scene.scale(0.8, 1, 5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, -0.15);
    this.scene.scale(2, 1, 2.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, 2.3);
    this.scene.scale(2, 1, 0.4);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, -2.4);
    this.scene.scale(2, 1, 0.2);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.popMatrix();

  }
};