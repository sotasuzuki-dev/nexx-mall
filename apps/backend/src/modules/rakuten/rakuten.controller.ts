import { Controller, Get, Query } from "@nestjs/common";
import { RakutenService, RakutenSearchResult } from "./rakuten.service";

@Controller("rakuten")
export class RakutenController {
  constructor(private readonly rakutenService: RakutenService) {}

  @Get("search")
  search(
    @Query("keyword") keyword?: string
  ): Promise<RakutenSearchResult[]> {
    return this.rakutenService.search(keyword);
  }
}


