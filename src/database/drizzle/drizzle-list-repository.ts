import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'
import { eq, desc, and } from 'drizzle-orm'
import { list } from '../schemas/list-schema'
import { IListRepository } from '../model/type-drizzle-list'
import { FormRegisterBuyParams } from 'src/shared/types/form-register-buy'

const DATABASE_NAME = 'registro_de_compras.db'

const getDb = () => {
    const expoDB = SQLite.openDatabaseSync(DATABASE_NAME)
    return drizzle(expoDB)
}

export class ListRepository implements IListRepository {
    // CRUD = lista de compras usando o crete, finall, update e o delete
    async create(data: FormRegisterBuyParams): Promise<FormRegisterBuyParams> {
        const db = getDb()
        const dbData = {
            name: data.name,
            description: data.description,
            value: data.price,
            payday: data.payday.toISOString().split('T')[0],
            expireday: data.expireday.toISOString().split('T')[0],
            status: data.status
        }

        const [newList] = await db.insert(list).values(dbData).returning()
        return {
            name: newList.name,
            description: newList.description,
            price: newList.value,
            payday: new Date(newList.payday),
            expireday: new Date(newList.expireday),
            status: newList.status
        }
    }

    async findAll(): Promise<FormRegisterBuyParams[]> {
        const db = getDb()
        const results = await db.select().from(list).orderBy(desc(list.id))
        return results.map(item => ({
            name: item.name,
            description: item.description,
            price: item.value,
            payday: new Date(item.payday),
            expireday: new Date(item.expireday),
            status: item.status
        }))
    }

    async update(id: number, data: Partial<FormRegisterBuyParams>): Promise<FormRegisterBuyParams | undefined> {
        const db = getDb()
        const dbData: any = {}
        if (data.name) dbData.name = data.name
        if (data.description) dbData.description = data.description
        if (data.price) dbData.value = data.price
        if (data.payday) dbData.payday = data.payday.toISOString().split('T')[0]
        if (data.expireday) dbData.expireday = data.expireday.toISOString().split('T')[0]
        if (data.status) dbData.status = data.status

        const [updatedList] = await db.update(list).set(dbData).where(eq(list.id, id)).returning()
        if (!updatedList) return undefined

        return {
            name: updatedList.name,
            description: updatedList.description,
            price: updatedList.value,
            payday: new Date(updatedList.payday),
            expireday: new Date(updatedList.expireday),
            status: updatedList.status
        }
    }

        async deleteByNameAndDate(name: string, payday: Date): Promise<void> {
        const db = getDb()
        const paydayString = payday.toISOString().split('T')[0]
        await db.delete(list).where(
            and(
                eq(list.name, name),
                eq(list.payday, paydayString)
            )
        )
    }
} 