import axios, { AxiosError, AxiosResponse } from 'axios'
import { Models } from './models'

// Создание инcтанса Axios
const api = axios.create({
    baseURL: 'http://localhost:4444/',
    timeout: 1000
})

// Тип тела ошибки запроса
type ErrorData = { message: string }

// Приведение названия модели к формату, пригодному для строки запроса
const toURL = (string: string): string => {
    let snakeCaseStr = string
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_')
    if (snakeCaseStr.endsWith('s')) {
        return snakeCaseStr + 'es'
    } else {
        return snakeCaseStr + 's'
    }
}

// Приведение опций запроса к формату, пригодному для строки запроса
const toOptions = <Model>({
    expand,
    filter,
    sort
}: {
    expand?: (keyof Model)[] | keyof Model | string | string[]
    filter?: (keyof Model)[] | keyof Model | string | string[]
    sort?: (keyof Model)[] | keyof Model | string | string[]
}): string => {
    let options: string | undefined
    const toOption = (option: (keyof Model)[] | keyof Model | string | string[]): string => {
        if (typeof option === 'string') {
            return option
        } else if (Array.isArray(option)) {
            return [...option].filter(e => e).join(',')
        }
        return ''
    }
    if (expand) {
        options = `?expand=${toOption(expand)}`
    }
    if (filter) {
        options = (options ? options + '&' : '?') + `filter=${toOption(filter)}`
    }
    if (sort) {
        options = (options ? options + '&' : '?') + `sort=${toOption(sort)}`
    }
    return options || ''
}

/** Получение одной записи */
export const GetApi = <Model>({
    model,
    id,
    onSuccess,
    onError,
    expand
}: {
    model: keyof Models
    id: number
    onSuccess: (res: Model) => void
    onError?: (err: AxiosResponse<ErrorData> | undefined) => void
    expand?: (keyof Model)[] | keyof Model | string | string[]
}) => {
    api.get(`get/${toURL(model)}/${id}${toOptions<Model>({ expand })}`)
        .then((res: AxiosResponse<Model>) => onSuccess && onSuccess(res.data))
        .catch((err: AxiosError<ErrorData>) => onError && onError(err.response))
}

/** Получение множества записей */
export const GetAllApi = <Model>({
    model,
    onSuccess,
    onError,
    expand,
    filter,
    sort
}: {
    model: keyof Models
    onSuccess: (res: Model[]) => void
    onError?: (err: AxiosResponse<ErrorData> | undefined) => void
    expand?: (keyof Model)[] | keyof Model | string | string[]
    filter?: (keyof Model)[] | keyof Model | string | string[]
    sort?: (keyof Model)[] | keyof Model | string | string[]
}) => {
    api.get(`get_all/${toURL(model)}${toOptions<Model>({ expand, filter, sort })}`)
        .then((res: AxiosResponse<Model[]>) => onSuccess && onSuccess(res.data))
        .catch((err: AxiosError<ErrorData>) => onError && onError(err.response))
}

/** Создание записи */
export const CreateApi = <Model>({
    model,
    data,
    onSuccess,
    onError
}: {
    model: keyof Models
    data: Model
    onSuccess?: (res: Model) => void
    onError?: (err: AxiosResponse<ErrorData> | undefined) => void
}) => {
    api.post(`create/${toURL(model)}`, data)
        .then((res: AxiosResponse<Model>) => onSuccess && onSuccess(res.data))
        .catch((err: AxiosError<ErrorData>) => onError && onError(err.response))
}

/** Обновление записи */
export const UpdateApi = <Model>({
    model,
    id,
    data,
    onSuccess,
    onError
}: {
    model: keyof Models
    id: number
    data: Model
    onSuccess?: (res: Model) => void
    onError?: (err: AxiosResponse<ErrorData> | undefined) => void
}) => {
    api.put(`update/${toURL(model)}/${id}`, data)
        .then((res: AxiosResponse<Model>) => onSuccess && onSuccess(res.data))
        .catch((err: AxiosError<ErrorData>) => onError && onError(err.response))
}

/** Удаление записи */
export const DeleteApi = <Model>({
    model,
    id,
    onSuccess,
    onError
}: {
    model: keyof Models
    id: number
    onSuccess?: (res: Model) => void
    onError?: (err: AxiosResponse<ErrorData> | undefined) => void
}) => {
    api.delete(`delete/${toURL(model)}/${id}`)
        .then((res: AxiosResponse<Model>) => onSuccess && onSuccess(res.data))
        .catch((err: AxiosError<ErrorData>) => onError && onError(err.response))
}
