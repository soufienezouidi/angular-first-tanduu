import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  AfterViewChecked,
  ViewChild,
  HostListener,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';

import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { CommonServiceService } from './common-service.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { Observable, throwError } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DemoAdapter } from './demo-adapter';
import { ChatAdapter } from 'ng-chat';
import Swal from 'sweetalert2';
import { CategoriesServices } from './services/tandu-admin/categories.service';
import { ExpressService } from './services/tandu-admin/express.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
import { io } from 'socket.io-client';
import { TokenStorageService } from './services/token-storage.service';
import { InvitationsService } from './admin/services/invitations/invitations.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { UserService } from './services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const SOCKET_ENDPOINT = 'https://realtime.aroundorder.com:3200';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {
  get list_access(): any {
    return AppComponent.jobberListAccess;
  }
  get categorynameforaddimage(): string {
    return AppComponent.namecategfrommodam;
  }
  get categoryidforaddimage(): number {
    return AppComponent.idcategfrommodam;
  }
  get getnamesubb(): string {
    return AppComponent.namesub;
  }
  get getidsubb(): number {
    return AppComponent.idsub;
  }
  get getcategorynameforsub(): string {
    return AppComponent.namecategfrommodaloforaddsub;
  }
  get getexpressname(): string {
    return AppComponent.nameexpress;
  }
  get getexpressnameforsub(): string {
    return AppComponent.namecategfrommodaloforaddsub;
  }
  get getidcategtoedit(): number {
    return AppComponent.idcategtoedit;
  }
  get getnamefrcategtoedit(): string {
    return AppComponent.namefrcategtoedit;
  }
  get getnameengcategtoedit(): string {
    return AppComponent.nameengcategtoedit;
  }
  get getnamedecategtoedit(): string {
    return AppComponent.namedecategtoedit;
  }

  constructor(
    private categoryser: CategoriesServices,
    private expressserv: ExpressService,
    private tokenStorageService: TokenStorageService,
    private deviceService: DeviceDetectorService,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    public userser: UserService,
    location: Location,
    private invitationsService: InvitationsService,
    public commonServic: CommonServiceService,
    private dbService: NgxIndexedDBService,
    private http: HttpClient
  ) {
    if (!localStorage.getItem('language')) {
      if (navigator.language.includes('fr')) {
        localStorage.setItem('language', 'fr');
      } else if (navigator.language.includes('de')) {
        localStorage.setItem('language', 'de');
      } else {
        localStorage.setItem('language', 'en');
      }
      document.cookie = 'security_trans=true';
    }
    // this.userser.getfiletrans().subscribe((e: string) => {
    /* this.userser.getfiletrans().subscribe((e: string) => {
      console.log(JSON.stringify(e));
>>>>>>> 7c706b92b46491b17ba2fd30d59d880fb169e8a4
      let file = new Blob([JSON.stringify(e)], { type: '.txt' });
      file.text().then((eee: any) =>
        JSON.parse(eee).forEach((element) => {
          console.log(element);
        })
      );
    });*/

    /*this.setCookie("googtrans", "/en/" + navigator.language.toLowerCase().split('-')[0], 365);
    localStorage.setItem("lg", navigator.language.toLowerCase().split('-')[0])*/

    /*
        var googleTrans: any = this.getCookie('googtrans');
        if (!googleTrans) {
          this.setCookie(
            'googtrans',
            '/en/' + navigator.language.toLowerCase().split('-')[0],
            365
          );
          localStorage.setItem(
            'lg',
            navigator.language.toLowerCase().split('-')[0]
          );
        } else {
          /* this.setCookie(
             'googtrans',
             '/en/' + this.getCookie('googtrans').toLowerCase().split('-')[0],
             365
           );
           localStorage.setItem(
             'lg',
             navigator.language.toLowerCase().split('-')[0]
           );
        }
    */
    this.loadFooter = true;
    if (window.pageYOffset >= 300 && this.notweb) {
      this.showheader1 = true;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && this.notweb) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }

    if (window.pageYOffset < 300 && !this.notweb) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }

    if (window.pageYOffset < 300 && !this.notweb) {
      this.showheader6 = false;
      this.showheader1 = false;
      this.showheader7 = false;
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('/');
        this.url = url[1];
        if (
          // tslint:disable-next-line: triple-equals
          event.url === '/login-page' ||
          event.url === '/forgot-password' ||
          event.url === '/Register' ||
          event.url === '/doctor/register' ||
          event.url === '/pharmacy/pharmacy-register' ||
          event.url === '/doctor/doctor-register'
        ) {
          document.querySelector('body').classList.add('account-page');
          document.querySelector('body').classList.remove('mat-typography');
          if (event.url === '/login-page') {
            // this.Router.navigateByUrl('/login-page');
          }
        } else {
          document.querySelector('body').classList.remove('account-page');
          document.querySelector('body').classList.add('mat-typography');
        }
        if (event.url === '/pre-register_partner') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        }
        if (event.url === '/home-eight') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        } else if (event.url === '/home-four') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = true;
        } else if (event.url === '/pre-register_partner') {
          this.show = true;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        } else if (event.url === '/choose_register') {
          this.show = true;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = true;
        } else if (event.url === '/login-tanduu') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        } else if (event.url === '/home-six') {
          this.show = true;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = true;
        } else if (event.url === '/home-seven') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = true;
        } else if (event.url === '/home-one') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = true;
        } else if (event.url === '/home') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;

          this.showheader7 = true;
        } else if (this.url === 'admin') {
          this.show = false;
          this.hideFooter = true;
          this.loadFooter = false;
          this.loadFooter = false;
          // this.hidefooter1 = true;
          // this.showheader1 = false;
          //  this.hidefooter8 = true;
          // this.showheader8 = false;
          //  this.hidefooter4 = true;
          // this.showheader4 = false;
          //  this.hidefooter6 = true;
          // this.showheader6 = false;
          // this.hidefooter7 = true;
          this.showheader7 = false;
        } else if (this.url === 'tanduu-admin') {
          this.show = false;
          this.hideFooter = true;
          this.loadFooter = false;
          // this.hidefooter1 = true;
          this.showheader1 = false;
          //  this.hidefooter8 = true;
          this.showheader8 = false;
          //  this.hidefooter4 = true;
          this.showheader4 = false;
          //  this.hidefooter6 = true;
          this.showheader6 = false;
          // this.hidefooter7 = true;
          this.showheader7 = false;
        } else if (event.url === '/map-grid' || event.url === '/map-list') {
          this.hideFooter = true;
        }
        if (event.url === '/blog' || event.url === '/blog') {
          this.hideFooter = true;
        }
        if (
          event.url === '/patient-register-step1' ||
          event.url === '/patient-register-step2' ||
          event.url === '/patient-register-step3' ||
          event.url === '/patient-register-step4' ||
          event.url === '/patient-register-step5' ||
          event.url === '/doctor-register-step1' ||
          event.url === '/doctor-register-step2' ||
          event.url === '/doctor-register-step3' ||
          event.url === '/pharmacy/pharmacy-register-step1' ||
          event.url === '/pharmacy/pharmacy-register-step2' ||
          event.url === '/pharmacy/pharmacy-register-step3'
        ) {
          this.show = false;
          this.hideFooter = true;
        }
        if (event.url === '/doctor/chat-doctor') {
          this.show = false;
          this.hideFooter = false;
        }
        if (event.url === '/video-call' || event.url === '/voice-call') {
          document.querySelector('body').classList.add('call-page');
          document.querySelector('body').classList.remove('mat-typography');
        } else {
          document.querySelector('body').classList.remove('call-page');
          document.querySelector('body').classList.add('mat-typography');
        }
        if (
          event.url === '/doctor/message' ||
          event.url === '/patients/patient-chat'
        ) {
          document.querySelector('body').classList.add('chat-page');
          document.querySelector('body').classList.remove('mat-typography');
        } else {
          document.querySelector('body').classList.remove('chat-page');
          document.querySelector('body').classList.add('mat-typography');
        }
      }
    });

    this.url = location.path();
    this.show = this.url.includes('admin') ? false : true;
    this.show = this.url.includes('tanduu-admin') ? false : true;
    if (this.url.includes('admin')) {
      this.show = false;
    }
  }
  static switched = false;
  static jobberaAccessFirstNname: string;
  static jobberAccessId: number;
  static jobberListAccess: any;
  static selectedUpdateAccess: any;

  // models informations
  static idcategfrommodam: number;
  static namecategfrommodam: string;

  static idsub: number;
  static namesub: string;
  static idcategfrommodalforaddsub: number;
  static namecategfrommodaloforaddsub: string;
  static idexpress: number;
  static nameexpress: string;
  static idexpressfrommodalforaddsub: number;
  static nameexpressfrommodaloforaddsub: string;

  // edit categ infos
  static idcategtoedit: number;
  static namefrcategtoedit: string;
  static nameengcategtoedit: string;
  static namedecategtoedit: string;

  static ipclient = '';
  title = 'doccure';
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;
  currentLanguage: any = localStorage.getItem('language');
  url;
  items = [
    'Orders management',
    'Team management',
    'Accounting',
    'Office',
    'Invoices',
  ];
  loading = false;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  sessionState = false;
  errorMessage = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  serviceLang: string;
  newfrtextfromedit = '';
  newentextfromedit = '';
  newdetextfromedit = '';
  subnamefr = '';
  subnameeng = '';
  subnamede = '';
  loadFooter = false;
  hideFooter = true;
  hidefooter6 = false;
  showheader6 = false;
  hidefooter1 = true;
  showheader1 = false;
  hidefooter8 = true;
  showheader8 = false;
  hidefooter4 = true;
  showheader4 = false;
  hidefooter7 = true;
  showheader7 = false;
  show = true;
  fileDataen: any;
  fileDatafr: any;
  fileDatade: any;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  deviceInfo = null;
  notweb = false;
  showchat = false;
  userconnected: any;

  selectedSimpleItem = [];
  scrollY$: Observable<number>;
  files: File[] = [];
  userId = 999;
  public adapter: ChatAdapter = new DemoAdapter();

  urlimg: any; // Angular 11, for stricter type
  msg = '';
  // add category modal
  urlimgcategory: any;
  msgcategory = '';
  fileToUploadcateg: File;

  // add category banner
  urlbannercategory: any;

  fileToUploadbannercateg: File;
  // add category modal
  urlimagesub: any;

  fileToUploadsub: File;
  categengname: string;
  categfrname: string;
  categdename: string;
  // add category modal
  // add express modal
  urlimgexpress: any;
  msgexpress = '';
  fileToUploadexpress: File;
  expressgengname: string;
  expressfrname: string;
  expressdename: string;
  // end add category modal
  // socket configure
  socket: any;

  languagesList: any[] = [
    /*  {
        lang: 'Arabic',
        symbol: 'ar',
      },*/

    {
      languages: {
        name_en: 'English (US)',
        name_fr: 'Anglais (États-Unis)',
        name_de: 'Amerikanisches Englisch',
      },
      symbol: 'en',
    },

    {
      languages: {
        name_en: 'French',
        name_fr: 'Français',
        name_de: 'Französisch',
      },

      symbol: 'fr',
    },
    {
      languages: {
        name_en: 'Deutsch',
        name_fr: 'Deutsch',
        name_de: 'Deutsch',
      },
      symbol: 'de',
    },

    /* {
       "lang": "Amharic",
       "symbol": "am"
     },
     {
       "lang": "Arabic",
       "symbol": "ar"
     },
     {
       "lang": "Basque",
       "symbol": "eu"
     },
     {
       "lang": "Bengali",
       "symbol": "bn"
     },
     {
       "lang": "English (UK)",
       "symbol": "en-GB"
     },
     {
       "lang": "Bulgarian",
       "symbol": "bg"
     },

     {
       "lang": "Croatian",
       "symbol": "hr"
     },
     {
       "lang": "Czech",
       "symbol": "cs"
     },
     {
       "lang": "Danish",
       "symbol": "da"
     },
     {
       "lang": "Dutch",
       "symbol": "nl"
     },
     {
       "lang": "English (US)",
       "symbol": "en"
     },
     {
       "lang": "Estonian",
       "symbol": "et"
     },
     {
       "lang": "Filipino",
       "symbol": "fil"
     },
     {
       "lang": "Finnish",
       "symbol": "fi"
     },
     {
       "lang": "French",
       "symbol": "fr"
     },
     {
       "lang": "German",
       "symbol": "de"
     },
     {
       "lang": "Greek",
       "symbol": "el"
     },
     {
       "lang": "Gujarati",
       "symbol": "gu"
     },
     {
       "lang": "Hebrew",
       "symbol": "iw"
     },
     {
       "lang": "Hindi",
       "symbol": "hi"
     },
     {
       "lang": "Hungarian",
       "symbol": "hu"
     },
     {
       "lang": "Icelandic",
       "symbol": "is"
     },
     {
       "lang": "Indonesian",
       "symbol": "id"
     },
     {
       "lang": "Italian",
       "symbol": "it"
     },
     {
       "lang": "Japanese",
       "symbol": "ja"
     },
     {
       "lang": "Kannada",
       "symbol": "kn"
     },
     {
       "lang": "Korean",
       "symbol": "ko"
     },
     {
       "lang": "Latvian",
       "symbol": "lv"
     },
     {
       "lang": "Lithuanian",
       "symbol": "lt"
     },
     {
       "lang": "Malay",
       "symbol": "ms"
     },
     {
       "lang": "Malayalam",
       "symbol": "ml"
     },
     {
       "lang": "Marathi",
       "symbol": "mr"
     },
     {
       "lang": "Norwegian",
       "symbol": "no"
     },
     {
       "lang": "Polish",
       "symbol": "pl"
     },
     {
       "lang": "Portuguese",
       "symbol": "pt-PT"
     },
     {
       "lang": "Romanian",
       "symbol": "ro"
     },
     {
       "lang": "Russian",
       "symbol": "ru"
     },
     {
       "lang": "Serbian",
       "symbol": "sr"
     },
     {
       "lang": "Chinese (PRC)",
       "symbol": "zh-CN"
     },
     {
       "lang": "Slovak",
       "symbol": "sk"
     },
     {
       "lang": "Slovenian",
       "symbol": "sl"
     },
     {
       "lang": "Spanish",
       "symbol": "es"
     },
     {
       "lang": "Swahili",
       "symbol": "sw"
     },
     {
       "lang": "Swedish",
       "symbol": "sv"
     },
     {
       "lang": "Tamil",
       "symbol": "ta"
     },
     {
       "lang": "Telugu",
       "symbol": "te"
     },
     {
       "lang": "Thai",
       "symbol": "th"
     },
     {
       "lang": "Chinese (Taiwan)",
       "symbol": "zh-TW"
     },
     {
       "lang": "Turkish",
       "symbol": "tr"
     },
     {
       "lang": "Urdu",
       "symbol": "ur"
     },
     {
       "lang": "Ukrainian",
       "symbol": "uk"
     },
     {
       "lang": "Vietnamese",
       "symbol": "vi"
     },
     {
       "lang": "Welsh",
       "symbol": "cy"
     }
      lang: 'German',
      symbol: 'de',
    },
    {
      lang: 'Greek',
      symbol: 'el',
    },
    {
      lang: 'Gujarati',
      symbol: 'gu',
    },
    {
      lang: 'Hebrew',
      symbol: 'iw',
    },
    {
      lang: 'Hindi',
      symbol: 'hi',
    },
    {
      lang: 'Hungarian',
      symbol: 'hu',
    },
    {
      lang: 'Icelandic',
      symbol: 'is',
    },
    {
      lang: 'Indonesian',
      symbol: 'id',
    },
    {
      lang: 'Italian',
      symbol: 'it',
    },
    {
      lang: 'Japanese',
      symbol: 'ja',
    },
    {
      lang: 'Kannada',
      symbol: 'kn',
    },
    {
      lang: 'Korean',
      symbol: 'ko',
    },
    {
      lang: 'Latvian',
      symbol: 'lv',
    },
    {
      lang: 'Lithuanian',
      symbol: 'lt',
    },
    {
      lang: 'Malay',
      symbol: 'ms',
    },
    {
      lang: 'Malayalam',
      symbol: 'ml',
    },
    {
      lang: 'Marathi',
      symbol: 'mr',
    },
    {
      lang: 'Norwegian',
      symbol: 'no',
    },
    {
      lang: 'Polish',
      symbol: 'pl',
    },
    {
      lang: 'Portuguese (Portugal)',
      symbol: 'pt-PT',
    },
    {
      lang: 'Romanian',
      symbol: 'ro',
    },
    {
      lang: 'Russian',
      symbol: 'ru',
    },
    {
      lang: 'Serbian',
      symbol: 'sr',
    },
    {
      lang: 'Chinese (PRC)',
      symbol: 'zh-CN',
    },
    {
      lang: 'Slovak',
      symbol: 'sk',
    },
    {
      lang: 'Slovenian',
      symbol: 'sl',
    },
    {
      lang: 'Spanish',
      symbol: 'es',
    },
    {
      lang: 'Swahili',
      symbol: 'sw',
    },
    {
      lang: 'Swedish',
      symbol: 'sv',
    },
    {
      lang: 'Tamil',
      symbol: 'ta',
    },
    {
      lang: 'Telugu',
      symbol: 'te',
    },
    {
      lang: 'Thai',
      symbol: 'th',
    },
    {
      lang: 'Chinese (Taiwan)',
      symbol: 'zh-TW',
    },
    {
      lang: 'Turkish',
      symbol: 'tr',
    },
    {
      lang: 'Urdu',
      symbol: 'ur',
    },
    {
      lang: 'Ukrainian',
      symbol: 'uk',
    },
    {
      lang: 'Vietnamese',
      symbol: 'vi',
    },
    {
      lang: 'Welsh',
      symbol: 'cy',
    },*/
  ];
  editcategory() {
    if (this.newfrtextfromedit === '') {
      this.newfrtextfromedit = this.getnamefrcategtoedit;
    }
    if (this.newentextfromedit === '') {
      this.newentextfromedit = this.getnameengcategtoedit;
    }
    if (this.newdetextfromedit === '') {
      this.newdetextfromedit = this.getnamedecategtoedit;
    }
  }
  addnewsubcategory() {
    Swal.fire({
      title: 'Do you want to add this sub_Category?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      const subc: any = {
        name_fr: this.subnamefr,
        name_en: this.subnameeng,
        name_de: this.subnamede,
        category_id: AppComponent.idcategfrommodalforaddsub,
      };

      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.fileToUploadsub) {
          this.categoryser.addsubcategory(subc).subscribe((data: any) => {
            if (data.success) {
              const formData = new FormData();
              formData.append(
                'file',
                this.fileToUploadsub,
                data.categorie.id + '.png'
              );

              this.categoryser
                .uploadsubcategoryimage(formData)
                .subscribe((element: any) => {});

              Swal.fire(
                'Saved!  ',
                'you can always edit it or delete it',
                'success'
              ).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire(data.message, '', 'info');
            }
          });
        } else {
          Swal.fire('photo is required', '', 'warning');
        }
      } else {
        Swal.fire('Category service not saved', '', 'info');
      }
    });
  }
  uploadexpressserv() {
    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !!!',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append(
          'file',
          this.fileToUploadexpress,
          AppComponent.idexpress + '.png'
        );

        this.expressserv
          .uploadexpressimage(formData)
          .subscribe((element: any) => {
            Swal.fire('Uploaded!', ' category is updated.', 'success').then(
              (e: any) => {
                window.location.reload();
              }
            );
          });
      }
    });
  }
  uploadsubphoto() {
    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it !!!',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append(
          'file',
          this.fileToUploadsub,
          AppComponent.idsub + '.png'
        );

        this.categoryser
          .uploadsubcategoryimage(formData)
          .subscribe((element: any) => {
            window.location.reload();
          });
        Swal.fire('Uploaded!', ' category is updated.', 'success');
      }
    });
  }
  // models informations
  editphotoforcateg() {
    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append(
          'file',
          this.fileToUploadcateg,
          AppComponent.idcategtoedit + '.png'
        );

        this.categoryser
          .uploadcategoryimage(formData)
          .subscribe((element: any) => {});
        Swal.fire('Uploaded!', ' category is updated.', 'success');
        window.location.reload();
      }
    });
  }
  onSubmit(): void {
    /*this.translateService.create(this.form).subscribe(
      (data) => {
        //////console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );*/
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  searchLang() {
    const lang = $('#langInput').val();

    $(
      '.ng-select .ng-select-container .ng-value-container .ng-input>input'
    ).val(lang);
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.lang.toLocaleLowerCase().indexOf(term) > -1;
  }
  ngOnInit() {
    this.loading = true;
    this.serviceLang = 'name_' + this.currentLanguage;

    this.userconnected = localStorage.getItem('main');
    if (this.userconnected == null) {
      this.showchat = false;
    } else {
      // this.setupSocketConnection();
      this.showchat = true;
    }

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      this.notweb = true;
    }

    if (window.pageYOffset >= 300 && this.notweb) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && this.notweb) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset >= 300 && !this.notweb) {
      this.showheader6 = false;
      this.showheader1 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && !this.notweb) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }

    if (window.pageYOffset < 300 && !this.notweb) {
      this.showheader6 = false;
      this.showheader1 = false;
      this.showheader7 = false;
    }

    // Content div min height set
    this.deviceInfo = this.deviceService.getDeviceInfo();

    if (isMobile) {
      this.notweb = true;
    }

    function resizeInnerDiv() {
      const height = $(window).height();
      const headerHeight = $('.header').height();
      const footerHeight = $('.footer').height();
      const setheight = height - headerHeight;
      const trueheight = setheight - footerHeight;
      $('.content').css('min-height', trueheight);
    }

    $(window).resize(() => {
      if ($('.content').length > 0) {
        resizeInnerDiv();
      }
    });
    if ($('.content').length > 0) {
      resizeInnerDiv();
    }
    this.onScroll();
  }

  ngAfterViewChecked() {
    const url1 = window.location.href;

    const show1 = this.url.includes('admin');

    this.changeDetector.detectChanges();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      this.notweb = true;
    }
    if (window.pageYOffset >= 300 && this.notweb && !show1) {
      this.showheader1 = true;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && this.notweb && !show1) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset >= 300 && !this.notweb && this.url && !show1) {
      this.showheader6 = true;
      this.showheader1 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && !this.notweb && !show1) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }

    if (window.pageYOffset < 300 && !this.notweb && !show1) {
      this.showheader6 = false;
      this.showheader1 = false;
      this.showheader7 = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const url2 = window.location.href;

    const show2 = this.url.includes('admin');

    // Content div min height set
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      this.notweb = true;
    }

    if (window.pageYOffset >= 300 && this.notweb && !show2) {
      this.showheader1 = true;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && this.notweb && !show2) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset >= 300 && !this.notweb && !show2) {
      this.showheader6 = true;
      this.showheader1 = false;
      this.showheader7 = false;
    }
    if (window.pageYOffset < 300 && !this.notweb && !show2) {
      this.showheader1 = false;
      this.showheader6 = false;
      this.showheader7 = false;
    }

    if (window.pageYOffset < 300 && !this.notweb && !show2) {
      this.showheader6 = false;
      this.showheader1 = false;
      this.showheader7 = false;
    }
  }
  scrollToTop() {
    window.scroll(0, 0);
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  public messageSeen(event: any) {}

  // selectFile(event) { //Angular 8
  selectFile(event: any) {
    // Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.msg = '';
      this.urlimg = reader.result;
    };
  }

  /* alerts actions */
  saveaddexpress() {
    Swal.fire({
      title: 'Do you want to add this express service?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!  ', 'you can always edit it or delete it', 'success');
      } else {
        Swal.fire('Express service not saved', '', 'info');
      }
    });
  }
  selectFilecategory(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUploadcateg = event.target.files[0];
    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.msg = '';
      this.urlimgcategory = reader.result;
    };
  }
  selectFilebannercategory(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUploadbannercateg = event.target.files[0];
    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.msg = '';
      this.urlbannercategory = reader.result;
    };
  }
  uploadbanner() {
    const formData = new FormData();
    formData.append(
      'file',
      this.fileToUploadbannercateg,
      AppComponent.idcategtoedit + '.png'
    );

    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const formdata = new FormData();
        formdata.append(
          'file',
          this.fileToUploadbannercateg,
          AppComponent.idcategtoedit + '.png'
        );

        this.categoryser
          .uploadcategban(formdata)
          .subscribe((element: any) => {});
        Swal.fire('Uploaded!', ' category is updated.', 'success').then((e) => {
          window.location.reload();
        });
      }
    });
  }
  selectFilesub(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUploadsub = event.target.files[0];
    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.msg = '';
      this.urlimagesub = reader.result;
    };
  }
  savenewcategory() {
    Swal.fire({
      title: 'Do you want to add this Category?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      var newString = this.categengname.replace(/[^A-Z0-9]+/gi, '-');
     
      const categ: any = {
        name_fr: this.categfrname,
        name_en: this.categengname,
        name_de: this.categdename,
        category_link: newString,
      };
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.fileToUploadcateg) {
          this.categoryser.addcategory(categ).subscribe((data: any) => {
            if (data.success) {
              const formData = new FormData();
              formData.append(
                'file',
                this.fileToUploadcateg,
                data.categorie.id + '.png'
              );

              this.categoryser
                .uploadcategoryimage(formData)
                .subscribe((element: any) => {});

              Swal.fire(
                'Saved!  ',
                'you can always edit it or delete it',
                'success'
              ).then(() => {
                // window.location.reload();
              });
            } else {
              Swal.fire(data.message, '', 'info');
            }
          });
        } else {
          Swal.fire('photo is required', '', 'warning');
        }
      } else {
        Swal.fire('Category service not saved', '', 'info');
      }
    });
  }
  selectFileexpress(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUploadexpress = event.target.files[0];
    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.msg = '';
      this.urlimgexpress = reader.result;
    };
  }
  savenewexpress() {
    Swal.fire({
      title: 'Do you want to add this Category?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      const categ: any = {
        name_fr: this.expressfrname,
        name_en: this.expressgengname,
        name_de: this.expressdename,
      };
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.fileToUploadexpress) {
          this.expressserv.addexpress(categ).subscribe((data: any) => {
            if (data.success) {
              const formData = new FormData();
              formData.append(
                'file',
                this.fileToUploadexpress,
                data.express.id + '.png'
              );

              this.expressserv
                .uploadexpressimage(formData)
                .subscribe((element: any) => {});

              Swal.fire(
                'Saved!  ',
                'you can always edit it or delete it',
                'success'
              ).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire(data.message, '', 'info');
            }
          });
        } else {
          Swal.fire('photo is required', '', 'warning');
        }
      } else {
        Swal.fire('Category service not saved', '', 'info');
      }
    });
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, { secure: true });

    this.socket.on('connection', (data: string) => {
      if (data) {
      }
    });
    this.socket.emit('savemytoken', {
      id: JSON.parse(this.userconnected).id,
    });
    /* redirect to session */
    this.socket.on('get-redirection_infos', (data: any) => {
      window.location.reload();
    });
    /* team join */
    this.socket.on('message-from-jobber', (data: any) => {});
    this.socket.on('accetpfromjobber', (data: any) => {});
    this.socket.on('refusefromjobber', (data: any) => {});
    /*auftrags */
    this.socket.on('new-job-offer', (data: any) => {});
    this.socket.on('job-offer-accepted', (data: any) => {});
    this.socket.on('job-offer-rejected', (data: any) => {});
    this.socket.on('job-offer-canceled', (data: any) => {});
    this.socket.on('job-offer-updated', (data: any) => {});
    this.socket.on('inovice-recieved', (data: any) => {});
    /* category request */
    this.socket.on('new-category-request', (data: any) => {});
    this.socket.on('accetpcategory', (data: any) => {
      console.log(data);
    });
    this.socket.on('refusecategory', (data: any) => {
      console.log(data);
    });
    /* subcategory request */
    this.socket.on('new-subcategory-request', (data: any) => {
      console.log(data);
    });
    this.socket.on('accetpsubcategory', (data: any) => {
      console.log(data);
    });
    this.socket.on('refusesubcategory', (data: any) => {
      console.log(data);
    });
    /* servies request */
    this.socket.on('new-service-request', (data: any) => {
      console.log(data);
    });
    this.socket.on('accetpservice', (data: any) => {
      console.log(data);
    });
    this.socket.on('refuseservice', (data: any) => {
      console.log(data);
    });
    /* blog request */
    this.socket.on('new-blog-request', (data: any) => {
      console.log(data);
    });
    this.socket.on('accetpblog', (data: any) => {
      console.log(data);
    });
    this.socket.on('refuseblog', (data: any) => {
      console.log(data);
    });
    /* job remindert */
    this.socket.on('new-job-reminder', (data: any) => {
      console.log(data);
    });
    /* job comment */
    this.socket.on('new-job-comment', (data: any) => {
      console.log(data);
    });
    /* job review */
    this.socket.on('new-job-review', (data: any) => {
      console.log(data);
    });
    /* licence expire */
    this.socket.on('licence-exprire-warning', (data: any) => {
      console.log(data);
    });

    /********************************************** */
    this.socket.on('notifyappointmentaccepted', (data: any) => {});
    this.socket.on('notifyappointmentrejected', (data: any) => {});
    this.socket.on('notifyappointmentcanceled', (data: any) => {});
  }

  changeLanguage(lang: any) {
    localStorage.setItem('language', lang);
    $('#loading').css('display', 'block');
    $('.ng-select').css('display', 'none');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  editText() {
    $('#AddNewWord').on('show.bs.modal', (e: any) => {
      // get data-id attribute of the clicked element
      const bookId = $(e.relatedTarget).data('book-id');
      console.log(bookId);

      // populate the textbox
      $(e.currentTarget).find('input[name="bookId"]').val(bookId);
    });
  }
}
