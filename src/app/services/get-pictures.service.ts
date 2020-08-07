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
    let searchUrl = `https://api.flickr.com/services/rest/?method=`;
    let params = `&api_key=${environment.flickrKey}&per_page=15&format=json&nojsoncallback=1`;
    if (keyword && keyword.length) {
      searchUrl = searchUrl.concat(`flickr.photos.search`);
      params = params.concat(`&text=${keyword}`);
    } else {
      searchUrl = searchUrl.concat(`flickr.photos.getRecent`);
    }
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
