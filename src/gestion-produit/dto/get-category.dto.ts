import { StreamableFile } from "@nestjs/common"

export class GetCategoryDTO{
    constructor(id , name : string ){
        this.categoryId = id;
        this.categoryName = name
    }
    categoryId: number
    categoryName: string
    categoryImage: StreamableFile
}