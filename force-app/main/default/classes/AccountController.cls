public with sharing class AccountController {

    
    @AuraEnabled(cacheable=true)
    public static List<Account> getName(){
        try{
        List<Account> name = [SELECT Id, Name FROM Account];

        return name;
        }catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetail(String accId){
        try{
        List<Account> acc = [SELECT Id, Name, Type, Industry, AnnualRevenue FROM Account Where Id = :accId];
       System.debug(acc);
        return acc;
        }catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactDetail(String contactid){

        List<Contact> con = [SELECT Id, Email, LastName, FirstName FROM Contact Where AccountId = :contactid ];
        //
         System.debug('APex'+con);
         System.debug('Apex'+contactid);
        return con;
    }
}