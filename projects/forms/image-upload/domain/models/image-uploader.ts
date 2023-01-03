import { Observable } from 'rxjs';
import { UploadedImageURL } from './uploaded-image-url';
import { ImageFile } from '../entities/image.entity';

export interface ImageUploader {
  uploadImage(imageFile: ImageFile): Observable<UploadedImageURL>;
}
