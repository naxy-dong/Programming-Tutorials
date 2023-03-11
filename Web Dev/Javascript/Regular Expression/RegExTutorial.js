// functions that can use regular expression
// str.search(targetString);
// str.replace(targetString, modifiedString);
// str.match(targetString);

//Use search when want to know the index of something.
//Use match when want to know the number of times the substring appears

var str = "Hello I'm Yu Xiang, today we are learning regular expressions";
console.log("Location of string I is at index " + str.search(/I/i)); // return index of the first I
console.log(str.replace(/yu xiang/i, "UwU"));

//****************Brackets******************//
console.log(str.match(/[e]/g)); //return [e,e,e,e,e,e,e]
console.log(str.match(/[er]/g));
/*return [
    'e', 'e', 'r', 'e',
    'e', 'r', 'r', 'e',
    'r', 'e', 'r', 'e'
]*/

var str1 = "1234567890";
console.log(str1.match(/[1-4]/g));//return [1,2,3,4]

var str2 = "green gree gre gr g r re red";
console.log(str2.match(/(red|green)/g));

//*************metacharacter****************//
/*
    \d finds all the digits
    \s finds all white space character
    \b finds match at the beginning of the word using \bWORD and finds the end of the word by using WORD\b
    \w finds all word characters
*/

console.log(str1.match(/\d/g));
console.log(str2.match(/\s/g));

str3 = "Hello, look!";
console.log(str3.search(/\blo/)); 
// in this case, since the string is searching at the beginning of the word, it will return LO in look
// return index 7
console.log(str3.search(/lo\b/));
// in this case, since the string is searching at the end of the word, it will return the LO in Hello
// return index 3

console.log(str3.match(/\w/g));

//*************Quantifiers**************//
/*
    n+ Matches any string that contains at least one n
    n* Matches any string that contains zero or more occurrences of n // n is optional when matching, but if there is n then match as many n in a row.
    n? Matches any string that contains zero or one occurrences of n // n is optional when matching, but if there is n, then match it
*/

str4 = "ooooooohhhhhhh";
console.log(str4.match(/oh+/g)); //return "[ohhhhhhh]"
console.log(str4.match(/oh*/g)); //return "[o,o,o,o,o,o,ohhhhhhh]"
console.log(str4.match(/oh?/g)); //return "[o,o,o,o,o,o,oh]"

//***********Periods*************//
//      /.WORD/      matches any character that comes before WORD
//      /WORD./      matches any character that comes after WORD
str5 = "eat, cat, pat, rat";
console.log(str5.match(/.at/g));

//**********Backslash **************//
//the idea is to convert any special character in regEx into a string
//ex: a period
str6 = "Hello. This. Is. A. Sentence."
console.log(str6.match(/\./g))//return ['.','.','.','.','.']

//***********Curly braces ***************//

//we want to match the word that are at least 4 characters long

console.log(str6.match(/\w{4}/g));

//************** Beginning and end **********************/
str7 = "Hello. Hi!"

//we want to search for the beginning of the word
console.log(str7.match(/^h/ig));

//we want to search the end of the word
console.log(str7.match(/\.$/g));

/*************look-behind and look-behind *************/

console.log(str6.match(/(?<=[ht])./));// positive look behind
console.log(str6.match(/(?<![he])./));// negative look behind

console.log(str6.match(/.(?=[ht])/));// positive look ahead
console.log(str6.match(/.(?![he])/));// negative look ahead