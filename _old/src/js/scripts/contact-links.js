var mailbtn = document.getElementById("mail-link");
var telBtn = document.getElementById("tel-link");

function addMailLink () {
  mailbtn.href= "mailto:info@kidcalloway.nl";
}

function addTelLink() {
  telBtn.href = "tel:+31615070408";
}

if (mailbtn.addEventListener) {
  mailbtn.addEventListener( "click", addMailLink, false );
} else if (mailbtn.attachEvent) {
  mailbtn.attachEvent("click", addMailLink);
}

if (telBtn.addEventListener) {
  telBtn.addEventListener( "click", addTelLink, false );
} else if (telBtn.attachEvent) {
  telBtn.attachEvent("click", addTelLink);
}
