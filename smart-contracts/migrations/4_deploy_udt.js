const { scripts, ConfigManager } = require('@openzeppelin/cli')

const { add, create, push } = scripts

module.exports = async (deployer, networkName, accounts) => {
  const minter = accounts[1]
  const proxyAdmin = accounts[9]

  const { network, txParams } = await ConfigManager.initNetworkConfiguration({
    network: networkName,
    from: proxyAdmin,
  })

  // Register Unlock in the zos.json
  await add({
    contractsData: [
      {
        name: 'UnlockDiscountToken',
        alias: 'UnlockDiscountToken',
        network,
        txParams,
      },
    ],
  })
  // Push implementation contract to the network
  await push({
    from: proxyAdmin,
    network,
    txParams,
  })
  await create({
    contractAlias: 'UnlockDiscountToken',
    methodName: 'initialize',
    methodArgs: [minter],
    from: proxyAdmin,
    network,
    txParams,
  })
}
