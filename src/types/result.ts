
export interface Result<T> {
    data: T;
    message: string;
    state: number;
    success: boolean;
    type: string
}

export interface CoverToPageData<T> {
    list: T[];
    page: Page;
}

export interface Page {
    currentPage: number;
    hasPrevious: boolean;
    maxPage: number;
    pageSize: number;
    paged: boolean;
    total: number;
}

export interface PageModel {
    page: number,
    pageSize: number
}


export function GetRequestData<T>(result : Result<CoverToPageData<T>>): any {
    return {
        success: result.success,
        data: result.data.list,
        total: result.data.page.total
    }
}