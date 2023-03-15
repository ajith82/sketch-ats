import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { form } from '../formData/candidateForm';
import { resume } from '../formData/resume';
import { basicDetails } from '../formData/basicDetails';
import { professionalDetails } from '../formData/professionalDetails';
import { address } from '../formData/address';
import { education } from '../formData/education';
import { experience } from '../formData/experience';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  resume = resume;
  basicDetails = basicDetails;
  professionalDetails = professionalDetails;
  any = form;
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
    console.log(this.detailsObject, 'this.educationCount', detailValue);
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
    console.log(sectionNumber);

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
    if (form.valid) {
      this.basicDetails.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      this.professionalDetails.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      this.any.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      this.address.forEach((detail) => {
        this.detailsObject[detail.fieldName] = detail.value;
      });
      this.resumeCand = this.candidateResume;
      this.skills = this.selectedSkill;
      this.eduArr = this.items;
      this.expArr = this.exp;

      // this.detailsObject['educationInfo'] = this.items;
      // this.detailsObject['experienceInfo'] = this.exp;
      this.detailsObject['isNegotiable'] = this.value;
      this.detailsObject['servedNoticePeriod'] = this.evalue;

      this.profileService
        .addCandidate(
          this.detailsObject,
          this.resumeCand,
          this.skills,
          this.eduArr,
          this.expArr
        )
        .subscribe((res) => {
          console.log('addeddddd', res);
        });
      // this.route.navigate(['candiadte'])
    } else {
      console.log('errorrrrr');
    }
  }

  copyCurrentAddress(permanentAddressField: any) {
    const currentAddressField = this.address.find(
      (address) => address.fieldName === 'current_address'
    );
    if (currentAddressField) {
      permanentAddressField.value = currentAddressField.value;
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
      console.log(this.items);
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
      console.log(this.exp);
    }
  }

  deleteEdu(id: any) {
    this.items.splice(id, 1);
    console.log(this.items);
  }

  deleteExp(id: any) {
    this.exp.splice(id, 1);
    console.log(this.exp);
  }

  onCheckboxChange(event: any) {
    this.value = event.target.checked;
    console.log(this.value);
  }

  onDropdownChange(event: any) {
    this.evalue = event.target.value === 'true';
    console.log(this.evalue);
  }

  onSkillSelect(event: any) {
    this.skillBtn = true;
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedSkill = this.skillSet[selectedIndex];
    this.selectedSkill.push(selectedSkill);
    console.log(this.selectedSkill);
  }

  onFileSelected(event: any) {
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event) => {
    //   console.log(event);
    // const url = event.target?.result;
    // this.candidateResume = url;
    // console.log(url);
    // };
    // console.log(this.candidateResume);
    const file = event.target.files[0];
    this.candidateResume = file;
    console.log(file);
  }
}
