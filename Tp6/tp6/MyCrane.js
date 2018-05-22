/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var CraneStates = Object.freeze({
  "Stopped": 0,
  "TurningToCar": 1,
  "LoweringMagnet": 2,
  "TurningFromCar": 3,
  "ReleasingCar": 4,
  "Reseting": 5
});

class MyCrane extends CGFobject {
  constructor(scene, car, pos) {
    super(scene);

    this.firstArt = new MyArticulation(scene, [0, 1, 0], 0, 7, Math.PI / 2 - Math.PI / 10);
    this.secondArt = new MyArticulation(scene, [1, 0, 0], 0, 6, 0);
    this.endPoint = new MyEndPoint(scene, 3);

    this.state = CraneStates.Stopped;
    this.t = 0;

    const sensor_relative_position = [0, 0, -8];
    this.pos = pos;
    this.sensor_position = new Array();
    for (var i = 0; i < this.pos.length; i++) {
      this.sensor_position.push(this.pos[i] + sensor_relative_position[i]);
    }

    this.car = car;
    this.tipPosition = [0, 0, 0];
    this.lastTipPosition = new Array();
    this.start = true;

    this.timeElapsed = 0;
    this.lastFirstAngle = 0;
    this.lastSecondAngle = 0;

    this.car_height = 0;
  };

  display() {
    this.lastTipPosition = this.tipPosition;

    var pos = [0, 0, 0];

    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

    this.scene.pushMatrix();
    this.firstArt.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    pos[0] += this.firstArt.armlength * Math.sin(Math.PI / 2 - this.firstArt.armAngle) * Math.sin(this.firstArt.angle);
    pos[1] += this.firstArt.armlength * Math.cos(Math.PI / 2 - this.firstArt.armAngle);
    pos[2] += this.firstArt.armlength * Math.sin(Math.PI / 2 - this.firstArt.armAngle) * Math.cos(this.firstArt.angle);
    this.scene.translate(pos[0], pos[1], pos[2]);
    this.scene.rotate(this.firstArt.angle, 0, 1, 0);
    this.secondArt.display();
    this.scene.popMatrix();

    pos[0] += this.secondArt.armlength * Math.cos(-this.secondArt.angle) * Math.sin(this.firstArt.angle);
    pos[1] += this.secondArt.armlength * Math.sin(-this.secondArt.angle)
    pos[2] += this.secondArt.armlength * Math.cos(-this.secondArt.angle) * Math.cos(this.firstArt.angle);
    this.scene.pushMatrix();
    this.scene.translate(pos[0], pos[1], pos[2]);
    this.endPoint.display();
    this.scene.popMatrix();

    this.tipPosition = pos;

    if (this.state == CraneStates.TurningFromCar) {
      for (let i = 0; i < this.tipPosition.length; i++) {
        if (!this.start) {
          this.car.moved[i] += this.tipPosition[i] - this.lastTipPosition[i];
        }
      }
    }
    this.start = false;
    this.scene.popMatrix();
  }

  update(elapsedTime) {

    if (this.state != CraneStates.Stopped)
      this.t += elapsedTime / 1000;

    const turning_time = [4, 1, 4, 0.5];
    const sensor_dimension = [1, 0.5];


    switch (this.state) {
      case CraneStates.Stopped:
        if ((this.sensor_position[0] - sensor_dimension[0] <= this.car.moved[0]
        && this.sensor_position[0] + sensor_dimension[0] >= this.car.moved[0])
        && (this.sensor_position[1] - sensor_dimension[1] <= this.car.moved[2]
        && this.sensor_position[1] + sensor_dimension[1] >= this.car.moved[2])){
          this.car.restrictMovement();
          this.state = CraneStates.TurningToCar;
        }
        break;

      case CraneStates.TurningToCar:

        this.firstArt.angle = this.lastFirstAngle + Math.PI * this.t / turning_time[0];

        if (this.t >= turning_time[0]) {
          this.state = CraneStates.LoweringMagnet;
          this.timeElapsed = turning_time[0];
          this.lastFirstAngle = this.firstArt.angle;
          this.lastSecondAngle = this.secondArt.angle;
        }
        break;

      case CraneStates.LoweringMagnet:
        this.secondArt.angle = this.lastSecondAngle + Math.PI / 13 * (this.t - this.timeElapsed) / turning_time[1];

        if ((this.t - this.timeElapsed) >= turning_time[1]) {
          this.state = CraneStates.TurningFromCar;
          this.timeElapsed += turning_time[1];
          this.lastFirstAngle = this.firstArt.angle;
          this.lastSecondAngle = this.secondArt.angle;

        }
        break;

      case CraneStates.TurningFromCar:
        this.firstArt.angle = this.lastFirstAngle - Math.PI * (this.t - this.timeElapsed) / turning_time[2];

        if (this.t - this.timeElapsed <= 1)
          this.secondArt.angle = this.lastSecondAngle - Math.PI / 13 * (this.t - this.timeElapsed);

        if ((this.t - this.timeElapsed) >= turning_time[2]) {
          this.state = CraneStates.ReleasingCar;
          this.timeElapsed += turning_time[2];
          this.lastFirstAngle = this.firstArt.angle;
          this.lastSecondAngle = this.secondArt.angle;
          this.car_height = this.car.moved[1];
        }
        break;

      case CraneStates.ReleasingCar:
        this.car.moved[1] = this.car_height - this.car_height * (this.t - this.timeElapsed) / turning_time[3];

        if ((this.t - this.timeElapsed) >= turning_time[3]) {
          this.state = CraneStates.Reseting;
          this.timeElapsed += turning_time[3];
          this.lastFirstAngle = this.firstArt.angle;
          this.lastSecondAngle = this.secondArt.angle;
          this.car.allowMovement();
        }
        break;

      case CraneStates.Reseting:
          this.state = CraneStates.Stopped;
          this.timeElapsed += turning_time[4];
          this.timeElapsed = 0;
          this.lastFirstAngle = 0;
          this.lastSecondAngle = 0;
          this.t = 0;

        break;
      default:

    }
  };

};
