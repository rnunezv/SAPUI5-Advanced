//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/Employees/model/formatter",
    "sap/m/MessageBox"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof logaligroup.Employees.model.formatter} formatter 
     */

    function (Controller, formatter, MessageBox) {

        function onInit() {
            this._bus = sap.ui.getCore().getEventBus();
        };

        function onCreateIncidence() {

            var tableIncidence = this.getView().byId("tableIncidence");
            var newIncidence = sap.ui.xmlfragment("logaligroup.Employees.fragment.NewIncidence", this);
            var incidenceModel = this.getView().getModel("incidenceModel");
            var oData = incidenceModel.getData();
            var index = oData.length;
            oData.push({ index: index + 1, _ValidateDate: false, EnabledSave: false });
            incidenceModel.refresh();
            newIncidence.bindElement("incidenceModel>/" + index);
            tableIncidence.addContent(newIncidence);

        };

        function onDeleteIncidence(oEvent) {


            var contexObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();
            MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteIncidence"), {

                onClose: function (oAction) {
                    if (oAction == "OK") {
                        this._bus.publish("incidence", "onDeleteIncidence", {
                            IncidenceId: contexObj.IncidenceId,
                            SapId: contexObj.SapId,
                            EmployeeId: contexObj.EmployeeId
                        });
                    }
                }.bind(this)

            });

        };


        function onSaveIncidence(oEvent) {

            var incidence = oEvent.getSource().getParent().getParent();
            var incidenceRow = incidence.getBindingContext("incidenceModel");
            this._bus.publish("incidence", "onSaveIncidence", { incidenceRow: incidenceRow.sPath.replace('/', '') });

        };


        function updateIncidenceCreationDate(oEvent) {

            let context = oEvent.getSource().getBindingContext("incidenceModel");
            let contextObj = context.getObject();
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            if (!oEvent.getSource().isValidValue()) {
                contextObj.CreationDateState = "Error";
                contextObj._ValidateDate = false;

                MessageBox.error(oResourceBundle.getText("errorCreationDateValue"), {
                    title: "Error",
                    onClose: null,
                    styleClass: "",
                    actions: MessageBox.Action.Close,
                    emphasizedAction: null,
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });

            } else {
                contextObj.CreationDateState = "None";
                contextObj._ValidateDate = true;
                contextObj.CreationDateX = true;
            };

            if (oEvent.getSource().isValidValue() && contextObj.Reason) {
                contextObj.EnabledSave = true;
            } else {
                contextObj.EnabledSave = false;
            };

            context.getModel().refresh();
        };

        function updateIncidenceReason(oEvent) {

            let context = oEvent.getSource().getBindingContext("incidenceModel");
            let contextObj = context.getObject();

            if (oEvent.getSource().getValue()) {
                contextObj.ReasonX = true;
                contextObj.ReasonState = "None";
            } else {
                contextObj.ReasonState = "Error";
            };

            if (contextObj._ValidateDate && oEvent.getSource().getValue()) {
                contextObj.EnabledSave = true;
            } else {
                contextObj.EnabledSave = false;
            };

            context.getModel().refresh();
        };


        function updateIncidenceType(oEvent) {
            let context = oEvent.getSource().getBindingContext("incidenceModel");
            let contextObj = context.getObject();


            if (contextObj._ValidateDate && contextObj.Reason) {
                contextObj.EnabledSave = true;
            } else {
                contextObj.EnabledSave = false;
            };

            contextObj.TypeX = true;

            context.getModel().refresh();
        };


        var EmployeeDetails = Controller.extend("logaligroup.Employees.controller.EmployeeDetails", {});

        EmployeeDetails.prototype.onInit = onInit;
        EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
        EmployeeDetails.prototype.Formatter = formatter;
        EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
        EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence;
        EmployeeDetails.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
        EmployeeDetails.prototype.updateIncidenceReason = updateIncidenceReason;
        EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType;

        return EmployeeDetails;

    });