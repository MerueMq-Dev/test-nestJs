import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import {
  REVIEW_BY_PRODUCT_ID_NOT_FOUND_ERROR,
  REVIEW_NOT_FOUND_ERROR,
} from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-emai.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('getByProduct/:productId')
  async getByProduct(
    @Param('productId', IdValidationPipe) productId: string,
    // @UserEmail() email: string
  ) {
    const reviews = await this.reviewService.findByProductId(productId);
    return reviews;
  }

  //   @Delete('deleteByProduct/:productId')
  //   async deleteByProductId(@Param('productId') productId: string) {
  //     const reviews = await this.reviewService.deleteByProductId(productId);
  //     if (reviews) {
  //       throw new HttpException(
  //         REVIEW_BY_PRODUCT_ID_NOT_FOUND,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //   }
}
