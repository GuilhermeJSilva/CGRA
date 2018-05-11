class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    var j = 0
    for (var i = 2; i < this.vertices.length; i+=3, j++) {
      this.vertices[i] += altimetry[Math.floor(j / altimetry.length)][j % (altimetry[Math.floor(j / altimetry.length)].length + 1)];
    }
    console.log(this.vertices);
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(50, 50, 1);
    super.display();
    this.scene.popMatrix();
  }
}
