import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'
import { eq, desc, and } from 'drizzle-orm'
import { list } from '../schemas/list-schema'
import { IListRepository } from '../model/type-drizzle-list'
import { FormRegisterBuyParams } from 'src/shared/types/form-register-buy'

export function useListRepository(): IListRepository {
    const database = SQLite.useSQLiteContext()
    const db = drizzle(database)

    async function create(data: FormRegisterBuyParams): Promise<FormRegisterBuyParams> {
        try {
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
        } catch (error) {
            throw error
        }
    }

    async function findAll(): Promise<FormRegisterBuyParams[]> {
        try {
            const results = await db.select().from(list).orderBy(desc(list.id))
            return results.map(item => ({
                name: item.name,
                description: item.description,
                price: item.value,
                payday: new Date(item.payday),
                expireday: new Date(item.expireday),
                status: item.status
            }))
        } catch (error) {
            throw error
        }
    }

    async function findByNameAndDate(name: string, payday: Date): Promise<{ id: number } & FormRegisterBuyParams | undefined> {
        try {
            const paydayString = payday.toISOString().split('T')[0]
            const results = await db.select().from(list).where(
                and(
                    eq(list.name, name),
                    eq(list.payday, paydayString)
                )
            )

            if (results.length === 0) {
                return undefined
            }

            const item = results[0]
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.value,
                payday: new Date(item.payday),
                expireday: new Date(item.expireday),
                status: item.status
            }
        } catch (error) {
            throw error
        }
    }

    async function findById(uniqueId: string): Promise<{ id: number } & FormRegisterBuyParams | undefined> {
        try {
            const allItems = await findAll()

            for (const item of allItems) {
                const itemUniqueId = `${item.name}-${item.payday.getTime()}`
                if (itemUniqueId === uniqueId) {
                    const paydayString = item.payday.toISOString().split('T')[0]
                    const results = await db.select().from(list).where(
                        and(
                            eq(list.name, item.name),
                            eq(list.payday, paydayString)
                        )
                    )

                    if (results.length > 0) {
                        const dbItem = results[0]
                        return {
                            id: dbItem.id,
                            name: dbItem.name,
                            description: dbItem.description,
                            price: dbItem.value,
                            payday: new Date(dbItem.payday),
                            expireday: new Date(dbItem.expireday),
                            status: dbItem.status
                        }
                    }
                }
            }
            return undefined
        } catch (error) {
            throw error
        }
    }

    async function update(id: number, data: Partial<FormRegisterBuyParams>): Promise<FormRegisterBuyParams | undefined> {
        try {
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
        } catch (error) {
            console.error('Erro ao atualizar item:', error)
            throw error
        }
    }

    async function deleteByNameAndDate(name: string, payday: Date): Promise<void> {
        try {
            const paydayString = payday.toISOString().split('T')[0]
            await db.delete(list).where(
                and(
                    eq(list.name, name),
                    eq(list.payday, paydayString)
                )
            )
        } catch (error) {
            console.error('Erro ao excluir item:', error)
            throw error
        }
    }

    return { create, findAll, findByNameAndDate, findById, update, deleteByNameAndDate }
} 