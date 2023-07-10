// Run this example by adding <%= javascript_pack_tag 'Index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from "react-dom/client";
import App from './components/App'
import "../app.css"

const rootElement = document.body.appendChild(document.createElement('div'));
const root = createRoot(rootElement);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
   <App/>
  )
})
