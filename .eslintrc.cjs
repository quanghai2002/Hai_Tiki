

module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    // react
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // useEffect =>thiếu => dependencies -> warning
    // 'react/prop-types': 0, // => prop type
    'react/display-name': 0,

    // commont
    'no-console': 1, // => waring => khi console.log => env dev => build -> ko có concole.log
    'no-lonely-if': 1, // if => mã sạch => if => else if
    'no-unused-vars': 1, // variable => chưa dùng đến => waring
    'no-trailing-spaces': 1, // thừa dấu cách
    'no-multi-spaces': 1, // thừa dấu cách
    'no-multiple-empty-lines': 1, // thừa nhiều dòng rỗng
    'space-before-blocks': ['error', 'always'], // có khoảng cách trước { }
    'object-curly-spacing': [1, 'always'], // mở đầu object => có khoảng trống => {_a:'Hai" }
    'indent': ['warn', 2], // thụt lùi 2
    'semi': ['error', 'always'], // dấu chấm phẩm ở cuối dòng => bắt buộc
    'quotes': ['error', 'single'], // 1 string => 1 dấu nháy đơn khi wrap  'a'
    'array-bracket-spacing': 1, // array => thừa 1 khoảng trống đầu
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn', // không dư => dòng dư thừa => phải ngắt dòng ;
    'keyword-spacing': 1, // khoảng trống => if ... else if
    'comma-dangle': 0, // thừa dấu chấm phẩy => property object => cuối cùng
    'comma-spacing': 1,
    'arrow-spacing': 1, // có 1 khoảng trống arrow function => () => { }

    // MUI
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@mui/*/*/*']
      }
    ] // import MUI Icon => chi đến 1 cấp hoặc 2 cấp
  }
};
