import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';

Injectable({
    providedIn:'root'
})
export class GlobalEvent{
    private colorEvent$:Subject<any>=new Subject<any>();

    public get ColorObservable(){
        return this.colorEvent$.asObservable();
    }

    changeColor(color:string){
        this.colorEvent$.next(color);
    }
}