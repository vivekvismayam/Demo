import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUpload extends LightningElement {
    fileData;

    handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.fileData = {
                fileName: file.name,
                fileContent: reader.result.split(',')[1], // Base64 content
                
            };
        };
        reader.readAsDataURL(file);
    }

    handleUpload() {
        if (!this.fileData) {
            this.showToast('Error', 'Please select a file first.', 'error');
            return;
        }

        const fields = {
            Title: this.fileData.fileName,
            VersionData: this.fileData.fileContent,
            PathOnClient: this.fileData.fileName
        };

        const recordInput = { apiName: 'ContentVersion', fields };

        createRecord(recordInput)
            .then((res) => {
                console.log('uploaded',res);
                this.showToast('Success', 'File uploaded successfully.', 'success');
            })
            .catch((error) => {
                console.error(error);
                this.showToast('Error', 'File upload failed.', 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}