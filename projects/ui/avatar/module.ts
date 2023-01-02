import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarProfileImageComponent } from './avatar-profile-image/avatar-profile-image.component';
import { AvatarInitialsComponent } from './avatar-initials/avatar-initials.component';
import { AvatarLabelGroupComponent } from './avatar-label-group/avatar-label-group.component';
import { ButtonAvatarGroupComponent } from './button-avatar-group/button-avatar-group.component';
import { TimUIAvatarSubtextDirective } from './directives/avatar-subtext.directive';
import { TimUIBigAvatarInitialsComponent } from './big-avatar-initials/big-avatar-initials.component';
import { TimUIBaseAvatarInitialsComponent } from './base-avatar-initials/base-avatar-initials.component';
import { TimUIBigAvatarProfileImageComponent } from './big-avatar-profile-image/big-avatar-profile-image.component';
import { TimUIBaseAvatarProfileImageComponent } from './base-avatar-profile-image/base-avatar-profile-image.component';

@NgModule({
  declarations: [
    AvatarProfileImageComponent,
    AvatarInitialsComponent,
    AvatarLabelGroupComponent,
    ButtonAvatarGroupComponent,
    TimUIAvatarSubtextDirective,
    TimUIBigAvatarInitialsComponent,
    TimUIBaseAvatarInitialsComponent,
    TimUIBigAvatarProfileImageComponent,
    TimUIBaseAvatarProfileImageComponent,
  ],
  imports: [CommonModule],
  exports: [
    AvatarProfileImageComponent,
    AvatarInitialsComponent,
    AvatarLabelGroupComponent,
    ButtonAvatarGroupComponent,
    TimUIAvatarSubtextDirective,
    TimUIBigAvatarInitialsComponent,
    TimUIBigAvatarProfileImageComponent,
  ],
})
export class TimUIAvatarModule {}
