import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject } from 'vue';
import { Order, Member, HelperOrder } from '@/types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  }

  protected _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }

  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( const key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }

  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}

// 응답타입1
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
interface Base__ResponseBodyType1 {
  resultCode: string;
  msg: string;
  fail: boolean;
  success: boolean;
}

// /usr/article/list 의 응답 타입
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_list__IResponseBody extends Base__ResponseBodyType1 {
  body: {
    orders: Order[];
  };
}

// /usr/article/detail 의 응답 타입
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    order: Order;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_doWrite__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

export interface MainApi__order_accept__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

export interface MainApi__helperOrder_list__IResponseBody extends Base__ResponseBodyType1 {
  body: {
    helperOrders: HelperOrder[];
  };
}

export interface MainApi__helperOrder_detail__IResponseBody extends Base__ResponseBodyType1 {
  body: {
    helperOrder: HelperOrder;
  };
}
export interface MainApi__helperOrder_stap2__IResponseBody extends Base__ResponseBodyType1 {
  body: {
    helpers: Member[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__member_authKey__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    authKey: string;
    member: Member;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__member_doJoin__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__common_genFile_doUpload__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    genFileIdsStr: string;
  };
}

// http://localhost:8021/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8021/',
      })
    );
  }

  protected _handleRequest(config: AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    if ( ["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) ) {
      alert('로그인 후 이용해주세요.');

      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickname");
      localStorage.removeItem("loginedMemberProfileImgUrl");

      location.replace('/member/login');
    }

    return axiosResponse;
  }

  // http://localhost:8021/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public order_list(loginId: number) {
    return this.get<MainApi__order_list__IResponseBody>(`/usr/order/list?directorId=${loginId}`);
  }

  // http://localhost:8021/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public order_detail(id: number) {
    return this.get<MainApi__order_detail__ResponseBody>(`/usr/order/detail?id=${id}`);
  }

  public helperOrder_list(id: number) {
    return this.get<MainApi__helperOrder_list__IResponseBody>(`/usr/helperOrder/list?id=${id}`);  
  }

  public helperOrder_detail(id: number) {
    return this.get<MainApi__helperOrder_detail__IResponseBody>(`/usr/order/helperOrder?id=${id}`);  
  }

  public accept(id: number){
    return this.get<MainApi__order_accept__ResponseBody>(`/usr/order/accept?id=${id}`);     
  } 

  public acceptHelperOrder(id: number){
    return this.get<MainApi__order_accept__ResponseBody>(`/usr/helperOrder/accept?id=${id}`);     
  } 

  public helper_list(id: number){
    return this.get<MainApi__helperOrder_stap2__IResponseBody>(`/usr/member/helperOrderStep2?id=${id}`);     
  } 

  public caleandar_list(loginId: number) {
    return this.get<MainApi__order_list__IResponseBody>(`/usr/caleandar/list?directorId=${loginId}`);
  }

  

  public article_doWrite(boardId: number, title: string, body: string) {
    return this.postByForm<MainApi__order_doWrite__ResponseBody>(
      `/article/doAdd`, {
        boardId,
        title,
        body
      }
    );
  }

  public member_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__member_authKey__ResponseBody>(
      `/usr/member/authKey`,
      {
        loginId,
        loginPw
      }
    );
  }

  public member_expertJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, genFileIdsStr: string, sido: string, license: string, career: string) {
    return this.postByForm<MainApi__member_doJoin__ResponseBody>(
      `/usr/member/doExpertJoin`, {
        loginId,
        loginPw, name,
        cellphoneNo,
        email,
        genFileIdsStr,
        sido,
        license,
        career
      }
    );
  }

  public common_genFile_doUpload(profileImg: File) {
    const formDate = new FormData();
    formDate.append("file__member__0__common__attachment__1", profileImg);
    return this.post<MainApi__common_genFile_doUpload__ResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }
}

export const mainApiSymbol = Symbol('mainApiSymbol');

class Singleton {
  static mainApi: MainApi;
}

export const createMainApi = () => {
  if ( Singleton.mainApi == null ) {
    Singleton.mainApi = new MainApi();
  }

  return Singleton.mainApi;
};

export const useMainApi = (): MainApi => inject(mainApiSymbol) as MainApi;
export const getMainApi = createMainApi;