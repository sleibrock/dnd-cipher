// main javascript file
'use strict';

var encodeField = window.document.getElementById("encode_this");
var resultField = window.document.getElementById("result");

var encodeButt = window.document.getElementById("encode_butt");
var decodeButt = window.document.getElementById("decode_butt");
var clearButt  = window.document.getElementById("decode_butt");

var cipherValues = [
    17,  4,  9, 15,  2, 22, 25, 12, 14,  7,
     1, 16, 26,  3, 20, 11, 23,  6, 13, 21,
    18,  5, 24, 10, 19, 8,
];

var sanitize = function(str)
{
    return str.toUpperCase();
}

var charValue = function(chr)
{
    return chr.charCodeAt(0);
}

var getCipherIndex = function(chr)
{
    return 0;
}


// character rotation only works on characters
// two ranges: [65..90] and [97..122]
// if it's in those ranges: add x to the char
// if not, ignore it and move on
var rotateChar = function(chr, x)
{
    var t = charValue(chr);
    var d = t+x;
    if((65 <= x) && (x <= 90))
    {
        if (d > 90)
            d = (d % 90) + 65;
        return String.fromCharCode(d);
    }

    if((97 <= x) && (x <= 122))
    {
        if (d > 122)
            d = (d % 122) + 97;
        return String.fromCharCode(d);
    }
    return chr;
}

// define the two core functions for enc/dec here
var cipher = function(target)
{
    var ret = target.split("");

    var lastV = 0;
    for(var i=0; i < ret.length; i++)
    {


    }

    ret = ret.map(function(x){ return rotateChar(x, 1); });

    return ret.join("");
};

var decipher = function(target)
{


};


encodeButt.addEventListener("click", function(){
    // apply the encode algorithm

});

decodeButt.addEventListener("click", function(){
    // decode algorithm goes here

});

// end
