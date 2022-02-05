// creazione pop-up//
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// alert contatore caratteri //
function myFunction() {
    let testo = document.getElementById("textarea").value;
    let testo2 = testo.replace(/ /g, "");
    alert(
        'numero caratteri (spazi esclusi): '+ testo2.length + '\nnumeri caratteri (spazi inclusi): ' + testo .length
    );   
};
// contatore caratteri live //
function conto(){
        var c = document.getElementById('textarea').value;
        c=c.replace(/\s/g, '');
        document.getElementById('output').innerHTML = c.length;
    };

// contatore parole //
var count = document.getElementById('count');
var input = document.getElementById('textarea');
var globalWordCounter = 0;
// var WORD_LIMIT = 10;

// input.addEventListener('keydown', function(e) {
//   if (globalWordCounter > WORD_LIMIT && e.code !== "Backspace") {
//     e.preventDefault();
//     return alert("You have reached the word limit");
//   }
// });

input.addEventListener('keyup', function(e) {
  wordCounter(e.target.value);
});

function isWord(str) {
  var alphaNumericFound = false;
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if ((code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)) { // lower alpha (a-z)
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

function wordCounter(text) {
  var text = input.value.split(' ');
  var wordCount = 0;
  for (var i = 0; i < text.length; i++) {
    if (!text[i] == ' ' && isWord(text[i])) {
      wordCount++;
    }
  }
  globalWordCounter = wordCount;
  count.innerText = wordCount;
};

//copiare il testo scritto//
function CopyFunction(){
  var copyText = document.getElementById("textarea");

// Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

// Copy the text inside the text field 
  navigator.clipboard.writeText(copyText.value);

// Alert the copied text
var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "testo copiato con successo!";
};
// --tooltip per la copia-- 
function outFunc(){
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "copia nella clipboard";
}

// download testo //
function SaveMyData(){
let testo = document.getElementById("textarea").value;
let nome = document.getElementById("input-fileName").value;
let blob = new Blob([testo], {type: "text/plain;charset=utf-8"}); 
  saveAs(blob, nome+".txt");
}

//download pdf //
function creaPdf() {
    // Long text
    var titolo = document.querySelector('#input-fileName').value;
    var text = document.querySelector('#textarea').value;
    var repeat = parseInt(document.querySelector('#repeat').value) || 0;
    for (var i=0; i<repeat; i++) text += text;
  
    // Create doc
    var ori = document.querySelector('#ori').checked ? "portrati":"landscape";
    var doc = new jsPDF(ori, 'mm', 'a4');
    doc.setFontSize(parseInt(document.querySelector('#fontsize').value) || 20)
  
    // Page size
    var pageSize = { h: doc.internal.pageSize.height, w: doc.internal.pageSize.width };
    var margin = {top:20,left:15,bottom:15,right:15};
    var lineHeight = doc.getTextDimensions("M").h / 2.54;// in to mm
    console.log("SIZE: ", pageSize, lineHeight);
    
    // Pages handler
    var linePos=0, nbPage=0;
    function addPage(doc) {
      if (nbPage) doc.addPage();
      else nbPage = 0;
      nbPage++;
      linePos = margin.top;
      // Header
      // var title = document.querySelector('#input-fileName').value;
      // var twidth = doc.getTextDimensions(title).w / 2.54;
      // doc.text(pageSize.w/2 -twidth/2, margin.top, title);
      // doc.rect(margin.left, margin.top -lineHeight, 
      //          pageSize.w -margin.left - margin.right, 
      //          1.5*lineHeight)
      // Footer
      var title = document.querySelector('#input-fileName').value;
      var numPage = 'page '+nbPage;
      var nwidth = doc.getTextDimensions(numPage).w / 2.54;
      doc.text(pageSize.w -margin.right -nwidth, 
               pageSize.h -margin.bottom -lineHeight, 
               numPage);
      doc.line(margin.left, pageSize.h -margin.bottom -2*lineHeight, 
               pageSize.w - margin.right, 
               pageSize.h -margin.bottom -2*lineHeight)
      //
      linePos = margin.top + 2*lineHeight;
      return nbPage;
    }
    function addLine(doc, text) {
      doc.text(margin.left, linePos, text);
      linePos += lineHeight;  
      if (linePos > pageSize.h-2*margin.bottom) {
        addPage(doc);
      }
    }
  
    // Split text to page width
    text = doc.splitTextToSize(text,pageSize.w-margin.left-margin.right);
  
    addPage(doc);
    for (var i=0; i<text.length; i++){  
      addLine(doc, text[i]);
    }
    doc.save(titolo + '.pdf')
  }

// inserire file //
function previewFile() {
  const content = document.querySelector('.textarea');
  const [file] = document.querySelector('input[type=file]').files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file
    content.innerText = reader.result;
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

// //Confirmation alla chiusura 
// window.onbeforeunload = function (e) {        
// e = e || window.event; // IE fix   
// if (e) { 
// e.returnValue = 'Uscendo senza salvare perderai il tuo lavoro, vuoi continuare?';
// }       
// return 'Uscendo senza salvare perderai il tuo lavoro, vuoi continuare?'; 
// };//Confirmation alla chiusura
