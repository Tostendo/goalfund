module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: "empty", module: "empty" };
      require("./scripts/initCms.js");
      require("./scripts/createCachedPlayerData.js");
    }

    return config;
  },
};
