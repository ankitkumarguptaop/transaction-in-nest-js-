import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private configService: ConfigService,
  ) {}

  async createProduct(payload: { user: User; body: CreateProductDto }) {
    const { body, user } = payload;
    console.log('✌️body , user --->', body, user);
    return await this.productRepository.createProduct({
      user_id: user.id,
      name: body.name,
      price: body.price,
      description: body.description,
    });
  }

  async listProduct(user: User) {
    return await this.productRepository.listProduct(user.id);
  }

  async findOne(id: number) {
    return await `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
