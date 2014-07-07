/*globals define*/
define(function () {
    'use strict';
    var Item;
    Item = (function () {
        function Item(type, name, price) {
            this.type = type;
            if (!isValidType.call(this)) {
                throw new Error("Invalid type. Type must be accessory/smart-phone/notebook/pc/tablet");
            }
            this.name = name;
            if (!isValidName.call(this)) {
                throw new Error("Name must be string bigger than 6 symbols and smaller than 40");
            }
            this.price = price;
            if (!isValidPrice.call(this)) {
                throw new Error("Price must be positive");
            }
        }

        function isValidType() {
            if (this.type === 'accessory' || this.type === 'smart-phone'
                || this.type === 'notebook' || this.type === 'pc' || this.type === 'tablet') {
                return true;
            }
            return false;
        }

        function isValidName() {
            if (this.name.length >= 6 && this.name.length < 40) {
                return true;
            }
            return false;
        }

        function isValidPrice() {
            if (this.price > 0) {
                return true;
            }
            return false;
        }

        return Item;
    }());
    return Item;
});