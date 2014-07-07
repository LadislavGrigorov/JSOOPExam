/*globals define*/
define(['./item'], function (Item) {
    'use strict';
    var Store;
    Store = (function () {
        function Store(name) {
            this._name = name;
            this._stock = [];
        }

        Store.prototype.addItem = function (item) {
            if (!(item instanceof Item)) {
                throw new Error('Store can add only items');
            }
            this._stock.push(item);
            return this;
        };

        Store.prototype.getAll = function () {
            var self = this;
            sortByName(self._stock);
            return self._stock.slice(0);
        };

        Store.prototype.getSmartPhones = function () {
            var self = this,
                requestedItems = filterProducts(self._stock, ['smart-phone']);
            sortByName(requestedItems);
            return requestedItems;
        };

        Store.prototype.getMobiles = function () {
            var self = this,
                requestedItems = filterProducts(self._stock, ['smart-phone', 'tablet']);
            sortByName(requestedItems);
            return requestedItems;
        };

        Store.prototype.getComputers = function () {
            var self = this,
                requestedItems = filterProducts(self._stock, ['pc', 'notebook']);
            sortByName(requestedItems);
            return requestedItems;
        };

        Store.prototype.filterItemsByPrice = function (options) {
            var min,
                max,
                self = this,
                requestedItems;
            if (options) {
                if (options.min) {
                    min = options.min;
                }
                else {
                    min = 0;
                }
                if (options.max) {
                    max = options.max;
                }
                else {
                    max = Infinity;
                }
            }
            else{
                min = 0;
                max = Infinity;
            }

            requestedItems = filterByPrice(self._stock, min, max);
            requestedItems.sort(function(a, b){
                return a.price-b.price;
            });
            return requestedItems;
        };

        Store.prototype.filterItemsByType = function (type) {
            var filter = [],
                self = this,
                requestedItems;
            filter.push(type);
            requestedItems = filterProducts(self._stock, filter);
            return requestedItems;
        };

        Store.prototype.filterItemsByName = function (name) {
            var self = this,
                requestedItems = filterProductsByName(self._stock, name);
            sortByName(requestedItems);
            return requestedItems;
        };

        function sortByName(items) {
            items.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }

        function filterProducts(items, itemsType) {
            var requestedItems = [],
                i;
            if (itemsType.length === 1) {
                for (i = 0; i < items.length; i++) {
                    if (items[i].type === itemsType[0]) {
                        requestedItems.push(items[i]);
                    }
                }
            }
            else {
                for (i = 0; i < items.length; i++) {
                    if (items[i].type === itemsType[0] || items[i].type === itemsType[1]) {
                        requestedItems.push(items[i]);
                    }
                }
            }
            return requestedItems;
        }

        function filterByPrice(items, min, max) {
            var requestedItems = [],
                i;
            for (i = 0; i < items.length; i++) {
                if (items[i].price >= min && items[i].price <= max) {
                    requestedItems.push(items[i]);
                }
            }
            return requestedItems;
        }

        function filterProductsByName(items, name) {
            var requestedItems = [],
                i;
            for (i = 0; i < items.length; i++) {
                if (items[i].name.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
                    requestedItems.push(items[i]);
                }
            }
            return requestedItems;
        }

        return Store;
    }());
    return Store;
});