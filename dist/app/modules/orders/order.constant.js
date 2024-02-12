"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderFilterableFields = exports.orderSearchableFields = exports.paymentMethod = exports.orderStatus = void 0;
exports.orderStatus = [
    'Not Processed',
    'Cash on Delivery',
    'Processing',
    'Dispatched',
    'Cancelled',
    'Delivered',
];
exports.paymentMethod = ['Online Payment', 'Cash on Delivery '];
exports.orderSearchableFields = ['contact'];
exports.orderFilterableFields = ['searchTerm', 'status', 'paymentMethod'];
