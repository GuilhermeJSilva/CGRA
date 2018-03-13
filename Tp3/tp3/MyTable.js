/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
        this.table = new MyUnitCubeQuad(this.scene);
        this.table.initBuffers();

        // Materials
	
		
		this.scene.tampo = new CGFappearance(scene);
		this.scene.tampo.setAmbient(0.545, 0.271, 0.075,1);
		this.scene.tampo.setDiffuse(0.545, 0.271, 0.075,1);
		this.scene.tampo.setSpecular(0.1,0.1,0.1,1);	

		
		this.scene.perna = new CGFappearance(scene);
		this.scene.perna.setAmbient(0.737, 0.561, 0.561,1);
		this.scene.perna.setDiffuse(0.737, 0.561, 0.561,1);
		this.scene.perna.setSpecular(1,1,1,1);

	};

    display()
    {
    this.scene.pushMatrix();

        this.scene.translate(5/2 - 0.3, 3.5/2, -3/2 + 0.3);
        this.scene.scale(0.3, 3.5, 0.3);
		this.scene.perna.apply();
        this.table.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

        this.scene.translate(-5/2 + 0.3, 3.5/2, -3/2 + 0.3);
        this.scene.scale(0.3, 3.5, 0.3);
        this.scene.perna.apply();
        this.table.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

        this.scene.translate(5/2 - 0.3, 3.5/2, 3/2 - 0.3);
        this.scene.scale(0.3, 3.5, 0.3);
        this.scene.perna.apply();
        this.table.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

        this.scene.translate(-5/2 + 0.3, 3.5/2, 3/2 - 0.3);
        this.scene.scale(0.3, 3.5, 0.3);
        this.scene.perna.apply();
        this.table.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

        this.scene.translate(0, 3.5 + 0.3/2, 0);
        this.scene.scale(5, 0.3, 3);
        this.scene.tampo.apply();
        this.table.display();
    this.scene.popMatrix();

    }
};
