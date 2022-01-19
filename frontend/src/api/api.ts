import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.31.104:4444/',
    timeout: 1000
})

const toURL = (string: string) => {
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

const toOptions = ({ expand, filter, sort }: { expand?: string[] | string; filter?: string[] | string; sort?: string[] | string }) => {
    let options: string | undefined
    if (expand) {
        options = `?expand=${typeof expand === 'string' ? expand : expand.filter(e => e).join(',')}`
    }
    if (filter) {
        options = (options ? options + '&' : '?') + `filter=${typeof filter === 'string' ? filter : filter.filter(f => f).join(',')}`
    }
    if (sort) {
        options = (options ? options + '&' : '?') + `sort=${typeof sort === 'string' ? sort : sort.filter(s => s).join(',')}`
    }
    return options || ''
}

type Descriptor = 'Color' | 'NoteItem' | 'NoteType' | 'Note' | 'Tag' | 'User'

export const GetApi = ({
    model,
    id,
    onSuccess,
    onError,
    expand
}: {
    model: Descriptor
    id: number
    onSuccess?: (res: unknown) => void
    onError?: (err: unknown) => void
    expand?: string[] | string
}) => {
    api.get(`get/${toURL(model)}/${id}${toOptions({ expand })}`)
        .then(res => onSuccess && onSuccess(res.data))
        .catch(err => onError && onError(err))
}

export const GetAllApi = ({
    model,
    onSuccess,
    onError,
    expand,
    filter,
    sort
}: {
    model: Descriptor
    onSuccess?: (res: unknown[]) => void
    onError?: (err: unknown) => void
    expand?: string[] | string
    filter?: string[] | string
    sort?: string[] | string
}) => {
    api.get(`get_all/${toURL(model)}${toOptions({ expand, filter, sort })}`)
        .then(res => onSuccess && onSuccess(res.data))
        .catch(err => onError && onError(err))
}

export const CreateApi = ({
    model,
    data,
    onSuccess,
    onError
}: {
    model: Descriptor
    data: unknown
    onSuccess?: (res: unknown) => void
    onError?: (err: unknown) => void
}) => {
    api.post(`create/${toURL(model)}`, data)
        .then(res => onSuccess && onSuccess(res.data))
        .catch(err => onError && onError(err))
}

export const UpdateApi = ({
    model,
    id,
    data,
    onSuccess,
    onError
}: {
    model: Descriptor
    id: number
    data: unknown
    onSuccess?: (res: unknown) => void
    onError?: (err: unknown) => void
}) => {
    api.put(`update/${toURL(model)}/${id}`, data)
        .then(res => onSuccess && onSuccess(res.data))
        .catch(err => onError && onError(err))
}

export const DeleteApi = ({
    model,
    id,
    onSuccess,
    onError
}: {
    model: Descriptor
    id: number
    onSuccess?: (res: unknown) => void
    onError?: (err: unknown) => void
}) => {
    api.delete(`delete/${toURL(model)}/${id}`)
        .then(res => onSuccess && onSuccess(res.data))
        .catch(err => onError && onError(err))
}
