import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home-six/home-six.module').then((m) => m.HomeSixModule),
  },

  {
    path: 'blank',
    loadChildren: () =>
      import('./blank/blank.module').then((m) => m.BlankModule),
  },
  {
    path: 'partners_search',
    loadChildren: () =>
      import('./partners_search_list/partners-search.module').then(
        (m) => m.MapGridModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'map-list',
    loadChildren: () =>
      import('./map-list/map-list.module').then((m) => m.MapListModule),
  },

  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'blog-grid',
    loadChildren: () =>
      import('./blog-grid/blog-grid.module').then((m) => m.BlogGridModule),
  },
  {
    path: 'blank',
    loadChildren: () =>
      import('./blank/blank.module').then((m) => m.BlankModule),
  },
  {
    path: 'blog-details/:id',
    loadChildren: () =>
      import('./blog-details/blog-details.module').then(
        (m) => m.BlogDetailsModule
      ),
  },
  {
    path: 'login-page',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'Register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },

  {
    path: 'invoice-details',
    loadChildren: () =>
      import('./invoice-details/invoice-details.module').then(
        (m) => m.InvoiceDetailsModule
      ),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },

  {
    path: 'legalinfos',
    loadChildren: () =>
      import('./Legal/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'privacypolicy',
    loadChildren: () =>
      import('./privacy/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'jobbersterms',
    loadChildren: () =>
      import('./termsjobbers/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'customerterms',
    loadChildren: () =>
      import('./termscustomers/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'tanduu-admin',
    loadChildren: () =>
      import('./super-admin/super-admin.module').then(
        (m) => m.PharmacyAdminModule
      ),
  },

  {
    path: 'home-six',
    loadChildren: () =>
      import('./home-six/home-six.module').then((m) => m.HomeSixModule),
  },

  {
    path: 'category/:id',
    loadChildren: () =>
      import('./sub-categories/sub-categories.module').then(
        (m) => m.SubCategoriesModule
      ),
  },

  {
    path: 'askus',
    loadChildren: () =>
      import('./ask-us/ask-us.module').then((m) => m.AskUsModule),
  },
  {
    path: 'question-details',
    loadChildren: () =>
      import('./question-detail/question-detail.module').then(
        (m) => m.QuestionDetailModule
      ),
  },
  {
    path: 'commun-services',
    loadChildren: () =>
      import('./commun-services/commun-services.module').then(
        (m) => m.CommunServicesModule
      ),
  },
  {
    path: 'commercial',
    loadChildren: () =>
      import('./commercial/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'commun-services-list',
    loadChildren: () =>
      import('./commun-services-list/commun-services-list.module').then(
        (m) => m.CommunServicesListModule
      ),
  },

  {
    path: 'tanduu_pro',
    loadChildren: () =>
      import('./tanduu-pro/tanduu-pro.module').then((m) => m.TanduuProModule),
  },
  {
    path: 'choose_register',
    loadChildren: () =>
      import('./choose-register/choose-register.module').then(
        (m) => m.ChooseRegisterModule
      ),
  },
  {
    path: 'askforservice',
    loadChildren: () =>
      import('./askforservice/choose-register.module').then(
        (m) => m.ChooseRegisterModule
      ),
  },
  {
    path: 'register_partner',
    loadChildren: () =>
      import('./register-partner/register-partner.module').then(
        (m) => m.RegisterPartnerModule
      ),
  },
  {
    path: 'pre-register_partner',
    loadChildren: () =>
      import('./pre-register-partner/pre-register-partner.module').then(
        (m) => m.PreRegisterPartnerModule
      ),
  },
  {
    path: 'agency-profile',
    loadChildren: () =>
      import('./agency-profile/agency-profile.module').then(
        (m) => m.AgencyProfileModule
      ),
  },
  {
    path: 'account_verification',
    loadChildren: () =>
      import('./account-verification/account-verification.module').then(
        (m) => m.AccountVerificationModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-passowrd/reset-passowrd.module').then(
        (m) => m.ResetPassowrdModule
      ),
  },
  {
    path: 'login-tanduu',
    loadChildren: () =>
      import('./login-tanduu/login-tanduu.module').then(
        (m) => m.LoginTanduuModule
      ),
  },
  {
    path: 'sub-categories',
    loadChildren: () =>
      import('./super-admin/sub-categories/sub-categories.module').then(
        (m) => m.SubCategoriesModule
      ),
  },
  {
    path: 'servicess',
    loadChildren: () =>
      import('./super-admin/servicess/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'translate',
    loadChildren: () =>
      import('./super-admin/translate/translate.module').then(
        (m) => m.TranslateModule
      ),
  },
  {
    path: 'crm',
    loadChildren: () =>
      import('./super-admin/translate/crm/crm.module').then((m) => m.CrmModule),
  },
  {
    path: 'section',
    loadChildren: () =>
      import('./super-admin/translate/section/section.module').then(
        (m) => m.SectionModule
      ),
  },
  {
    path: 'plateform',
    loadChildren: () =>
      import('./super-admin/translate/plateform/plateform.module').then(
        (m) => m.PlateformModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'product-details',
    loadChildren: () =>
      import('./product-details/product-details.module').then(
        (m) => m.ProductDetailsModule
      ),
  },
  {
    path: 'About-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'allcitypartners',
    loadChildren: () =>
      import('./allcitypartners/allcitypartners.module').then(
        (m) => m.AllcitypartnersModule
      ),
  },

  {
    path: 'search_results',
    loadChildren: () =>
      import('./search-results/search-results.module').then(
        (m) => m.SearchResultsModule
      ),
  },
  {
    path: ':name',
    loadChildren: () =>
      import('./doctor-profile/doctor-profile.module').then(
        (m) => m.DoctorProfileModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./admin/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./admin/gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'testss',
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
  },
  { path: 'termsandconditions/:name', loadChildren: () => import('./termsandconditions/termsandconditions.module').then(m => m.TermsandconditionsModule) },
  { path: 'privacypolicy/:name', loadChildren: () => import('./privacypolice/privacypolice.module').then(m => m.PrivacypoliceModule) },
  { path: 'galleries', loadChildren: () => import('./admin/galleries/galleries.module').then(m => m.GalleriesModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
