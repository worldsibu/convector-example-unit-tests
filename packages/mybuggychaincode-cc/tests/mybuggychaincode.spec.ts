// tslint:disable:no-unused-expression
import { join } from 'path';
import * as chai from 'chai';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import { Mybuggychaincode } from '../src/mybuggychaincode.model';
import { ChaincodeMockStub } from '@theledger/fabric-mock-stub';
import { MybuggychaincodeController } from '../src';
import { ClientFactory } from '@worldsibu/convector-core';

describe('Mybuggychaincode', async () => {
    chai.use(chaiAsPromised);
    let modelSample: Mybuggychaincode;
    let adapter: MockControllerAdapter;
    let mybuggychaincodeCtrl: MybuggychaincodeController;

    let modelId = uuid();
    // By default, MockControllerAdapter will use this fingerprint as the `this.sender`
    const mockIdentity = 'B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1';

    before(async () => {
        const now = new Date().getTime();
        modelSample = new Mybuggychaincode();
        modelSample.id = modelId;
        modelSample.name = 'Test';
        modelSample.created = now;
        modelSample.modified = now;
        // Mocks the blockchain execution environment
        adapter = new MockControllerAdapter();
        await adapter.init([
            {
                version: '*',
                controller: 'MybuggychaincodeController',
                name: join(__dirname, '..')
            }
        ]);
        mybuggychaincodeCtrl = ClientFactory(MybuggychaincodeController, adapter);
    });

    it('should create a default model', async () => {
        await mybuggychaincodeCtrl.create(modelSample);

        const justSavedModel = await adapter.getById<Mybuggychaincode>(modelSample.id);

        expect(justSavedModel.id).to.exist;
    });

    it('should find the model', async () => {
        let result = new Mybuggychaincode(
            await mybuggychaincodeCtrl
                .getOne(modelId));
        console.log(result);
        expect(result.id).to.exist;
    });

    it('try to update without success', async () => {
        // Fake a different identity sending the transaction
        (adapter.stub as any).usercert = '-----BEGIN CERTIFICATE-----' +
            'MIICjzCCAjWgAwIBAgIUITsRsw5SIJ+33SKwM4j1Dl4cDXQwCgYIKoZIzj0EAwIw' +
            'czELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh' +
            'biBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT' +
            'E2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMTgwODEzMDEyOTAwWhcNMTkwODEzMDEz' +
            'NDAwWjBCMTAwDQYDVQQLEwZjbGllbnQwCwYDVQQLEwRvcmcxMBIGA1UECxMLZGVw' +
            'YXJ0bWVudDExDjAMBgNVBAMTBXVzZXIzMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcD' +
            'QgAEcrfc0HHq5LG1UbyPSRLNjIQKqYoNY7/zPFC3UTJi3TTaIEqgVL6DF/8JIKuj' +
            'IT/lwkuemafacXj8pdPw3Zyqs6OB1zCB1DAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0T' +
            'AQH/BAIwADAdBgNVHQ4EFgQUHFUlW/XJC7VcJe5pLFkz+xlMNpowKwYDVR0jBCQw' +
            'IoAgQ3hSDt2ktmSXZrQ6AY0EK2UHhXMx8Yq6O7XiA+X6vS4waAYIKgMEBQYHCAEE' +
            'XHsiYXR0cnMiOnsiaGYuQWZmaWxpYXRpb24iOiJvcmcxLmRlcGFydG1lbnQxIiwi' +
            'aGYuRW5yb2xsbWVudElEIjoidXNlcjMiLCJoZi5UeXBlIjoiY2xpZW50In19MAoG' +
            'CCqGSM49BAMCA0gAMEUCIQCNsmDjOXF/NvciSZebfk2hfSr/v5CqRD7pIHCq3lIR' +
            'lwIgPC/qGM1yeVinfN0z7M68l8rWn4M4CVR2DtKMpk3G9k9=' +
            '-----END CERTIFICATE-----';

        await expect(mybuggychaincodeCtrl.update(modelSample)).to.be.eventually
            .rejectedWith('Ups, the requesting identity is not authorized to update the model');
    });

    it('try to update with success', async () => {
        // Fake to the correct identity again
        adapter.stub['fingerprint'] = mockIdentity;

        await expect(async () => await mybuggychaincodeCtrl.update(modelSample)
            .then((result) => expect(result.id).to.exist,
                (ex) => expect.fail('Should not have failed')));
    });
});