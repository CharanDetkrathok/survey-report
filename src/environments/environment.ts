// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  BASE_URL: `http://localhost:8881/`,
  AUTHENTICATION: `auth-student/authentication`,
  UN_AUTHORIZATION: `auth-student/un-authorization`,
  REFRESH_AUTHENTICATION: `auth-student/refresh-authentication`,
  DISCLOSURE: `student/disclosures`,
  HEADER: `student/headers`,
  BECHELOR_ARTICLE_AND_CHOICE: `student/bechelor-articles-choices`,
  BECHELOR_PART_OF_ARTICLE: `student/bechelor-parts-articles`,  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
