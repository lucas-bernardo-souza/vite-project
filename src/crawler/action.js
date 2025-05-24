import { state } from './state.js';
import { iniciaTracer, continuaTracer, salvaXMLTracer } from './tracer.js';
import { rastrear, iniciar, mapeiaComponentes } from './crawlerLogic.js';

export function handleMessage(request, sender, sendResponse) {
  switch (request.acao) {
    case "iniciar":
    case "novapagina":
      Object.assign(state, {
        linksPorPai: request.linkspai,
        linksAcessados: request.linksacessados,
        numPagina: request.numpagina,
        numComponente: request.numcomponente,
        numEvento: request.numevento,
        numState: request.numstate,
        index: request.index,
        xmlSite: request.xmlsite,
        edges: request.edges,
      });
      request.acao === "iniciar" ? iniciar(request.id) : rastrear(request.id);
      break;

    case "mostrarConsole":
      mapeiaComponentes(request.item, request.data, request.tabid);
      break;

    case "iniciarGravacao":
      Object.assign(state, {
        gravando: request.gravando,
        xmlTracer: request.xmlTracer,
      });

      chrome.storage.local.set({ 
        xmlFinalTracer: state.xmlFinalTracer,
        xmlInteracoes: state.xmlInteracoes,
        gravando: state.gravando,
        xmlTracer: state.xmlTracer,
        numInteracoes: state.numInteracoes,
        tempoInteracao: state.tempoInteracao
      }, () => {
        console.log("Storage Succesful");
        iniciaTracer(request.tabid);
      });
      break;

    case "salvarXMLTracer":
      Object.assign(state, {
        xmlFinalTracer: request.xmlFinalTracer,
        xmlInteracoes: request.xmlInteracoes,
        gravando: request.gravando,
        xmlTracer: request.xmlTracer,
        numInteracoes: request.numInteracoes,
        tempoInteracao: request.tempoInteracao
      });
      salvaXMLTracer();
      break;
  }
}