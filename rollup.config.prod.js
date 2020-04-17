import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/app.ts',
  output: {
    name: 'Layers',
    dir: 'dist',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    typescript(),
    terser({
      output: {
        comments: false
      }
    }),
  ]
};