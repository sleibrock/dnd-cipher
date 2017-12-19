// main javascript file
'use strict';

// grab all the fields
var encodeField = window.document.getElementById("encode_this");
var resultField = window.document.getElementById("result");

var encodeButt = window.document.getElementById("encode_butt");
var decodeButt = window.document.getElementById("decode_butt");
var clearButt  = window.document.getElementById("clear_butt");


// Cipher key values
// Adjust these if you wish to change the cipher
// The order mirrors alphabetic order (A, B, C... Z)
var cipherValues = [
    17,  4,  9, 15,  2, 22, 25, 12, 14,  7,
     1, 16, 26,  3, 20, 11, 23,  6, 13, 21,
    18,  5, 24, 10, 19, 8,
];


// return whether X is in the inclusive range of [a..b]
// A must be lower than B
var inRange = function(x, a, b)
{
    return ((a <= x) && (x <= b));
}


// return the ascii char value of the given char
var charValue = function(chr)
{
    return chr.charCodeAt(0);
}


// return the value of the character in the cipher
// ie: if A=17 and we take the letter 'A', return 17
// if we also receive 'a', return 17
var getCipherValue = function(chr)
{
    var upperC = chr.toUpperCase();
    var ind = charValue(upperC);
    if( inRange(ind, 65, 90) )
        return cipherValues[ind - 65];
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
    if( inRange(t, 65, 90) )
    {
        if (d > 90)
            d = (d % 90) + 64;
        return String.fromCharCode(d);
    }

    if( inRange(t, 97, 122) )
    {
        if (d > 122)
            d = (d % 122) + 96;
        return String.fromCharCode(d);
    }
    return chr;
}


// The cipher function applies cipher shifts to each character in a given string
// the shift values are dependant on the string's characters
// NOTE: doing this backwards does not create the same string (decipher is different)
var cipher = function(target)
{
    var ret = target.split("");
    var cipherV = 0;
    var lastV = 0;
    var difference = 0;
    for(var i=0; i < ret.length; i++)
    {
        cipherV = getCipherValue(ret[i]);
        if(cipherV != 0)
        {
            if(lastV == 0)
            {
                lastV = cipherV;
            }
            else
            {
                difference = Math.abs(lastV);
                lastV = getCipherValue(ret[i]);
                ret[i] = rotateChar(ret[i], difference);
            }
        }
    }
    return ret.join("");
};



// The decipher function takes a string and applies the cipher to each character
// generating new values and calculating reverse cipher keys.
// Each character depends on the previous cipher key in order to be completely decoded
var decipher = function(target)
{
    var ret = target.split("");
    var cipherV = 0;
    var lastV = 0;
    var difference = 0;
    for(var i=0; i < ret.length; i++)
    {
        cipherV = getCipherValue(ret[i]);
        if(cipherV != 0)
        {
            // we only operate on characters that have non-zero cipher values
            if(lastV == 0)
            {
                // we're still on the first character, so store and then continue
                //console.log("First character found, storing lastV="+cipherV);
                lastV = cipherV;
            }
            else
            {
                // now we can shift the current character with the lastV value
                difference = Math.abs(26 - lastV);
                //console.log("Shifting " + ret[i] + " " + difference + " places");
                ret[i] = rotateChar(ret[i], difference);
                lastV = getCipherValue(ret[i]);
            }
        }
    }
    return ret.join("");
};


// a wrapper to create the functionality
// Takes a cipher/decipher function and produces GUI logic
var logicWrapper = function(operation)
{
    return function()
    {
        var text = encodeField.value;
        resultField.value = "Result: " + operation(text);
        return;
    }
};


// remove all text from the message field when the user focuses it
encodeField.addEventListener("focus", function(){
    encodeField.value = "";
});


// if the user leaves the field and no text was added, add the default text
encodeField.addEventListener("blur", function(){
    if(encodeField.value.length == 0)
    {
        encodeField.value = "Put your message to encode here";
    }
})


// apply the logic to the two buttons
encodeButt.addEventListener("click", logicWrapper(cipher)); 
decodeButt.addEventListener("click", logicWrapper(decipher));


// add clear button logic
clearButt.addEventListener("click", function(){
    encodeField.value = "Put your message to encode here"; 
    resultField.value = "Result goes here";
})

// end
