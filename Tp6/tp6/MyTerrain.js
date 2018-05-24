class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    this.normals = [];
    var a = 0
    for (var i = 0; i < this.vertices.length; i += 3, a++) {
      let vTmp = this.vertices[i];
      this.vertices[i] = this.vertices[i + 1] * 50;
      this.vertices[i + 2] = vTmp * 50;
      this.vertices[i + 1] = altimetry[Math.floor(a / altimetry.length)][a % (altimetry[Math.floor(a / altimetry.length)].length)];
      //this.normals.push(0,1,0);
    }

    for (var i = 0; i < this.vertices.length; i += 3) {
      let normal = [0, 0, 0];
      let neighbors = [i - 3, i - nDivs * 3 - 3, i + 3, i + nDivs * 3 + 3];

      for (var j = 0; j < neighbors.length; j++) {
        let tmp = [0, 0, 0];
        if (neighbors[j] >= 0 && neighbors[j] < this.vertices.length) {
          for (var k = 0; k < 3; k++) {
            tmp[k] = this.vertices[neighbors[j] + k] - this.vertices[i + k];
          }
          this.normalize(tmp);
          if ((neighbors[j] % (nDivs + 1)) == (i % (nDivs + 1)) && j % 2 == 1) {

            if (tmp[1] == 0) {
              normal[1] = normal[1] + 1;
            } else if (tmp[0] / Math.abs(tmp[0]) == 1) {
              normal[1] = normal[1] + tmp[0] == 0 ? 0 : 1 / tmp[0];
              normal[0] = normal[0] - tmp[1] == 0 ? 0 : 1 / tmp[1];
            } else {
              normal[1] = normal[1] - tmp[0] == 0 ? 0 : 1 / tmp[0];
              normal[0] = normal[0] + tmp[1] == 0 ? 0 : 1 / tmp[1];
            }
          } else if (j % 2 == 0) {
            if (tmp[1] == 0) {
              normal[1] = normal[1] + 1;
            } else if (tmp[2] / Math.abs(tmp[2]) == 1) {
              normal[1] = normal[1] + tmp[2] == 0 ? 0 : 1 / tmp[2];
              normal[2] = normal[2] - tmp[1] == 0 ? 0 : 1 / tmp[1];
            } else {
              normal[1] = normal[1] - tmp[2] == 0 ? 0 : 1 / tmp[2];
              normal[2] = normal[2] + tmp[1] == 0 ? 0 : 1 / tmp[1];
            }
          }
        }
      }
      this.normalize(normal);
      var zeros = true;
      for (var j = 0; j < normal.length; j++) {
        if (normal[j] != 0)
          zeros = false;
      }
      if (zeros) {
        normal[1] = 1;
      }
      for (var j = 0; j < normal.length; j++) {
        this.normals.push(normal[j]);
      }

    }
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
    this.scene.terrainAppearance.apply();
    super.display();
    this.scene.popMatrix();
  }
};
