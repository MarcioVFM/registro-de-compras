import { FormRegisterBuyParams } from "src/shared/types/form-register-buy"

export interface IListRepository {
  findAll(): Promise<FormRegisterBuyParams[]>
  create(data: FormRegisterBuyParams): Promise<FormRegisterBuyParams>
  update(id: number, data: Partial<FormRegisterBuyParams>): Promise<FormRegisterBuyParams | undefined>
}