import { LightningElement, api } from 'lwc';
import updateAccountFields from '@salesforce/apex/RecievesObjectFromLWC.updateAccountFields';

export default class PassSobjectToApex extends LightningElement {
    @api recordId;
    handleClick() {
        let record = {
            sobjectType: "Account",
            Id: this.recordId,
            FieldToUpdate__c: "New Value"
        };
        updateAccountFields({accountToUpdate:record})
            .then((res) => console.log("record updated"))
            .catch((error) => console.error("error: " + JSON.stringify(error)));
    }
}