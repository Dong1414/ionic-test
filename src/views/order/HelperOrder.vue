<template>
  <ion-page>
    <ion-custom-header>도우미 - 상세</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">도우미 - 상세</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body>                          
          <ion-item>            
            <ion-label>                            
              <h2>이름</h2>
              <h2>{{ orderState.helperOrder.extra__writer }}</h2>     
            </ion-label>
          </ion-item>   

          <ion-item>            
            <ion-label>                            
              <h2>활동지역</h2>
              <h2>{{ orderState.helperOrder.sido }}</h2>     
            </ion-label>
          </ion-item>

          <ion-item>            
            <ion-label>                            
              <h2>연락처</h2>
              <h2>{{ orderState.helperOrder.extra__cellphoneNo }}</h2>     
            </ion-label>
          </ion-item>

          <ion-item>            
            <ion-label>                            
              <h2>경력</h2>
              <h2>{{ orderState.helperOrder.career }}</h2>     
            </ion-label>
          </ion-item>                              
          
          <div class="py-2 px-4">
            <form v-on:submit.prevent="acceptOrder">           
            <ion-button type="submit" expand="block">수락</ion-button>
            </form>
          </div>        
          <div class="py-2 px-4">
            <form v-on:submit.prevent="rejectOrder">           
            <ion-button type="submit" expand="block">거절</ion-button>
            </form>
          </div>        
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonLabel, IonAvatar, IonPage, IonHeader, IonToolbar, IonTitle, IonListHeader, IonList, IonItem, IonContent, IonSegment, IonSegmentButton } from '@ionic/vue';
import {IonCustomBody, IonCustomHeader} from '@/components/';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { onMounted, reactive, watch } from 'vue';
import { HelperOrder } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default  {
  name: 'HelperOrder',
  components: { IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonItem },
   
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();
    const orderState = reactive({
      helperOrder: {} as HelperOrder
    });

    async function loadHelperOrder(id: number) {          
      const axRes = await mainService.helperOrder_detail(id);
      orderState.helperOrder = axRes.data.body.helperOrder;
    }

    async function accept(id: number){
      const axRes = await mainService.acceptHelperOrder(id)
              
          const acceptId = axRes.data.body.id;
          router.replace("/order/accept?id=" + acceptId);

    }
    
    onMounted(() => {          
      loadHelperOrder(util.toIntOrUnd(route.query.id));
    })    

    function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
      accept(orderState.helperOrder.id);
    }

    
    
 
    return {
      globalState,
      orderState,
      mainService,     
      acceptOrder 
    }
  }
}
</script>