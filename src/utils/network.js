const os = require("os");

class NetworkUtil {
  static getHost() {
    const ifaces = os.networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(ifaces)) {
      for (const net of ifaces[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }

    return results?.["Wi-Fi"] || "127.0.0.1";
  }

  static getMoblieHost = (path) => {
    const host = this.getHost();
    return `exp://${host}:${process.env.MOBILE_PORT}/--/${path}`;
  };
}

module.exports = NetworkUtil;
