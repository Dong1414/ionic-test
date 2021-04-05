export interface GlobalState {
  loginedMember: Member;
  authKey: string;
  isLogined: boolean;
  setLogined(authKey: string, member: Member): void;
  setLogouted(): void;
}

export interface Entity {
  id: number;
  regDate: string;
  updateDate: string;
}

export interface Order extends Entity {  
  id:number;
  clientId:number;
  term:string;
  funeralHome:string;
  title:string;
  body:string;
  updateDate:string;
  helperName:string;
  extra__writer:string;
  extra__cellphoneNo:string;
}

export interface Member extends Entity {  
  id:number;
	loginId: string;
	authLevel: number;
	name: string;	
	cellphoneNo: string;
	email: string;
  extra__thumbImg: string;
}

export interface HelperOrder extends Entity {      
  id:number;
  directorId:number;
  orderId:number;
  helperId:number;
  term:string;
  funeralHome:string;
  sido:string;  
  title:string;    
  career:string;
  updateDate:string;
  extra__writer:string;
  extra__cellphoneNo:string;    
}