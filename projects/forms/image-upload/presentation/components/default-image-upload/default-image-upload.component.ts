import {
  Component,
  ElementRef,
  Input,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { ICONS } from '@tim-mhn/common/icons';
import { TimUIDialogService } from '@tim-mhn/ng-ui/dialog';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import {
  MAX_IMAGE_SIZE_MB,
  SUPPORTED_IMG_FORMATS_STRING,
  SUPPORTED_MIME_TYPES_STRING,
  IMAGE_VALIDATION_ERROR_MESSAGES,
} from '../../../domain/constants';
import { TimUIBaseImageUpload } from '../../../domain/entities/abstract-base-image-upload';
import { ImageUploadError } from '../../../domain/errors/image-upload.errors';
import { ImageUploader } from '../../../domain/models/image-uploader';
import { ImageFileBuilder } from '../../../application/services/image-file.builder';

@Component({
  selector: 'iqair-default-image-upload',
  templateUrl: './default-image-upload.component.html',
})
export class TimUIDefaultImageUploadComponent extends TimUIBaseImageUpload {
  @ViewChild('fileInput', { static: true }) _fileInputEl: ElementRef;

  readonly CLOUD_BLUE_SRC = 'assets/icons/cloud-upload-outline-blue-500.svg';
  readonly CLOUD_GRAY_SRC = 'assets/icons/cloud-upload-outline-gray.svg';
  readonly X_CIRCLE_RED = ICONS.X_CIRCLE_RED;
  readonly SUPPORTED_MIME_TYPES_STRING = SUPPORTED_MIME_TYPES_STRING;
  readonly SUPPORTED_IMG_FORMATS_STRING = SUPPORTED_IMG_FORMATS_STRING;
  readonly MAX_IMAGE_SIZE_MB = MAX_IMAGE_SIZE_MB;
  readonly IMAGE_VALIDATION_ERROR_MESSAGES = IMAGE_VALIDATION_ERROR_MESSAGES;
  readonly REQUIRED = ImageUploadError.REQUIRED;
  readonly UPLOAD_FAILED = ImageUploadError.UPLOAD_FAILED;

  @Input() uploader: ImageUploader;
  @Input() includeCropping = false;

  constructor(
    @Optional() _parent: FormGroupDirective,
    @Optional() ngControl: NgControl,
    _errorStateMatcher: ErrorStateMatcher,
    _dialogService: TimUIDialogService,
    _imageFileBuilder: ImageFileBuilder
  ) {
    super(
      _imageFileBuilder,
      _parent,
      ngControl,
      _errorStateMatcher,
      _dialogService
    );
  }
}
