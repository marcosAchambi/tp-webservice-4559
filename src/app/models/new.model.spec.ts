import { New } from './new.model';

describe('New', () => {
  it('should create an instance', () => {
    expect(new New(1, 'Título', 'Descripción', 'url-imagen.jpg', '2023-05-15')).toBeTruthy();
  });
});
