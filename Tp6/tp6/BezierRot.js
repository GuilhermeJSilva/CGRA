/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class BezierRot extends CGFobject {
  constructor(scene, angle_steps, angle_step, p1, p2, p3, p4, step, tex_reps) {
    /*
    The initial curve is rotated in relation to the x axis.
    The curve must be in the x, y plane
     */

    super(scene);

    this.angle_steps = angle_steps;
    this.angle_step = angle_step;

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

    this.tex_reps = tex_reps;

    this.setCurve();
    this.initBuffers();
  };

  initVIN() {
    for (var step = 0; step <= this.angle_steps; step++) {
      for (var i = 0; i < this.initial_vertices.length; i += 3) {
        this.vertices.push(this.initial_vertices[i]);
        this.vertices.push(this.initial_vertices[i + 1] * Math.cos(step * this.angle_step) - this.initial_vertices[i + 2] * Math.sin(step * this.angle_step));
        this.vertices.push(this.initial_vertices[i + 1] * Math.sin(step * this.angle_step) + this.initial_vertices[i + 2] * Math.cos(step * this.angle_step));

        this.normals.push(this.initial_vertices[i]);
        this.normals.push(this.initial_vertices[i + 1] * Math.cos(step * this.angle_step) - this.initial_vertices[i + 2] * Math.sin(step * this.angle_step));
        this.normals.push(this.initial_vertices[i + 1] * Math.sin(step * this.angle_step) + this.initial_vertices[i + 2] * Math.cos(step * this.angle_step));

        this.texCoords.push(step * this.tex_reps/this.angle_steps);
        this.texCoords.push(i * 1/this.initial_vertices.length);
      }
    }

    for (var step = 0; step <= this.angle_steps; step++) {
      for (var i = 0; i < this.initial_vertices.length; i += 3) {
        this.vertices.push(this.initial_vertices[i]);
        this.vertices.push(this.initial_vertices[i + 1] * Math.cos(step * this.angle_step) - this.initial_vertices[i + 2] * Math.sin(step * this.angle_step));
        this.vertices.push(this.initial_vertices[i + 1] * Math.sin(step * this.angle_step) + this.initial_vertices[i + 2] * Math.cos(step * this.angle_step));

        this.normals.push(-this.initial_vertices[i]);
        this.normals.push(-this.initial_vertices[i + 1] * Math.cos(step * this.angle_step) + this.initial_vertices[i + 2] * Math.sin(step * this.angle_step));
        this.normals.push(-this.initial_vertices[i + 1] * Math.sin(step * this.angle_step) - this.initial_vertices[i + 2] * Math.cos(step * this.angle_step));

        this.texCoords.push(step * this.tex_reps/this.angle_steps);
        this.texCoords.push(i * 1/this.initial_vertices.length);
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
      this.initial_normals.push(this.getDxDt(t), this.getDyDt(t), this.getDzDt(t));

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
