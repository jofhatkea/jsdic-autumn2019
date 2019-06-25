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

In plainer english (perhaps), "I want to do something to each skill (`skills`), give them to me, one at a time, and call it skill"

OK, so let's do the same thing with another good friend, [querySelectorAll](#queryselectorall).

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

## `return``

TODO

## `.setAttribute`

Set an attribute on a node.

```javascript
// Element.setAttribute(name, value);
let img = document.querySelector("img");
img.setAttribute("src", "selfie.png");
```

You can even set non-standard attributes on an element, but for that, you really should use [Data Attributes](#dataattributes)
