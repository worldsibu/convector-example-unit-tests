"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_1 = require("@worldsibu/convector-core");
var yup = require("yup");
var mybuggychaincode_model_1 = require("./mybuggychaincode.model");
var MybuggychaincodeController = (function (_super) {
    tslib_1.__extends(MybuggychaincodeController, _super);
    function MybuggychaincodeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MybuggychaincodeController.prototype.create = function (mybuggychaincode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("sender=" + this.sender);
                        mybuggychaincode.owner = this.sender;
                        return [4, mybuggychaincode.save()];
                    case 1:
                        _a.sent();
                        return [2, mybuggychaincode];
                }
            });
        });
    };
    MybuggychaincodeController.prototype.getOne = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mybuggychaincode_model_1.Mybuggychaincode.getOne(id)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    MybuggychaincodeController.prototype.update = function (mybuggychaincode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var existingModel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mybuggychaincode_model_1.Mybuggychaincode.getOne(mybuggychaincode.id)];
                    case 1:
                        existingModel = _a.sent();
                        if (!existingModel.id) {
                            throw new Error("Item with " + mybuggychaincode.id + " doesn't exist in the blockchain!");
                        }
                        console.log(existingModel);
                        console.log(existingModel.owner + " " + this.sender);
                        if (existingModel.owner !== this.sender) {
                            throw new Error("Ups, the requesting identity is not authorized to update the model");
                        }
                        existingModel.name = mybuggychaincode.name;
                        return [4, existingModel.save()];
                    case 2:
                        _a.sent();
                        console.log(existingModel);
                        return [2, existingModel];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(mybuggychaincode_model_1.Mybuggychaincode))
    ], MybuggychaincodeController.prototype, "create", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], MybuggychaincodeController.prototype, "getOne", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(mybuggychaincode_model_1.Mybuggychaincode))
    ], MybuggychaincodeController.prototype, "update", null);
    MybuggychaincodeController = tslib_1.__decorate([
        convector_core_1.Controller('mybuggychaincode')
    ], MybuggychaincodeController);
    return MybuggychaincodeController;
}(convector_core_1.ConvectorController));
exports.MybuggychaincodeController = MybuggychaincodeController;
//# sourceMappingURL=mybuggychaincode.controller.js.map