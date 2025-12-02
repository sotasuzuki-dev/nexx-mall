import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  // 起動時の自動接続を削除（DB がなくても楽天API などは動くように）
  // 必要になったときに自動的に接続される
}


