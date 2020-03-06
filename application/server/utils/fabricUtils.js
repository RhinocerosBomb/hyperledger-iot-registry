const getNetwork = async (identity, connection, channel) => {
  const { FileSystemWallet, Gateway } = require('fabric-network')
  const path = require('path')

  const ccpPath = path.resolve(
    __dirname,
    '..',
    'config',
    `${connection}.json`,
  )

  const walletPath = path.join(process.cwd(), 'wallet')
  const wallet = new FileSystemWallet(walletPath)
  console.log(`Wallet path: ${walletPath}`)

  // Check to see if we've already enrolled user.
  const userExists = await wallet.exists(identity)
  if (!userExists) {
    console.log(
      `An identity for the user ${identity} does not exist in the wallet`,
    )
    return new Error(`User ${identity} does not exist or is not enrolled`)
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway()
  // use the identity of user1 from wallet to connect
  await gateway.connect(ccpPath, {
    wallet,
    identity,
    discovery: { enabled: true, asLocalhost: true },
  })

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork(channel)

  return network
}

console.log(getNetwork)
module.exports = { getNetwork }
