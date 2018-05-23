class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    var j = 0
    for (var i = 2; i < this.vertices.length; i += 3, j++) {
      this.vertices[i] += altimetry[Math.floor(j / altimetry.length)][j % (altimetry[Math.floor(j / altimetry.length)].length + 1)];
    }

    this.normals = [];

    for (var i = 0; i < this.vertices.length; i += 3) {
      let normal = [0, 0, 0];
      let neighbors = [i - 3, i - nDivs * 3 - 3, i + 3, i + nDivs * 3 + 3];

      for (var j = 0; j < neighbors.length; j++) {
        let tmp = [0, 0, 0];
        if ((neighbors[j] % (nDivs + 1)) == (i % (nDivs + 1)) && j % 2 == 0 && neighbors[j] >= 0 && neighbors[j] < this.vertices.length) {
          for (var k = 0; k < tmp.length; k++) {
            tmp[k] = this.vertices[neighbors[j] + k] - this.vertices[i + k];
          }
          this.normalize(tmp);
          if(tmp[1] == 0){
            normal[1] = normal[1] - Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
          }
          else if (tmp[2] == 0){
            normal[2] = normal[2] - Math.abs(tmp[1] == 0 ? 0 : 1 / tmp[1]);
          }
          else if (tmp[1] / Math.abs(tmp[1]) == tmp[2] / Math.abs(tmp[2])) {
            normal[1] = normal[1] + Math.abs(tmp[1] == 0 ? 0 : 1 / tmp[1]);
            normal[2] = normal[2] - Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
          } else {
            normal[1] = normal[1] + Math.abs(tmp[1] == 0 ? 0 : 1 / tmp[1]);
            normal[2] = normal[2] + Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
          }

        } else if (j % 2 == 1 && neighbors[j] >= 0 && neighbors[j] < this.vertices.length) {
          for (var k = 0; k < tmp.length; k++) {
            tmp[k] = this.vertices[neighbors[j] + k] - this.vertices[i + k];
          }
          this.normalize(tmp);
          if(tmp[0] == 0){
            normal[0] = normal[0] - Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
          }
          else if (tmp[2] == 0){
            normal[2] = normal[2] - Math.abs(tmp[0] == 0 ? 0 : 1 / tmp[0]);
          }
          else if (tmp[2] / Math.abs(tmp[2]) == tmp[0] / Math.abs(tmp[0])) {
            normal[2] = normal[2] + Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
            normal[0] = normal[0] - Math.abs(tmp[0] == 0 ? 0 : 1 / tmp[0]);
          } else {
            normal[2] = normal[2] - Math.abs(tmp[2] == 0 ? 0 : 1 / tmp[2]);
            normal[0] = normal[0] + Math.abs(tmp[0] == 0 ? 0 : 1 / tmp[0]);
          }
        }

      }
      this.normalize(normal);
      console.log(normal);
      var zeros = true;
      for (var j = 0; j < normal.length; j++) {
        if (normal[j] != 0)
          zeros = false;
      }
      if (zeros) {
        normal[2] = 1;
      }
      for (var j = 0; j < normal.length; j++) {
        this.normals.push(normal[j]);
      }

    }

    console.log(this.vertices.length / 3 - this.normals.length / 3);
    console.log(this.normals);
    this.initGLBuffers();
    this.scene = scene;
    this.scene.terrainAppearance = new CGFappearance(this.scene);
    this.scene.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
    this.scene.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

  };

  normalize(v) {
    let n = 0;
    for (var i = 0; i < v.length; i++) {
      n += v[i] * v[i];
    }
    if (n != 0) {
      for (var i = 0; i < v.length; i++) {
        v[i] /= Math.sqrt(n);
      }
    }
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(50, 50, 1);
    this.scene.terrainAppearance.apply();
    super.display();
    this.scene.popMatrix();
  }
};
