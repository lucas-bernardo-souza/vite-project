import { state } from './state.js';

export function iniciaTracer(tabid) {
  state.domAtual = document.body.innerHTML;
  const urlMapa = window.location.href;
  state.xmlJquery = ''; // Implementar captura do DOM em XML
}

export function continuaTracer() {
  console.log("Continuando gravação do tracer...");
}

export function salvaXMLTracer() {
  console.log("Salvando XML do tracer...");
}