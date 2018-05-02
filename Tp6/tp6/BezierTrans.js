/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class BezierTrans extends CGFobject {
  constructor(scene, slices, trans_vector, p1, p2, p3, p4, step) {
    super(scene);

    this.slices = slices;
    this.trans_vector = trans_vector;

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.step = step;

    this.initial_vertices = new Array();
    this.initial_normals = new Array();

    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();
    this.texCoords = new Array();

    this.tex_reps = 1;
    this.setCurve();
    this.initBuffers();
  };

  initVIN() {
    for (var slice = 0; slice < this.slices; slice++) {
      for (var i = 0; i < this.initial_vertices.length; i += 3) {
        this.vertices.push(this.initial_vertices[i] + slice * this.trans_vector[0]);
        this.vertices.push(this.initial_vertices[i + 1] + slice * this.trans_vector[1]);
        this.vertices.push(this.initial_vertices[i + 2] + slice * this.trans_vector[2]);

        this.texCoords.push(slice * this.tex_reps/ this.slices);
        this.texCoords.push(i * 1/this.initial_vertices.length);
      }
    }

    for (var i = 0; i < this.slices; i++) {
      for (var j = 0; j < this.initial_normals.length; j++) {
        this.normals.push(this.initial_normals[j]);
      }

    }

    for (var i = 0; i < this.vertices.length / 3 - this.initial_vertices.length / 3; i++) {
      if ((i) % (this.initial_vertices.length / 3) != (this.initial_vertices.length / 3 - 1)) {
        this.indices.push(i, i + 1, i + this.initial_vertices.length / 3);
      }
      if ((i) % (this.initial_vertices.length / 3) != 0) {
        this.indices.push(i, i + this.initial_vertices.length / 3, i - 1 + this.initial_vertices.length / 3);
      }
    }


  }
  setCurve() {
    for (var t = 0; t <= 1; t += this.step) {
      //console.log(t);
      this.initial_vertices.push(this.getPx(t), this.getPy(t), this.getPz(t));
      this.initial_normals.push((- this.trans_vector[1] * this.getDzDt(t) + this.trans_vector[2] * this.getDyDt(t)),
         (this.trans_vector[0] * this.getDzDt(t) - this.trans_vector[2] * this.getDxDt(t)),
         (- this.trans_vector[1] * this.getDxDt(t) + this.trans_vector[0] * this.getDyDt(t)))
    }
  };

  getPx(t) {
    return Math.pow(1 - t, 3) * this.p1[0] +
      3 * Math.pow(1 - t, 2) * t * this.p2[0] +
      3 * (1 - t) * Math.pow(t, 2) * this.p3[0] +
      Math.pow(t, 3) * this.p4[0];
  };

  getPy(t) {
    return Math.pow(1 - t, 3) * this.p1[1] +
      3 * Math.pow(1 - t, 2) * t * this.p2[1] +
      3 * (1 - t) * Math.pow(t, 2) * this.p3[1] +
      Math.pow(t, 3) * this.p4[1];
  };

  getPz(t) {
    return Math.pow(1 - t, 3) * this.p1[2] +
      3 * Math.pow(1 - t, 2) * t * this.p2[2] +
      3 * (1 - t) * Math.pow(t, 2) * this.p3[2] +
      Math.pow(t, 3) * this.p4[2];
  };

  getDxDt(t) {
    return -3 * Math.pow(1 - t, 2) * this.p1[0] +
      3 * Math.pow(1 - t, 2) * this.p2[0] - 6 * (1 - t) * t * this.p2[0] -
      3 * Math.pow(t, 2) * this.p3[0] + 6 * (1 - t) * t * this.p3[0] +
      3 * Math.pow(t, 2) * this.p4[0];
  };

  getDyDt(t) {
    return -3 * Math.pow(1 - t, 2) * this.p1[1] +
      3 * Math.pow(1 - t, 2) * this.p2[1] - 6 * (1 - t) * t * this.p2[1] -
      3 * Math.pow(t, 2) * this.p3[1] + 6 * (1 - t) * t * this.p3[1] +
      3 * Math.pow(t, 2) * this.p4[1];
  };

  getDzDt(t) {
    return -3 * Math.pow(1 - t, 2) * this.p1[2] +
      3 * Math.pow(1 - t, 2) * this.p2[2] - 6 * (1 - t) * t * this.p2[2] -
      3 * Math.pow(t, 2) * this.p3[2] + 6 * (1 - t) * t * this.p3[2] +
      3 * Math.pow(t, 2) * this.p4[2];
  };

  initBuffers() {
    this.initVIN();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};
