export interface Product{
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: Category,
  taxes?: number
}

export interface Category{
  id: string
  name: string
  typeImg: string
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>