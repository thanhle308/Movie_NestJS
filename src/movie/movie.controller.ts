import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { MovieService } from './movie.service';

import { ApiTags } from '@nestjs/swagger';
import {
  InfoPhim,
  ListFilmDate,
  PhanTrang,
} from 'src/Swagger/QuanLyNguoiDung.dto';

@ApiTags('QuanLyPhim')
@Controller('QuanLyPhim')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('LayDanhSachBanner')
  layDanhSachBanner(@Request() req) {
    return this.movieService.layDanhSachBanner(req);
  }

  @Get('LayDanhSachPhim')
  layDanhSachPhim(@Request() req) {
    return this.movieService.layDanhSachPhim(req);
  }

  @Get('LayDanhSachPhimPhanTrang')
  layDanhSachPhimPhanTrang(@Body() body: PhanTrang) {
    return this.movieService.layDanhSachPhimPhanTrang(body);
  }

  @Get('LayDanhSachPhimTheoNgay')
  layDanhSachPhimTheoNgay(@Body() body: ListFilmDate) {
    return this.movieService.layDanhSachPhimTheoNgay(body);
  }

  @Delete('XoaPhim')
  xoaPhim(@Body() body: InfoPhim) {
    return this.movieService.xoaPhim(body);
  }

  @Get('LayThongTinPhim')
  layThongTinPhim(@Body() body: InfoPhim) {
    return this.movieService.layThongTinPhim(body);
  }
}
