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
    this.scene.wood = new CGFappearance(this.scene);
		this.scene.wood.setAmbient(0.545, 0.271, 0.075,1);
		this.scene.wood.setDiffuse(0.545, 0.271, 0.075,1);
		this.scene.wood.setSpecular(0.2,0.2,0.2,1);
		//this.scene.wood.setShininess(120);

    this.scene.metal = new CGFappearance(this.scene);
		this.scene.metal.setAmbient(0.439, 0.502, 0.565,1);
		this.scene.metal.setDiffuse(0.439, 0.502, 0.565,1);
		this.scene.metal.setSpecular(1,1,1,1);
		//this.scene.metal.setShininess(120);
  };

  display() {
    this.scene.pushMatrix();
      this.scene.translate(0, 3.5 + 0.3 / 2, 0);
      this.scene.scale(5, 0.3, 3);
      this.scene.wood.apply();

      this.cube.display();
            this.scene.materialDefault.apply();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(-5.0 / 2 + 0.3, 3.5 / 2, 3.0 / 2 - 0.3);
      this.scene.scale(0.3, 3.5, 0.3);
      this.scene.metal.apply();

      this.cube.display();
            this.scene.materialDefault.apply();
    this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(5.0 / 2 - 0.3, 3.5 / 2, - 3.0 / 2 + 0.3);
      this.scene.scale(0.3, 3.5, 0.3);
      this.scene.metal.apply();

      this.cube.display();
            this.scene.materialDefault.apply();
    this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(5.0 / 2 - 0.3, 3.5 / 2, 3.0 / 2 - 0.3);
      this.scene.scale(0.3, 3.5, 0.3);
      this.scene.metal.apply();


      this.cube.display();
            this.scene.materialDefault.apply();
    this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate( - 5.0 / 2 + 0.3, 3.5 / 2, - 3.0 / 2 + 0.3);
      this.scene.scale(0.3, 3.5, 0.3);
      this.scene.metal.apply();

      this.cube.display();
            this.scene.materialDefault.apply();
    this.scene.popMatrix();
  };
};
