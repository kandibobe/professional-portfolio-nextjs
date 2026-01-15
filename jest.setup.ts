import '@testing-library/jest-dom';
import { TransformStream as NodeTransformStream } from 'node:stream/web';

if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = NodeTransformStream as unknown as typeof TransformStream;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}
