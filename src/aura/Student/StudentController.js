({
    doInit : function(component, event, helper) {
        var action = component.get("c.getTotalRecordCount");
        action.setCallback(this, function(response) {
            console.log('@@@### totalRecordCount ' +response.getReturnValue());
            component.set('v.totalRecordCount', response.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    handleDownload: function(component, event, helper) {
        component.set("v.startPos", 1);
        component.set("v.endPos", 500);
        helper.handleDownloadHelper(component, event, helper);  
    },

    showSpinner: function(component, event, helper) {
         component.set("v.Spinner", true); 
    },
     
     hideSpinner : function(component,event,helper){
        component.set("v.Spinner", false);
     }
})