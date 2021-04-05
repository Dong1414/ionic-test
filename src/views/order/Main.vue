<template>
  <ion-page>
    <ion-custom-header>요청-일정</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">요청-일정</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="justify-around flex h-full">
        <div class="items-center flex">
          <router-link :to="'list'" class="btn-primary m-8"> 요청 확인 </router-link>              
          <router-link :to="'caleandarList'" class="btn-primary m-8"> 일정 확인 </router-link>                      
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="postcss">
.btn-type-1 {
  @apply p-8 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer;
}
.btn-primary {
    @apply p-8 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 btn-type-1;
}
</style>

<script lang="ts">
import { IonLabel, IonAvatar, IonPage, IonHeader, IonToolbar, IonTitle, IonListHeader, IonList, IonItem, IonContent, IonSegment, IonSegmentButton } from '@ionic/vue';
import {IonCustomBody, IonCustomHeader} from '@/components/';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default  {
  name: 'Main',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomHeader },
   
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();
    const orderState = reactive({      
    });            
      
    return {
      globalState,
      orderState,
      mainService,     
    
    }
  }
}
</script>