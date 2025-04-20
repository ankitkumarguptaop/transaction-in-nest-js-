import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/infrastructure/guards/role.guard';
import { Roles } from 'src/domain/user/decorators/role.decoraror';
import { Role } from 'src/domain/user/roles.enum';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin)
    create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    
    return this.productService.createProduct({
      user: req.user,
      body: createProductDto,
    });
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  async listProduct(@Req() req: Request) {
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
