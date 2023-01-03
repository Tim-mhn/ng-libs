import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimUIAvatarModule } from '@tim-mhn/ng-ui/avatar';
import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
import { FeaturedIconModule } from '@tim-mhn/ng-ui/featured-icon';
import { TimUILinkModule } from '@tim-mhn/ng-ui/link';
import { TimUISpinnerModule } from '@tim-mhn/ng-ui/spinner';
import { TimUIDialogModule } from '@tim-mhn/ng-ui/dialog';
import { TimUISliderModule } from '../slider/module';
import { TimUIDefaultImageUploadComponent } from './presentation/components/default-image-upload/default-image-upload.component';
import { TimUIImageCropperDialogComponent } from './presentation/components/image-cropper-dialog/image-cropper-dialog.component';
import { TimUIImageCropperComponent } from './presentation/components/image-cropper/image-cropper.component';
import { TimUINoDuplicateImagesContainerComponent } from './presentation/components/no-duplicate-images-container/no-duplicate-images-container.component';
import { TimUIProfileImageUploadComponent } from './presentation/components/profile-image-upload/profile-image-upload.component';
import { FileCompressionService } from './application/services/file-compression.service';
import { FileConversionService } from './application/services/file-conversion.service';
import { FileEncodingService } from './application/services/file-encoding.service';
import { ImageCropperService } from './application/services/image-cropper.service';
import { ImageFileBuilder } from './application/services/image-file.builder';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';
import { TimHttpModule } from '@tim-mhn/common/http';
import { TimUIFormsPipesModule } from '@tim-mhn/ng-forms/core';
@NgModule({
  declarations: [
    TimUIProfileImageUploadComponent,
    TimUIDefaultImageUploadComponent,
    TimUINoDuplicateImagesContainerComponent,
    TimUIImageCropperComponent,
    TimUIImageCropperDialogComponent,
  ],
  imports: [
    CommonModule,
    FeaturedIconModule,
    TimUILinkModule,
    TimUIButtonModule,
    TimUISpinnerModule,
    TimUIAvatarModule,
    ReactiveFormsModule,
    TimUIFormsPipesModule,
    TimUIDialogModule,
    TimUISliderModule,
    TypedFormsModule,
    TimHttpModule,
  ],
  providers: [
    FileEncodingService,
    FileConversionService,
    FileCompressionService,
    ImageFileBuilder,
    ImageCropperService,
  ],
  exports: [
    TimUIProfileImageUploadComponent,
    TimUIDefaultImageUploadComponent,
    TimUINoDuplicateImagesContainerComponent,
  ],
})
export class TimUIImageUploadModule {}
