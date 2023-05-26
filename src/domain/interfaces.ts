export interface User {
  uid: number;
  user: string;
  lName: string;
  fName: string;
  sName: string;
  idDept: number;
  idDeptUnits: number;
  idDeptJob: number;
  userRole: number;
  email: string;
  tel: string;
  active: number;
  dateRecord: Date;
  uidAdm: number;
  lastLogin: Date;
  loginAttempts: number;
  objRights: number;
  fio?: string;

  //sChlistTnpas: SChlistTnpa[];
  sSubjObjs: SSubjObj[];
  idDept2: SDept;
  idDeptJob2: SDeptJob;
  //userGroups: UserGroup[];
  //userPermissions: UserPermissions[];
  // notifications: Notification[];
  // notifications2: Notification[];
}
export interface CreateUserDTO {
  user?: string;
  password: string;
  fName?: string;
  sName?: string;
  lName?: string;
  tel?: string;
  idDept?: number;
  idDeptUnits: number;
  idDeptJob: number;
  email?: string;
  position?: string;
  role?: number;
  uidAdm?: number;
}
export interface UpdateUserDTO {
  user?: string;
  fName?: string;
  sName?: string;
  lName?: string;
  tel?: string;
  idDept?: number;
  idDeptUnits?: number;
  idDeptJob?: number;
  email?: string;
  position?: string;
  role?: number;
  uidAdm?: number;
}

export interface DeleteUserDTO {
  uid?: number;
  adminUid?: number;
}
export interface UserDTO {
  uid: number;
  login: string;
  lName: string | null;
  fName: string;
  sName: string | null;
  idDept: number | null;
  idDeptUnits: number | null;
  idDeptJob: number | null;
  userRole: number;
  email: string | null;
  tel: string | null;
  active: number;
  dateRecord: Date | null;
  uidAdm: number;
  lastLogin: Date | null;
  loginAttempts: number | null;
  objRights: number;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponce {
  token: string;
  user: User;
}

export interface SDeptJob {
  idDeptJob: number;
  job: string;
  dateRecord: Date | null;
  uid: number | null;
  active: number;
  org: number | null;
  users: User[];
}

export interface SDept {
  idDept: number;
  departament: string;
  org: number;
  idParent: number;
  address: string;
  dateRecord: string | null;
  active: number;
  telHead: string | null;
  telReception: string | null;
  telCode: string | null;
  telOper: string | null;
  email: string | null;
  uid: number | null;
  unpNadzOrgan: number | null;
  fioBoss: string | null;
  dolznBossNadzOrg: string | null;
  users: User[];
  value: number;
}

export interface SDeptNode {
  idDept: number;
  departament: string;
  org: number;
  idParent: number;
  uid: number | null;
  children: SDeptNode[];
}

export interface SSubjObj {
  idObj: number | null;

  idSubj: number | null;
  idTypeDanger?: number;

  note?: string | null;

  unp: string | null;

  addrObj?: string | null;

  addrDescr?: string | null;

  dateRecord?: Date | null;

  active?: number;

  uid?: number | null;

  soatoCode?: number | null;

  idReestr?: number | null;

  idStreet?: number | null;

  nameObj?: string;

  fioFireman?: string | null;

  org: number | null;

  numOpo?: string | null;

  sEventsOrderAdmBans?: SEventsOrderAdmBan[];

  sEventsOrderAdmForces?: SEventsOrderAdmForce[];

