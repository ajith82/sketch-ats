import { Component, OnInit } from '@angular/core';
import { form } from '../formData/candidateForm';
import { resume } from '../formData/resume';
import { basicDetails } from '../formData/basicDetails';
import { professionalDetails } from '../formData/professionalDetails';
import { address } from '../formData/address';
import { education } from '../formData/education';
import { experience } from '../formData/experience';
import { NgForm } from '@angular/forms';

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
  educationCount: number = 0;

  educationBtn: boolean = false;
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.any);
    this.resumeValue = this.resume.map((x) => x.fieldName);
    console.log('key', this.resumeValue);
  }

  addEdu() {
    this.educationBtn = true;
    this.educationCount++;

    const newEducation = {
      institute: '',
      degree: '',
      start_date: '',
      end_date: ''
  };  

  

    const eduDetails: any[] = [];
    eduDetails.push({});
    this.education.forEach((detail) => {
      eduDetails.push({
        institute: detail.fieldName == 'institute_name' ? detail.value : '',
        degree: detail.fieldName == 'degree' ? detail.value : '',
        start_date: detail.fieldName == 'start_date' ? detail.value : '',
        end_date: detail.fieldName == 'end_date' ? detail.value : '',
      });
    });
    const sectionNumber = this.educationCount;
    const combinedDetails = eduDetails.reduce((acc, cur) => {
      return {
        institute: acc.institute || cur.institute || '',
        degree: acc.degree || cur.degree || '',
        start_date: acc.start_date || cur.start_date || '',
        end_date: acc.end_date || cur.end_date || '',
      };
    }, {});
    eduDetails.splice(0, eduDetails.length, combinedDetails);
    this.detailsObject.eduDetails = eduDetails;

    if(this.educationCount > 1){
      eduDetails.push({id:this.educationCount,institute:'',degree:'',start_date:'', end_date:''})
    }
    console.log(this.detailsObject, "this.educationCount",this.educationCount);
  }

  addExp() {
    this.expBtn = true;
    const expDetails: any[] = [];
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

  submitData(form: NgForm) {
    // const detailsObject: any = {};
    this.resume.forEach((detail) => {
      this.detailsObject[detail.fieldName] = detail.value;
    });
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

  
    console.log('detailsObject', this.detailsObject);
  }

  copyCurrentAddress(permanentAddressField: any) {
    const currentAddressField = this.address.find(
      (address) => address.fieldName === 'current_address'
    );
    if (currentAddressField) {
      permanentAddressField.value = currentAddressField.value;
    }
  }
}
