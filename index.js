//Outside of any function, this refers to the global object, or the window in web browsers
console.log(this);

class Person {
    constructor(firstName, lastName, greatesFear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.greatesFear = greatesFear;
    }

    encounterBoggart() {
        return `The Boggart has taken the form of ${this.greatesFear}.`
    }

    encounterBoggartWithFriends(friends) {
        friends.forEach(function encounterBoggart(friend) {
            return `I'm bla bla ${friend} lorem ipsum ${this.greatesFear}`
        })
    }

    encounterBoggartWithFriendsCorrect(friends) {
        let encounterBoggart = (friend) => {
            console.log(`I'm bla bla ${friend} take ${this.greatesFear}`);
        }
        
        friends.forEach(friend => encounterBoggart(friend));
    }
}

//When inside an instance method, this will take on the value of the object which received the method call
let neville = new Person("Neville", "Longbottom", "Professor Snape");
let ron = new Person("Ron", "Weasley", "a spider");

console.log(neville.encounterBoggart());
console.log(ron.encounterBoggart());

//When a variable is defined to point to the function of an instance method, that function loses the value of this
let nevillesFear = neville.encounterBoggart;

//bind allows you to affix a this value to the function.
let boundNevillesFear = neville.encounterBoggart.bind(neville);
boundNevillesFear();

/*Another scenario where the value of this becomes undefined is inside a callback function.
But the callback function encounterBoggart will define its own this based on its own execution context. The callback's execution context is not an instance of Person, because it itself isn’t an instance method, it’s just a function. So this becomes undefined, and the entire method will throw an error when invoked:*/

//neville.encounterBoggartWithFriends(["Harry", "Ron"])

//We can, however, prevent the callback from defining its own this, and instead use the this of its outer function, by defining it as an arrow function. Arrow functions do not define their own this, they use the this of their outer scope.
neville.encounterBoggartWithFriendsCorrect(["Harry", "Ron"]);