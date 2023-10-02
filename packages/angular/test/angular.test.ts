import { describe, test, expect } from 'vitest';
import 'zone.js';
import 'zone.js/dist/zone-testing';
import { render, screen } from '@testing-library/angular';
import { UnpicModule } from '../src/public-api';
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from '../../../test/test-helpers';

describe('the Angular directive', () => {
  for (const props of imgTestCases) {
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
        declarations: [UnpicModule],
      });

      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }

  for (const props of sourceTestCases) {
    test(`renders a ${props.layout} source`, async () => {
      const attrs = Object.entries(props).map(([key, value]) => {
        if (value === undefined) {
          return '';
        }
        return `${key}="${value}"`;
      });
      const template = `<source unpic ${attrs.join(' ')} />`;
      await render(template, {
        declarations: [UnpicModule],
      });

      const img = screen.getByAltText(props);
      expect(img).toBeTruthy();
      expectSourcePropsToMatchTransformed(img, props);
    });
  }
});
