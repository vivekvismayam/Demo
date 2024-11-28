public with sharing class RecievesObjectFromLWC {
    @AuraEnabled(cacheable=false)
    public static Boolean updateAccountFields(Account accountToUpdate){
	    Account acc=new Account(Id=accountToUpdate.Id);
	    if(String.IsNotBlank(accountToUpdate?.FieldToUpdate__c))
        {
		    acc.FieldToUpdate__c=accountToUpdate.FieldToUpdate__c;
	    }
        System.debug(acc);
	    update acc;
	    return true; 
    }
}