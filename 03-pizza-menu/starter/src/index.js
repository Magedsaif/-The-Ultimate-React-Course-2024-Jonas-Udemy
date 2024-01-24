import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

//each component can return just one element
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

// we can't use if else statement inside the js mode in JSX, what we need to do is to write sthg that actually produces a value, and thats what if else statement cant do, so we use ternary operator
function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* using terniry operator */}
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaobj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p> We are still working on our menu please comback later :) </p>
      )}

      {/* <Pizza
        name="Pizza spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mashrooms"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

// first we made the component and then we nest it inside our app
function Pizza(props) {
  console.log(props);
  return (
    <li className="pizza">
      <img src={props.pizzaobj.photoName} alt={props.pizzaobj.name} />
      <div>
        <h3>{props.pizzaobj.name}</h3>
        <p>{props.pizzaobj.ingredients}</p>
        <span>{props.pizzaobj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpoen = hour >= openHour && hour < +closeHour;
  console.log(isOpoen);

  // we got the alert twice because in strict mode the components are rendered twice

  // the alert is blocking the main thread

  // if (hour >= openHour && hour < +closeHour) alert("we're currently open!");
  // else alert("sorry we're closed !");

  // this is how bad if we had to write component like this without JSX
  //   return React.createElement("footer", null, "We are currently open!");

  // using short circuiting
  return (
    <footer className="footer">
      {isOpoen ? (
        <div>
          <p>
            we're open untill {closeHour}:00. come visit us or order online{" "}
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          we are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

// React v18

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

/////////////////////////////////////////////////////////////////////
// what is JSX
//------------------------------------------------------------------
// JSX declarative syntax to describe what component should look like and how it should behave
// component is a function that returns JSX code (JSX is not HTML) and it is compiled to JS code that the browser can understand

// JSX is extension of JS language syntax that allows us to write HTML, css and js code that looks like HTML

// Babel is a JS compiler that takes JSX code and compiles it to JS code that the browser can understand.

// JSX is not a requirement to write React apps, but it makes it easier and more readable

// imperative vs declarative
// imperative: how to do something (step by step) - jQuery is imperative (DOM manipulation)
// step by step DOM mutation until we get the result we want.
// we have to tell the browser what to do and how to do it (step by step) - we have to tell the browser to create a div, then add a class, then add an event listener, etc.

// thats why frameworks like React are so popular and exist in the first place - they are declarative

// declarative: what to do (what we want to achieve) - React is declarative - we tell React what we want to achieve and React will do it for us - we tell React that we want to create a div with a class and an event listener and React will do it for us

// describe what UI should look like and how it should behave
// React is an abstraction away from the DOM - we dont have to worry about the DOM, React will do it for us
// instead we think of the UI as a reflection of the current data
/////////////////////////////////////////////////////////////////////
// React component contains the data, logic, and the appearance.
// nowadays logic and UI are tightly coupled and thats the fundamental reason for components

// the old way was one technology per file which serves the traditional understanding of separation of concerns concept

// one component per file and throwing the separation of concerns away, but actually we dont, because now we actually have each component is concerned with one piece of the UI
/////////////////////////////////////////////////////////////////////
// probs
//-------------------------------------------------------------------
// probs are a way to pass data from a parent component to a child component, like a communication channel between components
//we learnt about the logic and apperance, and react renders a component based on its current data, and the UI will always kept in sync with that data
// but  what that data is ?
// this data is made up of props and state

// props are data passed from the outside and can only be updated by the parent to

// state is internal data that is managed by the component's own logic)

// props are immutable and state is mutable, so f you want to change the data, you have to change the state
// but why do we need state if we have props ?
// Well, to start, props are just an object.Therefore, if you change the props object in your component you would also affect the parent component because that's just how objects work in JavaScript.

// So when you copy an object and mutate the copy,the original object will also be mutated. Now, if you change an object that is located outside of the component function, that function has then created a so-called side effect.So in general, a side effect happens whenever you change some data that's located outside of the current function.

//React, however, is all about pure functions,so functions without side effects,at least when it's about a components data.

// So components have to be pure in terms of their props and state, because this allows React to optimize your application and it avoids some strange bugs that can appear when you manipulate external data.

// And in fact, we can extend this idea of immutability to React development in general.

// So a component should never mutate any data that we write outside of its function scope

// React uses a so-called one-way data flow, which means that data always flows from the parent component to the child component and never the other way around. So the child component can never change the data that it receives from the parent component. And that's why props are immutable.
