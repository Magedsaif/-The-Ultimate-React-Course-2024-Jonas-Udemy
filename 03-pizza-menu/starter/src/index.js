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

function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <Pizza />
      <Pizza />
      <Pizza />
      <Pizza />
    </main>
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

  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We are currently open!
    </footer>
  );
}
// first we made the component and then we nest it inside our app
function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="pizza spinaci" />
      <h3>Pizza Spinaci</h3>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
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
