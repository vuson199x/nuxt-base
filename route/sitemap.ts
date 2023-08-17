import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { SitemapType } from 'types/sitemap'

export const sitemap: SitemapType[] = [
    {
        path: '/',
        title: 'Dashboard',
        icon: Setting
    },
    {
        path: '/user',
        title: 'User',
        icon: IconMenu
    },
]