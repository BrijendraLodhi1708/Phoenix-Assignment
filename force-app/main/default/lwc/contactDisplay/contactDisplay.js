import { LightningElement,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ContactChannel from '@salesforce/messageChannel/ContactMessage__c'
import ContactDetail from '@salesforce/apex/AccountController.getContactDetail';
import AccountDetail from '@salesforce/apex/AccountController.getAccountDetail';


const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'FirstName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' }
    
   
  ];

  const column = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue' }
    
   
  ];

export default class ContactDisplay extends LightningElement {
    subscription = null;
    @wire(MessageContext)
    messageContext;
    searchKey;
    columns = columns;
    column = column;
    contactdata;
    flag = false;
    connectedCallback() {

        this.handleSubscribe();
    }

    @wire(ContactDetail, {contactid :'$searchKey'})
    contactData({data,error})
    {
           if(data){
            this.contactdata =data;
            this.error=undefined;
            console.log('ABCDE',this.contactdata);
           }else if(error){
            this.error = error;
            this.contactdata=undefined;
            console.log(error);

           }
    };
    accdata;
    @wire(AccountDetail,{accId : '$searchKey'})
    accountData({data,error}){

       if(data){
         this.accdata=data;
         this.error=undefined;
       }else if(error){
        this.error=error;
        this.accdata=undefined;
       }
    };

    handleSubscribe(){

        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, ContactChannel, (message) => {
            console.log('ABCD',message.value)
        this.searchKey = message.value;
        this.flag=message.flag;
        
        });
    }


}