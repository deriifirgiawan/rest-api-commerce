import * as dayjs from "dayjs";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return {
      timestamp: dayjs().format(),
      message: "Server is Running!",
    };
  }
}
