import { FromUtcPipe } from './from-utc.pipe';

describe('FromUtcPipe', () => {
  it('create an instance', () => {
    const pipe = new FromUtcPipe();
    expect(pipe).toBeTruthy();
  });
});
