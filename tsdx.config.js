const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    const _external = config.external;
    config.external = (id) => {
      /** 配置需要打包的依赖 */
      if (['lodash-es'].includes(id)) {
        return false;
      }
      else {
        return _external(id);
      }
      
    }
    config.plugins.push(
      postcss({
        inject: true,
        extract: !!options.writeMeta,
        camelCase: true,
        sass: true,
      })
    );
    return config;
  },
};
