/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject {
  constructor(scene, left, right, minS, maxS, minT, maxT) {
    super(scene);

    minS = typeof minS !== 'undefined' ? minS : 0;
    minT = typeof minT !== 'undefined' ? minT : 0;
    maxS = typeof maxS !== 'undefined' ? maxS : 1;
    maxT = typeof maxT !== 'undefined' ? maxT : 1;

    left = typeof left !== 'undefined' ? left : 0.1;
    right = typeof right !== 'undefined' ? right : 0.1;

    this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;

    this.left = left;
    this.right = right;

    this.initBuffers();
  };

  initBuffers() {
    this.vertices = [
			-0.5, -0.5, 0,
      0.5, -0.5, 0,
			-0.5 + this.right, 0.5, 0,
      0.5 - this.left, 0.5, 0,
    ];

    this.indices = [
      0, 1, 2,
      3, 2, 1,
    ];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ];

    this.texCoords = [
      this.minS, this.maxT,
      this.maxS, this.maxT,
      this.minS + this.left, this.minT,
      this.maxS - this.right, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};