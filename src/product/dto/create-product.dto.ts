import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProductCharacteristicDto {
	@IsString()
	name: string;
	
	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;
	
	@IsNumber()
	price: number;

	@IsNumber()
	@IsOptional()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;
	
	@IsArray()
	@IsString({ each: true })
	catogories: string[];
	
	@IsArray()
	@IsString({ each: true })
	tags: string[];
	
	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}