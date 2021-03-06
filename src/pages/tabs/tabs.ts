import { Component} from '@angular/core';
import { NavController, Events  } from 'ionic-angular';
import {LocalUserInfo} from '../../LocalDatas'


import { KeyItemComponent } from '../key/key-item/key-item';
import { ListMasterPage } from '../hotel/hotel-list/list-master';
import { OrderListPage } from '../order/order-list/order-list'
import { UserCenterPage } from '../user/user-center/user-center';
import {LoginManagerProvider} from '../../providers';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = ListMasterPage;
  OrderListTab: any = OrderListPage;
  settingTab: any = UserCenterPage;
  keySearchTab = KeyItemComponent;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';
  public isLoginPageShow = false;
  public userInfo:any;
  private isFirstAccessUser = true;
  private isFirstAccessKey = true;
  private currentTabIndex = 0;
  constructor(public navCtrl: NavController, private events:Events,private loginManager: LoginManagerProvider, private localUserInfo: LocalUserInfo) {
    // this.init();
    this.loginManager.subscribeLoginState(res => {
      this.isLoginPageShow = !res;
      if(!this.isLoginPageShow){
        this.upDateCurrentTab();
      }
    });
    events.subscribe('goback',()=>{
      this.isLoginPageShow = false;
    });
  }
  public async init (){
    this.userInfo = await this.localUserInfo.get();
    if (this.userInfo) {
      this.isLoginPageShow = false;
    }
    // this.loginManager.getValiCode('15950528684');
    // this.loginManager.login('15950528684',)
  }

  ionchange(event){
    console.info(event.index);
    this.currentTabIndex = event.index;
    if(event.index === 3 ){
      // change to user
      if( this.isFirstAccessUser ){
        this.isFirstAccessUser = false;
      }else {
        this.events.publish('updateUserCenter');
      }
    } else if( event.index === 2 ) {
      if( this.isFirstAccessKey ){
        this.isFirstAccessKey = false;
      }else {
        this.events.publish('updateKey');
      }
    }
  }

  private upDateCurrentTab(){
    let eventMap = ['','updateOrder','updateKey','updateUserCenter'];
    if(this.currentTabIndex === 0){
      return;
    }
    let eventName = eventMap[this.currentTabIndex];
    this.events.publish(eventName);
  }

}
