import { Module } from "@nestjs/common";
import { ProductsModule } from "./modules/products/products.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RakutenModule } from "./modules/rakuten/rakuten.module";

@Module({
  imports: [PrismaModule, ProductsModule, RakutenModule]
})
export class AppModule {}


