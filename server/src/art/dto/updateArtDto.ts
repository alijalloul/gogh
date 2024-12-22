import { IsOptional, IsString } from 'class-validator';

export class UpdateArtDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  desc?: string;
}
