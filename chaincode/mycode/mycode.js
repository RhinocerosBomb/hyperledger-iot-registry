const shim = require('fabric-shim');

const mycode = class {
    Init(stub) {
        return shim.success();
    }

    async Invoke(stub) {

      let ret = stub.getFunctionAndParameters();
      let fcn = this[ret.fcn];
      return fcn(stub, ret.params);
    }

    async saveData(stub, args) {
      let key = args[0];
      let val = args[1];

      await stub.putState(key, Buffer.from(val.toString()));
      return shim.success(Buffer.from('saveData Successful!'));
    }

    async getData(stub, args) {
        let uid = args[0];
        let data = await stub.getState(uid);

        return shim.success(data);

    }

};

shim.start(new mycode());

