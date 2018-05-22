/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyRearviewMirror extends CGFobject {
    constructor(scene, angle, length) {
      super(scene);

      angle = typeof angle !== 'undefined' ? angle : Math.PI/3;
      length = typeof length !== 'undefined' ? length : 5;

      this.angle = angle;
      this.length = length;

      this.lamp = new MyLamp(this.scene, 18, 20);
      this.cilinder = new MyCappedCillinder(this.scene, 18, 20);
      this.circle = new MyCircle(this.scene, 18);

    }

    display() {
        this.scene.pushMatrix();

        this.scene.scale(0.1,0.1,0.1);
        this.scene.translate(Math.sin(this.angle)*this.length, Math.cos(this.angle)*this.length, 0);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1,0.4,1);
        this.scene.defaultAppearance.apply();
        this.lamp.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.mirrorAppearance.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sin(this.angle)*2, -Math.cos(this.angle)*2, 0.1);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.scene.rotate(this.angle, 0,1,0);
        this.scene.scale(0.2,0.1,this.length);
        this.scene.defaultAppearance.apply();
        this.cilinder.display();        
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}