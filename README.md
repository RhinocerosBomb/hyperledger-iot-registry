# hyperledger-iot-registry

## Purpose

The purpose of this application is to come up with a potential use case of hyperledger fabric and exercise our skills as developers to create a MVP of such a use case.

## Use Case

Imagine a consortium between a major parking authority (e.g., Green P) and car rental companies (e.g., Hertz and Rent-A-Car) that share and exchange data on the parking lots and rented cars to better optimize their subsequent business models. The data is collected by smart parking IOT sensors [like this one here](https://www.bosch-connectivity.com/products/connected-mobility/parking-lot-sensor/) and IOT devices that collect data from rental cars.

## Getting Started

### Starting the network
```sh
cd test-network
source .env
mkdir crypto-config
mkdir channel-artifacts

../bin/cryptogen generate --config=./crypto-config.yaml --output="crypto-config"
../bin/configtxgen -profile OrdererGenesis -outputBlock ./channel-artifacts/genesis.block

../bin/configtxgen -profile ${CHANNEL_ONE_PROFILE} -outputCreateChannelTx ./channel-artifacts/${CHANNEL_ONE_NAME}.tx -channelID $CHANNEL_ONE_NAME
../bin/configtxgen -profile ${CHANNEL_TWO_PROFILE} -outputCreateChannelTx ./channel-artifacts/${CHANNEL_TWO_NAME}.tx -channelID $CHANNEL_TWO_NAME
../bin/configtxgen -profile ${CHANNEL_THREE_PROFILE} -outputCreateChannelTx ./channel-artifacts/${CHANNEL_THREE_NAME}.tx -channelID $CHANNEL_THREE_NAME

../bin/configtxgen -profile ${CHANNEL_ONE_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors_${CHANNEL_ONE_NAME}.tx -channelID $CHANNEL_ONE_NAME -asOrg Org1MSP
../bin/configtxgen -profile ${CHANNEL_ONE_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors_${CHANNEL_ONE_NAME}.tx -channelID $CHANNEL_ONE_NAME -asOrg Org2MSP
../bin/configtxgen -profile ${CHANNEL_ONE_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors_${CHANNEL_ONE_NAME}.tx -channelID $CHANNEL_ONE_NAME -asOrg Org3MSP

../bin/configtxgen -profile ${CHANNEL_TWO_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors_${CHANNEL_TWO_NAME}.tx -channelID $CHANNEL_TWO_NAME -asOrg Org1MSP
../bin/configtxgen -profile ${CHANNEL_TWO_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors_${CHANNEL_TWO_NAME}.tx -channelID $CHANNEL_TWO_NAME -asOrg Org2MSP

../bin/configtxgen -profile ${CHANNEL_THREE_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors_${CHANNEL_THREE_NAME}.tx -channelID $CHANNEL_THREE_NAME -asOrg Org1MSP
../bin/configtxgen -profile ${CHANNEL_THREE_PROFILE} -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors_${CHANNEL_THREE_NAME}.tx -channelID $CHANNEL_THREE_NAME -asOrg Org3MSP

docker-compose -f docker-compose.yaml up -d
```

### Starting the API

From the project root directory.
```sh
cd application/server
npm install
npm start
```

### Starting client

From the project root directory.
```sh
cd application/client
npm install
npm start
```

## Fabric Architecture

### Orderers

| Orderers(Transportation Governance Org) |
|-----------------------------------------|
| orderer                                 |
| orderer2                                |
| orderer3                                |
| orderer4                                |
| orderer5                                |

### Organizations

| Organizations | Use Case Example |
|---------------|------------------|
| Org1          | Green P          |
| Org2          | Hertz            |
| Org3          | Rent-A-Car       |

### Peers

#### Org1

| Peers                        | Users      | ca's | couchdb  |
|------------------------------|------------|------|----------|
| peer0 (Anchor and Endorsing) | admin      | ca0  | couchdb0 |
| peer1                        | device     |      | couchdb1 |
|                              | controller |      |          |

#### Org2

| Peers                        | Users      | ca's | couchdb  |
|------------------------------|------------|------|----------|
| peer0 (Anchor and Endorsing) | admin      | ca1  | couchdb2 |
| peer1                        | device     |      | couchdb3 |
|                              | controller |      |          |

#### Org3

| Peers                        | Users      | ca's | couchdb  |
|------------------------------|------------|------|----------|
| peer0 (Anchor and Endorsing) | admin      | ca2  | couchdb4 |
| peer1                        | device     |      | couchdb5 |
|                              | controller |      |          |

### Channels

| Organizations | ChannelAll         | Channel12          | Channel13          |
|----------|--------------------|--------------------|--------------------|
| Org1     | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Org2     | :heavy_check_mark: | :heavy_check_mark: |                    |
| Org3     | :heavy_check_mark: |                    | :heavy_check_mark: |

### Functionality

As an admin, you should be able to:

1. Query for data submitted by the device. Should be able to query by the devices ID and/or the controllers ID
2. Register and enroll devices and controllers
3. Change the controller of devices

As a device, you should be able to:

1. Submit device data/event