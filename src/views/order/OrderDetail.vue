<template>
  <ion-page>
    <ion-custom-header>요청 - 상세</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">요청 - 상세</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body>                          
          <ion-item>            
            <ion-label>                            
              <h2>의뢰인</h2>
              <h2>{{ orderState.order.extra__writer }}</h2>     
            </ion-label>
          </ion-item>
          <ion-item>            
            <ion-label>                            
              <h2>기간</h2>
              <h2>{{ orderState.order.term }}</h2>                         
            </ion-label>
          </ion-item>
          <ion-item>            
            <ion-label>                            
              <h2>장소</h2>
              <h2>{{ orderState.order.funeralHome }}</h2>                   
            </ion-label>
          </ion-item>
          <ion-item>            
            <ion-label>                            
              <h2>요청사항</h2>
              <h2>{{ orderState.order.body }}</h2>        
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
import { Order } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default  {
  name: 'OrderDetail',
  components: { IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonItem },
   
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();
    const orderState = reactive({
      order: {} as Order
    });

    async function loaOrder(id: number) {          
      const axRes = await mainService.order_detail(id);
      orderState.order = axRes.data.body.order;
    }

    async function accept(id: number){
      const axRes = await mainService.accept(id)
              
          const acceptId = axRes.data.body.id;
          router.replace("/order/accept?id=" + acceptId);

    }
    
    onMounted(() => {          
      loaOrder(util.toIntOrUnd(route.query.id));
    })
    

    function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
      accept(orderState.order.id);
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