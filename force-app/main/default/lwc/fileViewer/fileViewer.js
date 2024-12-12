import { LightningElement, api, wire } from 'lwc';
import getFilesForRecord from '@salesforce/apex/FileViewerController.getFilesForRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileViewer extends LightningElement {
    recordId; // Record ID to fetch files for
    files = []; // Store fetched files
    error;
    cv;

    @wire(getFilesForRecord, { recordId: '$recordId' })
    wiredFiles({ error, data }) {
        console.log('data '+data)
        if (data) {
            this.files = data.map(file => ({
                ...file,
                ContentSize: Math.round(file.ContentSize / 1024), // Convert size to KB
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.files = [];
            this.showToast('Error', 'Failed to load files', 'error');
        }
    }
    handleCVChange(event){
        this.cv=event.target.value;
        console.log('cv '+this.cv)
    }
    setRecordId(){
        this.recordId=this.cv;
    }

    handleViewFile(event) {
        const contentDocumentId = event.target.dataset.id;
        window.open(`/sfc/servlet.shepherd/document/download/${contentDocumentId}`, '_blank');
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant,
            })
        );
    }
}