  sEventsOrderObjs?: SEventsOrderObj[];
  //sEventsOrderQueDefs: SEventsOrderQueDef[];
  u?: User;
  opo?: null | string | number;
  idSubj2?: SSubj;
}

export interface GeolocationDTO {
  idLocation: number;
  uid: number;
  latitude: string;
  longitude: string;
  dateRecord: string;
}

export interface GeolocationData {
  uid?: number;
  latitude?: string;
  longitude?: string;
  dateRecord?: string;
}

export interface SSubj {
  idSubj: number | null;
  numOpo?: string | null;
  subj?: string | null;
  unp: string | null;
  addrYur?: string | null;
  dateRecord?: Date | null;
  active?: number;
  uid?: number | null;
  codeSoatoYur?: string | null;
  numReg?: string | null;
  idOked?: number | null;
  dateRegOpo?: string | null;
  dateRegUnp?: string | null;
  addrFact?: string | null;
  bossName?: string | null;
  staffBoss?: string | null;
  numBuild?: number | null;
  nameBuild?: string | null;
  statusUnp?: string | null;
  dateLikv?: string | null;
  typeSubj?: string | null;
  bankRekv?: string | null;
  idReestrYur?: number | null;
  idStreetYur?: string | null;
  numCorpYur?: string | null;
  numBuildYur?: string | null;
  codeSoatoFact?: string | null;
  idReestrFact?: number | null;
  idStreetFact?: string | null;
  numCorpFact?: string | null;
  numBuildFact?: string | null;
  contactData?: string | null;
  idVed?: null | number | string;
  chiefName?: string;
  chiefTel?: string;
  sSubjObjs?: SSubjObj[];
  bossTel?: string | number;
  staffChief?: string | number;
  idOblYur?: string | number;
  idRayonFact?: string | number;
  idOblFact?: string | number;
  idRayonYur?: string | number;
}

export interface SSoato {
  soato: string;
  name: string;
  obl: string | null;
  raion: string | null;

  sovet: string | null;

  tip: string | null;

  gni: string | null;

  datav: string | null;

  soaton: string | null;

  datel: string | null;

  mal: string | null;

  idSoato: string;

  sSubjs: SSubj[];
}

export interface SEvents {
  idEvent: number;
  event: string;
  numEvent: number | null;
  org: number | null;
  dateBegin: Date | null;
  dateEnd: Date | null;
  dateRecord: Date | null;
  active: number;
  status: string | null; //wait/in_progress/ended
  data: string | null;
  uid: number | null;
}

export interface SEventsOrder {
  idEventOrder: number | null;
  idEvent: number | null;
  idSubj: number | null;
  idDeptIss?: number | null;
  idDept?: number | null;
  idGroup?: number | null;
  numOrder?: string | null;
  nameOrder?: string | null;
  reasonOrder?: string | null;
  idUnit_3?: number | null;
  idUnit_4?: number | null;
  sphera?: number | null;
  technical?: string | null;
  idUnit?: number | null;
  org: number | null;
  dateBegin?: Date | null;
  dateEnd?: Date | null;
  dateRecord?: Date | null;
  active?: number;
  status?: string | null;
  comm?: string | null;
  uid?: number | null;
  postTitle?: string | null;
  fioPostTitle?: string | null;
  dateOrder?: Date | null;
  periodCheckFrom?: Date | null;
  periodCheckTo?: Date | null;
  dateBeginFact?: Date | null;
  dateEndFact?: Date | null;
  dateStop?: Date | null;
  dateContinue?: Date | null;
  dateTo?: Date | null;
  postAgent?: string | null;
  nameAgent?: string | null;
  otherInfo?: string | null;
  idEventPlan?: number | null;
  idDept2?: SDept;
  idDeptIss2?: SDept;
  idEvent2?: SEvents;
  idGroup2?: Group;
  idSubj2?: SSubj;

