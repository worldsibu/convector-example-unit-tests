import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Mybuggychaincode } from './mybuggychaincode.model';

@Controller('mybuggychaincode')
export class MybuggychaincodeController extends ConvectorController {

  @Invokable()
  public async create(
    @Param(Mybuggychaincode)
    mybuggychaincode: Mybuggychaincode
  ) {
    console.log(`sender=${this.sender}`);
    mybuggychaincode.owner = this.sender;
    await mybuggychaincode.save();
    return mybuggychaincode;
  }

  @Invokable()
  public async getOne(
    @Param(yup.string())
    id: string
  ) {
    return await Mybuggychaincode.getOne(id);
  }

  @Invokable()
  public async update(
    @Param(Mybuggychaincode)
    mybuggychaincode: Mybuggychaincode
  ) {
    let existingModel = await Mybuggychaincode.getOne(mybuggychaincode.id);

    if (!existingModel.id) {
      throw new Error(`Item with ${mybuggychaincode.id} doesn't exist in the blockchain!`);
    }
    console.log(existingModel);
    console.log(`${existingModel.owner} ${this.sender}`)
    if (existingModel.owner !== this.sender) {
      throw new Error(`Ups, the requesting identity is not authorized to update the model`);
    }

    // Make changes
    existingModel.name = mybuggychaincode.name;

    await existingModel.save();
    console.log(existingModel);
    return existingModel;
  }
}
