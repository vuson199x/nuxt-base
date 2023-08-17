export interface CommonType {
    path: string
    title: string
}

export interface ChildType extends CommonType {
    icon: any
}

export interface SitemapType extends ChildType {
    breadcrumb?: CommonType[]
    children?: ChildType[]
}