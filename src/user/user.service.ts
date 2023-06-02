import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, NguoiDung } from '@prisma/client';
import { userLogin } from './dto/auth.dto';
import {
  PhanTrang,
  seachUserPhanTrang,
  searchUser,
} from 'src/Swagger/QuanLyNguoiDung.dto';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async decode(code) {
    const token = code.headers.token;
    const data_decode: any = await this.jwtService.decode(token);
    return data_decode.payload.tai_khoan;
  }

  layDanhSachLoaiNguoiDung(req) {
    return 'This action adds a new user';
  }

  async dangNhap(userLogin: userLogin) {
    const user = await this.prisma.nguoiDung.findFirst({
      where: {
        email: userLogin.email,
      },
    });

    if (user?.mat_khau !== userLogin.mat_khau) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, tai_khoan: user.tai_khoan };
    return {
      Status: 'Login successful',
      access_token: await this.jwtService.sign(
        { payload },
        { secret: this.config.get('SECRET_KEY'), expiresIn: '365d' },
      ),
    };
  }

  async dangKy(user: NguoiDung) {
    const userCheck = await this.prisma.nguoiDung.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userCheck === null) {
      const newUser = await this.prisma.nguoiDung.create({ data: user });
      return { Status: 'Create new account secessful', newUser };
    } else return 'Email already used ';
  }

  async layDanhSachNguoiDung(req) {
    const allUsers = await this.prisma.nguoiDung.findMany({});
    return allUsers;
  }

  async layDanhSachNguoiDungPhanTrang(phanTrang: PhanTrang) {
    const start = phanTrang.trang * phanTrang.soPhanTu - phanTrang.soPhanTu;
    const end = start + phanTrang.soPhanTu;
    const allUsers = await this.prisma.nguoiDung.findMany({});
    return allUsers.slice(start, end);
  }

  async timKiemNguoiDung(user: searchUser) {
    const data = await this.prisma.nguoiDung.findMany({
      where: {
        ho_ten: user.ho_ten,
      },
    });
    return data;
  }

  async timKiemNguoiDungPhanTrang(search: seachUserPhanTrang) {
    const start = search.trang * search.soPhanTu - search.soPhanTu;
    const end = start + search.soPhanTu;
    const data = await this.prisma.nguoiDung.findMany({
      where: {
        ho_ten: search.ho_ten,
      },
    });
    return data.slice(start, end);
  }

  async thongTinTaiKhoan(req) {
    const id_taikhoan = await this.decode(req);
    const info = await this.prisma.nguoiDung.findFirst({
      where: {
        tai_khoan: id_taikhoan,
      },
    });
    return info;
  }

  async layThongTinNguoiDung(body) {
    const info = await this.prisma.nguoiDung.findFirst({
      where: {
        tai_khoan: Number(body.tai_khoan),
      },
    });
    return info;
  }
  async capNhatThongTinNguoiDung(req, user: NguoiDung) {
    const id_taikhoan = await this.decode(req);

    user.tai_khoan = id_taikhoan;
    await this.prisma.nguoiDung.update({
      data: user,
      where: {
        tai_khoan: Number(id_taikhoan),
      },
    });
    return { Status: 'Update Done', user };
  }

  async xoaNguoiDung(id) {
    const XoaNguoiDung = await this.prisma.nguoiDung.delete({
      where: {
        tai_khoan: id,
      },
    });
    return 'Delete Done';
  }
}
