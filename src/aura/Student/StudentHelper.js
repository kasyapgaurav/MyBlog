({
    handleDownloadHelper : function(component, event, helper) {
        var totalRecordCount = component.get('v.totalRecordCount');
        var startPos = component.get('v.startPos');
        var endPos = component.get('v.endPos');
        console.log('@@@### startPos ' +startPos);
        console.log('@@@### endPos ' +endPos);
        var action = component.get("c.getStudentChunk");
        action.setParams({ "startPos"         : startPos,
                           "endPos"           : endPos,
                           "totalRecordCount" : totalRecordCount                 
        });
        action.setCallback(this, function(response) {
            var csvtemp = component.get("v.CsvList");
            var newarr = csvtemp.concat(response.getReturnValue());
            component.set('v.CsvList',newarr);
            if(newarr.length < totalRecordCount && endPos < totalRecordCount){
                startPos = endPos + 1;
                endPos   = endPos + 500;
                component.set("v.startPos", startPos);
                component.set("v.endPos", endPos);
                helper.handleDownloadHelper(component, event, helper);
            }else{
                // console.log('$$$$$$$$$$ '+newarr.length);
                // console.log('$$$$$$$$$$ '+JSON.stringify(newarr));
                 helper.convertArrayOfObjectsToCSV(component, event, helper,newarr);  
            }
        });
        $A.enqueueAction(action);
    },

    convertArrayOfObjectsToCSV : function(component, event, helper,objectRecords){
        component.set('v.CsvList','');
       console.log('@@@@@@@@@@@@ csv record count '+objectRecords.length);
       var csvStringResult, counter, keys, columnDivider, lineDivider;
       if (objectRecords == null || !objectRecords.length) {
           return null;
       }
       columnDivider = ',';
       lineDivider =  '\n';
       var header = ['ID','Auto Number', 'Record Count', 'Name'];
       
       csvStringResult = '';
       csvStringResult += header.join(columnDivider);
       csvStringResult += lineDivider;
       for(var i=0; i < objectRecords.length; i++){
           
           if((objectRecords[i]["Id"] !== undefined)){
               csvStringResult += '"'+ objectRecords[i]["Id"]+'"' +','; 
           }else{
               csvStringResult += '" "'+','; 
           }
           
           if((objectRecords[i]["Name"] !== undefined)){
               csvStringResult += '"'+ objectRecords[i]["Name"]+'"' +','; 
           }else{
               csvStringResult += '" "'+','; 
           }
           
           if((objectRecords[i]["recordCounter__c"] !== undefined)){
               csvStringResult += '"'+ objectRecords[i]["recordCounter__c"]+'"' +','; 
           }else{
               csvStringResult += '" "'+','; 
           }
           if((objectRecords[i]["student_name__c"] !== undefined)){
               csvStringResult += '"'+ objectRecords[i]["student_name__c"]+'"' +','; 
           }else{
               csvStringResult += '" "'+','; 
           }
           
           csvStringResult += lineDivider;
       }
       var hiddenElement = document.createElement('a');
       hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStringResult);
       hiddenElement.target = '_self'; // 
       hiddenElement.download = 'ExportData.csv';
       document.body.appendChild(hiddenElement);
       hiddenElement.click();
   },
})