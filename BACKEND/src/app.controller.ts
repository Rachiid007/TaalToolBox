import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { of } from 'rxjs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('public/images/cards/:img')
  seeUploadedFileDal(@Param('img') image, @Res() res) {
    return of(
      res.sendFile(join(process.cwd(), 'public/images/cards/' + image)),
    );
  }
  @Get('public/images/dal/:img')
  seeUploadedFileCards(@Param('img') image, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'public/images/dal/' + image)));
  }
}
