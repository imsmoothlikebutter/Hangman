let fruits = ["APPLE","GRAPES","ORANGE","PEAR","BANANA","PINEAPPLE","CHERRY","AVOCADO","POMEGRANATE","APRICOT"];
let transport = ["CAR", "TRUCK","MOTORCYCLE","FERRY","TRAM","BICYCLE","TRAIN","MOPED","BUS","AEROPLANE"];
let animals = ["CAT","DOG","ALLIGATOR","ANT","BADGER","ECHIDNA","GORILLA","HAVANESE","KANGAROO","LABRADOODLE"];

var bankOfWords = new Map();
bankOfWords.set("FRUITS",fruits);
bankOfWords.set("TRANSPORTS",transport);
bankOfWords.set("ANIMALS",animals);

let randomDictIndex = Math.floor(Math.random()*bankOfWords.size);
let keyName = Array.from(bankOfWords.keys())[randomDictIndex];
let arrayOfWords = bankOfWords.get(keyName);
let randomArrIndex = Math.floor(Math.random()*arrayOfWords.length);



function WordBank() {
    return [arrayOfWords[randomArrIndex],keyName]
}

export default WordBank