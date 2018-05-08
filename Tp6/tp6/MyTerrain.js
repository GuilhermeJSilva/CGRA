class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    var j = 0
    for (var i = 1; i < this.vertices.length; i+=3, j++) {
      console.log(Math.floor(j / altimetry.length) +  " " + j % altimetry[Math.floor(j / altimetry.length)].length);
      this.vertices[i] += altimetry[Math.floor(j / altimetry.length)][j % (altimetry[Math.floor(j / altimetry.length)].length + 1)];
    }
    this.initGLBuffers();
  }
}
