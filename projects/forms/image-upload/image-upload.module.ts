import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimUIAvatarModule } from '@tim-mhn/ng-ui/avatar';
import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
import { FeaturedIconModule } from '@tim-mhn/ng-ui/featured-icon';
import { TimUILinkModule } from '@tim-mhn/ng-ui/link';
import { TimUISpinnerModule } from '@tim-mhn/ng-ui/spinner';
import { TimUIDialogModule } from '@tim-mhn/ng-ui/dialog';
import { TimSliderModule } from '../slider/module';
import { TimDefaultImageUploadComponent } from './presentation/components/default-image-upload/default-image-upload.component';
import { TimImageCropperDialogComponent } from './presentation/components/image-cropper-dialog/image-cropper-dialog.component';
import { TimImageCropperComponent } from './presentation/components/image-cropper/image-cropper.component';
import { TimNoDuplicateImagesContainerComponent } from './presentation/components/no-duplicate-images-container/no-duplicate-images-container.component';
import { TimProfileImageUploadComponent } from './presentation/components/profile-image-upload/profile-image-upload.component';
import { FileCompressionService } from './application/services/file-compression.service';
import { FileConversionService } from './application/services/file-conversion.service';
import { FileEncodingService } from './application/services/file-encoding.service';
import { ImageCropperService } from './application/services/image-cropper.service';
import { ImageFileBuilder } from './application/services/image-file.builder';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';
import { TimHttpModule } from '@tim-mhn/common/http';
import { TimFormsPipesModule } from '@tim-mhn/ng-forms/core';
@NgModule({
  declarations: [
    TimProfileImageUploadComponent,
    TimDefaultImageUploadComponent,
    TimNoDuplicateImagesContainerComponent,
    TimImageCropperComponent,
    TimImageCropperDialogComponent,
  ],
  imports: [
    CommonModule,
    FeaturedIconModule,
    TimUILinkModule,
    TimUIButtonModule,
    TimUISpinnerModule,
    TimUIAvatarModule,
    ReactiveFormsModule,
    TimFormsPipesModule,
    TimUIDialogModule,
    TimSliderModule,
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
    TimProfileImageUploadComponent,
    TimDefaultImageUploadComponent,
    TimNoDuplicateImagesContainerComponent,
  ],
})
export class TimImageUploadModule {}
