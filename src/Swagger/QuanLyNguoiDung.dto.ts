/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DangNhap {
  @ApiProperty({ description: 'email', type: 'string' })
  email: string;
  @ApiProperty({ description: 'mat_khau', type: 'string' })
  mat_khau: string;
}

export class DangKy {
  @ApiProperty({ description: 'ho_ten', type: 'string' })
  ho_ten: string;
  @ApiProperty({ description: 'email', type: 'string' })
  email: string;
  @ApiProperty({ description: 'so_dt', type: 'string' })
  so_dt: string;
  @ApiProperty({ description: 'mat_khau', type: 'string' })
  mat_khau: string;
  @ApiProperty({ description: 'loai_nguoi_dung', type: 'string' })
  loai_nguoi_dung: string;
}

export class PhanTrang {
  @ApiProperty({ description: 'trang', type: 'number' })
  trang: number;
  @ApiProperty({ description: 'soPhanTu', type: 'number' })
  soPhanTu: number;
}

export class searchUser {
  @ApiProperty({ description: 'ho_ten', type: 'string' })
  ho_ten: string;
}

export class seachUserPhanTrang {
  @ApiProperty({ description: 'trang', type: 'number' })
  trang: number;
  @ApiProperty({ description: 'soPhanTu', type: 'number' })
  soPhanTu: number;
  @ApiProperty({ description: 'ho_ten', type: 'string' })
  ho_ten: string;
}

export class getInfo {
  @ApiProperty({ description: 'tai_khoan', type: 'number' })
  tai_khoan: number;
}

export class updateInfo {
  @ApiProperty({ description: 'ho_ten', type: 'string' })
  ho_ten: string;
  @ApiProperty({ description: 'email', type: 'string' })
  email: string;
  @ApiProperty({ description: 'so_dt', type: 'string' })
  so_dt: string;
  @ApiProperty({ description: 'mat_khau', type: 'string' })
  mat_khau: string;
  @ApiProperty({ description: 'loai_nguoi_dung', type: 'string' })
  loai_nguoi_dung: string;
}
