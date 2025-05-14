document.addEventListener("DOMContentLoaded", () => {
  const btnCrawler = document.getElementById("initCrawler");
  const btnTracer = document.getElementById("initTracer");
  const inputXML = document.getElementById("loadXML");
  const frame = document.getElementById("frameXML");

  btnCrawler.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          console.log("Crawler executado!");
          // Seu código de crawler vai aqui (ou injetar algo).
        }
      });
    });
  });

  btnTracer.addEventListener("click", () => {
    console.log("Tracer iniciado!");
    // Seu código de tracer vai aqui.
  });

  inputXML.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const xmlContent = event.target.result;
      const blob = new Blob([xmlContent], { type: "text/xml" });
      const url = URL.createObjectURL(blob);
      frame.src = url;
      frame.style.display = "block";
    };
    reader.readAsText(file);
  });
});