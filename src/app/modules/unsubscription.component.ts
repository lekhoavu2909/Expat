import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: ''
})

export abstract class UnsubscriptionComponent implements OnDestroy {
    public destroy$ = new Subject<void>();

    constructor() { }

    ngOnDestroy(): void {

        this.destroy$.next();

        this.destroy$.complete();

    }

}


