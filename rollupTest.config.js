import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [{
  input: 'demo/src/main-fp.js',
  output: {
    file: 'demo/dist/main-fp.js',
    format: 'iife'
  },
  banner: '// lapp - fed123.com',
  footer: '',
  external: [],
  paths: {
    pjson: '../package.json'
  },
  plugins: [
    babel({
      'presets': [[
        'env',
        {
          'modules': false
        }
      ]],
      'plugins': [
        ['transform-react-jsx', {
          'pragma': 'l'
        }],
        "external-helpers"//注意这个参数不能加，加了之后模块exports有问题，坑坑坑
      ]
    }),
    resolve(),
    commonjs()
    // buble(),
    // uglify({},minify)
  ]
},
{
  input: 'demo/src/main-class.js',
  output: {
    file: 'demo/dist/main-class.js',
    format: 'iife'
  },
  banner: '// lapp - fed123.com',
  footer: '',
  external: [],
  paths: {
    pjson: '../package.json'
  },
  plugins: [
    babel({
      'presets': [[
        'env',
        {
          'modules': false
        }
      ]],
      'plugins': [
        ['transform-react-jsx', {
          'pragma': 'l'
        }],
        "external-helpers"//注意这个参数不能加，加了之后模块exports有问题，坑坑坑
      ]
    }),
    resolve(),
    commonjs()
    // buble(),
    // uglify({},minify)
  ]
}]
