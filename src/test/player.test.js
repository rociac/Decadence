import Phaser from 'phaser';

describe('Phaser', () => {
  it('should be an object', () => {
    expect(typeof Phaser).toBe('object');
  });

  it('should be version 3.22.0', () => {
    expect(Phaser.VERSION).toBe('3.22.0');
  });
});
