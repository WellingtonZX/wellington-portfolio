document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.onload = function () {
  if (!sessionStorage.getItem("welcomeMessageShown")) {
    Swal.fire({
      title: "Bem-vindo ao Meu Portfólio!",
      text: "Obrigado por visitar meu site. Estou animado para compartilhar meus projetos e habilidades com você. Por favor, note que o portfólio ainda está em andamento e será atualizado com mais conteúdos em breve.",
      icon: "info",
      confirmButtonText: "Explorar",
      backdrop: true,
      background: '#000009',
      color: '#fff',
      confirmButtonColor: '#FFD700',
      iconColor: "#FFD700",
      customClass: {
        popup: 'custom-form',
        confirmButton: 'confirm-button-form',
      }
    });
    sessionStorage.setItem("welcomeMessageShown", "true");
  }
};

function loadModal(modalPath, modalContainer) {
  fetch(modalPath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(modalContainer).innerHTML = data;
      
      let modalElement = document.getElementById("exampleModal");
      let modalInstance = new bootstrap.Modal(modalElement);
      
      modalInstance.show();

      modalElement.addEventListener('shown.bs.modal', function () {
        let carouselElement = document.querySelector('#carouselExample');
        
        if (carouselElement) {
          let carouselInstance = new bootstrap.Carousel(carouselElement, {
            interval: 2000, 
            ride: 'carousel' 
          });

          carouselInstance.cycle(); 
        }
      });
    })
    .catch(error => console.error("Erro ao carregar o modal:", error));
}

$("#loadModalButton").click(() => loadModal("views/modal/trainify.html", "modal-container"));
$("#loadModalButton2").click(() => loadModal("views/modal/vanda-salgados.html", "modal-container"));
$("#loadModalButton3").click(() => loadModal("views/modal/site-viagens.html", "modal-container"));

function checkFields() {
  const name = $("#name").val();
  const email = $("#email").val();
  const message = $("#message").val();

  if (!name || !email || !message || !isValidEmail(email)) {
    const fieldMessages = {
      name: "Por favor, preencha o nome!",
      email: "Por favor, insira um email válido!",
      message: "Por favor, digite sua mensagem!"
    };

    const missingField = !name ? 'name' : !email ? 'email' : 'message';
    Swal.fire({
      icon: 'warning',
      text: fieldMessages[missingField],
      background: '#000009',
      color: '#fff',
      confirmButtonColor: '#FFD700',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-form',
        confirmButton: 'confirm-button-form'
      }
    });
    return false;
  }
  return true;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

async function sendMail(event) {
  event.preventDefault();
  if (!checkFields()) return;

  const params = {
    name: $("#name").val(),
    email: $("#email").val(),
    message: $("#message").val(),
  };

  try {
    await emailjs.send("service_8ke6tgd", "template_zt7jooa", params);
    $("#name, #email, #message").val("");

    Swal.fire({
      icon: 'success',
      title: 'Mensagem Enviada!',
      text: 'Sua mensagem foi enviada para wellington.',
      background: '#000009',
      color: '#fff',
      confirmButtonColor: '#FFD700',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-form',
        confirmButton: 'confirm-button-form'
      }
    });
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Houve um problema ao enviar sua mensagem.',
      background: '#000009',
      color: '#fff',
      confirmButtonColor: '#FFD700',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-form',
        confirmButton: 'confirm-button-form'
      }
    });
  }
}

function copyToClipboard(text, type) {
  const types = { email: "E-mail Copiado", phone: "Telefone Copiado", address: "Endereço Copiado" };
  const titleMessage = types[type] || "Texto Copiado";

  const textarea = $("<textarea>").val(text).appendTo("body").select();
  document.execCommand("copy");
  textarea.remove();

  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  }).fire({
    icon: "success",
    title: titleMessage,
    background: "#000009",
    color: "#fff",
    iconColor: "#FFD700",
    customClass: { popup: 'custom-toast' }
  });
}

function showAlert() {
  Swal.fire({
      title: "Projeto Indisponível",
      text: "Este projeto ainda não está no ar. Fique atento para atualizações!",
      icon: "info",
      confirmButtonText: "Fechar",
      background: "#000009",
      color: "#fff",
      iconColor: "#FFD700",
      customClass: { 
         popup: 'custom-form',
        confirmButton: 'confirm-button-form'
       }
  });
}
