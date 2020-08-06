import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FlickrOutput, ImageModel, UrlObject} from '../models/image.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPicturesService {

  constructor(private http: HttpClient) { }

  public getImageUrls(keyword: string): Observable<UrlObject[]> {
    const searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search`;
    const params = `&api_key=${environment.flickrKey}&text=${keyword}&per_page=15&format=json&nojsoncallback=1`;
    return this.http.get(searchUrl + params).pipe(
      map((res: FlickrOutput) => {
        const urlArr = [];
        res.photos.photo.forEach((photo: ImageModel) => {
          const photoObj: UrlObject = {
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
            title: photo.title
          };
          urlArr.push(photoObj);
        });
        return urlArr;
      })
    );
  }
}
