import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

const NestConfigDynamicModule = NestConfigModule.forRoot({
  envFilePath: ['.env.local', '.env'],
});

@Global()
@Module({
  imports: [NestConfigDynamicModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}