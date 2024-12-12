public class FileViewerController {
      @AuraEnabled
    public static List<ContentVersion> getFilesForRecord(Id recordId) {
        System.debug('Current Heap Size: ' + Limits.getHeapSize()); 
        List<ContentVersion> cv= [
            SELECT Id, Title, versionData,ContentDocumentId, FileType, ContentSize, CreatedDate
            FROM ContentVersion
            WHERE Id=:recordId
        ];
        System.debug('Cv' + cv); 
        System.debug('Current Heap Size: ' + Limits.getHeapSize()); 
        return cv;
    }
}