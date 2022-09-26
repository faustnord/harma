import Ajv from 'ajv'
import { Models } from './models'
import models from './models.json'

const ajv = new Ajv({ allErrors: true, format: 'fast', nullable: true, unicode: true, uniqueItems: true })

// Создание нового объекта схемы из JSON-файла моделей, но с необязательными полями
const schema: Partial<typeof models> = models

// Удаление из пользовательской схемы поля '$schema', конфликтующего с референсом
delete schema.$schema

// Добавление референсной схемы для валидации пользовательской схемы
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

// Добавление пользовательной схемы моделей
ajv.addSchema(schema, 'Schema')

/** Функция валидации структуры модели */
export const validateModel = <Model>({ name, data }: { name: keyof Models; data: unknown }): Model => {
    const validator = ajv.getSchema(`Schema#/definitions/${name}`)

    if (!validator) {
        throw new Error(`No validator defined for Schema#/definitions/${name}`)
    }

    let valid: boolean | PromiseLike<any>

    if (Array.isArray(data) && data.length) {
        valid = validator(data[0])
    } else {
        valid = validator(data)
    }

    if (!valid) {
        throw new Error(
            'Invalid ' +
                name +
                ': ' +
                ajv.errorsText(
                    validator.errors!.filter(e => e.keyword !== 'if'),
                    { dataVar: name }
                )
        )
    }

    return data as Model
}

/** Функция валидации строки */
export const validateString = (data: unknown): string => {
    const valid = typeof data === 'string'

    if (!valid) {
        throw new Error('Data is not a "string"')
    }

    return data as string
}