  spheries?: IEventsSphere[];
  sEventsOrderAdmBans?: SEventsOrderAdmBan[];
  sEventsOrderAdmForces?: SEventsOrderAdmForce[];
  sEventsOrderData?: SEventsOrderData[];
  sEventsOrderDefs?: SEventsOrderDef[];
  sEventsOrderDefMtxes?: SEventsOrderDefMtx[];
  sEventsOrderObjs?: SEventsOrderObj[];
  sEventsPrivates?: SEventsPrivate[];
  notifications?: Notification[];
}

export interface IEventsSphere {
  idList: number | null;
  idEventOrder: number;
  org: number | null;
  idUnits_4: number | null;
  name?: string;
  dateRecord?: Date | string;
  uid?: string | number;
}

export interface Group {
  idGroup: number;
  org: number | null;
  name: string | null;
  idDept: number | null;
  active: number | null;
  dateRecord: Date | null;
  uid: number | null;
  sEventsOrders: SEventsOrder[];
  userGroups: UserGroup[];
}

export interface UserGroup {
  idUserGroup: number;
  idGroup: number;
  uid: number;
  active: number | null;
  dateRecord: Date;
  dateBegin: Date | null;
  dateEnd: Date | null;
  typeUser: number | null;
  idGroup2: Group;
  u?: User;
  uidGr2?: User;
}

export interface SEventsDef {
  idList: number;
  idEvent: number | null;
  idDef: number | null;
  num: string | null;
  org: number;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  info: string | null;
  sEventsOrderDefs: SEventsOrderDef[];
}

export interface SEventsOrderAdmBan {
  idList: number;
  idEventOrder: number | null;
  idObj: number | null;
  idBan: number | null;
  org: number;
  dateBegin: Date | null;
  dateEnd: Date | null;
  dateDecision: Date | null;
  numCase: string | null;
  decision: string | null;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  idEventOrder2: SEventsOrder;
  idObj2: SSubjObj;
}

export interface SEventsOrderAdmForce {
  idList: number;
  idEventOrder: number | null;
  idObj: number | null;
  idForce: number | null;
  org: number;
  dateRecord: Date | null;
  dateBegin: Date | null;
  dateEnd: Date | null;
  active: number;
  uid: number | null;
  dateForce: Date | null;
  staff: string | null;
  fio: string | null;
  numCase: string | null;
  idTypeCase: number | null;
  idEventOrder2: SEventsOrder;
  idObj2: SSubjObj;
}

export interface SEventsOrderData {
  idData: number;
  path: string | null;
  typeData: number | null;
  org: number | null;
  dateBegin: Date | null;
  dateEnd: Date | null;
  dateRecord: Date | null;
  active: number;
  status: string | null;
  comm: string | null;
  uid: number | null;
  idEventOrder: number | null;
  idDoc: number | null;
  dateCreation: Date | null;
  idEventOrder2: SEventsOrder;
}

export interface SEventsOrderDef {
  idList: number;
  idEventOrder: number | null;
  idEventDef: number | null;
  num: string | null;
  type: string | null;
  typeSub: string | null;
  flOk: number;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  dateFix: Date | null;
  dateInform: Date | null;
  dateCheckFix: Date | null;
  transferData: string | null;
  problemInfo: string | null;
  idEventDef2: SEventsDef;
  idEventOrder2: SEventsOrder;
}

export interface SEventsOrderDefMtx {
  idList: number;
  idEventOrder: number | null;
  idDef: number | null;
  flOk: number;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  dateFix: Date | null;
  dateInform: Date | null;
  dateCheckFix: Date | null;
  transferData: string | null;
  problemInfo: string | null;
  idEventOrder2: SEventsOrder;
}

export interface SEventsOrderObj {
  idObjOrder: number;
  idEventOrder: number | null;
  name: string | null;
  idObj: number | null;
  dateRecord: Date | null;
  idTypeTest: number | null;
  addrStaff: string | null;
  nameStaff: string | null;
  jobStaff: string | null;
  telStaff: string | null;
  org: number;
  active: number;
  uid: number | null;
  addrExect: string | null;
  funct: string | null;
  area: string | null;
  idUnit: number | null;
  idEventOrder2: SEventsOrder;
  idObj2: SSubjObj;
}

export interface SEventsOrderQue {
  idList: number;
  idEventOrder: number | null;
  idEventQue: number | null;
  flOk: number | null;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  dateFix: Date | null;
  dateInform: Date | null;
  dateCheckFix: Date | null;
  transferData: string | null;
  problemInfo: string | null;

  /*     @ManyToOne(
      () => SEventsOrder,
      (sEventsOrder) => sEventsOrder.sEventsOrderQues,
      { onDelete: "NO ACTION", onUpdate: "CASCADE" }
    )
    @JoinColumn([
      { name: "id_event_order", referencedColumnName: "idEventOrder" },
    ])
    idEventOrder2: SEventsOrder; */ //ВЗАИМОСВЯЗЬ В БД УБРАНА

