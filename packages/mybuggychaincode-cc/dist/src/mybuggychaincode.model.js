"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var Mybuggychaincode = (function (_super) {
    tslib_1.__extends(Mybuggychaincode, _super);
    function Mybuggychaincode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.mybuggychaincode';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_1.ReadOnly(),
        convector_core_1.Required()
    ], Mybuggychaincode.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_1.Required(),
        convector_core_1.Validate(yup.string())
    ], Mybuggychaincode.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Mybuggychaincode.prototype, "owner", void 0);
    tslib_1.__decorate([
        convector_core_1.ReadOnly(),
        convector_core_1.Required(),
        convector_core_1.Validate(yup.number())
    ], Mybuggychaincode.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_1.Required(),
        convector_core_1.Validate(yup.number())
    ], Mybuggychaincode.prototype, "modified", void 0);
    return Mybuggychaincode;
}(convector_core_1.ConvectorModel));
exports.Mybuggychaincode = Mybuggychaincode;
//# sourceMappingURL=mybuggychaincode.model.js.map