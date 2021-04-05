<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" :href="tabsState.hrefHome">
          <font-awesome-icon class="text-lg h-7" icon="home" />
          <ion-label>홈</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="member" :href="tabsState.hrefMember">
          <font-awesome-icon class="text-lg h-7" icon="user" />
          <ion-label>회원</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="order" :href="tabsState.hrefOrder">
          <font-awesome-icon class="text-lg h-7" icon="list" />
          <ion-label>내 일정</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="setting" :href="tabsState.hrefSetting">
          <font-awesome-icon class="text-lg h-7" icon="cog" />
          <ion-label>세팅</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage } from '@ionic/vue';
import { useGlobalState } from '@/stores';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage },
  setup() {
    const globalState = useGlobalState();
    const tabsState = reactive({
      'hrefHome':'/home',
      'hrefMember':'/member',
      'hrefOrder':'/order',
      'hrefSetting':'/setting',
    });
    /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 시작 */
    /* 버그가 해결되면 없애도 됩니다. */
    const route = useRoute();
    if ( route.path.startsWith("/home") ) {
      tabsState.hrefHome = route.fullPath;
    }
    else if ( route.path.startsWith("/member") ) {
      tabsState.hrefMember = route.fullPath;
    }
    else if ( route.path.startsWith("/order") ) {
      tabsState.hrefOrder = route.fullPath;
    }
    else if ( route.path.startsWith("/setting") ) {
      tabsState.hrefSetting = route.fullPath;
    }
    /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 끝 */
    return {
      globalState,
      tabsState
    }
  }
}
</script>

<style lang="postcss">
.btn-type-1 {
  @apply py-2 px-4 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer;
}
.btn-primary {
    @apply p-8 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 btn-type-1;
}
.btn-primary-small {
    @apply py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 btn-type-1;
}
</style>