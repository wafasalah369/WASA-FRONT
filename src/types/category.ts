export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    products_count?: number;
}

export interface CategoryFormValues {
    name: string;
    slug?: string;
    description?: string;
}

export interface CategoriesResponse {
    data: Category[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}