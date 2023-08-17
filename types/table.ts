export interface ColumnsType {
    props: string
    label: string
    width: string | number
}

export interface TableProps {
    tableData: any
    columns: ColumnsType[] | null
    total?: number
    pageSize?: number
    loading?: boolean
}