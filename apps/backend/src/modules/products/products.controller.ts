import { Controller, Get, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post("sync-from-rakuten")
  async syncFromRakuten(@Query("keywords") keywords?: string) {
    const keywordArray = keywords
      ? keywords.split(",").map(k => k.trim())
      : undefined;
    return this.productsService.syncFromRakuten(keywordArray);
  }
}


