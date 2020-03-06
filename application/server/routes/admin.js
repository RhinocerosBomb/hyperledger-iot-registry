var express = require('express');
var fabricUtils = require('../utils/fabricUtils');
var router = express.Router();

/* GET device listing. */
router.get('/', async function(req, res, next) {
  console.log(fabricUtils);
  try {
    const network = fabricUtils.getNetwork('admin', 'connection-org1', 'mychannel');
    // Get the contract from the network.
    const contract = network.getContract('iotRegistry')

    const result = await contract.evaluateTransaction('queryAllDevices')
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`,
    )
    res.staus(200).json(JSON.parse(result.toString()))
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`)
    res.status(500).json(error)
  }
})

module.exports = router
