/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.cilinder = new MyCilinder(scene, slices, stacks);
    this.cover = new MyCircle(scene, slices);
    this.hourHand = new MyClockHand(scene, 0.2, 0.04);
    this.minuteHand = new MyClockHand(scene, 0.4, 0.02);
    this.secondHand = new MyClockHand(scene, 0.8, 0.01);

    this.hour = 0;
    this.minute = 0;
    this.second = 0;

  };

  initBuffers() {
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };

  display() {
    this.scene.pushMatrix();

    this.cilinder.display();
    this.scene.translate(0, 0, 1);
    this.hourHand.display();
    this.minuteHand.display();
    this.secondHand.display();
    this.scene.clockAppearance.apply();
    this.cover.display();
    this.scene.popMatrix();
  }

  setTime(hour, minute, second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.hourHand.setAngle((hour % 12) * 360 / 12 + 360 * minute / 12 / 60 + 360 / 12 / 3600 * second);
    this.minuteHand.setAngle(360 * minute / 60);
    this.secondHand.setAngle(360 / 60 * second);
  }

  update(timeElapsed) {
    //console.log(timeElapsed);
    //console.log(this.hour, this.minute, this.second);
    var tmp_seconds = (this.second + timeElapsed / 1000) % 60;
    var tmp_minute = (this.minute + Math.floor((this.second + timeElapsed / 1000) / 60)) % 60;
    var tmp_hour = (this.hour + Math.floor((this.minute + Math.floor((this.second + timeElapsed / 1000) / 60)) / 60)) % 12;
    this.setTime(tmp_hour, tmp_minute, tmp_seconds);
  }
};
