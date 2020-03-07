var express = require('express');
var router = express.Router();

router.put('/', async function(req, res, next) {
    try {
        const network = fabricUtils.getNetwork('device', 'connection-org1', 'myChannel');
    
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
});

module.exports = router;