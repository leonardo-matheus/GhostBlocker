document.getElementById('submit-btn').addEventListener('click', criptografar);

function controlc() {
    let copyText = document.getElementById("textopronto");
    copyText.select();
    document.execCommand('copy'); // Ou você pode usar navigator.clipboard.writeText se preferir.
    alert('Texto copiado: ' + copyText.value); // Apenas um feedback visual simples. Remova ou altere conforme necessário.
}

function criptografar(event) {
    event.preventDefault();
    var texto = document.getElementById('texto').value;
    const chars = {
    'a':'а',
    'c':'с',  
    'e':'е',  
    'i':'і',  
    'o':'о',
    'p':'р',  
    's':'ѕ',
    
    'A':'А',
    'B':'В',
    'C':'С',  
    'E':'Е',  
    'H':'Н',
    'I':'І',
    'J':'Ј',
    'K':'К',  
    'M':'М',  
    'O':'О',
    'P':'Р',  
    'S':'Ѕ',
    'T':'Т',  
    'X':'Х',
    'Y':'Ү',  
    
    'b':'b',
    'd':'d',
    'f':'f',
    'g':'g',
    'h':'h',
    'j':'j',
    'k':'k',
    'l':'l',
    'm':'m',
    'n':'n',
    'q':'q',
    'r':'r',
    't':'t',
    'u':'u',
    'v':'v',
    'w':'w',
    'x':'x',
    'y':'y',
    'z':'z',
    
    'D':'D',
    'F':'F',
    'G':'G',
    'L':'L',
    'N':'N',
    'Q':'Q',
    'R':'R',
    'U':'U',
    'V':'V',
    'W':'W',
    'Z':'Z'
    
    };
    
    texto = texto.replace(/[a-zA-Z]/g, m => chars[m] || m);

    var ZeroWidth = "​";
    var textofinal = chunk(texto, 1).join(ZeroWidth)
    document.getElementById("textopronto").value = textofinal;
    
    
    }
    
    function controlc(){
    let copyText = document.getElementById("textopronto");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    }
    
    function chunk(str, n) {
    var ret = [];
    var i;
    var len;
    
    for(i = 0, len = str.length; i < len; i += n) {
    ret.push(str.substr(i, n))
    }
    
    return ret
    };
    