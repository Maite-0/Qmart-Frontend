/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { GameResultsDto } from '../models/GameResultsDto';

export class GameResultsService {
  /**
   * @param sorting 
   * @param skipCount 
   * @param maxResultCount 
   * @returns CreatePersonDtoPagedResultDto Success
   * @throws ApiError
   */
  public static getApiServicesGameResultsGetAll(): 
  CancelablePromise<GameResultsDto[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/results'
    });
  }

}
