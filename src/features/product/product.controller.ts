import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
    create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    console.log('✌️req.user --->');
    return this.productService.createProduct({
      user: req.user,
      body: createProductDto,
    });
  }

  @Get()
  async listProduct(@Req() req: Request) {
    console.log('✌️req --->', req.user);
    return await this.productService.listProduct(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
