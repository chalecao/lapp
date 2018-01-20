import buble from 'rollup-plugin-buble'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es';

export default {
    format: 'es',
    entry: 'src/index+.js',
    dest: 'bin/index+.js',
    banner: '// lapp with IF/ELSE/FOR component - fed123.com',
    footer:"",
    external: [],
    paths: {
        pjson: '../package.json'
    },
    plugins: [
        babel({"presets": [[
            "env",
            {
                "modules": false
            }
        ]],
        "plugins": [
            ["transform-react-jsx", {
                "pragma": "creatNode"
            }]
            // "external-helpers"//注意这个参数不能加，加了之后模块exports有问题，坑坑坑
        ]}),
        buble(),
        uglify({},minify)
    ]
}