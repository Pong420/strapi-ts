import { minify, Options } from 'html-minifier';

export function minifyHTML(html: string, options?: Options) {
  return minify(html, {
    collapseWhitespace: true,
    removeEmptyAttributes: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    ...options
  });
}
