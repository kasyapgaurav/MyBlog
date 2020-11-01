public with sharing class StudentController {

//This method will give the total count of records
@AuraEnabled
public static Integer getTotalRecordCount(){
    try {
        return [SELECT count() FROM Student__c];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}

@AuraEnabled
public static List<Student__c> getStudentChunk(Integer startPos, Integer endPos, Integer totalRecordCount){
    try {
        List<Student__c> studentList = new List<Student__c>();
        String queryString = 'Select Id,Name,recordCounter__c,student_name__c from Student__c where';
        String strCondition = ' recordCounter__c >= ' + startPos + ' AND recordCounter__c <= ' + endPos;
        String orderBy = ' ORDER BY Name ASC LIMIT 49500';
        String Query = queryString + strCondition + orderBy;
        studentList = Database.query(Query);
        return studentList;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}

}