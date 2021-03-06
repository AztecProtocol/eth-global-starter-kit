/* global artifacts */
/* eslint-disable no-console */
const { isUndefined } = require('lodash');

const ACE = artifacts.require('./ACE.sol');
const AdjustableFactory = artifacts.require('./noteRegistry/epochs/201907/adjustable/FactoryAdjustable201907');

module.exports = async (deployer) => {
  if (isUndefined(ACE) || isUndefined(ACE.address)) {
    console.log('Please deploy the ACE contract first');
    process.exit(1);
  }

  await deployer.deploy(AdjustableFactory, ACE.address);

  const ace = await ACE.at(ACE.address);
  await ace.setFactory(1 * 256 ** 2 + 1 * 256 ** 1 + 2 * 256 ** 0, AdjustableFactory.address);
};
