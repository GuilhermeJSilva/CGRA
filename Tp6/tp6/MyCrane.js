/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject {
  constructor(scene) {
    super(scene);

    this.armlength = 5;
    this.armAngle = Math.PI / 3;
    this.firstArt = new MyArticulation(scene, [0, 1, 0], 0, this.armlength, this.armAngle);
    this.secondArt = new MyArticulation(scene, [1, 0, 0], 0, this.armlength, 0);
    this.endPoint = new MyEndPoint(scene, 3);

  };

  display() {
    var pos = [0, 0, 0];
    this.scene.pushMatrix();
    this.firstArt.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    pos[0] += this.firstArt.armlength * Math.sin(Math.PI / 2 - this.firstArt.armAngle) * Math.sin(this.firstArt.angle);
    pos[1] += this.firstArt.armlength * Math.cos(Math.PI / 2 - this.firstArt.armAngle);
    pos[2] += this.firstArt.armlength * Math.sin(Math.PI / 2 - this.firstArt.armAngle) * Math.cos(this.firstArt.angle);
    this.scene.translate(pos[0], pos[1], pos[2]);
    this.scene.rotate(this.firstArt.angle, 0, 1, 0);
    this.secondArt.display();
    this.scene.popMatrix();

    pos[0] += this.secondArt.armlength * Math.cos(-this.secondArt.angle) * Math.sin(this.firstArt.angle);
    pos[1] += this.secondArt.armlength * Math.sin(-this.secondArt.angle)
    pos[2] += this.secondArt.armlength * Math.cos(-this.secondArt.angle) * Math.cos(this.firstArt.angle);
    this.scene.pushMatrix();
    this.scene.translate(pos[0], pos[1], pos[2]);
    this.endPoint.display();
    this.scene.popMatrix();
  }
};
