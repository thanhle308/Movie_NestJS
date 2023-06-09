import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), MovieModule],
  controllers: [],
  providers: [JwtStrategy, ConfigService],
})
export class AppModule {}
