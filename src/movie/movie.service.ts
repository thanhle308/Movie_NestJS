import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  InfoPhim,
  ListFilmDate,
  PhanTrang,
} from 'src/Swagger/QuanLyNguoiDung.dto';

@Injectable()
export class MovieService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  layDanhSachBanner(req) {
    return `This action returns all movie`;
  }

  async layDanhSachPhim(req) {
    const allPhim = await this.prisma.phim.findMany({});
    return allPhim;
  }

  async layDanhSachPhimPhanTrang(phanTrang: PhanTrang) {
    const start = phanTrang.trang * phanTrang.soPhanTu - phanTrang.soPhanTu;
    const end = start + phanTrang.soPhanTu;
    const allPhim = await this.prisma.phim.findMany({});
    return allPhim.slice(start, end);
  }

  async layDanhSachPhimTheoNgay(ListFilm: ListFilmDate) {
    const allPhim = await this.prisma.phim.findMany({
      where: {
        ngay_khoi_chieu: ListFilm.tu_ngay,
      },
    });
    return ListFilm;
  }

  async xoaPhim(body: InfoPhim) {
    const Phim = await this.prisma.phim.delete({
      where: {
        ma_phim: Number(body.ma_phim),
      },
    });
    return 'Delete Film Seccesses';
  }

  async layThongTinPhim(body: InfoPhim) {
    const Phim = await this.prisma.phim.findFirst({
      where: {
        ma_phim: Number(body.ma_phim),
      },
    });
    return Phim;
  }
}
