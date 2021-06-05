// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.core.routing.History} History 
     */
    function (Controller, History) {

        function _oObjectMatced(oEvent) {
            this.getView().bindElement({
                path: "/Orders(" + oEvent.getParameter("arguments").OrderID + ")",
                model: "odataNorthwind"
            });
        }

        return Controller.extend("logaligroup.Employees.controller.OrderDetails", {

            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteOrderDetails").attachPatternMatched(_oObjectMatced, this);
            },

            onBack: function (oEvent) {

                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMain", true);
                };
            },

            onClearSignature: function (oEvent) {
                var signature = this.getView().byId("signature");
                signature.clear();
            }

        });
    });