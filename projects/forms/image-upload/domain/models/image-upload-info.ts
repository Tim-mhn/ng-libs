import { ImageFile } from '../entities/image.entity';

export interface ImageUploadInfo {
  url: string;
  imageFile: ImageFile;
}
