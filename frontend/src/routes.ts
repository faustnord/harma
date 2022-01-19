import { Archive } from './components/pages/Archive'
import { Notes } from './components/pages/Notes'
import { TaggedNotes } from './components/pages/TaggedNotes'

export const routes = [
    {
        title: 'Заметки',
        path: '/',
        component: Notes
    },
    {
        title: 'Архив',
        path: '/archive',
        component: Archive
    },

    {
        title: 'Тег',
        path: '/tag/:id',
        component: TaggedNotes
    }
]
