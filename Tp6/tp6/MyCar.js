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
    this.backTrapezium = new MyTrapezium(this.scene, 0.05, 0.05);
    this.lamp = new MyLamp(this.scene, 18, 20);
    this.cilinder = new MyCilinder(this.scene, 18, 20);
    this.circle = new MyCircle(this.scene, 18);


    this.count = 0;
  };

  setTurningAngle(angle) {
    this.frontWheel.setTurningAngle(angle);
  }

  setForwardAngle(angle) {
    this.frontWheel.setForwardAngle(angle);
    this.backWheel.setForwardAngle(angle);
  }

  incForwardAngle(angle) {
    this.frontWheel.incForwardAngle(angle);
    this.backWheel.incForwardAngle(angle);
  }

  incTurningAngle(angle) {
    this.frontWheel.incTurningAngle(angle);

  }
  display() {
    let wheelThickness = 0.3;
    let wheelSpeed = 0.5;
    this.count++;
    console.log(this.count);
    if (this.count < 500) {
      this.incForwardAngle(0.05);
      this.incTurningAngle(-0.002);
    } else {
      this.incForwardAngle(-0.05);
      this.incTurningAngle(0.002);
    }
    //Front Left Wheel
    this.scene.pushMatrix();

    this.scene.translate(0.9, 0.35, 1.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.frontWheel.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.6, 0.6, 1.4);
    this.scene.scale(1, 0.5, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.6, 0.9);
    this.scene.scale(0.4, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.6, 1.9);
    this.scene.scale(0.4, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.85, 1.4);
    this.scene.scale(0.4, 0.4, 1);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();

    this.scene.translate(-0.9, 0.35, 1.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.frontWheel.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.6, 0.6, 1.4);
    this.scene.scale(1, 0.5, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.6, 0.9);
    this.scene.scale(0.4, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.6, 1.9);
    this.scene.scale(0.4, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.85, 1.4);
    this.scene.scale(0.4, 0.4, 1);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    //Rear Right Wheel
    this.scene.pushMatrix();

    this.scene.translate(-0.9, 0.35, -1.5 - 0.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.backWheel.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(-0.6, 0.6, -1.85);
    this.scene.scale(1, 0.5, 0.9);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.6, -2.3);
    this.scene.scale(0.4, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.6, -1.4);
    this.scene.scale(0.4, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.8, 0.85, -1.85);
    this.scene.scale(0.4, 0.4, 0.9);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    //Rear Left Wheel
    this.scene.pushMatrix();

    this.scene.translate(0.9, 0.35, -1.5 - 0.35);
    this.scene.scale(wheelThickness, 0.35, 0.35);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.backWheel.display();

    this.scene.popMatrix();

    this.scene.defaultAppearance.apply();
    this.scene.pushMatrix();

    this.scene.translate(0.6, 0.6, -1.85);
    this.scene.scale(1, 0.5, 0.9);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.6, -2.3);
    this.scene.scale(0.4, 0.5, 1);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.6, -1.4);
    this.scene.scale(0.4, 0.5, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.8, 0.85, -1.85);
    this.scene.scale(0.4, 0.4, 0.9);
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

    //Left Lower Body
    this.scene.pushMatrix();

    this.scene.translate(1, 1.15, 0);
    this.scene.scale(1, 0.6, 5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.sideMidLeftAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, -0.25);
    this.scene.scale(1, 0.5, 2.3);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.sideLowLeftAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();


    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, 2.2);
    this.scene.scale(1, 0.5, 0.6);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.sideFrontLeftAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(1, 0.6, -2.4);
    this.scene.scale(1, 0.5, 0.2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.sideRearLeftAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();

    //Left Upper Body
    this.scene.pushMatrix();

    this.scene.translate(0.95, 1.724, 0);
    this.scene.scale(1, 0.552, 5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.scene.sideHighLeftAppearance.apply();
    this.leftTrapezium.display();

    this.scene.popMatrix();

    //Right Lower Body
    this.scene.pushMatrix();

    this.scene.translate(-1, 1.15, 0);
    this.scene.scale(1, 0.6, 5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.sideMidRightAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, -0.25);
    this.scene.scale(1, 0.5, 2.3);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.sideLowRightAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();


    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, 2.2);
    this.scene.scale(1, 0.5, 0.6);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.sideFrontRightAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(-1, 0.6, -2.4);
    this.scene.scale(1, 0.5, 0.2);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.sideRearRightAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();

    //Right Upper Body
    this.scene.pushMatrix();

    this.scene.translate(-0.95, 1.724, 0);
    this.scene.scale(1, 0.552, 5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-0.10, 1, 0, 0);
    this.scene.sideHighRightAppearance.apply();
    this.rightTrapezium.display();

    this.scene.popMatrix();
    this.scene.defaultAppearance.apply();
    //Back
    this.scene.pushMatrix();

    this.scene.translate(0, 0.9, -2.5);
    this.scene.scale(2, 1.1, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.blueMetalAppearance.apply();
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0, 1.724, -2.5);
    this.scene.scale(2, 0.552, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.defaultAppearance.apply();
    this.backTrapezium.display();

    this.scene.popMatrix();

    //Front
    this.scene.pushMatrix();

    this.scene.translate(0, 0.9, 2.5);
    this.scene.scale(2, 1.1, 1);
    this.scene.frontAppearance.apply();
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

    this.scene.translate(-0.71, 0.8, 2.5);
    this.scene.scale(0.15, 0.15, 0.05);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.headlightAppearance.apply();
    this.lamp.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.71, 0.8, 2.5);
    this.scene.scale(0.17, 0.17, 0.035);
    this.cilinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.71, 0.8, 2.515);
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
    this.scene.scale(1.2, 1, 5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, -0.25);
    this.scene.scale(2, 1, 2.3);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, 2.2);
    this.scene.scale(2, 1, 0.6);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0, 0.35, -2.4);
    this.scene.scale(2, 1, 0.2);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();

    this.scene.popMatrix();

  }
};