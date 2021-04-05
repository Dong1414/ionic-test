import { inject } from "vue";
import { getMainApi, MainApi } from "@/apis"

export class MainService {
  private mainApi: MainApi;

  constructor() {
    this.mainApi = getMainApi();
  }

  /* eslint-disable @typescript-eslint/camelcase */
  member_authKey(loginId: string, loginPw: string) {
    return this.mainApi.member_authKey(loginId, loginPw);
  }

  /* eslint-disable @typescript-eslint/camelcase */
  order_list(loginId: number) {
    return this.mainApi.order_list(loginId);
  }

  order_detail(id: number) {
    return this.mainApi.order_detail(id);
  }

  accept(id: number) {
    return this.mainApi.accept(id);
  }

  helperOrder_list(id: number) {
    return this.mainApi.helperOrder_list(id);
  }

  helperOrder_detail(id: number) {
    return this.mainApi.helperOrder_detail(id);
  }

  acceptHelperOrder(id: number) {
    return this.mainApi.acceptHelperOrder(id);
  }
  
  helper_list(id: number) {
    return this.mainApi.helper_list(id);
  }

  caleandar_list(loginId: number) {
    return this.mainApi.caleandar_list(loginId);
  }

  common_genFile_doUpload(profileImg: File){
    return this.mainApi.common_genFile_doUpload(profileImg);
  }
  /* eslint-disable @typescript-eslint/no-inferrable-types */
  getMemberThumbImgUrl(id: number, width: number = 40, height: number = 40) {

    const originUrl = 'http://localhost:8021/common/genFile/file/member/' + id + '/common/attachment/1';
    const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=U.U&width=${width}&height=${height}&url=` + originUrl;
    return url;
  }

  /* eslint-disable @typescript-eslint/no-inferrable-types */
  getArticleThumbImgUrl(id: number, width: number = 100, height: number = 100) {
    const originUrl = 'http://localhost:8021/common/genFile/file/article/' + id + '/common/attachment/1';
    const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=U.U&width=${width}&height=${height}&url=` + originUrl;
    return url;
  }

  member_expertJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, genFileIdsStr: string, sido: string, license: string, career: string){
    return this.mainApi.member_expertJoin(loginId, loginPw, name, cellphoneNo, email, genFileIdsStr, sido, license, career);
  }
}

export const mainServiceSymbol = Symbol('globalState');

class Singleton {
  static mainService: MainService;
}

export const createMainService = () => {
  if ( Singleton.mainService == null ) {
    Singleton.mainService = new MainService();
  }

  return Singleton.mainService;
};

export const useMainService = (): MainService => inject(mainServiceSymbol) as MainService;