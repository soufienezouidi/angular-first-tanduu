import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  isMobile :any
  constructor( private deviceService: DeviceDetectorService,) { }
  serviceLang : any;
  ngOnInit(): void {
    this.serviceLang = 'name_' + localStorage.getItem('language');
    this.isMobile = this.deviceService.isMobile();
  }
  about : any ={
    languages : {
      name_de : "Über",
      name_fr : "À propos de ",
      name_en : "About"
    }
  }
  best : any ={
    languages : {
      name_de : "Bester Service Auf Anfrage",
      name_fr : "Meilleur service Sur demande",
      name_en : "Best service On demand"
    }
  }
  qualif : any ={
    languages : {
      name_de : "Qualifizierte Anbieter",
      name_fr : "Fournisseurs qualifiés",
      name_en : "Qualified Providers"
    }
  }
  aff : any ={
    languages : {
      name_de : "Bezahlbare Preise",
      name_fr : "Prix ​​abordables",
      name_en : "Affordable prices"
    }
  }
  pro : any ={
    languages : {
      name_de : "Professioneller und überwachter Service",
      name_fr : "Service professionnel et supervisé",
      name_en : "Professional & supervised service"
    }
  }
  aboutus:any={
    languages :  {
      name_de : "WER WIR SIND ? Unsere Community hilft Ihnen, den richtigen Service zu finden, den Sie suchen, indem sie Sie mit Experten und Spezialisten in verschiedenen Bereichen verbindet. Wir bieten nicht nur mehrere Dienstleistungen an, sondern stellen Ihnen auch einen Raum zur Verfügung, in dem Sie Ihre Dienstleistungen anbieten und Ihre Visitenkarte einreichen können, damit Sie Ihr Geschäft weltweit ausbauen und Partnerschaften und professionelle Kontakte aufbauen können. Unser Team besteht aus motivierten und leidenschaftlichen Menschen, die Sie bei jedem Schritt unterstützen und dafür sorgen, dass Sie voll und ganz zufrieden sind. Unser Angebot für Kunden : Wir bieten Ihnen Dienstleistungen in fast allen Bereichen. Vom Umzug von Möbeln, der Reparatur von Rohren, der Dekoration von Innen- und Außenbereichen, dem Servieren von Essen bis hin zur Unterstützung älterer Menschen, dem Babysitten von Kindern und dem Ausführen von Haustieren … Sie, lieber Kunde, werden auf jeden Fall im Handumdrehen bekommen, wonach Sie suchen. Wir stellen sicher, dass Sie mit vertrauenswürdigen und qualifizierten Spezialisten in Kontakt treten, die Sie professionell beraten und unterstützen. Was wir Anbietern anbieten: Hier ermöglichen wir Ihnen, Ihren Service anzubieten und weithin zu bewerben, indem Sie Ihre Visitenkarte mit all Ihren persönlichen Daten auf sichere Weise einreichen. Wir helfen Ihnen, ein professionelles Konto zu erstellen, um mit Kunden in Kontakt zu treten und mit Partnern zu interagieren. Vielen Dank, dass Sie sich unserer Community angeschlossen haben.",
      name_en :"WHO WE ARE ? Our community helps you find the proper service you are looking for by connecting you with experts and specialists in several domains. We do not only offer multiple services, but also we provide you with a space where you can offer your service and submit your business card, so you can enlarge your business worldwide, and build partnerships and professional contacts. Our team is made up of motivated and passionate people who will assist you in every step and make sure that you are fully satisfied. What we offer for customers : We provide you with services in almost every field. From moving furniture, repairing tubes, decorating indoor and outdoor spaces, serving food to assisting aged people , babysitting children and walking pets… You dear customer, will definitely get what you are seeking for in a blink of an eye. We make sure to connect you with trusted and skilled specialists who will provide you with professional advice and help. What we offer for providers : Here, we enable you to offer your service and promote it widely by submitting your business card presenting all your personal information in a safe way. We help you create a professional account to connect with clients and interact with partners. Thank you for joining our community. ",
      name_fr : "QUI NOUS SOMMES ? Notre communauté vous aide à trouver le service que vous recherchez en vous mettant en contact avec des experts et des spécialistes dans plusieurs domaines. Nous n'offrons pas seulement de multiples services, mais nous mettons également à votre disposition un espace où vous pouvez proposer votre service et soumettre votre carte de visite, afin que vous puissiez étendre votre activité dans le monde entier et nouer des partenariats et des contacts professionnels. Notre équipe est composée de personnes motivées et passionnées qui sauront vous accompagner à chaque étape et veilleront à votre entière satisfaction. Ce que nous offrons aux clients : Nous vous fournissons des services dans presque tous les domaines. Qu'il s'agisse de déplacer des meubles, de réparer des tubes, de décorer des espaces intérieurs et extérieurs, de servir de la nourriture, d'aider des personnes âgées, de garder des enfants et de promener des animaux de compagnie…Cher client, vous obtiendrez certainement ce que vous recherchez en un clin d'œil. Nous nous assurons de vous mettre en contact avec des spécialistes de confiance et qualifiés qui vous fourniront des conseils et une aide professionnels. Ce que nous proposons aux prestataires : Ici, nous vous permettons de proposer votre service et de le promouvoir largement en soumettant votre carte de visite présentant toutes vos informations personnelles de manière sécurisée. Nous vous aidons à créer un compte professionnel pour entrer en contact avec des clients et interagir avec des partenaires. Merci d'avoir rejoint notre communauté."
    }
  }
}
