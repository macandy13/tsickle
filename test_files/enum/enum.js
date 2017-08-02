goog.module('test_files.enum.enum');var module = module || {id: 'test_files/enum/enum.js'};/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// Line with a missing semicolon should not break the following enum.
const /** @type {!Array<?>} */ EnumTestMissingSemi = [];
/** @enum {number} */
const EnumTest1 = { XYZ: 0, PI: 3.14159, };
EnumTest1[EnumTest1.XYZ] = "XYZ";
EnumTest1[EnumTest1.PI] = "PI";
// Verify that the resulting TypeScript still allows you to index into the enum with all the various
// ways allowed of enums.
let /** @type {EnumTest1} */ enumTestValue = EnumTest1.XYZ;
let /** @type {EnumTest1} */ enumTestValue2 = EnumTest1['XYZ'];
let /** @type {string} */ enumNumIndex = EnumTest1[((null))];
let /** @type {number} */ enumStrIndex = EnumTest1[((null))];
/**
 * @param {EnumTest1} val
 * @return {void}
 */
function enumTestFunction(val) { }
enumTestFunction(enumTestValue);
let /** @type {EnumTest1} */ enumTestLookup = EnumTest1["XYZ"];
let /** @type {?} */ enumTestLookup2 = EnumTest1["xyz".toUpperCase()];
// Verify that unions of enum members and other values are handled correctly.
let /** @type {(boolean|EnumTest1)} */ enumUnionType = EnumTest1.XYZ;
/** @enum {number} */
const EnumTest2 = { XYZ: 0, PI: 3.14159, };
exports.EnumTest2 = EnumTest2;
EnumTest2[EnumTest2.XYZ] = "XYZ";
EnumTest2[EnumTest2.PI] = "PI";
let /** @type {EnumTest2} */ variableUsingExportedEnum;
/** @enum {number} */
const ComponentIndex = {
    Scheme: 1,
    UserInfo: 2,
    Domain: 0,
    UserInfo2: 2,
};
ComponentIndex[ComponentIndex.Scheme] = "Scheme";
ComponentIndex[ComponentIndex.UserInfo] = "UserInfo";
ComponentIndex[ComponentIndex.Domain] = "Domain";
ComponentIndex[ComponentIndex.UserInfo2] = "UserInfo2";
/** @enum {number} */
const ConstEnum = {
    EMITTED_ENUM_VALUE: 0,
    EMITTED_ENUM_VALUE_2: 1,
};
exports.ConstEnum = ConstEnum;
let /** @type {ConstEnum} */ constEnumValue = ConstEnum.EMITTED_ENUM_VALUE;
/**
 * @record
 */
function InterfaceUsingConstEnum() { }
exports.InterfaceUsingConstEnum = InterfaceUsingConstEnum;
function InterfaceUsingConstEnum_tsickle_Closure_declarations() {
    /** @type {ConstEnum} */
    InterfaceUsingConstEnum.prototype.field;
    /** @type {ConstEnum} */
    InterfaceUsingConstEnum.prototype.field2;
}
/** @enum {?} */
const EnumWithNonConstValues = {
    Scheme: (x => x + 1)(3),
    UserInfoRenamed: 2,
};
EnumWithNonConstValues[EnumWithNonConstValues.Scheme] = "Scheme";
EnumWithNonConstValues[EnumWithNonConstValues.UserInfoRenamed] = "UserInfoRenamed";
/** @enum {string} */
const StringEnum = {
    STR: 'abc',
    OTHER_STR: 'xyz',
};
StringEnum[StringEnum.STR] = "STR";
StringEnum[StringEnum.OTHER_STR] = "OTHER_STR";
