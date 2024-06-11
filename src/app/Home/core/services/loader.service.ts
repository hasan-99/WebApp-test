import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = true;
  constructor() { }

  public setLoaderToTrue() {
    this.loading = true;
  }

  public setLoaderToFalse() {
    this.loading = false;
  }

  public getLoaderValue(): boolean {
    return this.loading;
  }

}
