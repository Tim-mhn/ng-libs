/* eslint-disable import/no-unresolved */

import { Component, ElementRef, OnInit } from "@angular/core";
import { Subject } from "rxjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ICONS } from "@tim-mhn/ng-common/icons";
import { ComponentDismisser } from "@tim-mhn/ng-ui/core";
import { TimUISnackBarOptions } from "../models/options";

@Component({
    selector: "tim-snackbar",
    templateUrl: "./snackbar.component.html",
})
export class SnackbarComponent implements OnInit {
    readonly CHECK_WHITE_SRC = ICONS.CHECK_WHITE;
    readonly ERROR_ICON_SRC = ICONS.TRIANGLE_EXCLAMATION_OUTLINE_WHITE;
    readonly X_ICON_SRC = ICONS.X_WHITE;

    constructor(
        private host: ElementRef<HTMLElement>,
        private dismisser: ComponentDismisser
    ) {}

    private _dismissed$ = new Subject<void>();
    public dismissed$ = this._dismissed$.asObservable();
    message: string;
    options: TimUISnackBarOptions;

    dismiss() {
        this.dismisser.dismiss(this.host);
        this._dismissed$.next();
        this._dismissed$.complete();
    }

    ngOnInit() {
        this._autoDismissAfterDuration();
    }

    private _autoDismissAfterDuration() {
        if (this.options?.duration)
            setTimeout(() => this.dismiss(), this.options?.duration);
    }
}
