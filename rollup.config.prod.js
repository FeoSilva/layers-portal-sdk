import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
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