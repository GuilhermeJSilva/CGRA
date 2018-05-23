class MyTerrain extends Plane {
  constructor(scene, nDivs, altimetry) {
    super(scene, nDivs);
    var j = 0
    for (var i = 2; i < this.vertices.length; i += 3, j++) {
      this.vertices[i] += altimetry[Math.floor(j / altimetry.length)][j % (altimetry[Math.floor(j / altimetry.length)].length + 1)];
    }

    
    this.initGLBuffers();
    this.scene = scene;
    this.scene.terrainAppearance = new CGFappearance(this.scene);
    this.scene.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
    this.scene.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(50, 50, 1);
    this.scene.terrainAppearance.apply();
    super.display();
    this.scene.popMatrix();
  }
}
