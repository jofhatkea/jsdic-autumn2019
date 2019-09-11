# JavaScript Dictionary
1. [.appendChild](#appendchild)
2. [.cloneNode](#clonenode)
3. [Comparisons](#comparisons)
4. [Data Attributes](#dataattributes)
5. [fetch](#fetch)
6. [forEach](#foreach)
7. [.getAttribute](#getattribute)
8. [.innerHTML](#innerhtml)
9. [return](#return)
10. [.setAttribute](#setattribute)
11. [.sort](#sort)
12. [Template Literals](#templateliterals)
13. [.textContent](#textcontent)
14. [window](#window)
## `.appendChild`

`parent.appendChild(elem)` takes a [Node](#node) (parent) and appends another [node](#node) as a child (elem).

```js
const myDiv = document.createElement("div");
document.querySelector("main").appendChild(myDiv);
/*
The struture is now something like
<main>
  <div></div>
</main>  
*/
```

Note that an element can only have a single child, which means that if you append some existing element to another [node](#node) it will "physically" be moved in the [DOM](#dom)

## `.cloneNode`

`const copy = myNode.cloneNode(true)` makes a copy of a [Node](#node) (in this case `myNode`) and returns it (in this case, it's stored as `copy`).

The copied [Node](#node) can then added to the DOM using [`.appendChild`](#appendchild)

The method can be called, passing in either `true` or `false`. This tells JavaScript whether to include the children as well.

```js
/*given this DOM:
<article></article>
<section>
  <header>
    <h1>Hi mom</h1>
  </header>
</section>
*/
//1. we select it
const nodeToBeCopied = document.querySelector("section");

//2. we can make a copy that includes "the children" (e.g header, h1)
const copy = nodeToBeCopied.cloneNode(true);

//or we can make a copy that only includes the element (e.g. an empty <section>)
//Personally, I have never used this
//const copy = nodeToBeCopied.cloneNode(false);

//3. we could change some stuff in our clone, but for now, let's just add it to the DOM
const parentNode = document.querySelector("article");
parentNode.appendChild(copy);
```

## Comparisons

Especially for [conditions](#if-else-else-if), the comparison operators become important, and there's just a few we need to know.

| Operator | Meaning                                       | Example             |
| -------- | --------------------------------------------- | ------------------- |
| =        | Assign a value                                | `let x = 2`         |
| ==       | Compare, ignoring datatype                    | `2 == "2"//true`    |
| ===      | Compare, maintain datatype                    | `2==="2"//false`    |
| !        | Not, reverses the meaning                     | `!true; //false`    |
| !=       | Not equal (different from), ignore datatype   | `2 != "2"; //false` |
| !==      | Not equal (different from), maintain datatype | `2 !== "2"; //true` |
| >        | Greater than                                  | `2 > 1; //true`     |
| <        | Less than                                     | `2 < 1; //false`    |
| >=       | Greater than or equal to                      | `2 >= 2; //true`    |
| <=       | Less than or equal to                         | `2 <= 2; //true`    |

## Data Attributes

[Nodes](#node) has a lot of attributes, some shared and some unique to the particular type of node (like and img's alt attribute). Once in a while we need to give a node a non-existing attribute, and we do that with "Data Attributes".

We can declare those in the HTML or through JavaScript.

In HTML we "prefix" our attributes with `data-`

HTML

```html
<!-- create an img with a custom attribute called "data-clicks"> -->
<img src="selfie.png" data-clicks="0" />
```

In JS we can read those as well as setting new ones. We do that through the `dataset` property

```javascript
// read the data-clicks from the previous example
let img = document.querySelector("img");
let myClicks = img.dataset.clicks;
myClicks++;
img.dataset.clicks = myClicks;
```

We can also assign new attrbutes on the fly

```javascript
img.dataset.username = "Jonas";
// which translates to: <img data-username="Jonas" ..... >
```

[MDN has a great, short article on data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

## `fetch`

`fetch` is used to fetch data asynchronous from an external source. In plain English, that means, it fetches some data without pausing our application. Once the data is fetched, a [callback function](#callback) is executed, and we can play around with the new data. `fetch` uses a thing called `promises` which are out of scope for this document, so the syntax is a bit strange. But do what I did, just accept that some of it is strange, and learn what you need to change, and what you shouldn't.

Let's take an example

```javascript
fetch("somefile.json")
  .then(initial => initial.json())
  .then(callback);

function callback(data) {
  //we now have the JSON
}
```

The above fetches the content of `somefile.json`, parses it as `JSON` and finally calls the [callback](#callback) function, with the JSON as an argument. The above example uses `GET` as the request method. It is also possible to use `POST`, `PUT`, `PATCH` & `DELETE` by passing in an object containing additional headers:

```javascript
let data = {
  name: "Jonas",
  email: "jofh@kea.dk"
};

let postData = JSON.stringify(data);
fetch("someURL", {
  method: "post",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: postData
})
  .then(d => d.json())
  .then(callback);
```

The two examples both utilizes the `.json()`method to parse it as `JSON`, bit there are [other options](https://developer.mozilla.org/en-US/docs/Web/API/Body)

## `forEach`

The way the cool kids loop through [arrays](#arrays) and [Nodelists](#nodelist).

Very often, you want to do something to a series of elements, and `forEach` is your new best friend.

`forEach` does something, to each and every item in the aforementioned lists. Let's see an example.

```javascript
let skills = ["JS", "HTML", "CSS"];
skills.forEach(showSkill);

function showSkill(skill) {
  console.log("Someone knows " + skill);
}
```

This will output:

- Someone knows JS
- Someone knows HTML
- Someone knows CSS

So, each item in the list (`skills`) is passed to the function (`showSkills`), and in that function, the item is referred to as `skill`

In plainer english (perhaps), "I want to do something to each skill (`skills`), give them to me, one at a time, and call it `skill`"

OK, so let's do the same thing with another good friend, [`.querySelectorAll`](#queryselectorall).

```javascript
let allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

allHeaders.forEach(doStuff);

function doStuff(h) {
  h.addEventListener("click", e => {
    console.log(e, h);
    h.classList.add("awesome");
  });
}
```

OK, that was way more complex, and has to do with the way `let` variables work and stuff, the main thing I want you to take from this is:

1. We grab all the headers
2. Foreach and every one of them, we call a function (`doStuff`)
3. that function receives an argument (`h`) that is the corresponding header, one at a time.
4. after that, I attach an eventlistener to the header.

## `.getAttribute`

`elem.getAttribute(attrName)` reads, and returns, the value of a given attribute on a given element.

Consider the following markup:

```html
<img src="img/beer.png" alt="A beer" />
```

The `img` has two attributes, `src` and `alt`, we can read the values with JavaScript as follows:

```javascript
let img = document.querySelector("img");
let src = img.getAttribute("src"); //src = "img/beer.png"
let alt = img.getAttribute("alt"); //alt = "A beer"
let stupid = img.getAttribute("jonas"); // stupid = null
```

### Alternate syntax

All attributes can also be accessed using the object notation, so the above snippet could also be written as follows:

```javascript
let img = document.querySelector("img");
let src = img.src; //src = "img/beer.png"
let alt = img.alt; //alt = "A beer"
let stupid = img.jonas; // stupid = null
```

There are some minor differences though. Take a look at [this discussion](https://stackoverflow.com/questions/19737143/difference-between-object-src-and-object-getattributesrc) if you're curious, or just stick to `.getAttribute`

## `.innerHTML`

`.innerHTML` changes the content (overwrites) of a selected [node](#node). Unlike [`.textContent`](#textcontent) it can create HTML for us. e.g

```js
document.querySelector("article").innerHTML =
  "<h1>This now contains a heading</h1><p>and some other stuff</p>";
```

Warning: Since `.innerHTML` can add HTML, it can also be used to add JavaScript to the page. This method should NOT be used if you don't trust the content (e.g. if it's user generated). [`.textContent`](#textcontent) is a safe alternative.

## `return`

Personally, I found this concept really hard when I started out, so don't worry if you get kind of lost now.
`return` does two things

1. It returns something from a function
2. It stops the following code in the function from running.

But that's not why we use it. We use it to make our code more reusable.

Take this example

```js
function calc(a, b) {
  const sum = a + b;
  return sum;
}
const mySum = calc(10, 5);
```

What does `mySum` contain now? If you guessed 15, go make your self a nice cup of ☕️. You just grasped what I failed to do for a long time.

The `calc` function is reusable, and we can pass in any numbers we like, we can even pass in another function as parameters:

```js
const bigSum = calc(calc(1, 2), calc(3, 4));
console.log(bigSum); //outputs 10
```

Does that make sense?

Try creating your own `calculateTips` function that takes an arugument and returns the passed value multiplied by 1.1

## `.setAttribute`

Sets an attribute on a node.

```javascript
// Element.setAttribute(name, value);
let img = document.querySelector("img");
img.setAttribute("src", "selfie.png");
```

You can even set non-standard attributes on an element, but for that, you really should use [Data Attributes](#dataattributes)

## `.sort`

A method used to sort [arrays](#arrays)

It sorts the array "in place", meaning that it will modify the original array!

Example:

```js
const ages = [8, 2, 4];
ages.sort();
//ages will now contain [2,4,8]
```

But most of the time that's not enough. `.sort()` converts (internally) all elements into strings, which means that 90 comes before 8 when using sort!
so:

```javascript
const ages = [10, 1, 23, 2];
ages.sort();
//ages now contains [1, 10, 2, 23]
```

Not what we usually want, right?

### Advanced usage

We can pass a function to `.sort()` that it can use when sorting. It might seem a bit strange, but with a bit of trial and error, we can make it work.

The idea is that the function compares two items in the array at a time, untill it knows the position of all items.

Technically, we create a function that receives two arguments and then we return a value, depending on which is bigger.

Let's call them item `a` and `b`.
If `a` is less than `b`, we return `-1`
If they are equal, we return `0`
If `a` is bigger than `b` we return `1``

So, some sample code for this would be:

```javascript
function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

And then we can use the sorting function with `.sort()`:

```javascript
const ages = [10, 1, 23, 2];
function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
ages.sort(compare);
//ages now contains [1,2,10,23];
```

This function will work for strings as well, but beware, that capital letters comes before lower-case. So "Jx" will come before "ja". (in this case you need to convert the strings to lower-case before compairing).

### Sorting objects

The final piece of the puzzle is sorting objects. It works exactly the same way, except we have to look at the properties of the objects we are compairing.

```javascript
const objs = [
  {
    name: "Jonas"
  },
  {
    name: "Jens"
  },
  {
    name: "Lasse"
  }
];
function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
objs.sort(compare);
//objs will now contain the objects in the following order: Jens, Jonas, Lasse
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

## Template Literals

Basically it's a human-readable version of [string concatenation](#concatenation).

Normal concatenation can become a bit hard when trying to concatenate stuff like this:

```html
<img src="myimage.png" alt="Selfie" />
```

### Standard concatenation

```js
const path = "myimage.png";
const alt = "Selfie";
const img = '<img src="' + path + '" alt="' + alt + '">';
//it can be made a litle nice if we switch to singe quotes
const img = '<img src="' + path + '" alt="' + alt + '">';
```

Template literals uses the back tick ( ` ) and curly braces and a dollar sign to "interpolate" our variables. (Fancy word for using a variable in a string).

1. The string must be wrapped in backticks (\`my string\`)
2. Variables are used by wrapping them in \${variableGoesHere}

```js
const path = "myimage.png";
const alt = "Selfie";
const img = `<img src="${path}" alt="${alt}">`;
```

Personally, I think this (new) syntax is a whole lot easier to read...

## `.textContent`

Sets the text content (surprise) of a [node](#node). Unlike [`.innerHTML`](#innerhtml) it can only manipulate text, so no HTML is allowed.

```js
/*
The HTML
<section>
  <h1>Hello world</h1>
</section>
*/
//1. grab the element
const header = document.querySelector("h1");

//2. read the textContent
console.log(header.textContent); //outputs "Hello world"

//3. change the content
header.textContent = "Hi mom";
console.log(header.textContent); //outputs "Hi mom";
```

## `window`

The `window`is a global object living in the browser.

Once again, do a `console.dir(window)` straight in the console to see what it contains (hint: a lot).

Some of it is really cool, like we can ask the browser how big the window is :-)

Basically, `window` contains a huge portion of the language. So, whenever you call a JavaScript function, there's a pretty good chance it actually lives on the `window` object.

For instance, the function [setTimeout](#settimeout) lives on the window object, which in turn means you can call it like this:

```js
window.setTimeout....
// as well as
setTimeout....
```

Further more, all function you declare like this:

```js
function test() {
  console.log("Hi mom");
}
```

are automatically added to the window object (so we can once again call the function like: `window.test()` as well as `test()`)

So, why is this important?

1. You need to know it, you'll see countless examples using it
2. It can be damn usefull to take your own local functions / variables and "manually hoisting" them by assigning them to the `window` object (don't overdo it)

E.g.

```js
function test() {
  //the following variable ONLY exists in this function (local)
  const age = 40;
  //this one is added to the window object, so it can be accessed everywhere (once the function is called)
  const kids = 3;
  window.kids = kids;
}
```

You can reed more at https://www.w3schools.com/jsref/obj_window.asp
