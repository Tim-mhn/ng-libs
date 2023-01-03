import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { objectKeys } from '@tim-mhn/common/objects';
import { merge, Subject, takeUntil } from 'rxjs';
import {
  TypedFormArray,
  TypedFormBuilder,
  TypedFormControl,
} from '@tim-mhn/common/typed-forms';
import { ImageUploadInfo } from '../../../domain/models/image-upload-info';
import { TimUIDefaultImageUploadComponent } from '../default-image-upload/default-image-upload.component';

/**
 * todo : create common/date and common/typed-forms
 * to be used in @tim-mhn/ng-forms package
 */
@Component({
  selector: 'iqair-no-duplicate-images-container',
  templateUrl: './no-duplicate-images-container.component.html',
})
export class TimUINoDuplicateImagesContainerComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @Input() imageFilesFormArray: TypedFormArray<
    ImageUploadInfo,
    TypedFormControl<ImageUploadInfo>
  > = this.tfb.array([]);

  @ContentChildren(TimUIDefaultImageUploadComponent, { descendants: true })
  private _imageUploadComponents: QueryList<TimUIDefaultImageUploadComponent>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private tfb: TypedFormBuilder) {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this._ifDuplicatesSetErrorOnLastChangedControl();
  }

  private _ifDuplicatesSetErrorOnLastChangedControl() {
    merge(...this._imageUploadComponents.map((cmp) => cmp.controlChange$))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((control) => {
        const parentErrors = this.imageFilesFormArray.errors;

        const errors: ValidationErrors = {
          ...control.errors,
          ...parentErrors,
        };

        const hasErrors = objectKeys(errors).length > 0;
        if (hasErrors) control.setErrors(errors);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
