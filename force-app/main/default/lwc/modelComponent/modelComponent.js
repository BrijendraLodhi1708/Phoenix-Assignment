import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import Phone from '@salesforce/schema/Contact.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AccountId from '@salesforce/schema/Contact.AccountId';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { createRecord } from 'lightning/uiRecordApi';


export default class ModelComponent extends LightningModal {

    @api accId =this.accId;
    FirstName;
    
    LastName;
    Email;
    Phone;
    record;

    handleFirstName(event){
        this.FirstName = event.detail.value;
        console.log(FirstName)
    }

    handleLastName(event){
        this.LastName = event.detail.value;
        console.log(LastName)
    }
    handleEmail(event){
        this.Email = event.detail.value;
        console.log(Email)
    }
    handlePhone(event){
        this.Phone = event.detail.value;
        console.log(Phone)
    }

    handleClose(){
       this.close();
    }

    contactId;
    handleCreateContact(){
       
        const fields={};

        fields[FirstName.fieldApiName]=this.FirstName;
        fields[LastName.fieldApiName]= this.LastName;
        fields[Email.fieldApiName] = this.Email;
        fields[Phone.fieldApiName] = this.Phone;
        fields[AccountId.fieldApiName]= this.accId;

        const recordInput = {apiName : CONTACT_OBJECT.objectApiName, fields};
       console.log('ABC',fields);
        createRecord(recordInput)
        .then(contactobj =>{

            this.contactId = contactobj.id;

            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Related Record is Created!',
                variant: 'Success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
            this.close();
        })
        .catch(error=>{
            const evt = new ShowToastEvent({
                title: 'Toast Error',
                message: 'Related Record is not Created',
                variant: 'error',
                mode: 'dismissable'
            });
            console.log(error);
            this.dispatchEvent(evt);
            this.close();
        });

       // this.close();



    }
}