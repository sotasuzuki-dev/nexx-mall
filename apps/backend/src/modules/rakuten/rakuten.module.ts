import { Module } from "@nestjs/common";
import { RakutenService } from "./rakuten.service";
import { RakutenController } from "./rakuten.controller";

@Module({
  controllers: [RakutenController],
  providers: [RakutenService],
  exports: [RakutenService] // ProductsModule で使えるようにエクスポート
})
export class RakutenModule {}


