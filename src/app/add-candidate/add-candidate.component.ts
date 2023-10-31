import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { form } from '../formData/candidateForm';
import { resume } from '../formData/resume';
import { basicDetails } from '../formData/basicDetails';
import { professionalDetails } from '../formData/professionalDetails';
import { address } from '../formData/address';
import { education } from '../formData/education';
import { experience } from '../formData/experience';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  resume = resume;
  basicDetails = basicDetails;
  professionalDetails = professionalDetails;
  // any = form;
  address = address;
  education = education;
  experience = experience;

  resumeValue: any;
  basicDetailsValue: any;
  professionalDetailsValue: any;
  anyValue: any;
  addressValue: any;
  educationValue: any;
  experienceValue: any;
  detailsObject: any = {};
  eduObj: any = [];
  expObj: any = [];
  educationCount: number = 0;
  experienceCount: number = 0;
  eduDetails: any[] = [];
  edu: any = {};
  // newEducation = [
  //   {
  //     id: 0,
  //     institute: '',
  //     degree: '',
  //     start_date: '',
  //     end_date: '',
  //   },
  // ];
  // items = [{ id: 0, institute: '', degree: '', startTime: '', endTime: '' }];
  items: any = [];
  id = 1;
  exp: any = [];
  expId = 1;
  value = false;
  evalue = false;

  skillSet = [
    { label: 'React JS', value: 'React JS' },
    { label: 'Angular', value: 'Angular' },
    { label: 'NodeJS', value: 'NodeJS' },
  ];
  selectedSkill: any = [];
  candidateResume: any;
  resumeCand: any;
  skills: any;
  eduArr: any;
  expArr: any;
  skillBtn = false;

  modifiedBY:any;

  educationBtn: boolean = false;
  expereinceBtn: boolean = false;
  expBtn: boolean = false;

  formDetails = {
    resume: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    totalExperienceYr: '',
    totalExperienceMonth: '',
    releventExperienceYr: '',
    releventExperienceMonth: '',
    currentSalaryYr: '',
    currentSalaryMonth: '',
    expectedSalaryYr: '',
    expectedSalaryMonth: '',
    appliedRole: '',
    skills: '',
    expJoiningDate: '',
    noticePrd: '',
    otherOffers: '',
    offeredValueInLPA: '',
    servingNoticePrd: '',
    source: '',
    notes: '',
    currentAddress: '',
    permanentAddress: '',
    eduDetails: [
      {
        instituteName: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    ],
    expDetails: [
      {
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
      },
    ],
  };

  constructor(private profileService: ProfileService, private route: Router) {}

  editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  pdDetails : any = {
    isNegotiable: false,
    interviewBy : 'Ajith',
    // status:'Canditate'
  };

  ngOnInit(): void {}

  addEdu() {
    this.educationBtn = true;
    this.educationCount++;

    // eduDetails.push({});
    const sectionNumber = this.educationCount;
    if (this.educationCount > 1) {
      this.education.push(
        {
          fieldName: 'institute_name_' + sectionNumber,
          fieldDisplayName: 'Institute ' + sectionNumber,
          type: 'TEXT',
          dataType: 'string',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          options: [],
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'degree_' + sectionNumber,
          fieldDisplayName: 'Degree ' + sectionNumber,
          type: 'RADIO',
          dataType: 'string',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          options: [
            {
              display: 'Btech',
              value: 'Btech',
            },
            {
              display: 'BCA',
              value: 'BCA',
            },
            {
              display: 'Bsc',
              value: 'Bsc',
            },
          ],
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'start_date_' + sectionNumber,
          fieldDisplayName: 'Start Date ' + sectionNumber,
          type: 'NUMBER',
          dataType: 'date',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          options: [],
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'end_date_' + sectionNumber,
          fieldDisplayName: 'End Date ' + sectionNumber,
          type: 'NUMBER',
          dataType: 'date',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          options: [],
          arrayType: false,
          children: [],
        }
      );
    }

    this.education.forEach((detail) => {
      this.eduDetails.push({
        institute:
          detail.fieldName == `institute_name_${sectionNumber}`
            ? detail.value
            : '',
        degree:
          detail.fieldName == `degree_${sectionNumber}` ? detail.value : '',
        start_date:
          detail.fieldName == `start_date_${sectionNumber}` ? detail.value : '',
        end_date:
          detail.fieldName == `end_date_${sectionNumber}` ? detail.value : '',
      });
    });
    const combinedDetails = this.eduDetails.reduce((acc, cur) => {
      return {
        id: sectionNumber,
        institute: acc.institute || cur.institute || '',
        degree: acc.degree || cur.degree || '',
        start_date: acc.start_date || cur.start_date || '',
        end_date: acc.end_date || cur.end_date || '',
      };
    }, {});

    const detailValue = [];
    detailValue.push(combinedDetails);
    this.eduDetails = [];
    // eduDetails.splice(0, eduDetails.length, combinedDetails);
    this.detailsObject.eduDetails = detailValue;
  }

  addExp() {
    this.expBtn = true;
    this.experienceCount++;
    const expDetails: any[] = [];
    const sectionNumber = this.experienceCount;
    if (this.experienceCount > 1) {
      this.experience.push(
        {
          fieldName: 'company_name_' + sectionNumber,
          fieldDisplayName: 'Company Name ' + sectionNumber,
          type: 'TEXT',
          dataType: 'string',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          sampleImageURL: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'job_title_' + sectionNumber,
          fieldDisplayName: 'Job Title ' + sectionNumber,
          type: 'TEXT',
          dataType: 'STRING',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          sampleImageURL: '',
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'start_date_' + sectionNumber,
          fieldDisplayName: 'Start Date ' + sectionNumber,
          type: 'NUMBER',
          dataType: 'date',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          sampleImageURL: '',
          arrayType: false,
          children: [],
        },
        {
          fieldName: 'end_date_' + sectionNumber,
          fieldDisplayName: 'End Date ' + sectionNumber,
          type: 'NUMBER',
          dataType: 'date',
          value: '',
          modelType: '',
          id: '',
          camera: false,
          editable: false,
          mandatory: false,
          displayOrder: 0,
          galleryEnabled: false,
          gpsenabled: false,
          description: '',
          helpText: '',
          fileTypes: [],
          multiQuestions: [],
          sampleImageURL: '',
          arrayType: false,
          children: [],
        }
      );
    }

    this.experience.forEach((detail) => {
      expDetails.push({
        company: detail.fieldName == 'company_name' ? detail.value : '',
        job: detail.fieldName == 'job_title' ? detail.value : '',
        start_date: detail.fieldName == 'start_date' ? detail.value : '',
        end_date: detail.fieldName == 'end_date' ? detail.value : '',
      });
    });
    const expCombinedDetails = expDetails.reduce((acc, cur) => {
      return {
        company: acc.company || cur.company || '',
        job: acc.job || cur.job || '',
        start_date: acc.start_date || cur.start_date || '',
        end_date: acc.end_date || cur.end_date || '',
      };
    }, {});
    expDetails.splice(0, expDetails.length, expCombinedDetails);
    this.detailsObject.expDetails = expDetails;
  }


  submitData(form: NgForm, resume: any) {
    
    const detailsObject: any = {};
    this.detailsObject.status = 'Candidate';
    this.detailsObject = {...this.detailsObject ,...this.pdDetails};
    console.log('this.detailsObject  ',this.detailsObject);
    if (form.valid) {
      this.basicDetails.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      // this.professionalDetails.forEach((detail) => {
      //   this.detailsObject[detail.fieldName] = detail.value;
      // });
      // this.any.forEach((detail) => {
      //   this.detailsObject[detail.fieldName] = detail.value;
      // });
      this.address.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      this.resumeCand = this.candidateResume;
      this.skills = this.selectedSkill;
      this.eduArr = this.items;
      this.expArr = this.exp;

      // this.detailsObject['educationInfo'] = this.items;
      // this.detailsObject['experienceInfo'] = this.exp;
      // this.detailsObject['isNegotiable'] = this.value;
      // this.detailsObject['servedNoticePeriod'] = this.evalue;
console.log(this.detailsObject,this.resumeCand,this.eduArr,this.expArr);

      this.profileService
        .addCandidate(
          this.detailsObject,
          this.resumeCand,
          // this.skills,
          this.eduArr,
          this.expArr
        )
        .subscribe((res) => {
        });
      this.route.navigate(['candiadte'])
    } else {
    }
  }

  copyCurrentAddress(checked: any,permanentAddressField: any) {    
    const currentAddressField = this.address.find(
      (address) => address.fieldName === 'currentAddress'
    );
    if(checked.checked){
      if (currentAddressField) {      
        permanentAddressField.value = currentAddressField.value;
      }
    }else if(checked.checked == false){
      permanentAddressField.value = '';
    }
    
  }

  deleteEduObj() {}

  addEduu() {
    if (!this.educationBtn) {
      this.items.push({
        institute: '',
        degree: '',
        startTime: '',
        endTime: '',
      });
      this.id++;
    }
  }

  addExpp() {
    if (!this.expereinceBtn) {
      this.exp.push({
        company: '',
        jobTitle: '',
        startTime: '',
        endTime: '',
      });
      this.id++;
    }
  }

  deleteEdu(id: any) {
    this.items.splice(id, 1);
  }

  deleteExp(id: any) {
    this.exp.splice(id, 1);
  }

  onCheckboxChange(event: any) {
    this.value = event.target.checked;
  }

  onDropdownChange(event: any) {
    this.evalue = event.target.value === 'true';
  }

  onSkillSelect(event: any) {
    this.skillBtn = true;
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedSkill = this.skillSet[selectedIndex];
    this.selectedSkill.push(selectedSkill);
  }

  onFileSelected(event: any) {
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event) => {
    // const url = event.target?.result;
    // this.candidateResume = url;
    // };
    const file = event.target.files[0];
    this.candidateResume = file;
  }

  handleExpectedSalaryInput(form: any) {
  if (form.fieldName === 'expectedSalaryPerYear' && !isNaN(form.value)) {
    const monthlySalary = parseFloat(form.value) / 12;
    const expectedSalaryPerMonthField = this.professionalDetails.find(
      (field: any) => field.fieldName === 'expectedSalaryPerMonth'
    );
    if (expectedSalaryPerMonthField) {
      expectedSalaryPerMonthField.value = monthlySalary.toString();
    }
  }

  if(form.fieldName === 'currentSalaryPerYear' && !isNaN(form.value)) {
    const currentMonthSalary = parseFloat(form.value) / 12;
    const currentSalaryPerMonthField = this.professionalDetails.find(
      (field:any) => field.fieldName === 'currentSalaryPerMonth'
    );
    if(currentSalaryPerMonthField) {
      currentSalaryPerMonthField.value = currentMonthSalary.toString();
    }
  }
}

}
