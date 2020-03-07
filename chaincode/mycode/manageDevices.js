'use strict';

const { Contract } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const controllers = [
            {
                id: 'CONTROLLER0',
                devices: [],
            },
            
        ];

        for (let i = 0; i < controllers.length; i++) {
            controllers[i].docType = 'controller';
            await ctx.stub.putState('CONTROLLER' + i, Buffer.from(JSON.stringify(controllers[i])));
            console.info('Added <--> ', controllers[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryControllers(ctx, controllerID) {
        const controllerAsBytes = await ctx.stub.getState(controllerID); // get the car from chaincode state
        if (!controllerAsBytes || controllerAsBytes.length === 0) {
            throw new Error(`${controllerID} does not exist`);
        }
        console.log(controllerAsBytes.toString());
        return controllerAsBytes.toString();
    }

    async createController(ctx, controllerID, devices) {
        console.info('============= START : Create Controller ===========');

        const controller = {
            controllerID,
            devices,
            docType: 'controller',

        };

        await ctx.stub.putState(controllerID, Buffer.from(JSON.stringify(controller)));
        console.info('============= END : Create Controller ===========');
    }

    async createDevice(ctx, deviceID, controllerID, data, active, condition, timestamp) {
        console.info('============= START : Create Device ===========');

        const controllerAsBytes = await ctx.stub.getState(controllerID); // get the controller from chaincode state
        if (!controllerAsBytes || controllerAsBytes.length === 0) {
            throw new Error(`${controllerID} does not exist`);
        }
        const controller = JSON.parse(controllerAsBytes.toString());

        const device = {
            deviceID,
            controllerID,
            data,
            active,
            condition,
            timestamp,
        };

        controller.devices.push(device);

        await ctx.stub.putState(controllerID, Buffer.from(JSON.stringify(controller)));
        let indexName = 'deviceID~controllerID';
        let deviceControllerIndexKey = await ctx.stub.createCompositeKey(indexName, [deviceID, controllerID]);
        console.info(deviceControllerIndexKey);
        await ctx.stub.putState(deviceControllerIndexKey, Buffer.from('\u0000'));
        console.info('============= END : Create Device ===========');
    }

    async queryAllControllers(ctx) {
        const startKey = 'CONTROLLER0';
        const endKey = 'CONTROLLER999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeDeviceController(ctx, deviceID, newControllerID) {
        console.info('============= START : changeDeviceController ===========');

        let controllerIterator = await ctx.stub.getStateByPartialCompositeKey('deviceID~controllerID', [deviceID]); // get the controller from chaincode state
        const responseRange = await controllerIterator.next();
        let objectType;
        let attributes;
        ({
            objectType,
            attributes,
        } = await ctx.stub.splitCompositeKey(responseRange.value.key));
        const originalControllerAsBytes = await ctx.stub.getState(attributes[1]);
        if (!originalControllerAsBytes || originalControllerAsBytes.length === 0) {
            throw new Error(`${attributes[1]} does not exist`);
        }
        
        const newControllerAsBytes = await ctx.stub.getState(newControllerID);
        if (!newControllerAsBytes || newControllerAsBytes.length === 0) {
            throw new Error(`${newControllerID} does not exist`);
        }
        const originalController = JSON.parse(originalControllerAsBytes.toString());
        const newController = JSON.parse(newControllerAsBytes.toString());

        const isRightDevice = (element) => element === deviceID;
        const deviceIndex = originalController.devices.findIndex(isRightDevice);
        const device = originalController.devices[deviceIndex];
        newController.devices.push(device);
        originalController.devices.splice(deviceIndex, 1);

        await ctx.stub.putState(attributes[1], Buffer.from(JSON.stringify(originalController)));
        await ctx.stub.putState(newControllerID, Buffer.from(JSON.stringify(newController)));
        console.info('============= END : changeDeviceController ===========');
    }

}
