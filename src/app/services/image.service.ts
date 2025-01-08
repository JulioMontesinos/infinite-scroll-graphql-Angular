import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_IMAGES, LIKE_IMAGE } from '../graphql/queries';
import { Image } from '../models/image.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GetImagesQueryResponse {
  images: {
    edges: Array<{
      cursor: string;
      node: Image;
    }>;
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private apollo: Apollo) {}

  /**
   * GraphQL query to fetch a list of images.
   * @param first Number of items to fetch
   * @param after Pagination cursor
   * @param title (optional) to filter by title
   */
  getImages(first: number, after?: string | null, title?: string | null): Observable<GetImagesQueryResponse> {
    return this.apollo.query<GetImagesQueryResponse>({
      query: GET_IMAGES,
      variables: {
        first,
        after,
        title,
      },
      fetchPolicy: 'network-only',
    }).pipe(
      map(result => result.data)
    );
  }

  /**
   * GraphQL mutation to like/unlike.
   * @param imageId ID of the image to like/unlike
   */
  likeImage(imageId: string): Observable<{ liked: boolean; likesCount: number }> {
    return this.apollo.mutate<any>({
      mutation: LIKE_IMAGE,
      variables: {
        input: {
          imageId,
        },
      },
    }).pipe(
      map(result => result.data.likeImage.image)
    );
  }
}