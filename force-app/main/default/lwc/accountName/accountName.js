import { LightningElement, wire } from 'lwc';
import AccountNames from '@salesforce/apex/AccountController.getName';
//import ContactDetail from '@salesforce/apex/AccountController.getContactDetail';
import ModelComponent from 'c/modelComponent';
import { publish, MessageContext } from "lightning/messageService";
import ContactChannel from '@salesforce/messageChannel/ContactMessage__c'

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'FirstName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' }
    
   
  ];

export default class AccountName extends LightningElement {

    names =[];
    value;
   contactdata ;
   searchKey;
   columns = columns;
    @wire(AccountNames)
    accountData({data,error})
    {
        if(data){
            console.log('data-->',JSON.stringify(data));

            for(let i=0;i<data.length;i++){

               this.names =[...this.names ,{value:data[i].Id, label : data[i].Name}];
            }
            console.log(this.names);
        }else if(error){
            this.error = error;
        }
    }
    
    
    // @wire(ContactDetail, {contactid :'$searchKey'})
    // contactData({data,error})
    // {
    //        if(data){
    //         this.contactdata =data;
    //         this.error=undefined;
    //         console.log('ABC',this.contactdata);
    //        }else if(error){
    //         this.error = error;
    //         this.contactdata=undefined;
    //         console.log(error);

    //        }
    // };

    handleChange(event){
      this.value = event.detail.value;
      this.searchKey = this.value;
      console.log(this.value);
    }

    handleRelatedContact1(){
        console.log('ABC',this.value)
       ModelComponent.open({ accId: this.value })
    }
    
    flag =true;
    @wire(MessageContext)
    messageContext;

    handleDisplay(){
          //this.message = this.value;
          const message = {
            value: this.value,
            flag: this.flag
            
          };
          console.log('ABC',message.value)
        publish(this.messageContext, ContactChannel, message); 
    }

}