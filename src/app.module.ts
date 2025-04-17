import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { ProductModule } from './features/product/product.module';
import { OrderModule } from './features/order/order.module';
import { PaymentModule } from './features/payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    OrderModule,
    PaymentModule,
  ], //for env and validation of entity (configmodule)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
