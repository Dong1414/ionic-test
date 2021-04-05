<template>
  <ion-page>
    <ion-custom-header>회원 - 가입</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">회원 - 가입</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body class="justify-center">
                
        <form @submit.prevent="checkAndJoin">
          <div>
            <ion-item>
              <ion-label position="floating">로그인아이디</ion-label>
              <ion-input v-model="joinFormState.loginId" maxlength="20"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">로그인비번</ion-label>
              <ion-input v-model="joinFormState.loginPw" maxlength="20" type="password"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">로그인비번확인</ion-label>
              <ion-input v-model="joinFormState.loginPwConfirm" maxlength="20" type="password"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">프로필 이미지 선택</ion-label>
              <ion-input class="mt-4" ref="profileImgElRef" maxlength="20" type="file"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">이름</ion-label>
              <ion-input v-model="joinFormState.name" maxlength="20" type="text"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">전화번호</ion-label>
              <ion-input v-model="joinFormState.callphoneNo" maxlength="20" type="tel"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">이메일</ion-label>
              <ion-input v-model="joinFormState.email" maxlength="20" type="email"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">활동지역</ion-label>
                  <ion-select v-model="joinFormState.sido">            
                    <ion-select-option value="1">시/도 선택</ion-select-option>
                    <ion-select-option value="서울특별시">서울특별시</ion-select-option>
                    <ion-select-option value="인천광역시">인천광역시</ion-select-option>
                    <ion-select-option value="대전광역시">대전광역시</ion-select-option>
                    <ion-select-option value="광주광역시">광주광역시</ion-select-option>
                    <ion-select-option value="대구광역시">대구광역시</ion-select-option>
                    <ion-select-option value="울산광역시">울산광역시</ion-select-option>
                    <ion-select-option value="부산광역시">부산광역시</ion-select-option>
                    <ion-select-option value="경기도">경기도</ion-select-option>
                    <ion-select-option value="강원도">강원도</ion-select-option>
                    <ion-select-option value="충청북도">충청북도</ion-select-option>
                    <ion-select-option value="충청남도">충청남도</ion-select-option>
                    <ion-select-option value="전라북도">전라북도</ion-select-option>
                    <ion-select-option value="전라남도">전라남도</ion-select-option>
                    <ion-select-option value="경상북도">경상북도</ion-select-option>
                    <ion-select-option value="경상남도">경상남도</ion-select-option> 
                  </ion-select>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">자격증</ion-label>
              <ion-input v-model="joinFormState.license" maxlength="20" type="text"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">경력</ion-label>
              <ion-input v-model="joinFormState.career1" calss="w-1/4" maxlength="20" type="month"></ion-input>
              <ion-input v-model="joinFormState.career2" calss="w-1/4" maxlength="20" type="month"></ion-input>
            </ion-item>
          </div>

          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">회원가입</ion-button>
          </div>          
        </form>
        
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonInput } from '@ionic/vue';
import {IonCustomBody, IonCustomHeader} from '@/components/';
import { useGlobalState } from '@/stores'
import { reactive, ref } from 'vue';
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from "@/utils";

const useJoinFormState = () => {
  return reactive({
    loginId: "",
    loginPw: "",
    loginPwConfirm: "",
    name: "",    
    callphoneNo: "",  
    email: "",      
    sido: "",
    license: "",
    career1: "",
    career2: ""
  });
};

const profileImgElRef = ref<HTMLInputElement>();

export default  {
  name: 'ExpertJoin',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonSelect, IonSelectOption, IonInput},
  setup() {
    const globalState = useGlobalState();
    const joinFormState = useJoinFormState();
    
    const router = useRouter();
    const mainService = useMainService();
    
    async function expertJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, genFileIdsStr: string, sido: string, license: string, career: string) {
                              
      const axiosResponse = await mainService.member_expertJoin(loginId, loginPw, name, cellphoneNo, email, genFileIdsStr, sido, license, career)
      util.showAlert(axiosResponse.data.msg);
      if ( axiosResponse.data.fail ) {
        return;
      }            
      router.replace('/member/login?loginId=' + loginId)
    }

    function checkAndJoin() {
      
      if ( joinFormState.loginId.trim().length == 0 ) {
        alert('로그인아이디를 입력해주세요.');
        return;
      }
      if ( joinFormState.loginPw.trim().length == 0 ) {
        alert('로그인비밀번호를 입력해주세요.');
        return;
      }
      if ( joinFormState.loginPw.trim() != joinFormState.loginPwConfirm.trim() ) {
        alert('로그인 비밀먼호가 일치하지 않습니다.');
        return;
      }
      if ( joinFormState.name.trim().length == 0 ) {
        alert('이름을 입력해주세요.');
        return;
      }
      if ( joinFormState.callphoneNo.trim().length == 0 ) {
        alert('휴대전화번호를 입력해주세요.');
        return;
      }
      if ( joinFormState.email.trim().length == 0 ) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if ( joinFormState.sido == '1' ) {
        alert('활동지역을 선택해주세요.');
        return;
      }
      if ( joinFormState.license.trim().length == 0 ) {
        alert('자격증을 입력해주세요.');
        return;
      }
      if ( joinFormState.career1.trim().length == 0 ) {
        alert('시작날짜를 입력해주세요.');
        return;
      }
      if ( joinFormState.career2.trim().length == 0 ) {
        alert('현재날짜를 입력해주세요.');
        return;
      }
      const career = String(joinFormState.career1) + '~' + String(joinFormState.career2);
      
      const startJoin = (genFileIdsStr: string) => {
        expertJoin(joinFormState.loginId, joinFormState.loginPw, joinFormState.name, joinFormState.callphoneNo, joinFormState.email, genFileIdsStr, joinFormState.sido, joinFormState.license, career);
      };

      const  startFileUpload = async(onSuccess: Function) => {
        if ( !profileImgElRef.value?.files ) {
          onSuccess("");
          return;
        }
        
        await mainService.common_genFile_doUpload(profileImgElRef.value?.files[0])
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              onSuccess(axiosResponse.data.body.genFileIdsStr);
            }
          });
      };
      startFileUpload(startJoin);      
    }
    return {
      globalState,
      joinFormState,
      checkAndJoin
    }
  }
}
</script>