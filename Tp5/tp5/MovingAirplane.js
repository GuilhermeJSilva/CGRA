/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var StatesEnum = Object.freeze({
  "TakeOff": 0,
  "Flight": 1,
  "Crash": 2,
  "EmergencyLanding": 4,
  "Grounded": 5,
  "TaxiWay": 6
});

class MovingAirplane extends CGFobject {
  constructor(scene) {
    super(scene);
    this.airplane = new MyAirplane(scene);
    this.pos = [0, 0, 0];
    this.prevpos = [0, 0, 0];
    this.angle = [Math.atan(this.airplane.a_height / 1), 0, 0];
    this.prevangle = [Math.atan(this.airplane.a_height / 1), 0, 0];
    this.t = 0;
    this.state = StatesEnum.TaxiWay;
    this.speed = 3;
  };
  updateprev() {
    this.prevpos = this.pos.slice();
    this.prevangle = this.angle.slice();
  };

  update(elapsedTime) {
    this.t += elapsedTime;
    switch (this.state) {
      case StatesEnum.Grounded:

        break;
      case StatesEnum.TaxiWay:
        this.taxiway_movement();
        if (this.t > 8000 / this.speed) {
          this.updateprev();
          this.state = StatesEnum.TakeOff;
          this.t = 0;
        }
        break;
      case StatesEnum.TakeOff:
        this.takeoff_movement();
        if (this.t > 6000 / this.speed) {
          this.updateprev();
          this.state = StatesEnum.Flight;
          this.t = 0;
        }
        break;
      case StatesEnum.Flight:
        this.flight_movement();
        if (this.t > 11900 / this.speed) {
          this.updateprev();
          this.state = StatesEnum.Crash;
          this.t = 0;
        }
        break;
      case StatesEnum.Crash:
        this.crash_movement();
        if (this.t > 9000 / this.speed) {
          this.updateprev();
          this.state = StatesEnum.EmergencyLanding;
          this.t = 0;
        }
        break;
      default:
    }
    console.log(this.angle);
  };

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.translate(0, this.airplane.a_height / 2, 0);

    this.scene.rotate(this.angle[1], 0, 1, 0);
    this.scene.rotate(this.angle[2], 0, 0, 1);
    this.scene.rotate(this.angle[0], 1, 0, 0);
    this.scene.translate(0, -this.airplane.a_height / 2, 0);
    this.airplane.display();
    this.scene.popMatrix();
  };

  linear_movement() {
    this.pos[0] = 0.1 * this.t / 1000;
    this.pos[1] = 0.1 * this.t / 1000;
    this.pos[2] = 0.1 * this.t / 1000;
  };

  angular_movement() {
    this.angle[0] = (0.1 * this.t / 1000) % (2 * Math.PI);
    this.angle[1] = (0.1 * this.t / 1000) % (2 * Math.PI);
    this.angle[2] = (0.1 * this.t / 1000) % (2 * Math.PI);
  };

  taxiway_movement() {
    this.pos[0] = -0.2 * this.t * this.speed / 1000;
    this.pos[2] = 0.2 * this.t * this.speed / 1000;
    this.angle[1] = (-0.2 * this.t * this.speed / 1000) % (2 * Math.PI);
  };

  takeoff_movement() {
    this.pos[0] = -0.6 * this.t * this.speed / 1000 + this.prevpos[0];
    if (this.t > 2000/this.speed) {
      this.pos[1] = 0.1 * Math.pow((this.t* this.speed - 2000)  / 1000, 2);
      this.angle[0] = (-0.073 * (this.t* this.speed - 2000)  / 1000) % (2 * Math.PI) + Math.atan(this.airplane.a_height / 1);
    }
  };

  flight_movement() {
    this.pos[0] = (-0.6 - 0.03*this.t/1000 * this.speed) * this.t * this.speed / 1000 + this.prevpos[0];
  };

  crash_movement() {
    this.pos[1] = -0.65 * this.t * this.speed / 1000 + this.prevpos[1];
    this.angle[0] = (0.3 * (this.t * this.speed) / 1000) % (2 * Math.PI) + this.prevangle[0];
  };
};
