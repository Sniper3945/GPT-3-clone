const apiKey = "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";
// Récupération de la textarea, du boutton et de la div chat-container
const textarea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");
const chatContainer = document.querySelector(".chat-container");
const i = 0;
const speed = 80;
let counter = 1;


// Ajout d'un écouteur d'événement "click" au bouton
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  // Récupération de la valeur de la textarea
  const textareaValue = textarea.value;
  counter += counter;
   
  // Vérification que la valeur de la textarea n'est pas vide
  if (textareaValue !== "") {
    // Création d'une nouvelle div

    // question 1
    const question1 = document.createElement("div");
    question1.classList.add("question-container");
    chatContainer.appendChild(question1);

    // question 2
    const question2 = document.createElement("div");
    question2.classList.add("question-form");
    question1.appendChild(question2);

    // img-container
    const imgcontainer = document.createElement("div");
    imgcontainer.classList.add("img-container");
    question2.appendChild(imgcontainer);

    // img-user
    const imguser = document.createElement("img");
    imguser.classList.add("img-user");
    imguser.src = '/essai/img/usericon.png';
    imgcontainer.appendChild(imguser);
    
    // question
    const question = document.createElement("div");
    question.classList.add("question");
    question2.appendChild(question);

    // question-value
    const qvalue = document.createElement("div");
    qvalue.classList.add("question-value");
    qvalue.innerHTML = textareaValue;
    question.appendChild(qvalue);
    // on suprimme les caractèe  qui se trouve dans la textarea
    document.getElementById("textarea").value = "";

    // création de la réponse

    // réponse 1
    const reponse1 = document.createElement("div");
    reponse1.classList.add("reponse-container");
    chatContainer.appendChild(reponse1);

    // reponse2
    const reponse2 = document.createElement("div");
    reponse2.classList.add("reponse-form");
    reponse1.appendChild(reponse2);

    // imgchat
    const imgchat = document.createElement("div");
    imgchat.classList.add("imgchat-container");
    reponse2.appendChild(imgchat);

    // img-chat-value
    const imgvalue = document.createElement("img");
    imgvalue.classList.add("img-chat");
    imgvalue.src = '/essai/img/logo.jpg';
    imgchat.appendChild(imgvalue);
    
    // reponse
    const reponse = document.createElement("div");
    reponse.classList.add("reponse");
    reponse2.appendChild(reponse);
    
    const rvalue = document.createElement("p");
    rvalue.classList.add("reponse-value");
    counter += counter;
    rvalue.id = "reponse-value-" + counter;
    reponse.appendChild(rvalue);
    axios.post('https://api.openai.com/v1/completions', {
         model: "text-davinci-003",
         prompt: `tu es un professeur et un élève te pose une question: ${textareaValue} :répond a cette question avec le plus de détail possible`,
         max_tokens: 1000,
         temperature: 0,
     },
     {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + apiKey
         }
     }).then((response) => {
         // Affichage de la réponse sur la page
         const answer = response.data.choices[0].text;
        
        // Ajoutez la fonction recursive pour itérer à travers les caractères de la réponse
        let i = 0;
        function addChar() {
        if (i < answer.length) {
            document.getElementById("reponse-value-" + counter).innerHTML += answer.charAt(i);
            i++;
            setTimeout(addChar, 50); // définissez la vitesse d'affichage ici
        }
        }
       addChar(); // appelez la fonction pour démarrer l'effet de génération.
     }).catch((error) => {
         console.log(error);
        });
     }
});

// Fonction pour agrandir automatiquement la taille de la textarea
function debounce(callback, delay){
    var timer;
    return function(){
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, delay)
    }
}
class Autogrow extends HTMLTextAreaElement{
    constructor(){
        super()
        this.onResize = debounce(this.onResize.bind(this),300)
    }
    connectedCallback(){
        this.addEventListener('focus', this.onFocus)
    }    


    disconnectedCallback(){
        window.removeEventListener('resize', this.onResize)
    }

    onFocus = () =>{
        console.log("onFocus")
        this.autogrow()     
        window.addEventListener('resize', this.onResize)
        this.addEventListener('input', this.autogrow)
        this.removeEventListener('focus', this.onFocus)
    }
    onResize(){
        console.log("onResize")
        this.autogrow()
    }
    autogrow = () =>{
        console.log("Agrandir")
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + 'px'
    }
}

customElements.define('textarea-autogrow',Autogrow,{extends:'textarea'}) 