import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { NgForm, FormGroup } from '@angular/forms';
import { InformationsService } from '../../services/orders/informations/informations.service';
import { CompaniesService } from '../../services/companies_services/companies.service';
import { SourcesService } from '../../services/orders/sources/sources.service';
import { TeamService } from '../../services/team-services/team.service';
import { ServicesService } from '../../services/categories/services.service';
import { OrderSentService } from '../../services/orders/order-sent/orders-sent.service';
import { stringify } from 'querystring';
import { createComponentDefinitionMap } from '@angular/compiler/src/render3/partial/component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  panelOpenState = false;
  items = ['Informations', 'Sources', 'Different billing address'];
  expandedIndex = 0;
  typesOfShoes: string[] = ['CPL', 'Adwords', 'Webanfrage'];
  company_id: any;
  static partners = [];
  errorMessage: any;
  members: any;
  tab_info: any;
  tab_sources: any;
  companyConnected: any;
  addressInputs: any = false;
  addressTextValue: any = false;
  addressField: any = true;
  services: any;
  list_words: any = [];
  result_search: any;
  showSeletedSource: any = false;
  arraySelectedServices: any;
  successSelected: any = true;
  array: any = [];
  showSuggestion: any = false;
  customersInfo: any;
  customersInfoSubmitted: any = false;
  validEmail: any = true;
  required: any;
  isValid: any = true;
  isRequired: any = false;
  form: any = {};
  partnersList = localStorage.setItem('partnersList', JSON.stringify([]));
  servicesList = localStorage.setItem('servicesList', JSON.stringify([]));
  informationsList = localStorage.setItem(
    'informationList',
    JSON.stringify([])
  );

  //declare token from localStorage
  token = JSON.parse(localStorage.getItem('rest'));
  //infoArray = JSON.parse(localStorage.getItem('informations'));
  //srcInfo = JSON.parse(localStorage.getItem('sources'));

  constructor(
    private informationsService: InformationsService,
    private companyService: CompaniesService,
    private sourcesServices: SourcesService,
    private teamService: TeamService,
    private servicesServices: ServicesService,
    private orderSentService: OrderSentService
  ) {}
  ngOnInit(): void {
    // store company object in localStorage
    this.getCompanyByUser(this.token.rest_id);
    // get all services
    this.getAllServices();
    $(document).ready(() => {
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name',
      };
      var autocomplete = new google.maps.places.Autocomplete(
        $('#address_order')[0] as HTMLInputElement,
        {}
      );

      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();

        for (var i = 0; i < place.address_components.length; i++) {
          const addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            const val = place.address_components[i][componentForm[addressType]];

            if (addressType == 'route') {
              $('#street_order').val(val);
              var street = $('#street_order').val();
            }
            if (addressType == 'street_number') {
              $('#street_nb_order').val(val);
              var street_nb = $('#street_nb_order').val();
            }
            if (addressType == 'locality') {
              $('#city').val(val);
              var ort = $('#city').val();
            }
            if (addressType == 'administrative_area_level_1') {
              $('#state').val(val);
              var state = $('#state').val();
            }
            if (addressType == 'country') {
              $('#country').val(val);
              var city = $('#country').val();
            }
            if (addressType == 'postal_code') {
              var code: any;
              if (val == null) {
                code = 0;
              } else {
                $('#zip_code').val(val);
                code = $('#zip_code').val();
              }
            }
          }
        }
        //this.addressInputs = true;
        var addressee1: any = city + '' + code;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            address: addressee1,
          },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude_search = results[0].geometry.location.lat();
              var longitude_search = results[0].geometry.location.lng();
              $('#latitude_order').val(latitude_search);
              $('#longitude_order').val(longitude_search);
            }
          }
        );
      });
    });

    $(document).ready(() => {
      $('.form-required').on('keyup', function () {
        var string: any = $(this).val();
        if (!string || !/\S/.test(string)) {
          $(this).addClass('is-invalid');
        } else {
          $(this).removeClass('is-invalid');
        }
      });
      $('.form-required').on('blur', function () {
        $(this).removeClass('is-invalid');
      });
    });
    $('.invoice_personal_open').on('click', function () {
      $('#edit-personal-details').css('display', 'inline');
      $('#close-open-personam-data').html('');
      $('#close-open-personam-data').append(
        '<i class="fa fa-times invoice_personal_close" style="cursor: pointer;font-weight: bold"></i>'
      );
    });
    $('.invoice_personal_close').on('click', function () {
      $('#edit-personal-details').css('display', 'none');
      $('#close-open-personam-data').html('');
      $('#close-open-personam-data').append(
        '<i class="far fa-edit invoice_personal_open" style="cursor: pointer;font-weight: bold"></i>'
      );
    });
    $('.confirmDeleteRow').on('click', function () {
      var id = localStorage.getItem('deleted_item');
    });
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('allPartners');
    localStorage.removeItem('entryPartner');
    localStorage.removeItem('entryInformation');
    localStorage.removeItem('allInformations');
  }

  openOtherInputAddress() {
    $('#address_order').css('display', 'inline');
    $('#txt_full_address').css('display', 'none');
    $('#search_section_edit').css('display', 'inline');
    $('.edit-address').css('display', 'none');
  }
  addPartners(event: any) {
    var existingEntries = JSON.parse(localStorage.getItem('allPartners'));
    if (existingEntries == null) existingEntries = [];
    if ($(event).is(':checked')) {
      localStorage.setItem('entryPartner', JSON.stringify(event.value));
      existingEntries.push(parseInt(event.value));
    } else {
      var elementIndex = existingEntries.indexOf(event.value);
      existingEntries.splice(elementIndex, 1);
    }
    localStorage.setItem('allPartners', JSON.stringify(existingEntries));
  }

  addInformations(event: any) {
    var existingEntries = JSON.parse(localStorage.getItem('allInformations'));
    if (existingEntries == null) existingEntries = [];
    if ($(event).is(':checked')) {
      localStorage.setItem('entryInformation', JSON.stringify(event.value));
      existingEntries.push(parseInt(event.value));
    } else {
      var elementIndex = existingEntries.indexOf(parseInt(event.value));
      existingEntries.splice(elementIndex, 1);
    }
    localStorage.setItem('allInformations', JSON.stringify(existingEntries));
  }

  onSubmit(f: any) {
    var address = $('#address_order').val();
    var street = $('#street_order').val();
    var street_nb = $('#street_nb_order').val();
    var bloc = $('#additive_order').val();
    var app = $('#appartm_order').val();
    var zip = $('#zip_code').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var country = $('#country').val();
    var longitude_order = $('#longitude_order').val();
    var latitude_order = $('#latitude_order').val();
    var description = $('#description').val();
    var l_name_customer = $('#l_name_customer').val();
    var f_name_customer = $('#f_name_customer').val();
    var company_order = $('#company_order').val();
    var phone_order = $('#phone_order').val();
    var source = $('#source_name').val();
    var mobile_customer = $('#mobile_customer').val();
    var email = $('#email').val();
    var appointment = $('#date_visit').val();
    //invoice informations
    const enable_invoice = document.getElementById('client_address');
    var l_name_invoice = $('#l_name_invoice').val();
    var f_name_invoice = $('#f_name_invoice').val();
    var company_invoice = $('#company_invoice').val();
    var address_order_invoice = $('#address_order_invoice').val();
    var street_order_invoice = $('#street_order_invoice').val();
    var street_nb_order_invoice = $('#street_nb_order_invoice').val();
    var additive_order_invoice = $('#additive_order_invoice').val();
    var appartm_order_invoice = $('#appartm_order_invoice').val();
    var zip_invoice = $('#zip_code_invoice').val();
    var city_invoice = $('#city_invoice').val();
    var state_invoice = $('#state_invoice').val();
    var country_invoice = $('#country_invoice').val();
    var landline = $('#landline_invoice').val();
    var mobile_customer_invoice = $('#mobile_customer_invoice').val();
    var email_invoice = $('#email_customer_invoice').val();
    var fax_invoice = $('#fax_customer').val();
    var services_list = JSON.parse(localStorage.getItem('allServices'));
    var partners_list = JSON.parse(localStorage.getItem('allPartners'));
    var infos_list = JSON.parse(localStorage.getItem('allInformations'));
    var arrPartnesrs = [];
    var arrServices = [];
    var arrInfos = [];
    var show_number = 0;
    if (partners_list) {
      partners_list.forEach((element) => {
        arrPartnesrs.push({
          state: 1,
          receiver: element,
          sender: this.token.rest_id,
        });
      });
    }
    if (services_list) {
      services_list.forEach((element) => {
        arrServices.push(element);
      });
    }

    if (infos_list) {
      infos_list.forEach((element) => {
        arrInfos.push(element);
      });
    }
    if ($('#share_phone').is(':checked')) {
      show_number = 1;
    }

    let invoiceObject = {};
    let outerObject = {
      first_name: f_name_customer,
      last_name: l_name_customer,
      email: email,
      phone: phone_order,
      mobile: mobile_customer,
      location: {
        bloc: bloc,
        street: street,
        street_nb: street_nb,
        appartment: app,
        zip_code: zip,
        state: state,
        city: city,
        country: country,
        longitude: longitude_order,
        latitude: latitude_order,
      },
    };
    if ($('#client_address').is(':checked')) {
      invoiceObject = {
        first_name: l_name_invoice,
        last_name: f_name_invoice,
        company: company_invoice,
        location: {
          street: street_order_invoice,
          street_nb: street_nb_order_invoice,
          bloc: additive_order_invoice,
          appartment: appartm_order_invoice,
          zip_code: zip_invoice,
          state: state_invoice,
          city: city_invoice,
          country: country_invoice,
        },
        phone: landline,
        mobile: mobile_customer_invoice,
        email: email_invoice,
        fax: fax_invoice,
      };
    }

    let orderObject = {
      location: {
        bloc: bloc,
        street: street,
        street_nb: street_nb,
        appartment: app,
        zip_code: zip,
        state: state,
        city: city,
        country: country,
        longitude: longitude_order,
        latitude: latitude_order,
      },
      Object: invoiceObject,
      jobbers_list: arrPartnesrs,
      original_price: 0,
      deduction_amount: 0,
      is_payed: 0,
      appointment_date: appointment,
      status: 'New',
      invoice_sent: 0,
      is_deleted: 0,
      note: [],
      show_phone: show_number,
      show_mobile: show_number,
      source: source,
      companyId: this.token.rest_id,
      description: description,
    };

    let globalObject = {
      outerObject: outerObject,
      orderObject: orderObject,
      invoiceObject: invoiceObject,
      arrServices: arrServices,
      arrPartnesrs: arrPartnesrs,
      arrInfos: arrInfos,
    };
    this.orderSentService.createOrder(globalObject).subscribe((data) => {});
  }

  /*  get company by user id */
  getCompanyByUser(id: any) {
    var obj = {
      user_id: id,
    };
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.singleCompany = company;
      this.companyConnected = this.singleCompany.id;

      // get list of team's member
      this.getAllMembers(company.id);

      // get all informations of company
      this.getAllUrgentInformations(company.id);

      // get all sources
      this.getAllSources(company.id);
    });
  }

  /*  get company by user id */
  getAllMembers(id: any) {
    var obj = {
      company_id: 1,
    };
    this.teamService.getAllMemebers(obj).subscribe((members) => {
      this.members = JSON.parse(members.members);
      return this.members;
    });
  }

  /* ======================================================================= */
  /* URGENT INFORMATIONS SECTION */
  /* ========================================================================*/
  information: any;
  informations: any;
  singleCompany: any;
  isOpened = false;
  isSuccess = false;
  newField = false;
  modalConfig: any;
  btnInfoDisabled = true;
  informationsFound = false;
  //for editing information
  btnInfoUpdatedDisabled = false;
  newEditField = false;
  successInfoUpdate = true;

  /* get all informations of partners */
  getAllUrgentInformations(company_id: any) {
    var obj: any = {
      company_id: company_id,
    };
    //get ll urgent informations
    this.informationsService.getAllUrgentInformations(obj).subscribe(
      (data) => {
        if (!data.informations) {
          this.informationsFound = false;
        } else if (!data) {
          this.informationsFound = false;
        } else {
          this.informationsFound = true;
          this.informations = JSON.parse(data.informations);

          this.tab_info = data;
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  /* ------------------------------ */
  /* check update edit section of information */

  checkUpdatedInformation(id: any) {
    var input = $('#updated_information' + id).val();
    if (!input) {
      this.successInfoUpdate = false;
      this.btnInfoUpdatedDisabled = true;
      this.errorMessage = 'Information field is required!! ';
      $('#updated_information' + id).addClass('is-invalid');
    } else {
      //this.isOpened = false;
      this.btnInfoUpdatedDisabled = false;
      this.successInfoUpdate = true;
      $('#updated_information' + id).removeClass('is-invalid');
    }
  }
  saveAddressInfo() {
    alert(222);
  }

  changeStatusCheckbox() {
    if ($('#street_nb_checkbox').is(':checked')) {
      $('#street_nb_order').attr('readonly', 'true');
    } else {
      $('#street_nb_order').removeAttr('readonly');
    }
  }

  openInvoiceSectionData() {
    if ($('#client_address').is(':checked')) {
      $('#next_info_customer').css('display', 'block');
    } else {
      $('#next_info_customer').css('display', 'none');
    }
  }

  showEditInformationSection() {
    $('#edit_information_section').css('display', 'inline');
    $('.btn-edit-name').css('display', 'none');
  }

  /* add field for new information*/
  openAlertAddInformation() {
    var html =
      "<input type='text' class='form-control' id='new-information-input' keyup='checkInformation()' placeholder='new information'>" +
      "<p id='errorInfo' style='color:#d33; display: none; font-size: 15px; float: left !important'>Information field is required <i class='fa fa-warning'></i></p>" +
      "<p id='errorInfoExist' style='color:#d33; display: none; font-size: 15px; float: left !important'>Information was already exist <i class='fa fa-warning'></i></p>";

    Swal.fire({
      title: 'Type new information',
      html: html,
      showCancelButton: true,
      confirmButtonColor: '#312783',
      cancelButtonColor: '#d33',
      confirmButtonText: 'save information',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        var input = $('#new-information-input').val();
        if (!input) {
          $('#errorInfo').css('display', 'inline');
          $('#errorInfo').delay(2000).fadeOut();
          return false;
        }
        const arr = JSON.parse(this.tab_info.informations);
        const { length } = arr;
        const found = arr.some((el) => el.name === input);
        if (found) {
          $('#errorInfoExist').css('display', 'inline');
          $('#errorInfoExist').delay(2000).fadeOut();
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.createInformation();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Information was addes successfully',
        });
      }
    });
  }

  /* close information input */
  closeInput() {
    this.isOpened = false;
    this.newField = false;
    this.btnInfoDisabled = true;
    $('#new-information').val('');
  }

  /* add information action */
  createInformation() {
    var input = $('#new-information-input').val();
    const arr = JSON.parse(this.tab_info.informations);
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.name === input);

    arr.push({ id: id, name: input, is_deleted: 0 });
    // return arr;

    let obj: any = {
      company_id: 1,
      informations: arr,
    };
    this.informationsService.UpdateInformation(obj).subscribe((res) => {
      this.getAllUrgentInformations(1);
    });
  }

  /* ------------------------------ */
  /* Show edit section of information */

  showEditSection(id: any) {
    $('#information_value' + id).css('display', 'none');
    $('#edit_information_value' + id).css('display', 'inline');
  }

  /* ------------------------------ */
  /* Show edit section of information */

  closeEditSection(id: any) {
    $('#information_value' + id).css('display', 'inline');
    $('#edit_information_value' + id).css('display', 'none');
    this.getAllUrgentInformations(1);
  }

  /* ------------------------------ */
  /* Save edit section of information */

  saveEditSection(id: any) {
    var input = $('#updated_information' + id).val();
    const arr = JSON.parse(this.tab_info.informations);
    const { length } = arr;
    const idInf = length + 1;
    const found = arr.some((el) => el.id === id);
    //Find index of specific object using findIndex method.
    var objIndex = arr.findIndex((obj) => obj.id == id);
    //Update object's name property.
    arr[objIndex].name = input;
    let obj: any = {
      company_id: 1,
      informations: arr,
    };
    this.informationsService.UpdateInformation(obj).subscribe((res) => {
      this.getAllUrgentInformations(1);
    });
  }

  /* ------------------------------ */
  /* Show delete section of information */

  showDeleteSection(id: any) {
    var name = $('#updated_information' + id).val();
    // $("#title-modal").text("Delete Information");
    var text =
      'Are you sure to delete this information?' +
      '<p><b>Description: </b>' +
      name +
      '</p>';
    Swal.fire({
      title: 'Are you sure?',
      html: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeletionInformation(id);
        Swal.fire(
          'Deleted!',
          'Information was deleted successfully',
          'success'
        );
      }
    });
  }

  /* ------------------------------ */
  /* Show delete section of information */

  confirmDeletionInformation(id: any) {
    const arr = JSON.parse(this.tab_info.informations);
    const { length } = arr;
    const idInf = length + 1;
    const found = arr.some((el) => el.id === id);
    //Find index of specific object using findIndex method.
    var objIndex = arr.findIndex((obj) => obj.id == id);
    //Update object's name property.
    arr[objIndex].is_deleted = 1;
    let obj: any = {
      company_id: 1,
      informations: arr,
    };
    this.informationsService.UpdateInformation(obj).subscribe((res) => {
      this.getAllUrgentInformations(1);
    });
  }

  /* ======================================================================= */
  /* END URGENT INFORMATIONS SECTION */
  /* =======================================================================*/

  /* ======================================================================= */
  /* SOURCES SECTION */
  /* =======================================================================*/

  newSourceOpened = false;
  sourceEmpty = false;
  btnAddSource = false;
  sourcesFound: any = false;
  successSrcoUpdate = true;
  btnSrcUpdatedDisabled = false;
  sources: any;
  checkSourceInput() {}

  /* get all sources of partners */
  getAllSources(company_id: any) {
    var obj: any = {
      company_id: company_id,
    };
    //get ll urgent informations
    this.sourcesServices.getAllSources(obj).subscribe(
      (data) => {
        if (!data.source_list) {
          this.sourcesFound = false;
        } else if (!data) {
          this.sourcesFound = false;
        } else {
          this.sourcesFound = true;
          this.sources = JSON.parse(data.source_list);
          this.tab_sources = data;
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  /**  Show Source input */
  ShowInputSource() {
    var html =
      "<input type='text' class='form-control' id='new-source-input' placeholder='new source'>" +
      "<p id='errorSrc' style='color:#d33; display: none; font-size: 15px; float: left !important'>Source field is required <i class='fa fa-warning'></i></p>" +
      "<p id='errorSrcExist' style='color:#d33; display: none; font-size: 15px; float: left !important'>Source was already exist <i class='fa fa-warning'></i></p>";
    Swal.fire({
      title: 'Type new Source',
      html: html,
      showCancelButton: true,
      confirmButtonColor: '#312783',
      cancelButtonColor: '#d33',
      confirmButtonText: 'save information',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        var input = $('#new-source-input').val();
        if (!input) {
          $('#errorSrc').css('display', 'inline');
          $('#errorSrc').delay(2000).fadeOut();
          return false;
        }

        const arr = this.tab_sources.source_list;
        const { length } = arr;
        const found = arr.some((el) => el.name === input);
        if (found) {
          $('#errorSrcExist').css('display', 'inline');
          $('#errorSrcExist').delay(2000).fadeOut();
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.createSource();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Source was addes successfully',
        });
      }
    });
  }

  /**  Check Source input */
  closeInputSource() {
    this.newSourceOpened = false;
    this.sourceEmpty = false;
    $('#newSource').val('');
  }

  /**  Check Source input */

  checkSource() {
    var valSource = $('#12345').val();
    if (!valSource) {
      this.btnAddSource = false;
      this.errorMessage = 'Source field is required';
      this.sourceEmpty = true;
    } else {
      this.btnAddSource = true;
    }
  }

  /* Add new source */
  createSource() {
    var input = $('#new-source-input').val();
    const arr = this.tab_sources.source_list;
    const { length } = arr;
    const id = length + 1;
    arr.push({ id: id, name: input, is_deleted: 0 });
    let obj: any = {
      company_id: 1,
      sources: arr,
    };
    this.sourcesServices.createOrUpdateSource(obj).subscribe((res) => {
      this.getAllSources(1);
    });
  }

  /*  */
  closeEditSourceSection(id: any) {
    $('#section_src_value' + id).css('display', 'inline');
    $('#edit_src_value' + id).css('display', 'none');
    this.sourceEmpty = false;
    this.getAllSources(1);
  }

  /* */
  openInputUpdateSource(id: any) {
    $('#section_src_value' + id).css('display', 'none');
    $('#edit_src_value' + id).css('display', 'inline');
  }

  /* */

  checkUpdatedSource(id: any) {
    var input = $('#updated_src' + id).val();
    if (!input) {
      this.successSrcoUpdate = false;
      this.btnSrcUpdatedDisabled = true;
      this.errorMessage = 'Source field is required';
      $('#updated_src' + id).addClass('is-invalid');
    } else {
      //this.isOpened = false;
      this.btnSrcUpdatedDisabled = false;
      this.successSrcoUpdate = true;
      $('#updated_src' + id).removeClass('is-invalid');
    }
  }

  /* save edit source */
  saveEditSourceSection(id: any) {
    var input = $('#updated_src' + id).val();
    const arr = this.tab_sources.source_list;
    const { length } = arr;
    const idInf = length + 1;
    const found = arr.some((el) => el.id === id);
    //Find index of specific object using findIndex method.
    var objIndex = arr.findIndex((obj) => obj.id == id);
    //Update object's name property.
    arr[objIndex].name = input;
    let obj: any = {
      company_id: 1,
      sources: arr,
    };
    this.sourcesServices.createOrUpdateSource(obj).subscribe((res) => {
      this.getAllSources(1);
    });
  }

  /* ------------------------------ */
  /* Show delete section of information */

  showDeleteSourceSection(id: any) {
    var name = $('#updated_src' + id).val();
    var text =
      'Are you sure to delete this Source?' +
      '<p><b>Description: </b>' +
      name +
      '</p>';
    Swal.fire({
      title: 'Are you sure?',
      html: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeletionSource(id);
        Swal.fire('Deleted!', 'Source was deleted successfully', 'success');
      }
    });
  }

  /* ------------------------------ */
  /* Show delete section of information */

  confirmDeletionSource(id: any) {
    const arr = this.tab_sources.source_list;
    const { length } = arr;
    const idInf = length + 1;
    const found = arr.some((el) => el.id === id);
    //Find index of specific object using findIndex method.
    var objIndex = arr.findIndex((obj) => obj.id == id);
    //Update object's name property.
    arr[objIndex].is_deleted = 1;
    let obj: any = {
      company_id: 1,
      sources: arr,
    };
    this.sourcesServices.createOrUpdateSource(obj).subscribe((res) => {
      this.getAllSources(1);
    });
  }

  /* ======================================================================= */
  /* END SOURCES SECTION */
  /* ========================================================================*/

  /* ======================================================================= */
  /* SERVICES AND SEARCH ENGINE SECTION */
  /* ========================================================================*/

  /* get all services */
  getAllServices() {
    this.servicesServices.getAllServices().subscribe((services) => {
      this.services = services;
      this.services.forEach((element) => {
        element.languages = JSON.parse(element.languages);
        this.list_words.push({
          id: element.id,
          name: element.languages.name_en,
        });
      });
    });
  }

  /* hide suggestion while onblur event */
  hideSuggestion() {
    this.showSuggestion = false;
    //console.log(this.showSuggestion);
  }
  nextArray: any[] = [];
  newArr: any[] = [];
  splitArray: any[] = [];

  /* search for services  */
  searchEngineFunction() {
    this.showSuggestion = true;

    var key_word: any = $('#key_words').val();
    var suggestions: any = this.list_words;
    var prop: any[] = [];
    if (key_word) {
      var sp = key_word.split(' ');
      for (var i = 0; i < sp.length; i++) {
        if (!this.isEmptyOrSpaces(sp[i])) {
          this.newArr = this.filterItems(this.list_words, sp[i]);
        }
      }
      /* this.filterItems(this.list_words, sp[i]).forEach(element => {
         this.newArr.push({ id: element.id, name: element.name })
       });*/
      /*var sp = key_word.split(' ');
      let arr = [];
      if (sp.length == 1) {
        for (var j = 0; j < this.list_words.length; j++) {
          for (var i = 0; i < sp.length; i++) {

            if (this.list_words[j].name.includes(sp[i]) && sp[i] !== " ") {
              prop.push({ id: this.list_words[j].id, name: this.list_words[j].name });
              this.nextArray.push({ id: this.list_words[j].id, name: this.list_words[j].name });
            }
          }
        }

      }
      if (sp.length > 1) {
        console.log(this.nextArray);

        for (var j = 0; j < this.nextArray.length; j++) {
          for (var i = sp.length - 1; i < sp.length; i++) {

            if (this.nextArray[j].name.toLowerCase().includes(sp[i]) && sp[i] != "") {
              this.newArr.push({ id: this.nextArray[j].id, name: this.nextArray[j].name });

            }
            else {
              this.newArr.slice(j, 1)
            }
          }

        }
        console.log(this.newArr);
        console.log(this.newArr.length);

      }




      this.result_search = this.newArr;

*/
      this.result_search = this.newArr;
    } else {
      this.result_search = [];
    }
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  filterItems(arr: any, query: any) {
    return arr.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  /* select service */
  selectService(id: any, name: String) {
    var { length } = this.array;
    if (!length) {
      this.array.push({ id: id, name: name });
      this.successSelected = true;
      this.showSeletedSource = true;
    } else {
      const found = this.array.some((el) => el.id === id);
      if (!found) {
        this.array.push({ id: id, name: name });
        this.successSelected = true;
        this.showSeletedSource = true;
      } else {
        this.successSelected = false;
        $('.error-selected').delay(2000).fadeOut();
      }
    }
    var existingEntries = JSON.parse(localStorage.getItem('allServices'));
    if (existingEntries == null) existingEntries = [];
    localStorage.setItem('entryService', JSON.stringify(id));
    var index = existingEntries.some((elem) => elem === id);
    if (!index) existingEntries.push(id);

    localStorage.setItem('allServices', JSON.stringify(existingEntries));
    this.arraySelectedServices = this.array;
  }

  /* remove service */

  removeSelectedService(id: number) {
    const length = this.arraySelectedServices;
    var index = this.arraySelectedServices.findIndex(function (o) {
      return o.id === id;
    });
    if (index !== -1) this.arraySelectedServices.splice(index, 1);
    if (length < 1) {
      this.showSeletedSource = false;
    }
    var existingEntries = JSON.parse(localStorage.getItem('allServices'));
    if (existingEntries == null) existingEntries = [];
    localStorage.setItem('entryService', JSON.stringify(id));
    var index = existingEntries.indexOf(id);
    existingEntries.splice(index, 1);

    localStorage.setItem('allServices', JSON.stringify(existingEntries));
  }

  /* save customer informations */
  saveCustomerInformation(f: NgForm) {
    var lname = f.value.lname;
    var email = f.value.lname;
    var phone = f.value.phone;
    this.customersInfoSubmitted = true;
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(lname)
    var emailTest = re.test(String(email).toLowerCase());
    /* if (lname) {
       this.isValid = false;
     }
     else if (lname) {
       this.isValid = true;
     }*/
  }

  /*  get Partner list */
  PartnerList() {}
}
