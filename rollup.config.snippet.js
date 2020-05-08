import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/snippet.ts',
  output: {
    file: 'dist/snippet.js',
    format: 'iife'
  },
  plugins: [
    replace({
      __LAYERS_PORTAL_SDK_PUBLIC_URL__: "https://js.layers.digital/v1/LayersPortal.js"
    }),
    typescript(),
    terser({
      output: {
        comments: false
      }
    }),
  ]
};