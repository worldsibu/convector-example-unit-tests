import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core';

export class Mybuggychaincode extends ConvectorModel<Mybuggychaincode> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.mybuggychaincode';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string())
  public owner: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public created: number;

  @Required()
  @Validate(yup.number())
  public modified: number;
}