import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/snippet.js',
  output: {
    file: 'dist/snippet.js',
    format: 'iife'
  },
  plugins: [
    replace({ 
      // __LAYERS_SDK_PUBLIC_URL__: '/dist/app.js'
      __LAYERS_SDK_PUBLIC_URL__: "https://unpkg.com/layers-sdk@3/dist/app.js"
    }),
    terser({
      output: {
        comments: false
      }
    }),
  ]
};