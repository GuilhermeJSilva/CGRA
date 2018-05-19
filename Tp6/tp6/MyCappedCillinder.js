/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCappedCillinder extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    slices = typeof slices !== 'undefined' ? slices : 32;
    stacks = typeof stacks !== 'undefined' ? stacks : 2;

    this.cilinder = new MyCilinder(this.scene, slices, stacks);
    this.cap = new MyCircle(this.scene, slices);

  };

  display() {


    this.scene.pushMatrix();
    this.cilinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.cap.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI,0,1,0);
    this.cap.display();
    this.scene.popMatrix();




  }
};
