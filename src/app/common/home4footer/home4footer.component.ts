import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home4footer',
  templateUrl: './home4footer.component.html',
  styleUrls: ['./home4footer.component.css'],
})
export class Home4footerComponent implements OnInit {
  lang: any;
  languagesList: any[] = [
    {
      lang: 'Amharic',
      symbol: 'am',
    },
    {
      lang: 'Arabic',
      symbol: 'ar',
    },
    {
      lang: 'Basque',
      symbol: 'eu',
    },
    {
      lang: 'Bengali',
      symbol: 'bn',
    },
    {
      lang: 'English (UK)',
      symbol: 'en-GB',
    },
    {
      lang: 'Portuguese (Brazil)',
      symbol: 'pt-BR',
    },
    {
      lang: 'Bulgarian',
      symbol: 'bg',
    },
    {
      lang: 'Catalan',
      symbol: 'ca',
    },
    {
      lang: 'Cherokee',
      symbol: 'chr',
    },
    {
      lang: 'Croatian',
      symbol: 'hr',
    },
    {
      lang: 'Czech',
      symbol: 'cs',
    },
    {
      lang: 'Danish',
      symbol: 'da',
    },
    {
      lang: 'Dutch',
      symbol: 'nl',
    },
    {
      lang: 'English (US)',
      symbol: 'en',
    },
    {
      lang: 'Estonian',
      symbol: 'et',
    },
    {
      lang: 'Filipino',
      symbol: 'fil',
    },
    {
      lang: 'Finnish',
      symbol: 'fi',
    },
    {
      lang: 'French',
      symbol: 'fr',
    },
    {
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
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToLink() {
    this.router.serializeUrl(this.router.createUrlTree(['/privacypolicy']));
    //window.open('http://localhost:4200/legalinfos', '_blank');
  }
  changeLanguage(lang: any) {
    document.cookie = 'googtrans=/en/' + lang;
    // $('#changeLanguages').modal("hide");
    location.reload();
  }
  showmodal() {
    $('#changeLanguages').modal('show');
  }
}