  idEventQue2: SEventsQue;
}

export interface SEventsPlan {
  idEventPlan?: number;
  idEvent: number | null;
  idSubj: number | null;
  idDept?: number | null;
  numOrder?: string | null;
  unpDept?: string | null;
  nameDept?: string | null;
  idUnit_3?: string | null;
  idUnit_4?: string | null;
  org?: number | null;
  monthEvent?: string | null;
  halfyearEvent?: number | null;
  dateRecord?: Date | null;
  active?: number;
  status?: string | null;
  uid?: number | null;
  idObl?: number | null;
  unpSubj?: string | null;
  nameSubj?: string | null;
  telUser?: string | null;
  yearPlan?: number | null;
  idDept2?: SDept;
}

export interface SEventsPrivate {
  idPriv: number;
  idEventOrder: number | null;
  idUnit: number;
  uid: number | null;
  nameEvent: string | null;
  org: number | null;
  dateBegin: Date | null;
  dateEnd: Date | null;
  dateRecord: Date | null;
  status: string | null;
  comm: string | null;
  dateOrder: Date | null;
  uidAdm: number | null;
  idEventOrder2: SEventsOrder;
  u: User;
}

export interface SEventsQue {
  idList: number;
  idEvent: number | null;
  idQue: number | null;
  dateRecord: Date | null;
  active: number;
  uid: number | null;
  info: string | null;
  sEventsOrderQues: SEventsOrderQue[];
  idEvent2: SEvents;
}

export interface cpuResponse {
  percentage: number;
}

export interface MemoryResponse {
  status: string;
  errors: string;
}

export interface MemorySizeResponse {
  size: string;
  used: string;
  free: string;
  percentage: string;
}

export interface SUnits {
  idUnit: number;
  idParent: number | null;
  typeUnit: number | null;
  num: string | null;
  type: string | null;
  typeSub: string | null;
  name: string | null;
  dateRecord: Date | null;
  active: number;
  org: number;
  uid: number | null;
  comm: string | null;
  //sPooSubjPbs: SPooSubjPb[];
  //sQuestions: SQuestion[];
}

export interface SSubjObjSpecif {
  idSpecif: number;
  idSubjObj: number;
  nameBuild: string | null;
  idUnit_6: number | null;
  idUnit_17: number | null;
  idUnit_41: number | null;
  area: number | null;
  dateReg: Date | null;
  dateAnnul: Date | null;
  nameAgent: string | null;
  jobAgent: string | null;
  telAgent: string | null;
  active: number;
  dateRecord: Date | null;
  uid: number | null;
}

export interface ateObl {
  nameObl: string;
  active?: number;
  dateRecord?: string | number;
  idObl: number;
}

export interface IVesomstvo {
  dateRecord?: null;
  idVed: number | null;
  name: string;
  uid?: null | string | number;
}

export interface IUnits {
  idUnit: number | null;
  idParent?: null | number;
  typeUnit?: number | null;
  num?: number | string | null;
  type?: string;
  typeSub?: string;
  name: string;
  dateRecord?: Date | string;
  active?: 0 | 1;
  org?: 0 | 1;
  uid?: number | string;
  comm?: string;
}

export interface IPooSubjPb {
  active?: 1 | 0;
  addrPoo?: string;
  dateRecord?: Date | string;
  dateRegPoo?: Date | string;
  dateUnregPoo?: Date | string | null;
  fioRegPoo?: string;
  fioStaff?: string;
  flPbPog?: number;
  idDept?: number | null;
  idDeptDom?: number | null;
  idList?: string;
  idNumReg?: number | null;
  idObl?: number | null;
  idSubj?: number | null;
  idSubjObj: number | null;
  idUnit_8: number | null;
  idVed?: null | number;
  infoChange?: null | string | number;
  manufactName?: string;
  manufactNum?: number | null;
  manufactYear?: Date | string;
  nameAddrOvnerPoo?: string;
  numOrder?: number | null;
  numReg?: null;
  org?: null;
  specificPoo?: string;
  symbol?: string;
  typePoo?: string;
  uid?: string | null | number;
  unp: number | string;
}

export interface ISubjObjSpecif {
  idSpecif: number | null;
  idSubjObj: number | null;
  nameBuild: string;
  idUnit_6?: number | null;
  idUnit_17?: number | null;
  idUnit_41?: number | null;
  area?: number | null | string;
  numVisit?: number | null;
  numStaff?: number | null;
  serviceOrg?: string | null;
  dateReg?: Date | string;
  dateAnnul?: Date | string;
  nameAgent?: string | null;
  jobAgent?: string | null;
  telAgent?: string | null;
  addrAgent?: string | null;
  active?: 0 | 1;
  addrExect?: string | null;
  dateRecord?: Date | string | null;
  uid?: string | null;
}

export interface IFireCardBuild {
  idList: number | null;
  idCard?: number | null;
  idDept?: number | null;
  idObl?: number | null;
  idSubj?: number | null;
  idSubjObj: number | null;
  numReg?: number | null;
  nameBuild: string | null;
  idUnit_6?: number | null;
  addr?: string | null;
  numStaff?: number | null;
  numPerson?: number | null;
  levelBuild?: string | null;
  space?: string | number | null;
  area?: string | number | null;
  idUnit_17_37?: number | null;
  idUnit_21?: number | null;
  area_A?: string | number | null;
  area_6?: string | number | null;
  area_B1?: string | number | null;
  area_B2?: string | number | null;
  area_B3?: string | number | null;
  area_B4?: string | number | null;
  uid?: string | null;
  dateRecord?: Date | string | null;
  active?: 0 | 1;
  info?: string;
}

export interface ISopbList {
  idList: number | null;
  idSubjSopb: number;
  idCard: number | null;
  name: string;
  brend: string;
  model: number | string;
  flMnfExp: number | string;
  flDocumMade: number | string;
  flDocumNlich: string;
  numDocu: Date | string;
  numDocumMade: string;
  dateDocumMade: Date | string;
  flDocumSale: number | string | null;
  numDocumSale: string | number;
  dateDocumSale: Date | string;
  uid: number | string | null;
  dateRecord: Date | string;
  active: 0 | 1 | null;
}

export interface ISopbCardSubj {
  idData: number;
  idSubj: number | null;
  idSubjObj: number | null;
  flProisv: number | null;
  flRozn: number | null;
  flOpt: number | null;
  dateRecord: Date | string;
  uid: string | number | null;
  active: 1 | 0 | null;
  nameAgent: string;
  jobAgent: string;
  telAgent: string;
  addrAgent: string;
}

export interface IOked {
  idOked: number | null;
  idOkedParent?: number | null;
  section?: string | number;
  nameOked: string;
  levelSection?: number | string;
  dateBegin: Date | string;
  dateEnd: Date | string;
  dateRecord: Date | string;
  active: 0 | 1;
  uid: string | number;
}

export interface IGroup {
  idGroup?: null | number;
  org?: number | null;
  idDept?: number | null;
  name: string;
  dateRecord?: Date | string;
  uid?: string | number | null;
  users?: any[];
}

export interface IEventOrder {
  dateBegin: Date | string;
  dateBeginFact?: Date | string;
  dateEnd: Date | string;
  dateEndFact?: Date | string;
  fioPostTitle: string;
  idDept?: number;
  idDeptIss?: number;
  idEvent: number | null;
  idEventOrder?: number | null;
  idEventsPlan?: number;
  idGroup?: number;
  idSubj: number | null;
  idUnit_3: number | string | null;
  idUnit_4: number | null;
  nameAgent: string;
  postAgent: string;
  uidBoss: string | number | null;
  status?: number | null;
  technical?: string;
  org: number;
  eventOrderSheras?: IEventsSphere[];
  questions?: IQuestion[];
}

export interface IQuestion {
  idForm: number;
  idTypeDoc?: number;
  numAppendix?: number;
  nameDoc: string;
  pathTempl?: null | string;
  nameTempl?: null | string;
  dateFrom?: null | string | Date;
  dateTo?: null | string | Date;
  org: number;
  dateRecord?: string | null | Date;
  uid?: null | number | string;
  active?: number;
  comm?: null | string | number;
}

export interface IQuestionForEvent {
  checklists: IQuestion[];
  questionsAdditional: IQuestion[];
}

export interface IDoc {
  record?: string;
  idForm: number | null;
  idTypeDoc: number | null;
  numAppendix?: number | null;
  nameDoc: string;
  pathTempl?: string;
  nameTempl?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  org: number;
  dateRecord?: Date | string;
  uid?: string | null | number;
  active?: number | null;
  comm?: string;
}

export interface IDefection {
  idDef: number | string;
  idTnpa: number;
  numReg: number;
  nameDef: string;
  recomend: string;
  shortTnpa: string;
  typeDoc: string;
  chapterTnpa: string;
  headTnpa: number | string;
  articleTnpa: number | string;
  punctTnpa: number | string;
  subpunctTnpa: number | string;
  partTnpa: number | string;
  paragrTnpa: number | string;
  preambleTnpa: number | string;
  chList: string;
  numQuestion: number | string;
  rulePunct: string;
  org: number;
  idForm: number | string;
  typeDef: number | string;
  dateRecord: Date | string;
  dateBegin: number | string | null;
  dateEnd: number | string | null;
  active: number | null;
  uid: number | string | null;
}

export interface IIdQuestionsForDoc {
  checklists?: number[];
  questionsAdditional?: number[];
}

export interface IQuestionsForDoc {
  checklists: IDefection[];
  questionsAdditional?: IDefection[];
}
