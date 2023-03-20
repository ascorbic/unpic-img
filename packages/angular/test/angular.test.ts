import { describe, test, expect } from 'vitest';
import 'zone.js';
import 'zone.js/dist/zone-testing';
import { render, screen } from '@testing-library/angular';
import { UnpicDirective } from '../src/public-api';
import {
  expectPropsToMatchTransformed,
  testCases,
} from '../../../test/test-helpers';

describe('the Angular directive', () => {
  for (const props of testCases) {
    test(`renders a ${props.layout} image`, async () => {
      const attrs = Object.entries(props).map(([key, value]) => {
        if (value === undefined) {
          return '';
        }
        return `${key}="${value}"`;
      });
      const template = `<img unpic ${attrs.join(' ')} />`;
      console.log(template);
      await render(template, {
        declarations: [UnpicDirective],
      });

      const html = screen.debug();
      console.log(screen);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectPropsToMatchTransformed(img, props);
    });
  }
});
