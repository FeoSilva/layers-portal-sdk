import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';
import { eslint } from "rollup-plugin-eslint";

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/LayersPortal.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    eslint(),
    replace({
      __LAYERS_SDK_VERSION__: require("./package.json").version
    }),
    typescript(),
    terser({
      output: {
        comments: false
      }
    }),
  ]
};