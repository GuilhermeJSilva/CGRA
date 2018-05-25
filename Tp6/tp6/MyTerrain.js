class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    this.normals = [];
    var a = 0
    for (var i = 0; i < this.vertices.length; i += 3, a++) {
      let vTmp = this.vertices[i];
      this.vertices[i] = this.vertices[i + 1] * 50;
      this.vertices[i + 2] = vTmp * 50;
      this.vertices[i + 1] = altimetry[Math.floor(a / altimetry.length)][a % (altimetry[Math.floor(a / altimetry.length)].length)] * 3;
    }

    for (var i = 0; i < this.vertices.length; i += 3) {
      let normal = [0, 0, 0];
      let neighbors = [i - 3, i - nDivs * 3 - 3, i + 3, i + nDivs * 3 + 3];
      var counter = 0;
      for (var j = 0; j < neighbors.length; j++) {
        let tmp = [0, 0, 0];
        if (neighbors[j] >= 0 && neighbors[j] < this.vertices.length) {
          for (var k = 0; k < 3; k++) {
            tmp[k] = this.vertices[neighbors[j] + k] - this.vertices[i + k];
          }

          if (j % 2 == 1) {
            if (tmp[1] == 0) {
              normal[1] = normal[1] + 1;
            } else if (tmp[0] / Math.abs(tmp[0]) == 1) {
              normal[1] = normal[1] + tmp[0] == 0 ? 1 : 1 / tmp[0];
              normal[0] = normal[0] - tmp[1] == 0 ? 1 : 1 / tmp[1];
            } else {
              normal[1] = normal[1] - tmp[0] == 0 ? 1 : 1 / tmp[0];
              normal[0] = normal[0] + tmp[1] == 0 ? 1 : 1 / tmp[1];
            }
          } else if (Math.floor(neighbors[j] / (3 * (nDivs + 1))) == Math.floor(i / (3 * (nDivs + 1))) && j % 2 == 0) {
            if (tmp[1] == 0) {
              normal[1] = normal[1] + 1;
            } else if (tmp[2] / Math.abs(tmp[2]) == 1) {
              normal[1] = normal[1] + tmp[2] == 0 ? 1 : 1 / tmp[2];
              normal[2] = normal[2] - tmp[1] == 0 ? 1 : 1 / tmp[1];
            } else {
              normal[1] = normal[1] - tmp[2] == 0 ? 1 : 1 / tmp[2];
              normal[2] = normal[2] + tmp[1] == 0 ? 1 : 1 / tmp[1];
            }
          }
        }
      }
      this.normalize(normal)
      for (var j = 0; j < normal.length; j++) {
        if (j == 1)
          this.normals.push(Math.abs(normal[j]));
        else {
          this.normals.push(normal[j]);
        }
      }

    }
    // var string = "draw3d("
    // for (var i = 0; i < this.vertices.length; i += 3) {
    //   string += "vector(" + "[" + this.vertices[i] + "," + this.vertices[i + 2] + "," + this.vertices[i + 1] + "],";
    //   string += "[" + this.normals[i] + "," + this.normals[i + 2] + "," + this.normals[i + 1] + "]),";
    //   // console.log("Vertice: " + this.vertices[i] + " " + this.vertices[i + 1] + " " + this.vertices[i + 2]);
    //   // console.log("Normals: " + this.normals[i] + " " + this.normals[i + 1] + " " + this.normals[i + 2]);
    //
    // }
    // console.log(string);
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
