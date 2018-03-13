/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.delta = 2 * Math.PI / slices;

        this.vertices = new Array();
        this.indices = new Array();
        this.normal = new Array();
        this.initBuffers();
    }
    ;initVertices() {
        for (var i = this.delta; i <= 2 * Math.PI; i = i + this.delta) {

            this.vertices.push(Math.cos(i));
            this.vertices.push(Math.sin(i));
            this.vertices.push(0);

            this.vertices.push(Math.cos(i));
            this.vertices.push(Math.sin(i));
            this.vertices.push(1);
        }

        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(0);

        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(1);


    }
    ;initIndices() {

        for (var i = 0; i < this.vertices.length - 6; i++) {

            if (i % 2 == 0) {
                this.indices.push((i + 2) % (this.vertices.length/3 - 2));
                this.indices.push((i + 1) % (this.vertices.length/3 - 2))
                this.indices.push((i) % (this.vertices.length/3 - 2));
            } else {
                this.indices.push((i) % (this.vertices.length/3 - 2));
                this.indices.push((i + 1) % (this.vertices.length/3 - 2))
                this.indices.push((i + 2) % (this.vertices.length/3 - 2));
            }

        }

        for (var i = 0; i < (this.slices*2); i++) {
           
            if (i % 2 == 0) {
                this.indices.push(this.vertices.length/3 - 2);
                this.indices.push((i + 2) % (this.vertices.length/3 - 2))
                this.indices.push((i) % (this.vertices.length/3 - 2));
            } else {
                this.indices.push((i) % (this.vertices.length/3 - 2));
                this.indices.push((i + 2) % (this.vertices.length/3 - 2))
                this.indices.push(this.vertices.length/3 - 1);
            }
        }
    }
    ;
    initNormal() {
        for (var i = this.delta/2; i <= 2 * Math.PI; i += this.delta) {
          
            this.normal.push(Math.cos(i));
            this.normal.push(Math.sin(i));
            this.normal.push(0);
        }
        debugger;

        for (var i = 0; i < (this.slices*2); i++) {
              if (i % 2 == 0) {
                this.normal.push(0);
                this.normal.push(0)
                this.normal.push(-1);
            } else {
                this.normal.push(0);
                this.normal.push(0)
                this.normal.push(1);
            }
        }

    }
    ;initBuffers() {

        this.initVertices();

        this.initIndices();

        this.initNormal();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
}
;