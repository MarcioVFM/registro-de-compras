import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'
import { eq, desc } from 'drizzle-orm'
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
        const [newList] = await db.insert(list).values(data).returning()
        return newList
    }

    async findAll(): Promise<FormRegisterBuyParams[]> {
        const db = getDb()
        return await db.select().from(list).orderBy(desc(list.id))
    }

    async update(id: number, data: Partial<FormRegisterBuyParams>): Promise<FormRegisterBuyParams | undefined> {
        const db = getDb()
        const [updatedList] = await db.update(list).set(data).where(eq(list.id, id)).returning()
        return updatedList
    }

    async delete(id: number): Promise<void> {
        const db = getDb()
        await db.delete(list).where(eq(list.id, id))
    }
} 