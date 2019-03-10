module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      host: "127.0.0.1", // Connect to geth on the specified
      port: 8545,
      network_id: 3,
      gasPrice: 3000000000,
    },
    rinkeby: {
      host: "127.0.0.1", // Connect to geth on the specified
      port: 8545,
      network_id: 4,
    }
  },
  compilers: {
    solc: {
      version: "0.4.23",
    }
  }
}