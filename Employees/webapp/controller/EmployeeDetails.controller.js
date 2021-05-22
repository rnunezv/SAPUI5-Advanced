//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/Employees/model/formatter"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof logaligroup.Employees.model.formatter} formatter 
     */

    function (Controller, formatter) {

        function onInit() {

        };

        function onCreateIncidence() {

            var tableIncidence = this.getView().byId("tableIncidence");
            var newIncidence = sap.ui.xmlfragment("logaligroup.Employees.fragment.NewIncidence", this);
            var incidenceModel = this.getView().getModel("incidenceModel");
            var oData = incidenceModel.getData();
            var index = oData.length;
            oData.push({ index: index + 1 });
            incidenceModel.refresh();
            newIncidence.bindElement("incidenceModel>/" + index);
            tableIncidence.addContent(newIncidence);

        };

        function onDeleteIncidence(oEvent) {

            var tableIncidence = this.getView().byId("tableIncidence");
            var rowIncidence = oEvent.getSource().getParent().getParent();
            var incidenceModel = this.getView().getModel("incidenceModel");
            var oData = incidenceModel.getData();
            var contextObj = rowIncidence.getBindingContext("incidenceModel");

            oData.splice(contextObj.index - 1, 1);
            for(var i in oData){
                oData[i].index = parseInt(i) + 1;
            };

            incidenceModel.refresh();
            tableIncidence.removeContent(rowIncidence);

            for(var j in tableIncidence.getContent()){
                tableIncidence.getContent()[j].bindElement("incidenceModel>/"+j);
            }

        }

        var EmployeeDetails = Controller.extend("logaligroup.Employees.controller.EmployeeDetails", {});

        EmployeeDetails.prototype.onInit = onInit;
        EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
        EmployeeDetails.prototype.Formatter = formatter;
        EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;

        return EmployeeDetails;

    });