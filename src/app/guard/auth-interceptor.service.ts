import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {EMPTY} from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
       debugger;
        if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined){
            var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
            const modifiedReq = req.clone(
                                {
                                    setHeaders: {
                                        'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
                                        'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
                                        'Authorization':token
                                       
                                    }
                                });
                                  return next.handle(modifiedReq).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            if (event.body.errorMessage == "User Unauthenticated") {
                                sessionStorage.removeItem('authTeacherDetails')
                                sessionStorage.removeItem('mappingData')
                                sessionStorage.removeItem('shiftYn')
                                sessionStorage.removeItem('shiftAvailable')
                                sessionStorage.removeItem('singleKvTeacher')
                                sessionStorage.removeItem('systemTeacherCode')
                                window.location.href = environment.LOGOUT_URL;
                                alert("User Not Authenticated (Login Again)")
                                return null;
                            }
                        }
                        return event;
                    }),
                    (
                        catchError((error: HttpErrorResponse) => {
                            let msg = '';
                            return throwError(error);
                        })
                    ))
        }else if(req.url.indexOf('sign-in') !== -1 || req.url.indexOf('generatePassword') !== -1 || req.url.indexOf('refreshtoken') !== -1 || req.url.indexOf('getOtpForAuthentication') !== -1 || req.url.indexOf('getkvsDashboardReport') !== -1 || req.url.indexOf('getKey') !== -1 || req.url.indexOf('createUsers') !== -1 || req.url.indexOf('otpSignin') !== -1){
                           return next.handle(req);
        }else{
                           return EMPTY;
        }

        // if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {
        //     if (req.url.indexOf('getProfileImage') !== -1 || req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1 ||
        //         req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('create-kvuser') !== -1
        //         || req.url.indexOf('get-usercradential') !== -1 || req.url.indexOf('renamePassword') !== -1 || req.url.indexOf('getKey') !== -1 || req.url.indexOf('translate') !== -1) {
        //         if (req.url.indexOf('create-kvuser') !== -1) {
        //             const modifiedReq = req.clone(
        //                 {
        //                     setHeaders: {
        //                         'Content-Type': 'text/plain; charset=utf-8',
        //                         'loginType':'s',
        //                         'systemTeacherCode':sessionStorage.systemTeacherCode
        //                     }
        //                 });
        //             return next.handle(modifiedReq).pipe(
        //                 (
        //                     catchError((error: HttpErrorResponse) => {
        //                         let msg = '';
        //                         return throwError(error);
        //                     })
        //                 ))
        //         }
        //         if (req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('getProfileImage') !== -1 || 
        //         req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1
        //             || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1) {
        //             const modifiedReq = req.clone(
        //                 {
        //                     setHeaders: {
        //                         'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
        //                         'loginType':'s',
        //                         'systemTeacherCode':sessionStorage.systemTeacherCode,
        //                     }
        //                 });
        //             return next.handle(modifiedReq).pipe(
        //                 (
        //                     catchError((error: HttpErrorResponse) => {
        //                         let msg = '';
        //                         return throwError(error);
        //                     })
        //                 ))       
        //         }
        //         return next.handle(req).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     } else if( req.url.indexOf("uploadDocument") !== -1 || req.url.indexOf("deleteDocumentByTeacherIdAndName") !== -1  || req.url.indexOf("saveTeacher") !== -1 || req.url.indexOf("saveExperience") !== -1 || req.url.indexOf("updatdFlag")  !== -1 || req.url.indexOf("saveTransProfile")  !== -1 ){
        //          const modifiedReq = req.clone(
        //              {
        //                  setHeaders: {
        //                      'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
        //                      'loginType':'s',
        //                      'systemTeacherCode':sessionStorage.systemTeacherCode,
        //                  }
        //              });
        //          return next.handle(modifiedReq).pipe(
        //              (
        //                  catchError((error: HttpErrorResponse) => {
        //                      let msg = '';
        //                      return throwError(error);
        //                  })
        //              ))  
        //      } else {
        //         var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
        //         const modifiedReq = req.clone(
        //             {
        //                 setHeaders: {
        //                     'Authorization': token,
        //                     'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
        //                      'loginType':'s',
        //                     'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
        //                 }
        //             });
        //         return next.handle(modifiedReq).pipe(
        //             map((event: HttpEvent<any>) => {
        //                 if (event instanceof HttpResponse) {
        //                     if (event.body.errorMessage == "User Unauthenticated") {
        //                         sessionStorage.removeItem('authTeacherDetails')
        //                         sessionStorage.removeItem('mappingData')
        //                         sessionStorage.removeItem('shiftYn')
        //                         sessionStorage.removeItem('shiftAvailable')
        //                         sessionStorage.removeItem('singleKvTeacher')
        //                         sessionStorage.removeItem('systemTeacherCode')
        //                         window.location.href = environment.LOGOUT_URL;
        //                         alert("User Not Authenticated (Login Again)")
        //                         return null;
        //                     }
        //                 }
        //                 return event;
        //             }),
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     }
        // } else {
        //     debugger;
        //     if (req.url.indexOf('getkvsDashboardReport') !== -1   || req.url.indexOf('translate') !== -1 || req.url.indexOf('getStationByRegion') !== -1 || req.url.indexOf('getReportData') !== -1 || 
        //     req.url.indexOf('getKVRegion') !== -1 || req.url.indexOf('getSchoolByStation') !== -1) {
        //         const modifiedReq = req.clone(
        //             {
        //                 setHeaders: {
        //                     'Content-Type': 'text/plain; charset=utf-8',
        //                 }
        //             });
        //         return next.handle(modifiedReq);

        //     }else if(req.url.indexOf('sign-in') !== -1){
        //         return next.handle(req);
        //     } else if (req.url.indexOf('1') !== -1) {
        //         return next.handle(req).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     }

        //     else {

        //         sessionStorage.removeItem('authTeacherDetails')
        //         sessionStorage.removeItem('mappingData')
        //         sessionStorage.removeItem('shiftYn')
        //         sessionStorage.removeItem('shiftAvailable')
        //         sessionStorage.removeItem('singleKvTeacher')
        //         sessionStorage.removeItem('systemTeacherCode')
        //         window.location.href = environment.LOGOUT_URL;

        //     }

        // }


    }
}