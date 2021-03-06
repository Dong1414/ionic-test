import { GlobalState } from '@/types'
import { reactive } from "@vue/reactivity";
import { computed, inject } from "vue";
import { Member } from "@/types";

export const globalStateSymbol = Symbol('globalState');

class Singleton {
  static globalState: GlobalState;
}

export const createGlobalState = () => {
  if ( Singleton.globalState == null ) {
    const globalState: any = reactive({
      loginedMember: {
        id:0,
        regDate:"",
        updateDate:"",
        authLevel:0,
        cellphoneNo:"",
        email:"",
        /* eslint-disable @typescript-eslint/camelcase */
        extra__thumbImg:"",
        loginId:"",
        name:"",        
      },
      authKey: "",
      isLogined: computed(() => globalState.loginedMember.id != 0),
      setLogined: function(authKey: string, member: Member) {
        localStorage.setItem("authKey", authKey);
        localStorage.setItem("loginedMemberJsonStr", JSON.stringify(member));

        globalState.authKey = authKey;

        globalState.loginedMember = member;
      },
      setLogouted: function() {
        globalState.authKey = "";

        globalState.loginedMember.id = 0;
        globalState.loginedMember.regDate = "";
        globalState.loginedMember.updateDate = "";
        globalState.loginedMember.authLevel = 0;
        globalState.loginedMember.cellphoneNo = "";
        globalState.loginedMember.email = "";
        globalState.loginedMember.extra__thumbImg = "";
        globalState.loginedMember.loginId = "";
        globalState.loginedMember.name = "";        

        localStorage.removeItem("authKey");
        localStorage.removeItem("loginedMemberJsonStr");
      }
    });

    const loadLoginInfoFromLocalStorage = () => {
      const authKey = localStorage.getItem("authKey");
      const loginedMemberJsonStr = localStorage.getItem("loginedMemberJsonStr");

      if ( !!authKey && !!loginedMemberJsonStr ) {
        const loginedMember: Member = JSON.parse(loginedMemberJsonStr);

        globalState.setLogined(authKey, loginedMember);
      }
    }

    // ??? ????????? ??????????????? ??????(?????? ????????????, F5??? ?????? ???)?????? 1?????? ????????????.
    loadLoginInfoFromLocalStorage();

    Singleton.globalState = globalState;
  }

  return Singleton.globalState;
};

export const useGlobalState = (): GlobalState => inject(globalStateSymbol) as GlobalState;
export const getGlobalState = createGlobalState;