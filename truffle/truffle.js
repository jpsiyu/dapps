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
      gasPrice: 11000000000,
      gas: 8003914,
    },
    rinkeby: {
      host: "127.0.0.1", // Connect to geth on the specified
      port: 8545,
      network_id: 4,
      gasPrice: 11000000000,
      gas: 8003914,
    }
  },
  compilers: {
    solc: {
      version: "0.4.23",
    }
  }
}