import { FormArray } from '@angular/forms';
import { ImageFile } from '../../domain/entities/image.entity';
import { ImageUploadError } from '../../domain/errors/image-upload.errors';
import { ImageUploadInfo } from '../../domain/models/image-upload-info';
import { NoDuplicateImages } from './no-duplicates.validator';

describe('NoDuplicateImages', () => {
  it('should return a DUPLICATED error if there are 2 image files with the same content', () => {
    const imagesFormArray = buildImageUploadInfoFormArrayFromContentList([
      'duplicate_content',
      'duplicate_content',
      'other_content',
    ]);

    expect(NoDuplicateImages(imagesFormArray)).toEqual({
      [ImageUploadError.DUPLICATED]: true,
    });
  });

  it('should return if all image files content are unique', () => {
    const imagesFormArray = buildImageUploadInfoFormArrayFromContentList([
      'content_a',
      'content_b',
      'content_c',
    ]);

    expect(NoDuplicateImages(imagesFormArray)).toBeNull();
  });
});

function buildImageUploadInfoFromContent(content: string): ImageUploadInfo {
  return {
    imageFile: <ImageFile>{
      content,
    },
    url: '',
  };
}

function buildImageUploadInfoFormArrayFromContentList(contents: string[]) {
  const imageFiles = contents.map((content) =>
    buildImageUploadInfoFromContent(content)
  );
  return {
    value: imageFiles,
  } as FormArray;
}
