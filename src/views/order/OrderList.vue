<template>
  <ion-page>
    <ion-custom-header>요청 - 리스트</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">요청 - 리스트</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body>                
        <ion-list>          
          <ion-item v-for="order in orderListState.orders" :key="order.id">            
            <ion-label>
              <router-link :to="'orderDetail?id=' + order.id">              
                <h2>{{ order.extra__writer }}</h2>              
                <h2>{{ order.title }}</h2>                   
              </router-link>                    
            </ion-label>
          </ion-item>
        </ion-list>
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
  name: 'OrderList',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonList, IonItem },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();
    const orderListState = reactive({
      orders: ([] as Order[]),      
    });

    async function loaOrders(loginId: number) {          
      const axRes = await mainService.order_list(loginId);
      orderListState.orders = axRes.data.body.orders;
    }
    
    onMounted(() => {            
      loaOrders(globalState.loginedMember.id);                     
    })    
    
    
    
    return {
      globalState,
      orderListState,
      mainService,      
    }
  }
}
</script>