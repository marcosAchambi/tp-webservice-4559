import { Car } from './car.model';

describe('Car', () => {
  it('should create an instance', () => {
    expect(new Car(1, "Toyota")).toBeTruthy();
  });
});
