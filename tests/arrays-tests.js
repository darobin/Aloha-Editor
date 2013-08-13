require(['../src/arrays'], function (arrays) {
	'use strict';

    module('arrays');

    test('sortUnique(): loose compare', function () {
        var unique = arrays.sortUnique([6, 3, 6, 3, '6', 3, '9', 9, 3, 2, 1]);
        // Either numeric or string values for '6' and '9' may be chosen
		var i;
        for (i = 0; i < unique.length; i++) {
            unique[i] = parseInt(unique[i], 10);
        }
        deepEqual(unique, [1, 2, 3, 6, 9]);
    });

    test('sortUnique(): strict comparison', function () {
        var unique = arrays.sortUnique([6, 3, '6', 3, 6, 3, '9', 9, 3, 2, 1], function (a, b) {
            return typeof a < typeof b ? -1
                : (typeof a > typeof b ? 1
                    : (a < b ? -1 : (a > b ? 1 : 0)));
        });
        deepEqual(unique, [1, 2, 3, 6, 9, '6', '9']);
    });

    test('sortUnique(): comparator', function () {
        var unique = arrays.sortUnique([7, 6, 9, 6, 9, 8], function (a, b) {
            // Pretend 6 and 9 is equal
            if (a === 9) {
                a = 6;
            }
            if (b === 9) {
                b = 6;
            }
            return a < b ? -1 : (a === b ? 0 : +1);
        });
        deepEqual(unique, [6, 7, 8]);
    });
});
