/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyAirplane extends CGFobject {
  constructor(scene) {
    super(scene);
    this.a_height = 0.3;
    this.initBuffers();

  };

  initBuffers() {
    var h = this.a_height;
    this.vertices = [
      0, h, 0.5,
      -0.5, h, -0.5,
      -h/2, h, -0.5,

      0, h, 0.5,
      -0.5, h, -0.5,
      -h/2, h, -0.5,

      h/2, h, -0.5,
      0.5, h, -0.5,
      0, h, 0.5,

      h/2, h, -0.5,
      0.5, h, -0.5,
      0, h, 0.5,

      0, 0, -0.5,
      h/2, h, -0.5,
      0, h, 0.5,

      0, 0, -0.5,
      h/2, h, -0.5,
      0, h, 0.5,

      0, 0, -0.5,
      -h/2, h, -0.5,
      0, h, 0.5,

      0, 0, -0.5,
      -h/2, h, -0.5,
      0, h, 0.5
    ];

    this.indices = [
      0, 1, 2,
      3, 5, 4,
      6, 7, 8,
      11, 10 ,9,
      14, 13, 12,
      15, 16, 17,
      18, 19, 20,
      23, 22, 21,
    ];

    this.normals = [
      0, -1,0,
      0, -1,0,
      0, -1,0,
      0, 1,0,
      0, 1,0,
      0, 1,0,
      0, -1,0,
      0, -1,0,
      0, -1,0,
      0, 1,0,
      0, 1,0,
      0, 1,0,
      -1, 2, 0,
      -1, 2, 0,
      -1, 2, 0,
      1, -2, 0,
      1, -2, 0,
      1, -2, 0,
      1, -2, 0,
      1, -2, 0,
      1, -2, 0,
      -1, 2, 0,
      -1, 2, 0,
      -1, 2, 0
    ];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};
