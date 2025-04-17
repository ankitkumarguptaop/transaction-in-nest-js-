import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private configService: ConfigService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    console.log('✌️createProductDto --->', createProductDto);

    return await this.productRepository.createProduct(createProductDto);
  }

  findAll() {
    return await this.productRepository.find(createProductDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
