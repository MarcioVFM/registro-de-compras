import { FormRegisterBuyParams } from "src/shared/types/form-register-buy"

export interface IListRepository {
  findAll(): Promise<FormRegisterBuyParams[]>
  create(data: FormRegisterBuyParams): Promise<FormRegisterBuyParams>
  update(id: number, data: Partial<FormRegisterBuyParams>): Promise<FormRegisterBuyParams | undefined>
  deleteByNameAndDate(name: string, payday: Date): Promise<void>
  findByNameAndDate(name: string, payday: Date): Promise<{ id: number } & FormRegisterBuyParams | undefined>
  findById(uniqueId: string): Promise<{ id: number } & FormRegisterBuyParams | undefined>
}