<template>
  <ion-page>
    <ion-custom-header>수락</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">수락</ion-title>
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
            <h2>전화번호</h2>
            <h2>{{ orderState.order.extra__cellphoneNo }}</h2>                         
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
        <ion-item>            
          <ion-label>                            
            <h2>도우미</h2>
            <ul class="bg-white border-4 border-gray-200 text-center" v-for="helper in orderState.step2s" :key="helper.id" >     
              <li>{{ helper.name }}</li>
              <li>{{ helper.cellphoneNo }}</li>
            </ul>
          </ion-label>
        </ion-item>
        <ion-item>            
          <router-link :to="'/order/caleandarList'" class="btn-primary-small">일정확인</router-link>                                    
        </ion-item>
        <talbe calss="mx-auto container table-auto">          
          <thead class="text-xs">
            <tr class="bg-gray-800 font-size"> 
              <th class="px-16 py-2">
                <span class="text-gray-300">이름</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-300">활동지역</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-300">경력</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-300">신청</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">          
          <tr class="bg-white border-4 border-gray-200 text-center" v-for="helperOrder in orderState.helperOrders" :key="helperOrder.id" >            
              <td class="px-16 py-2">                
                <router-link :to="'/member/helperOrder?id=' + helperOrder.id" >{{ helperOrder.extra__writer }}</router-link>
              </td>
              <td class="px-16 py-2">
                <span>
                  {{ helperOrder.sido }}                                   
                </span>
              </td>            
               <td class="px-16 py-2">
                <span>
                  {{ helperOrder.career }} 
                </span>
              </td>
              <td class="px-16 py-2">
                <router-link :to="'/order/helperOrder?id=' + helperOrder.id" class="btn-primary-small mr-8">정보확인</router-link>                
              </td>
            </tr>                                 
        </tbody>       
        </talbe>                          
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
import { Order, HelperOrder, Member } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default  {
  name: 'Accept',
  components: { IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonItem },
   
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();
    const orderState = reactive({
      order: {} as Order,
      helperOrders: ([] as HelperOrder[]),  
      step2s: ([] as Member[]),
    });

    async function loaOrder(id: number) {          
      const axRes = await mainService.order_detail(id);
      orderState.order = axRes.data.body.order;
    }

    async function loadHelperOrders(id: number) {          
      const axRes = await mainService.helperOrder_list(id);
      orderState.helperOrders = axRes.data.body.helperOrders;            
    }

    async function loadHelperStep2(id: number) {          
      const axRes = await mainService.helper_list(id);
      orderState.step2s = axRes.data.body.helpers;            
    }

    async function accept(id: number){
      const axRes = await mainService.accept(id)              
          const acceptId = axRes.data.body.id;          
    }
    
    onMounted(() => {          
      loaOrder(util.toIntOrUnd(route.query.id));
      loadHelperOrders(util.toIntOrUnd(route.query.id));
      loadHelperStep2(util.toIntOrUnd(route.query.id));
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