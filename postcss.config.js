export default {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 375,
        viewportHeight: 667,
        unitPrecision: 3,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines', '.uno-'],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [/node_modules/],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568
      }
    }
  }