import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { userLogin } from './dto/auth.dto';
import { NguoiDung } from '@prisma/client';
import {
  DangKy,
  DangNhap,
  PhanTrang,
  getInfo,
  seachUserPhanTrang,
  searchUser,
  updateInfo,
} from 'src/Swagger/QuanLyNguoiDung.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('QuanLyNguoiDung')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('QuanLyNguoiDung')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('LayDanhSachLoaiNguoiDung')
  layDanhSachLoaiNguoiDung(@Request() req) {
    return this.userService.layDanhSachLoaiNguoiDung(req);
  }

  @ApiBody({ type: DangNhap })
  @Post('DangNhap')
  @HttpCode(200)
  dangNhap(@Body() body: userLogin) {
    return this.userService.dangNhap(body);
  }

  @ApiBody({ type: DangKy })
  @Post('DangKy')
  dangKy(@Body() body: NguoiDung) {
    return this.userService.dangKy(body);
  }

  @Get('LayDanhSachNguoiDung')
  layDanhSachNguoiDung(@Request() req) {
    return this.userService.layDanhSachNguoiDung(req);
  }

  @Get('LayDanhSachNguoiDungPhanTrang')
  layDanhSachNguoiDungPhanTrang(@Body() body: PhanTrang) {
    return this.userService.layDanhSachNguoiDungPhanTrang(body);
  }

  @ApiBody({ type: searchUser })
  @Get('TimKiemNguoiDung')
  timKiemNguoiDung(@Body() body: searchUser) {
    return this.userService.timKiemNguoiDung(body);
  }

  @Get('TimKiemNguoiDungPhanTrang')
  timKiemNguoiDungPhanTrang(@Body() body: seachUserPhanTrang) {
    return this.userService.timKiemNguoiDungPhanTrang(body);
  }

  @ApiHeader({ name: 'token' })
  @Post('ThongTinTaiKhoan')
  thongTinTaiKhoan(@Request() req) {
    return this.userService.thongTinTaiKhoan(req);
  }
  @ApiBody({ type: getInfo })
  @Post('LayThongTinNguoiDung')
  layThongTinNguoiDung(@Body() body) {
    return this.userService.layThongTinNguoiDung(body);
  }

  @ApiHeader({ name: 'token' })
  @ApiBody({ type: updateInfo })
  @Post('CapNhatThongTinNguoiDung')
  capNhatThongTinNguoiDung(@Request() req, @Body() body: NguoiDung) {
    return this.userService.capNhatThongTinNguoiDung(req, body);
  }

  @ApiParam({ name: 'id' })
  @Delete('/XoaNguoiDung/:id')
  xoaNguoiDung(@Param('id') id: number) {
    return this.userService.xoaNguoiDung(+id);
  }
}
