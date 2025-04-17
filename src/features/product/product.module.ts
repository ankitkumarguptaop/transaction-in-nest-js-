import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';


@Module({
  controllers: [ProductController],
  providers: [ProductService ,ProductRepository],


})
export class ProductModule {}
