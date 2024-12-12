import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUpload_lightning extends LightningElement {
    @api recordId; // Record ID to associate the uploaded file

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let fileNames = uploadedFiles.map(file => file.name).join(', ');

        // Show a success message with file names
        this.showToast('Success', `File(s) uploaded successfully: ${fileNames}`, 'success');
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
