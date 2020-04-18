import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';

const plugins = [
  replace({ 
    __LAYERS_SDK_VERSION__: require("./package.json").version
  }),
  typescript(),
  serve({
    port: 30080,
    contentBase: './',
    openPage: '/tests/e2e/static/parent.html',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }),
  livereload({
    watch: ['dist', 'tests'],
    verbose: true,
  })
]

export default [
  {
    input: ['src/app.ts'],
    output: {
      file: 'dist/app.js',
      format: 'iife',
      sourcemap: true
    },
    plugins
  }, 
  {
    input: ['src/parent.ts'],
    output: {
      file: 'dist/parent.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins
  }
];