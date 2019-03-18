import { ConvectorController } from '@worldsibu/convector-core';
import { Mybuggychaincode } from './mybuggychaincode.model';
export declare class MybuggychaincodeController extends ConvectorController {
    create(mybuggychaincode: Mybuggychaincode): Promise<Mybuggychaincode>;
    getOne(id: string): Promise<Mybuggychaincode>;
    update(mybuggychaincode: Mybuggychaincode): Promise<Mybuggychaincode>;
}
