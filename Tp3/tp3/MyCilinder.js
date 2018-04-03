/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCilinder extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;
    this.delta = 2 * Math.PI / this.slices;

    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();
    this.initBuffers();
  };

  initVIN() {
    var alt = 1 / this.stacks;
    for (var stack = 0; stack <= this.stacks; stack++) {

      for (var slice = 0; slice < this.slices; slice++) {


        this.vertices.push(Math.cos(slice * this.delta));
        this.vertices.push(Math.sin(slice * this.delta));
        this.vertices.push(stack * alt);

        this.normals.push(Math.cos(slice * this.delta));
        this.normals.push(Math.sin(slice * this.delta));
        this.normals.push(0);

      }
    }

    for (var i = 0; i < this.slices * (this.stacks); i++) {

        this.indices.push(i);
        this.indices.push(i + 1);
        this.indices.push(i + this.slices);

        this.indices.push(i);
        this.indices.push(i + this.slices);
        this.indices.push(i + this.slices - 1);

    }

  };

  initBuffers() {
    this.initVIN();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};
