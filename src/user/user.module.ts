import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ConfigService],
})
export class UserModule {}
